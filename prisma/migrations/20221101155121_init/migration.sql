/*
  Warnings:

  - The values [KNOCKOUT] on the enum `FixtureCategory` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FixtureCategory_new" AS ENUM ('GROUP_STAGE', 'ROUND_OF_16', 'QUARTER_FINAL', 'SEMI_FINAL', 'THIRD_PLACE_PLAYOFF', 'FINAL');
ALTER TABLE "Fixture" ALTER COLUMN "category" TYPE "FixtureCategory_new" USING ("category"::text::"FixtureCategory_new");
ALTER TYPE "FixtureCategory" RENAME TO "FixtureCategory_old";
ALTER TYPE "FixtureCategory_new" RENAME TO "FixtureCategory";
DROP TYPE "FixtureCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "username" SET NOT NULL;
