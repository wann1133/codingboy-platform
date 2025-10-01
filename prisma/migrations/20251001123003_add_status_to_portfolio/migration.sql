-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_portfolios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT,
    "url" TEXT,
    "features" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "client" TEXT,
    "testimonial" TEXT,
    "rating" INTEGER DEFAULT 5,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'ongoing',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_portfolios" ("active", "category", "client", "createdAt", "description", "duration", "featured", "features", "id", "image", "rating", "slug", "testimonial", "title", "updatedAt", "url") SELECT "active", "category", "client", "createdAt", "description", "duration", "featured", "features", "id", "image", "rating", "slug", "testimonial", "title", "updatedAt", "url" FROM "portfolios";
DROP TABLE "portfolios";
ALTER TABLE "new_portfolios" RENAME TO "portfolios";
CREATE UNIQUE INDEX "portfolios_slug_key" ON "portfolios"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
