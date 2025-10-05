import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  createAdminSessionCookie,
  createAdminSessionToken,
  verifyAdminCredentials,
} from '@/lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json().catch(() => ({}));

  if (!email || !password) {
    return NextResponse.json({ error: 'Email dan password wajib diisi.' }, { status: 400 });
  }

  const isValid = await verifyAdminCredentials(email, password);

  if (!isValid) {
    return NextResponse.json({ error: 'Kredensial tidak valid.' }, { status: 401 });
  }

  const token = await createAdminSessionToken({ email });
  const cookie = createAdminSessionCookie(token);
  const cookieStore = await cookies();

  cookieStore.set(cookie.name, cookie.value, cookie.options);

  return NextResponse.json({ success: true });
}
