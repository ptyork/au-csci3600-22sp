import { prisma } from '$lib/database';

export async function get({ params }) {
  let bookId = parseInt(params.id);

  let book = await prisma.book.findUnique({
    where: { bookId: bookId },
    include: { author: true, copies: true }
  });

  if (!book) {

    return {
      status: 404
    }

  } else {

    return {
      body: {
          book: book
      }
    }

  }
}
