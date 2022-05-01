import { prisma } from '$lib/database';
import { getErrorResponse } from '$lib/utils/forms';

export async function get({ request, url }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to manage books while not authenticated');
  }

  try {
    let authorIdParam = url.searchParams.get('authorId');

    if (!authorIdParam) {
      // 404 is not found
      return getErrorResponse(404, 'no authorId provided');
    }

    let authorId = parseInt(authorIdParam);

    let author = await  prisma.author.findUnique({
      where: { authorId: authorId }
    })
    
    if (!author) {
      // 404 is not found
      return getErrorResponse(404, 'author not found in database');
    }

    let books = await prisma.book.findMany({
      where: { authorId: authorId },
      orderBy: { yearWritten: 'asc' }
    });
    
    return {
      body: { author, books }
    }

  } catch (ex) {
    return getErrorResponse(500, ex);
  }
}
