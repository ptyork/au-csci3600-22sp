import { getDB } from '$lib/database';

// GET /books
//  Return an Array of Book objects.
//  Accepts two optional search parameters (i.e., query strings).
//  * author=[name] will filter the books to only those with
//    author names containing the provided name.
//  * title=[name] will filter the books to only those with a
//    title that contains the provided name.
//
export async function get({ url }) {
    const db = await getDB();

    // This is really just retrieving a JavaScript Array.
    // So we'll sort it by title. Yeah, that sort "comparitor" function
    // is weird. Basically it just says if a's title is less than b's, 
    // then return -1 (negative), otherwise return 1 (positive).
    let books = db.data.books
        .sort((a,b) => a.title < b.title ? -1 : 1);
        // .sort((a,b) => {
        //     if (a.title < b.title) {
        //         return 1;
        //     } else {
        //         return -1;
        //     }
        // });

    // If the request includes an "author" search parameter, then we'll
    // assume the request wants to filter for authors whose name
    // contains the passed value (a LIKE query in SQL terms).
    // So for example "http://.../books?author=Tolkien" would find books
    // with an author field that contains Tolkien.
    if (url.searchParams.has('author')) {
        let author = url.searchParams.get('author').toLowerCase();
        books = books.filter((b) => b.author.toLowerCase().includes(author));
    }

    // Repeat for title
    if (url.searchParams.has('title')) {
        let title = url.searchParams.get('title').toLowerCase();
        books = books.filter((b) => b.title.toLowerCase().includes(title));
    }

    return {
        body: {
            books
        }
    }
}

// POST /books
//  Add a new book object to the collection of books. Does basic validation
//  to insure that at least the author and title are provided. If no id
//  is provided, one is generated. If an id is provided and it is not unique,
//  then a validation error is raised.
//
export async function post({ request }) {
    let newbook;
    const db = await getDB();
    try {
        newbook = await request.json();
        
        if (!newbook.author) throw "A book must include an author";
        if (!newbook.title) throw "A book must include a title";

        // map takes one array and maps it to another array of equal size.
        // Here we're just transforming an array of book objects into an
        // array of id's.
        let ids = db.data.books.map(b => b.id);
        
        if (newbook.id) {
            // Don't want to just convert a float to an int (which would
            // truncate a decimal to an int). We want to make sure an int
            // is actually passed. So first convert to a float and then
            // see if that float is actually an int.
            let id = parseFloat(newbook.id);
            if (!Number.isInteger(id)) {
                throw "If an id is provided, it must be an integer value";
            }
            if (ids.contain(id)) {
                throw "If an id is provided, it must be unique";
            }
            newbook.id = id;
        } else {
            // If none is provided, we simply add one to the current maximum id value.
            // Math.max() expects multiple values passed in as separate arguments, NOT
            // an array. The "..." is called a "spread operator", and it does just that.
            // It spreads out the array elements as separate arguments to a function.
            newbook.id = Math.max(...ids) + 1;
        }

    } catch (err) {
        return {
            status: 400,
            body: err
        }
    }

    // New try block to catch server errors (prior was for user errors)
    try {
        // If we get this far, then the new book appears valid and has a valid id.
        // So add it to the database.
        db.data.books.push(newbook);
        await db.write();

        // 201 is the proper "created" response. It should include a location URL
        // for the newly added resource.
        return {
            status: 201,
            headers: {
                location: `/books/${newbook.id}`
            },
            body: newbook
        }

    } catch (err) {
        return {
            status: 500,
            body: err
        }
    }
}
