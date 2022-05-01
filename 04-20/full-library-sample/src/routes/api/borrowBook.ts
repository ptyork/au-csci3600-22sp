/*
  Borrow a book
  * ONLY for authenticated patrons
  * Double-check to insure that the book is still available
  * Example of a transaction since a "BookBorrow" record must be created
    AND the BookCopy isAvailable flag must be set to false.
  * Returns the updated book (w/ BookCopies)
*/

import { prisma } from '$lib/database';
import type { BookCopy } from '@prisma/client';
import { getErrorResponse } from '$lib/utils/forms';

// Helper function to retrieve a response object based on a
// status code and a message. Also logs the message to the console.

export async function get({ request, url }) {
  console.debug('/borrowBook');

  // CHECK TO INSURE THE USER IS VALIDATED

  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to checkout a book while not authenticated');
  }

  // OKAY, USER IS AUTHORIZED...TRY TO BORROW BOOK

  try {

    // user.email will is the patron's userName (and email, too)

    let userEmail = request.user.email as string;

    // Get the book based on the URL's search parameter

    let bookId = parseInt(url.searchParams.get('bookId'));
    console.debug(`${userEmail} to borrow ${bookId}`);

    let book = await prisma.book.findUnique({
      where: { bookId: bookId },
      include: { copies: true }
    });

    if (!book) {
      // 404 is not found
      return getErrorResponse(404, `${bookId} was not found`);
    }

    // Double-check that there available copies (could have changed since
    // the UI was drawn)

    let avilableCopies : BookCopy[] = [];
    for (let copy of book.copies) {
      if (copy.isAvailable) {
        avilableCopies.push(copy);
      }
    }
    if (avilableCopies.length == 0) {
      return getErrorResponse(404, `${book.title} has no available copies`);
    }

    // Pick a copy (the last one in this case , but it doens't matter which)

    let checkoutCopy = avilableCopies.pop();

    // Pull the patron so we can get the patronId (different than userName).
    // Need this to relate the BookBorrow record with the Patron.
    
    let patron = await prisma.patron.findUnique({
      where: { userName: userEmail }
    });
    if (!patron?.isActive || !patron?.canBorrow) {
      // 403 is forbidden
      return getErrorResponse(403, `${userEmail} is not able to borrow books`);
    }

    // Calculate the due date as 30 days from today
    let today = new Date();
    let dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

    // FINALLY the "meat" of the API call. We want to add a BookCopy record
    // AND update the BookCopy's isAvailale flag. This requires a transaction,
    // since both must succeed or fail together.

    let [bookBorrow,] = await prisma.$transaction([

      // Create the BookBorrow record. MOST of the fields are auto generated
      // and there's no reason to override the defaults here. We do need to
      // enter the foreign key values. That is what this weird "connect:" syntax
      // is all about. Instead of just setting `copyId: checkoutCopy.copyId`, they
      // require us to set the "bookCopy" object and "connect" the existing
      // record. Not gonna lie. I don't like it. But here is the explanation:
      //
      // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#connect-an-existing-record


      prisma.bookBorrow.create({
        data: {
          dueDate: dueDate,
          bookCopy: {
            connect: { copyId: checkoutCopy?.copyId }
          },
          patron: {
            connect: { patronId: patron?.patronId }
          }
        }
      }),

      // Also update the isAvailable to false for the selected BookCopy
      prisma.bookCopy.update({
        where: { copyId: checkoutCopy?.copyId },
        data: { isAvailable: false }
      })
    ]);

    // Re-read the book from the database to get the changes reflected and
    // return it back to the client so that the UI can be updated.

    let updatedBook = await prisma.book.findUnique({
      where: { bookId: bookId },
      include: { author: true, copies: true }
    })

    // Return the bookBorrow and updated book in a SUCCESS response

    return {
      status: 200,
      body: {
        bookBorrow,
        book: updatedBook
      }
    }
    
  } catch (ex) {
    // 500 is internal service error
    getErrorResponse(500, ex as string);
  }

}
