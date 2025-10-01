import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { clearAdminSessionCookie } from '@/lib/auth';

export async function POST() {
  const cookie = clearAdminSessionCookie();
  cookies().set(cookie.name, cookie.value, cookie.options);

  return NextResponse.json({ success: true });
}
