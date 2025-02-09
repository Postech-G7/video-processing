/*
  Warnings:

  - Added the required column `userEmail` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "userEmail" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE INDEX "videos_userEmail_idx" ON "videos"("userEmail");
