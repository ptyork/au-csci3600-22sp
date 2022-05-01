import { prisma } from '$lib/database';

export async function get({ params }) {
  let authorId = parseInt(params.id);

  let author = await prisma.author.findUnique({
    where: { authorId: authorId }
  });

  if (!author) {

    return {
      status: 404
    }

  } else {

    let books = await prisma.book.findMany({
      where: { authorId: authorId },
      orderBy: { yearWritten: 'asc' },
      include: { copies: true }
    });

    return {
      body: {
          author,
          books
      }
    }

  }
}
