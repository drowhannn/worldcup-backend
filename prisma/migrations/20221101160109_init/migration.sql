/*
  Warnings:

  - The `favoriteTeam` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Team" AS ENUM ('Argentina', 'Brazil', 'England', 'France', 'Spain', 'Belgium', 'Portugal', 'Germany', 'Netherlands', 'Uruguay', 'Croatia', 'Denmark', 'Mexico', 'USA', 'Senegal', 'Wales', 'Poland', 'Australia', 'Japan', 'Morocco', 'Switzerland', 'Ghana', 'South_Korea', 'Cameroon', 'Serbia', 'Canada', 'Costa_Rica', 'Tunisia', 'Saudi_Arabia', 'Iran', 'Ecuador', 'Qatar');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "favoriteTeam",
ADD COLUMN     "favoriteTeam" "Team";

-- DropEnum
DROP TYPE "FavoriteTeam";
