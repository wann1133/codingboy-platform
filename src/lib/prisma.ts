import path from 'node:path';
import { existsSync } from 'node:fs';
import { config as loadEnv } from 'dotenv';
import { PrismaClient } from '@prisma/client';

const PLACEHOLDER_FRAGMENT = 'username:password';

function hydrateEnvFromFiles() {
  const root = process.cwd();
  const envFiles = ['.env.local', '.env'];

  for (const file of envFiles) {
    const filePath = path.join(root, file);
    if (existsSync(filePath)) {
      loadEnv({ path: filePath, override: true });
    }
  }
}

function ensureDatabaseEnv() {
  const isPlaceholder = (value?: string | null) =>
    !value || value.includes(PLACEHOLDER_FRAGMENT);

  if (isPlaceholder(process.env.DATABASE_URL)) {
    hydrateEnvFromFiles();
  }

  if (isPlaceholder(process.env.DATABASE_URL)) {
    throw new Error(
      'DATABASE_URL is not configured. Update .env/.env.local with a valid connection string.'
    );
  }

  if (isPlaceholder(process.env.DIRECT_DATABASE_URL)) {
    process.env.DIRECT_DATABASE_URL = process.env.DATABASE_URL!;
  }
}

ensureDatabaseEnv();

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
