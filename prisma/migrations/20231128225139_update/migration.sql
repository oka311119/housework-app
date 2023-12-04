/*
  Warnings:

  - You are about to drop the column `nextDate` on the `HouseWork` table. All the data in the column will be lost.
  - You are about to drop the `HouseWorkFeed` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isActive` to the `HouseWork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `span` to the `HouseWork` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HouseWorkFeed" DROP CONSTRAINT "HouseWorkFeed_houseWorkId_fkey";

-- AlterTable
ALTER TABLE "HouseWork" DROP COLUMN "nextDate",
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "span" INTEGER NOT NULL;

-- DropTable
DROP TABLE "HouseWorkFeed";

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "houseWorkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_houseWorkId_fkey" FOREIGN KEY ("houseWorkId") REFERENCES "HouseWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
