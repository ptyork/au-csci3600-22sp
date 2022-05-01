/****************************************************************************
  When you have typescript installed, VS Code likes to check your javascript 
  files for correctness. Thanks. But sometimes it's really annoying. So this 
  @ts-nocheck comment tells VS Code to shut the heck up.
*****************************************************************************/

// @ts-nocheck
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import config from '$lib/config/auth';

/****************************************************************************
  This "hook" allows you to inspect and/or modify every request and subsequent
  response. You can inspect headers, add response headers, etc.

  Here I want to check to make sure that we are logged in. Unfortunately,
  SvelteKit doesn't come with any "magic" authentication or authorization
  code built in. Nor any way to plug anything in. Which...sucks. So I have
  to use this method to hack together a solution. Which...sucks. I SHOULD
  be able to include this security token and simply validate it here on the
  server. Which SHOULD also give me all of the user info (called "claims").
  BUT, I'm missing something important.

  NOTE: This is now a lot more secure since we ARE doing some server-side
  validation of the JWT token in /api/loggedin and setting the cookie
  on the server-side as HttpOnly (meaning no malicious javascript can
  set it and it's much harder to spoof). Still imperfect as we'd be better
  off encoding the user cookie as a JWT, but that got a bit too complex for
  this assignment.
*****************************************************************************/

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // console.debug("IN HANDLE HOOK");
  // console.debug(event.request.headers);
  let cookieString = event.request.headers.get('cookie');
  if (cookieString) {
    let cookies = cookie.parse(cookieString);
    // console.debug(cookies);
    
    let userString = cookies['auth0.library.user'];
    // console.debug("USER:", userString);
    if (!userString) {
      event.request.isAuthenticated = false;
    } else {
      event.request.isAuthenticated = true;
      event.request.user = JSON.parse(userString);
    }
    console.debug("isAuthenticated:", event.request.isAuthenticated);
    console.debug("user:", event.request.user);
  }
  const response = await resolve(event);
 
  return response;
}

// Stuff that didn't work

// let token = cookies['auth0.token'];
// console.debug(token);
// try {
//   let tokenBody = jwt.verify(token, config.cert);
//   console.debug(tokenBody);
// } catch(err) {
//   console.error("INVALID TOKEN:", err);
// }
