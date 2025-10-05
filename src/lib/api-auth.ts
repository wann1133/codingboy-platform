import { cookies } from 'next/headers';

import { adminSessionConfig, verifyAdminSessionToken } from '@/lib/auth';

export class UnauthenticatedError extends Error {
  constructor(message = 'UNAUTHENTICATED') {
    super(message);
    this.name = 'UnauthenticatedError';
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminSessionConfig.cookieName)?.value;

  if (!token) {
    return null;
  }

  return verifyAdminSessionToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new UnauthenticatedError();
  }

  return session;
}
