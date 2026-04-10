/*
  Warnings:

  - You are about to drop the column `reviewCount` on the `Product` table. All the data in the column will be lost.
  - Added the required column `review_count` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "reviewCount",
ADD COLUMN     "review_count" INTEGER NOT NULL;
