import { getDB } from '$lib/database';


// GET /authors/[name]
//  Return an Array of Author objects with a name that contains the
//  route parameter provided.
//
export async function get({ params }) {
    const db = await getDB();

    // Almost the same as index.js but filter for author matches on the name parameter
    let books = db.data.books;
    let uniqueAuthorNames = [];
    for (let book of books) {
        // `params.name` comes from [name].js
        if (book.author.toLowerCase().includes(params.name.toLowerCase()) &&
            !uniqueAuthorNames.includes(book.author)) {
            uniqueAuthorNames.push(book.author);
        }
    }

    uniqueAuthorNames.sort();  // no comparator method means just sort strings alphabetically

    let authors = [];
    for (let authorName of uniqueAuthorNames) {
        let author = { name: authorName };
        author.books = books.filter(b => b.author == authorName);
        authors.push(author);
    }

    return {
        body: authors
    }
}
