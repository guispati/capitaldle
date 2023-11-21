-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "capital" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_key" ON "Country"("id");
