/*
  Warnings:

  - You are about to drop the `postsTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "postsTags" DROP CONSTRAINT "postsTags_postId_fkey";

-- DropForeignKey
ALTER TABLE "postsTags" DROP CONSTRAINT "postsTags_tagId_fkey";

-- DropTable
DROP TABLE "postsTags";

-- DropTable
DROP TABLE "tags";

-- CreateIndex
CREATE UNIQUE INDEX "posts_title_key" ON "posts"("title");
