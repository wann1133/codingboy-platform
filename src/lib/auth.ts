import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const SESSION_COOKIE = 'admin_session';
const TOKEN_EXPIRATION = '7d';
const DEV_FALLBACK_SECRET = 'dev-secret-key-change-me';
const DEFAULT_ADMIN_EMAIL = 'admin@codingboy.dev';
const DEFAULT_ADMIN_PASSWORD_HASH = '$2b$12$UFYEOyZd8/A3.taX5FBXEOTBT6zUzJu0DrrFECU7s9SKNWsFCpmYe';

const resolveTokenSecret = () => {
  if (process.env.ADMIN_TOKEN_SECRET) {
    return process.env.ADMIN_TOKEN_SECRET;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'ADMIN_TOKEN_SECRET is not configured. Falling back to a development-only secret. Set ADMIN_TOKEN_SECRET for production environments.',
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

export const DEFAULT_ADMIN_CREDENTIALS = {
  email: DEFAULT_ADMIN_EMAIL,
  password: 'admin123',
} as const;

export async function verifyAdminCredentials(email: string, password: string) {
  const adminEmail = resolveAdminEmail();
  const adminPasswordHash = resolveAdminPasswordHash();

  if (email.toLowerCase() !== adminEmail.toLowerCase()) {
    return false;
  }

  return bcrypt.compare(password, adminPasswordHash);
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

export function readTokenFromCookie(rawCookie: string | undefined) {
  if (!rawCookie) {
    return null;
  }

  return rawCookie;
}
