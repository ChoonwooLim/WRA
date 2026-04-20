-- AlterTable
ALTER TABLE "Post" ADD COLUMN "answerContent" TEXT,
                   ADD COLUMN "answererId" TEXT,
                   ADD COLUMN "answeredAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Post_answererId_idx" ON "Post"("answererId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_answererId_fkey" FOREIGN KEY ("answererId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
