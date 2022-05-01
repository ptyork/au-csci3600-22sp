/*
  Handle a login.
  * Create a secure, httponly cookie to identify the user.
  * Create the "patron" entry in the database for a new user.
*/

import auth0config from '$lib/config/auth';
import { prisma } from '$lib/database';

export async function get({ request }) {
  console.debug('/api/loggedIn');
  
  try {
    // The user token will be in the Authorization request header. Will look like:
    //    Authorization: Bearer <token>
    // So first we need to retrieve the token

    // console.debug(request);
    // console.debug(request.headers);
    let auth = request.headers.get('authorization');  // 'Bearer <token>' 
    // console.debug(auth);
    let token = auth.split(' ')[1];                   // ['Bearer','<token>']
    // console.debug(token);

    // Now we need to query the Auth0 REST API to validate the token
    // and to grab the user profile data. So construct a URL to query
    // it and use the javascript fetch API to grab the user profile.
    // It'll just be a simple JSON object.

    let url = `https://${auth0config.domain}/userinfo?access_token=${token}`;
    let response = await fetch(url);
    // console.debug(response);
    let authUser = await response.json();
    // console.debug(user);

    // Double check to make sure we got a valid user back. If so
    // just continue. Otherwise, trigger an exception which will
    // return an unauthorized response back to the client.

    if (!authUser?.email) {
      throw('Invalid response');
    }

    // Check to see if the user corresponds to an existing patron in
    // our database. If not, we should create a new Patron entry. 
    
    let dbUser = await prisma.patron.findUnique({ where: { userName: authUser.email }});

    if (!dbUser) {
      dbUser = await prisma.patron.create({
        data: {
          userName: authUser.email,
          emailAddress: authUser.email,
          firstName: authUser.given_name,
          lastName: authUser.family_name
        }
      });
    }

    // SUCCESS
    // Set the user cookie
    return {
      status: 200,
      headers: {
        'set-cookie': `auth0.library.user=${JSON.stringify(authUser)}; Path=/; HttpOnly; Secure; SameSite=Lax;`
      },
      body: true
    }

  } catch (ex) {
    // FAIL
    // Delete the user cookie
    return {
      status: 401,
      headers: {
        'set-cookie': `auth0.library.user=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly; Secure; SameSite=Lax;`
      },
      body: ex
    }
  }
}
