-- CreateEnum
CREATE TYPE "FavoriteTeam" AS ENUM ('Netherlands', 'England', 'Wales', 'Argentina', 'France', 'Denmark', 'Spain', 'Germany', 'Belgium', 'Croatia', 'Brazil', 'Portugal', 'Uruguay', 'Other');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoriteTeam" "FavoriteTeam";
