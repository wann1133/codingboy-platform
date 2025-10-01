import { NextRequest, NextResponse } from 'next/server';

import { adminSessionConfig, verifyAdminSessionToken } from '@/lib/auth';

const ADMIN_BASE_PATH = '/admin';
const ADMIN_LOGIN_PATH = '/admin/login';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(adminSessionConfig.cookieName)?.value;
  const isAuthenticated = token ? Boolean(await verifyAdminSessionToken(token)) : false;

  if (pathname.startsWith(ADMIN_BASE_PATH)) {
    if (pathname.startsWith(ADMIN_LOGIN_PATH)) {
      if (isAuthenticated) {
        const url = request.nextUrl.clone();
        url.pathname = ADMIN_BASE_PATH;
        url.search = '';
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    }

    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = ADMIN_LOGIN_PATH;
      url.search = '';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (pathname.startsWith('/api/admin')) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
