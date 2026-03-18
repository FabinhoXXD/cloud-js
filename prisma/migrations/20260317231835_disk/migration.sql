/*
  Warnings:

  - You are about to drop the `Disk` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Disk";

-- CreateTable
CREATE TABLE "disk" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" "DiskType" NOT NULL,

    CONSTRAINT "disk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "disk_type_key" ON "disk"("type");
