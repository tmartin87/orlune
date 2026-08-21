/*
  Warnings:

  - A unique constraint covering the columns `[projectId,name]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Section_projectId_name_key" ON "Section"("projectId", "name");
