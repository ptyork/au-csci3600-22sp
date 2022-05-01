import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// This is here just to allow me to automatically insert a bunch of
// "seed" data. There's a "proper" way to do this:
//   https://www.prisma.io/docs/guides/database/seed-database
// But this is a good place for me to demonstrate how to do inserts.
//
export async function clearData() {
  // Clear any that are there
  await prisma.bookCopy.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
}

export async function seedData() {
  await clearData();
  
  // All BookCopy instances can just use the defauls, so are thus left as empty objects {}
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
            price: 5.75,
            copies: {
              create: [{}]
            }
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
            price: 14,
            copies: {
              create: [{}]
            }
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
            price: 19.95,
            copies: {
              create: [{},{},{},{},{}]
            }
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
            price: 7.95,
            copies: {
              create: [{},{}]
            }
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
            price: 27.45,
            copies: {
              create: [{},{},{}]
            }
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
            price: 12.7,
            copies: {
              create: [{},{}]
            }
          },
          {
            title: "Anna Karenina",
            yearWritten: 1875,
            edition: "Penguin",
            price: 13.5,
            copies: {
              create: [{},{},{},{}]
            }
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
            price: 5.76,
            copies: {
              create: [{},{},{}]
            }
          },
          {
            title: "Tom Sawyer",
            yearWritten: 1862,
            edition: "Random House",
            price: 7.75,
            copies: {
              create: [{},{},{},{}]
            }
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
            price: 25,
            copies: {
              create: [{}]
            }
          },
          {
            title: "A Room of One's Own",
            yearWritten: 1922,
            edition: "Penguin",
            price: 29,
            copies: {
              create: [{},{}]
            }
          }
        ]
      }
    }
  });

}
