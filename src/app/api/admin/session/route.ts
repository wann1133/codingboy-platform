import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { adminSessionConfig, verifyAdminSessionToken } from '@/lib/auth';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(adminSessionConfig.cookieName)?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const payload = await verifyAdminSessionToken(token);

  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, email: payload.email });
}
