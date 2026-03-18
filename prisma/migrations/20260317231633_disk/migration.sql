-- CreateEnum
CREATE TYPE "DiskType" AS ENUM ('PRIMARY', 'SECONDARY');

-- CreateTable
CREATE TABLE "Disk" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" "DiskType" NOT NULL,

    CONSTRAINT "Disk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Disk_type_key" ON "Disk"("type");
