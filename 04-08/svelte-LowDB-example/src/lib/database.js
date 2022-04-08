import { Low, JSONFile } from 'lowdb';

// Use JSON file for storage. LowDB supports others, but JSON is easy.
// By default this file will be in the root of the app.
// NORMALLY, you'd want this to be deployed separately from the
// app, and you'd store the location in a .env file which
// would be separate for each deployment type (e.g., local pc
// versus a production serer). But we'll just hard code it here.
let adapter = new JSONFile('books.json');  
let db = new Low(adapter);
let initialized = false;

export async function getDB() {
    if (!initialized) {
        // Read data from JSON file, this will set db.data content
        // Only do this one time to improve performance
        await db.read();
        initialized = true;
    }
    return db;
}
