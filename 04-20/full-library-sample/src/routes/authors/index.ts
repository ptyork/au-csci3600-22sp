import { prisma } from '$lib/database';

export async function get() {
  
  // Prisma (recently) can include a count of relations, which is what we
  // want. We don't want to show the books, just the COUNT of books.
  //
  // https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing#count-relations
  //
  // So...

  let allAuthors = await prisma.author.findMany({
    include: {
      _count: { select: { books: true } }
    },
    orderBy: [{ lastName: 'desc' }, { firstName: 'desc' }]
  });
  console.log(allAuthors);
  return {
    body: {
      authors: allAuthors
    }
  }
}
