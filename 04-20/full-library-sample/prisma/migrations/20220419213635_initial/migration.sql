-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('EMAIL', 'MOBILE');

-- CreateTable
CREATE TABLE "Author" (
    "authorId" SERIAL4 NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT NOT NULL,
    "yearOfBirth" INT4 NOT NULL,
    "yearOfDeath" INT4,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("authorId")
);

-- CreateTable
CREATE TABLE "Book" (
    "bookId" SERIAL4 NOT NULL,
    "title" TEXT NOT NULL,
    "yearWritten" INT4,
    "edition" TEXT,
    "price" DOUBLE PRECISION,
    "picURL" TEXT,
    "authorId" INT4 NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookId")
);

-- CreateTable
CREATE TABLE "BookCopy" (
    "copyId" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "bookId" INT4 NOT NULL,

    CONSTRAINT "BookCopy_pkey" PRIMARY KEY ("copyId")
);

-- CreateTable
CREATE TABLE "BookBorrow" (
    "borrowId" SERIAL4 NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3),
    "lateFee" DECIMAL(7,2) NOT NULL,
    "lateFeePaidDate" TIMESTAMP(3),
    "copyId" TEXT NOT NULL,
    "patronId" TEXT NOT NULL,

    CONSTRAINT "BookBorrow_pkey" PRIMARY KEY ("borrowId")
);

-- CreateTable
CREATE TABLE "Patron" (
    "patronId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "emailAddress" VARCHAR(100) NOT NULL,
    "mobileNumber" VARCHAR(20) NOT NULL,
    "preferredContact" "ContactType" NOT NULL DEFAULT E'EMAIL',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "canBorrow" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Patron_pkey" PRIMARY KEY ("patronId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patron_userName_key" ON "Patron"("userName");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("authorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCopy" ADD CONSTRAINT "BookCopy_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookBorrow" ADD CONSTRAINT "BookBorrow_copyId_fkey" FOREIGN KEY ("copyId") REFERENCES "BookCopy"("copyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookBorrow" ADD CONSTRAINT "BookBorrow_patronId_fkey" FOREIGN KEY ("patronId") REFERENCES "Patron"("patronId") ON DELETE RESTRICT ON UPDATE CASCADE;
