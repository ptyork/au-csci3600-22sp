/*
  Return a book
  * ONLY for authenticated patrons
  * Double-check to insure that the BookBorrow object is still "borrowed" by the patron
  * Example of a transaction since a "BookBorrow" record must be "closed" (set the
    dateReturned field) AND the BookCopy isAvailable flag must be set to true.
  * Returns the updated patron (w/ BookBorrow objects)
*/

import { prisma } from '$lib/database';
import type { BookBorrow } from '@prisma/client';
import { getErrorResponse } from '$lib/utils/forms';


export async function get({ request, url }) {
  console.debug('/returnBook');

  // CHECK TO INSURE THE USER IS VALIDATED

  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to return a book while not authenticated');
  }

  // OKAY, USER IS AUTHORIZED...TRY TO RETURN BOOK

  try {

    // user.email will is the patron's userName (and email, too)

    let userEmail = request.user.email as string;

    // Get the BookBorrow record based on the URL's search parameter. Include the 
    // Patron and the BookCopy. Also include the Book (via BookCopy).

    let requestBorrowId = parseInt(url.searchParams.get('borrowId'));
    console.debug(`${userEmail} to return ${requestBorrowId}`);

    let bookBorrow = await prisma.bookBorrow.findUnique({
      where: { borrowId: requestBorrowId },
      include: {
        patron: true,
        bookCopy: {
          include: { book: true }
        }
      }
    });

    if (!bookBorrow) {
      // 404 is not found
      return getErrorResponse(404, `${requestBorrowId} was not found`);
    }

    // Make sure that the user returning the books is actually the user that borrowed it.

    if (bookBorrow.patron.userName != userEmail) {
      // 403 is forbidden
      return getErrorResponse(403, `${userEmail} is not able to return this copy of ${bookBorrow.bookCopy.book.title}`);
    }

    // FINALLY the "meat" of the API call. We want to add a BookCopy record
    // AND update the BookCopy's isAvailale flag. This requires a transaction,
    // since both must succeed or fail together.

    await prisma.$transaction([

      // Set the return date
      // Leaving out the complexity of exceeding the due date, needing to pay fines, etc.
      prisma.bookBorrow.update({
        data: {
          returnDate: new Date()
        },
        where: {
          borrowId: requestBorrowId
        }
      }),

      // Also update the isAvailable to false for the selected BookCopy
      prisma.bookCopy.update({
        where: { copyId: bookBorrow.copyId },
        data: { isAvailable: true }
      })
    ]);

    // Finally return the returned book and list of the all borrowed books.

    let returnedBook = await prisma.bookBorrow.findUnique({
      where: { borrowId: requestBorrowId },
      include: { bookCopy: {
        include: { book: {
          include: { author: true }
        }}
      }}
    });

    let borrows = await prisma.bookBorrow.findMany({
      where: { patronId: bookBorrow.patronId },
      orderBy: { dueDate: 'desc' },
      include: { bookCopy: {
        include: { book: {
          include: { author: true }
        }}
      }}
    });

    // Return the updated book in a SUCCESS response
    
    return {
      status: 200,
      body: {
        returnedBook,
        borrows
      }
    }
    
  } catch (ex) {
    // 500 is internal service error
    getErrorResponse(500, ex as string);
  }

}
