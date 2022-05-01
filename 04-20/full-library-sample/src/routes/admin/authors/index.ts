import { prisma } from '$lib/database';
import { getErrorResponse } from '$lib/utils/forms';

export async function get({ request }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to manage authors while not authenticated');
  }

  let authors = await prisma.author.findMany({
    orderBy: [{ lastName: 'desc' }, { firstName: 'desc' }]
  });
  return {
    body: {
      authors: authors
    }
  }
}
