import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const prisma = new PrismaClient();

const SESSION_COOKIE = 'admin_session';
const TOKEN_EXPIRATION = '7d';
const DEV_FALLBACK_SECRET = 'dev-secret-key-change-me';
const DEFAULT_ADMIN_EMAIL =  
  process.env.NODE_ENV === 'production' ? '' : 'admin@codingboy.dev';
const DEFAULT_ADMIN_PASSWORD_HASH =   
  process.env.NODE_ENV === 'production'
    ? ''
    : '$2b$12$UFYEOyZd8/A3.taX5FBXEOTBT6zUzJu0DrrFECU7s9SKNWsFCpmYe';
const resolveTokenSecret = () => {
  if (process.env.ADMIN_TOKEN_SECRET) {
    return process.env.ADMIN_TOKEN_SECRET;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'ADMIN_TOKEN_SECRET is not configured. Falling back to a dev secret. Set ADMIN_TOKEN_SECRET for production.',
    );
    return DEV_FALLBACK_SECRET;
  }

  throw new Error('ADMIN_TOKEN_SECRET is not configured');
};

const secretKey = () => new TextEncoder().encode(resolveTokenSecret());
const resolveAdminEmail = () => process.env.ADMIN_EMAIL ?? DEFAULT_ADMIN_EMAIL;
const resolveAdminPasswordHash = () => process.env.ADMIN_PASSWORD_HASH ?? DEFAULT_ADMIN_PASSWORD_HASH;

export const adminSessionConfig = {
  cookieName: SESSION_COOKIE,
  maxAge: 60 * 60 * 24 * 7, // 7 days
} as const;

export type AdminSessionPayload = {
  email: string;
};

// 🧩 Verify Credentials (from .env or DB)
export async function verifyAdminCredentials(email: string, password: string) {
  const adminEmail = resolveAdminEmail();
  const adminPasswordHash = resolveAdminPasswordHash();

  // 1️⃣ Fallback admin via .env
  if (email.toLowerCase() === adminEmail.toLowerCase()) {
    return bcrypt.compare(password, adminPasswordHash);
  }

  // 2️⃣ Check admin in DB
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, password: true },
  });

  if (!user?.password) return false;
  return bcrypt.compare(password, user.password);
}

export async function createAdminSessionToken(payload: AdminSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(secretKey());
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload as AdminSessionPayload;
  } catch {
    return null;
  }
}

export function clearAdminSessionCookie() {
  return {
    name: SESSION_COOKIE,
    value: '',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 0,
    },
  };
}

export function createAdminSessionCookie(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: adminSessionConfig.maxAge,
    },
  };
}
