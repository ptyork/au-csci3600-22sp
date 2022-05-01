import { prisma } from '$lib/database';
import { getValuesFromRequest, getErrorResponse } from '$lib/utils/forms';

export async function get({ request, params }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to checkout a book while not authenticated');
  }

  let bookId = parseInt(params.id);

  let book = await prisma.book.findUnique({
    where: { bookId: bookId },
    include: { author: true }
  });

  if (!book) {

    return getErrorResponse(404, `unable to find book ${bookId}`);

  } else {

    return {
      body: { book }
    }

  }
}

export async function post({ request, params }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to checkout a book while not authenticated');
  }

  let bookId = parseInt(params.id);

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

    // The action is set based on which button is pressed (see the .svelte
    // file. We will assume that it is an update (less destructive) unless
    // the "delete" value is explicitly detected.

  if (values.action == "delete") {
    try {

      let book = await prisma.book.delete({
        where: { bookId: bookId},
      });

      return {
        status: 302,
        headers: {
          location: `/admin/books?authorId=${book.authorId}`
        }
      }
    } catch (ex) {
      console.error(ex);
      return {
        status: 200,
        body: {
          author: values,
          errorMessage: 'Error deleting this record. This is most likely because there are related records.'
        }
      }
    }

  } else {

    try {
      // unfortunately the "number" values are passed
      // in as strings in the values object. So, we
      // gotta do a little conversion work.

      let book = await prisma.book.update({
        where: { bookId: bookId },
        data: {
          title: values.title,
          yearWritten: values.yearWritten ? parseInt(values.yearWritten) : null,
          price: values.price ? parseFloat(values.price) : null,
          edition: values.edition,
          picURL: values.picURL
        }
      });

      return {
        status: 302,
        headers: {
          location: `/admin/books?authorId=${book.authorId}`
        }
      }

    } catch (ex) {
      console.error(ex);
      return {
        status: 200,
        body: {
          author: values,
          errorMessage: `Error updating this record: ${ex.message}`
        }
      }
    }
  
  }
 
}