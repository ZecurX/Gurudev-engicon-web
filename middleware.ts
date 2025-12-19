import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const adminCookie = req.cookies.get('admin-auth')?.value;
  const secret = process.env.ADMIN_SECRET;

  // If already authenticated, keep login page inaccessible
  if (pathname.startsWith('/admin/login')) {
    if (adminCookie && secret && adminCookie === secret) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    return NextResponse.next();
  }

  if (!adminCookie || !secret || adminCookie !== secret) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
