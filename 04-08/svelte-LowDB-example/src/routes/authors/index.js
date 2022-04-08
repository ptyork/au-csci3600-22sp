import { getDB } from '$lib/database';

// GET /authors
//  Return an Array of Author objects.
//
export async function get({ url }) {
    const db = await getDB();

    let books = db.data.books;
    let uniqueAuthorNames = [];
    for (let book of books) {
        if (!uniqueAuthorNames.includes(book.author)) {
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
        body: {
            authors
        }
    }
}
