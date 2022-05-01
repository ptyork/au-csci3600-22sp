/*
  Warnings:

  - The `lateFee` column on the `BookBorrow` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "BookBorrow" DROP COLUMN "lateFee";
ALTER TABLE "BookBorrow" ADD COLUMN     "lateFee" DECIMAL(6,2);
