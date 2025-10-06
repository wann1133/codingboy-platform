#!/usr/bin/env bash
set -e

echo "====================================="
echo "🚀 Prisma + Next.js Production Build"
echo "====================================="

# Generate Prisma Client
echo "🔄 Running Prisma generate..."
npx prisma generate || { echo "❌ Prisma generate failed"; exit 1; }

# Disable Turbopack (karena menyebabkan error @react-email/render)
export NEXT_DISABLE_TURBOPACK=1

# Build Next.js project
echo "🧱 Building Next.js with Webpack..."
npm run build || { echo "❌ Build failed"; exit 1; }

echo "✅ Build completed successfully."
