import { prisma } from '$lib/database';
import { getErrorResponse } from '$lib/utils/forms';

export async function get({ request, url }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to add book copy while not authenticated');
  }

  let bookIdParam = url.searchParams.get('bookId');

  if (!bookIdParam) {
    // 404 is not found
    return getErrorResponse(404, 'no bookId provided');
  }

  let bookId = parseInt(bookIdParam);

  let book = await prisma.book.findUnique({
    where: { bookId: bookId }
  })
  
  if (!book) {
    // 404 is not found
    return getErrorResponse(404, 'book not found in database');
  }

  await prisma.bookCopy.create({
    data: {
      book: {
        connect: { bookId: bookId }
      }
    }
  })

  return {
    status: 302,
    headers: {
      location: `/admin/bookCopies?bookId=${bookId}`
    }
  }
}
