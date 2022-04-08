import { getDB } from '$lib/database';

// GET /books/[id]
//  Returns a single book object matching the passed route parameter.
//
export async function get({ params }) {
  const db = await getDB();

  // `params.id` comes from [id].js
  let book = await db.data.books
    .find(a => a.id == params.id);

  return {
    body: book
  }
}
