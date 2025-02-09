/*
  Warnings:

  - You are about to drop the column `path` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `videos` table. All the data in the column will be lost.
  - Added the required column `base64` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "videos" DROP COLUMN "path",
DROP COLUMN "userEmail",
ADD COLUMN     "base64" TEXT NOT NULL,
ADD COLUMN     "processedVideoUrl" TEXT,
ADD COLUMN     "userId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "videos_userId_idx" ON "videos"("userId");
