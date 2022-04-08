import { prisma } from '$lib/database';

export async function get({ url }) {
  
  let sort: any = { lastName: "asc" };
  if (url.searchParams.has('sort')) {
    switch (url.searchParams.get('sort').toLowerCase()) {
      case 'yearofbirth':
        sort = { yearOfBirth: "asc" };
        break;
      case 'yearofdeath':
        sort = { yearOfBirth: "asc" };
        break;
    }
  }

  // let allAuthors = await prisma.author.findMany();
  // let allAuthors = await prisma.author.findMany({
  //   include: { books: true }
  // });
  let allAuthors = await prisma.author.findMany({
    include: { books: true },
    orderBy: sort
  });
  return {
    body: {
      authors: allAuthors
    }
  }
}
