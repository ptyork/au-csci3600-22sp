import { prisma } from '$lib/database';
import { getErrorResponse } from '$lib/utils/forms';

export async function get({ request, url }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to manage book copy while not authenticated');
  }

  let copyIdParam = url.searchParams.get('copyId');

  if (!copyIdParam) {
    // 404 is not found
    return getErrorResponse(404, 'no copyId provided');
  }

  // CAREFUL: this one isn't an int...it's a CUID

  let copyId = copyIdParam;

  let copy = await prisma.bookCopy.findUnique({
    where: { copyId: copyId }
  })
  
  if (!copy) {
    // 404 is not found
    return getErrorResponse(404, 'book copy not found in database');
  }

  await prisma.bookCopy.update({
    where: { copyId: copyId },
    data: {
      isAvailable: !copy.isAvailable
    }
  })

  return {
    status: 302,
    headers: {
      location: `/admin/bookCopies?bookId=${copy.bookId}`
    }
  }
}
