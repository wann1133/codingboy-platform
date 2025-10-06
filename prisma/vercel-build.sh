#!/bin/bash

# ======================================
# Prisma + Next.js Production Build Helper for Vercel
# ======================================

echo "🔄 Running Prisma generate..."
npx prisma generate

echo "🧱 Building Next.js..."
npm run build

echo "✅ Build completed successfully."
