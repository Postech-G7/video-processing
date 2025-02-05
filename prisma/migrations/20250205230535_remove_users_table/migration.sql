-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('processing', 'completed', 'failed', 'retrieved');

-- CreateTable
CREATE TABLE "videos" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "userEmail" VARCHAR(255) NOT NULL,
    "status" "VideoStatus" NOT NULL DEFAULT 'processing',
    "path" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);
