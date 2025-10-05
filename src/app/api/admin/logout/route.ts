import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { clearAdminSessionCookie } from '@/lib/auth';

export async function POST() {
  const cookie = clearAdminSessionCookie();
  const cookieStore = await cookies();

  cookieStore.set(cookie.name, cookie.value, cookie.options);

  return NextResponse.json({ success: true });
}
