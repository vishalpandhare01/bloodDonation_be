-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "blood_type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "profile_pic" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT false,
    "donations" JSONB[],
    "donated" JSONB[],
    "request_sent" JSONB[],
    "request_get" JSONB[]
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
