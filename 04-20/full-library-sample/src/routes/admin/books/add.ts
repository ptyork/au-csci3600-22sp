import { prisma } from '$lib/database';
import { getValuesFromRequest, getErrorResponse } from '$lib/utils/forms';

export async function get({ request, url }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to add book while not authenticated');
  }

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

  return {
    body: { author, book: {} }
  };
}

export async function post({ request, url }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to add book while not authenticated');
  }

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
  
  let values = await getValuesFromRequest(request);

  // bookId      Int        @id @default(autoincrement())
  // title       String     @db.VarChar(200)
  // yearWritten Int?
  // edition     String?    @db.VarChar(50)
  // price       Float?
  // picURL      String?    @db.VarChar(200)
  // author      Author     @relation(references: [authorId], fields: [authorId])
  // authorId    Int
  // copies      BookCopy[]

  // SHOULD DO EXTRA VALIDATION HERE
  // BUT IN THE INTEREST OF TIME...

  console.log(values);

  // unfortunately the "number" values are passed
  // in as strings in the values object. So, we
  // gotta do a little conversion work.

  let book = await prisma.book.create({
    data: {
      title: values.title,
      yearWritten: values.yearWritten ? parseInt(values.yearWritten) : null,
      price: values.price ? parseFloat(values.price) : null,
      edition: values.edition,
      picURL: values.picURL,
      author: {
        connect: { authorId: authorId }
      }
    }
  });

  return {
    status: 302,
    headers: {
      location: `/admin/authors/${author.authorId}`
    }
  }
 
}