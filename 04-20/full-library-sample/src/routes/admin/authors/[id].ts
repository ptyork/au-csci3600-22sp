import { prisma } from '$lib/database';
import { getValuesFromRequest, getErrorResponse } from '$lib/utils/forms';

export async function get({ request, params }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to checkout a book while not authenticated');
  }

  let authorId = parseInt(params.id);

  let author = await prisma.author.findUnique({
    where: { authorId: authorId }
  });

  if (!author) {

    return getErrorResponse(404, `unable to find author ${authorId}`);

  } else {

    return {
      body: { author }
    }

  }
}

export async function post({ request, params }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to checkout a book while not authenticated');
  }

  let authorId = parseInt(params.id);

  let values = await getValuesFromRequest(request);

  // authorId    Int     @id @default(autoincrement())
  // firstName   String? @db.VarChar(50)
  // lastName    String  @db.VarChar(50)
  // yearOfBirth Int
  // yearOfDeath Int?
  // picURL      String? @db.VarChar(200)
  // books       Book[]

  // SHOULD DO EXTRA VALIDATION HERE
  // BUT IN THE INTEREST OF TIME...

  console.log(values);

  try {

    // The action is set based on which button is pressed (see the .svelte
    // file. We will assume that it is an update (less destructive) unless
    // the "delete" value is explicitly detected.

    if (values.action == "delete") {
      await prisma.author.delete({
        where: { authorId: authorId},
      });

      return {
        status: 302,
        headers: {
          location: `/admin/authors`
        }
      }
    } else {
      // unfortunately the "number" values are passed
      // in as strings in the values object. So, we
      // gotta do a little conversion work.

      await prisma.author.update({
        where: { authorId: authorId},
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          yearOfBirth: parseInt(values.yearOfBirth),
          yearOfDeath: values.yearOfDeath ? parseInt(values.yearOfDeath) : null,
          picURL: values.picURL
        }
      });

      return {
        status: 302,
        headers: {
          location: `/admin/authors/${authorId}`
        }
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
 
}