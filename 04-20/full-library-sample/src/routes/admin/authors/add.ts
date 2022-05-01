import { prisma } from '$lib/database';
import { getValuesFromRequest, getErrorResponse } from '$lib/utils/forms';

export async function get({ request }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to add author while not authenticated');
  }
  return {
    body: { author: {} }
  };
}

export async function post({ request }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to add author while not authenticated');
  }

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

  // unfortunately the "number" values are passed
  // in as strings in the values object. So, we
  // gotta do a little conversion work.

  let author = await prisma.author.create({
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
      location: `/admin/authors/${author.authorId}`
    }
  }
 
}