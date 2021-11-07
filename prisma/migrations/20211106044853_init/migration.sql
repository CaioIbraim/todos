-- CreateTable
CREATE TABLE "todos" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
