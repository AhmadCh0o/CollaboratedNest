/*
  Warnings:

  - Added the required column `userId` to the `passwords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "passwords" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "passwords" ADD CONSTRAINT "passwords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
