import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// This is here just to allow me to automatically insert a bunch of
// "seed" data. There's a "proper" way to do this:
//   https://www.prisma.io/docs/guides/database/seed-database
// But this is a good place for me to demonstrate how to do inserts.
//
export async function seedData() {
  // Clear any that are there
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  // option 1 :
  //   create objects separately to pass into the create() methods.
  //   use returned author object to get automatically generated id.
  //   use as foreign-key when creating associated books.
  let author1 = {
    firstName: "Jane",
    lastName: "Austen",
    yearOfBirth: 1775,
    yearOfDeath: 1817
  };
  let createdAuthor1 = await prisma.author.create({ data: author1 });
  let book1 = {
    title: "Northanger Abbey",
    yearWritten: 1814,
    edition: "Penguin",
    price: 18.2,
    authorId: createdAuthor1.id
  }
  await prisma.book.create({ data: book1 });

  // option 2 :
  //   create "anonymous" objects to pass into the create() methods (gives intellisense).
  //   use returned author object to get automatically generated id.
  //   use as foreign-key when creating associated books.
  let createdAuthor2 = await prisma.author.create({
    data: {
      firstName: "Michael",
      lastName: "Cunnningham",
      yearOfBirth: 1952
    }
  });
  await prisma.book.create({
    data: {
      title: "The Hours",
      yearWritten: 1999,
      edition: "Harcourt Brace",
      price: 12.35,
      authorId: createdAuthor2.id
    }
  });

  // option 3:
  //   create author and book(s) at the same time.
  //   far simpler so I'll do this for the rest.
  await prisma.author.create({
    data: {
      firstName: "Charles",
      lastName: "Dickens",
      yearOfBirth: 1812,
      yearOfDeath: 1870,
      books: {
        create: [
          {
            title: "Bleak House",
            yearWritten: 1870,
            edition: "Random House",
            price: 5.75
          }
        ]
      }
    }
  });

  await prisma.author.create({
    data: {
      firstName: "Gabriel García",
      lastName: "Márquez",
      yearOfBirth: 1927,
      yearOfDeath: 2014,
      books: {
        create: [
          {
            title: "One Hundred Years of Solitude",
            yearWritten: 1967,
            edition: "Harper Perennial",
            price: 14
          }
        ]
      }
    }
  });

  await prisma.author.create({
    data: {
      firstName: "J.K.",
      lastName: "Rowling",
      yearOfBirth: 1965,
      books: {
        create: [
          {
            title: "Harry Potter",
            yearWritten: 2000,
            edition: "Harcourt Brace",
            price: 19.95
          }
        ]
      }
    }
  });

  await prisma.author.create({
    data: {
      firstName: "William",
      lastName: "Shakespeare",
      yearOfBirth: 1564,
      yearOfDeath: 1616,
      books: {
        create: [
          {
            title: "Hamlet, Prince of Denmark",
            yearWritten: 1603,
            edition: "Signet Classics",
            price: 7.95
          }
        ]
      }
    }
  });

  await prisma.author.create({
    data: {
      firstName: "J.R.R.",
      lastName: "Tolkien",
      yearOfBirth: 1892,
      yearOfDeath: 1973,
      books: {
        create: [
          {
            title: "Lord of the Rings",
            yearWritten: 1937,
            edition: "Penguin",
            price: 27.45
          }
        ]
      }
    }
  });

  await prisma.author.create({
    data: {
      firstName: "Leo",
      lastName: "Tolstoy",
      yearOfBirth: 1828,
      yearOfDeath: 1910,
      books: {
        create: [
          {
            title: "War and Peace",
            yearWritten: 1865,
            edition: "Penguin",
            price: 12.7
          },
          {
            title: "Anna Karenina",
            yearWritten: 1875,
            edition: "Penguin",
            price: 13.5
          }
        ]
      }
    }
  });

  await prisma.author.create({
    data: {
      firstName: "Mark",
      lastName: "Twain",
      yearOfBirth: 1835,
      yearOfDeath: 1910,
      books: {
        create: [
          {
            title: "Huckleberry Finn",
            yearWritten: 1865,
            edition: "Penguin",
            price: 5.76
          },
          {
            title: "Tom Sawyer",
            yearWritten: 1862,
            edition: "Random House",
            price: 7.75
          }
        ]
      }
    }
  });

  await prisma.author.create({
    data: {
      firstName: "Virginia",
      lastName: "Woolf",
      yearOfBirth: 1882,
      yearOfDeath: 1941,
      books: {
        create: [
          {
            title: "Mrs. Dalloway",
            yearWritten: 1925,
            edition: "Harcourt Brace",
            price: 25
          },
          {
            title: "A Room of One's Own",
            yearWritten: 1922,
            edition: "Penguin",
            price: 29
          }
        ]
      }
    }
  });

}
