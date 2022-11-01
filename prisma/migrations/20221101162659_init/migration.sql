/*
  Warnings:

  - Changed the type of `teamA` on the `Fixture` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `teamB` on the `Fixture` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Fixture" DROP COLUMN "teamA",
ADD COLUMN     "teamA" "Team" NOT NULL,
DROP COLUMN "teamB",
ADD COLUMN     "teamB" "Team" NOT NULL;
