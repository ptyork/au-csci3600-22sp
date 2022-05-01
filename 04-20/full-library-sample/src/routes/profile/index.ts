import { prisma } from '$lib/database';
import type { Patron } from '@prisma/client';
import { getValuesFromRequest, getErrorResponse } from '$lib/utils/forms';

export async function get({ request }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to checkout a book while not authenticated');
  }

  let userName = request.user.email;
  let patron = await prisma.patron.findUnique({
    where: { userName: userName }
  });

  console.debug(patron);

  return {
    body: { patron }
  }
}

export async function post({ request }) {
  if (!request.isAuthenticated) {
    // 401 is unauthorized
    return getErrorResponse(401, 'attempt to checkout a book while not authenticated');
  }

  let values = await getValuesFromRequest(request) as Patron;

  // patronId         String       @id @default(cuid())
  // userName         String       @unique
  // firstName        String       @db.VarChar(50)
  // lastName         String       @db.VarChar(50)
  // emailAddress     String       @db.VarChar(100)
  // mobileNumber     String?      @db.VarChar(20)
  // preferredContact ContactType  @default(EMAIL)
  // isActive         Boolean      @default(true)
  // canBorrow        Boolean      @default(true)
  // borrows          BookBorrow[]

  // SHOULD DO EXTRA VALIDATION HERE
  // BUT IN THE INTEREST OF TIME...

  console.log(values);

  let mobileNumber : string | undefined;
  if (values.mobileNumber && values.mobileNumber.length >= 10) {
    mobileNumber = values.mobileNumber.replace(/\D/g, '');
    mobileNumber = mobileNumber.slice(0,3) + '-' + mobileNumber.slice(3,6) + '-' + mobileNumber.slice(6,10);
  }

  let userName = request.user.email;
  await prisma.patron.update({
    where: { userName: userName},
    data: {
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.emailAddress,
      mobileNumber: mobileNumber,
      preferredContact: values.preferredContact
    }
  });

  return {
    status: 302,
    headers: {
      location: "/profile"
    }
  }
 
}