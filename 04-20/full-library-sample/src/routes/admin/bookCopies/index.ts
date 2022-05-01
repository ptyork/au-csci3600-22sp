import { prisma } from '$lib/database';
import { getErrorResponse } from '$lib/utils/forms';

export async function get({ request, url }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to checkout a book while not authenticated');
  }

  try {
    let bookIdParam = url.searchParams.get('bookId');

    if (!bookIdParam) {
      // 404 is not found
      return getErrorResponse(404, 'no bookrId provided');
    }

    let bookId = parseInt(bookIdParam);

    let book = await  prisma.book.findUnique({
      where: { bookId: bookId },
      include: { author: true }
    })
    
    if (!book) {
      // 404 is not found
      return getErrorResponse(404, 'book not found in database');
    }

    let copies = await prisma.bookCopy.findMany({
      where: { bookId: bookId },
      orderBy: { dateAdded: 'desc' },
      include: { borrows: true }
    });
    
    return {
      body: { book: book, copies: copies }
    }

  } catch (ex) {
    return getErrorResponse(500, ex);
  }
}
