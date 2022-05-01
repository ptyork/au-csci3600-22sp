export async function get({ request }) {
  console.debug('/api/loggedOut');
  
  // delete the user cookie
  return {
    status: 200,
    headers: {
      'set-cookie': `auth0.library.user=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly; Secure; SameSite=Lax;`
    },
    body: true
  }
}
