import { prisma } from '$lib/database';

export async function get({ request }) {
  let userEmail = request.user.email as string;
  
  let patron = await prisma.patron.findUnique({
    where: { userName: userEmail },
    include: { borrows: {
      orderBy: { dueDate: 'desc' },
      // where: { returnDate: null },
      include: { bookCopy: {
        include: { book: {
          include: { author: true }
        }}
      }}
    }}
  });
  console.log(patron);
  return {
    body: {
      patron
    }
  }
}
