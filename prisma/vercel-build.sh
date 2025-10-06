#!/usr/bin/env bash
set -e  # Stop build jika ada error di mana pun

echo "====================================="
echo "🚀 Prisma + Next.js Production Build (Vercel)"
echo "====================================="

# 1️⃣ Generate Prisma Client
echo "🔄 Running Prisma generate..."
npx prisma generate || { echo "❌ Prisma generate failed"; exit 1; }

# 2️⃣ Disable Turbopack (karena masih bug di Next 15.x)
export NEXT_DISABLE_TURBOPACK=1

# 3️⃣ Pastikan NODE_ENV=production
export NODE_ENV=production

# 4️⃣ Build Next.js pakai Webpack
echo "🧱 Building Next.js with Webpack..."
next build || { echo "❌ Build failed"; exit 1; }

echo "✅ Build completed successfully!"
