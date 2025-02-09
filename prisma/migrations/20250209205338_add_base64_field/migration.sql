/*
  Warnings:

  - You are about to drop the column `path` on the `videos` table. All the data in the column will be lost.
  - Added the required column `base64` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "videos" DROP COLUMN "path",
ADD COLUMN     "base64" TEXT NOT NULL,
ADD COLUMN     "processedVideoUrl" TEXT,
ADD COLUMN     "userId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "videos_userId_idx" ON "videos"("userId");

-- CreateIndex
CREATE INDEX "videos_userEmail_idx" ON "videos"("userEmail");
