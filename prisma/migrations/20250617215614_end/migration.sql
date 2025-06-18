-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('Success', 'Pending', 'Canceled');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "StatusOrder" NOT NULL DEFAULT 'Pending';
