/*
  Warnings:

  - You are about to drop the column `userId` on the `passwords` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "passwords" DROP CONSTRAINT "passwords_userId_fkey";

-- AlterTable
ALTER TABLE "passwords" DROP COLUMN "userId";
