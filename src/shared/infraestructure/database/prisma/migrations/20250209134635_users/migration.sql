/*
  Warnings:

  - You are about to drop the column `base64` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_userId_fkey";

-- DropIndex
DROP INDEX "videos_userEmail_idx";

-- DropIndex
DROP INDEX "videos_userId_idx";

-- AlterTable
ALTER TABLE "videos" DROP COLUMN "base64",
DROP COLUMN "userId",
ADD COLUMN     "path" VARCHAR(255);

-- DropTable
DROP TABLE "users";
