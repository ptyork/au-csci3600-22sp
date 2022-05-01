/*
  Warnings:

  - The `firstName` column on the `Author` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `edition` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `picURL` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `lastName` on the `Author` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `title` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "firstName";
ALTER TABLE "Author" ADD COLUMN     "firstName" VARCHAR(50);
ALTER TABLE "Author" DROP COLUMN "lastName";
ALTER TABLE "Author" ADD COLUMN     "lastName" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "title";
ALTER TABLE "Book" ADD COLUMN     "title" VARCHAR(200) NOT NULL;
ALTER TABLE "Book" DROP COLUMN "edition";
ALTER TABLE "Book" ADD COLUMN     "edition" VARCHAR(50);
ALTER TABLE "Book" DROP COLUMN "picURL";
ALTER TABLE "Book" ADD COLUMN     "picURL" VARCHAR(200);

-- AlterTable
ALTER TABLE "Patron" ALTER COLUMN "mobileNumber" DROP NOT NULL;
