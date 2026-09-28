-- CreateTable
CREATE TABLE "LandingBlock" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "LandingBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LandingBlock_projectId_idx" ON "LandingBlock"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingBlock_projectId_position_key" ON "LandingBlock"("projectId", "position");

-- AddForeignKey
ALTER TABLE "LandingBlock" ADD CONSTRAINT "LandingBlock_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
