import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing dashboard route
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('token')?.value;

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Token exists, allow access
    // Note: Token verification happens on the client-side in the dashboard page
    return NextResponse.next();
  }

  // For login page, allow access (don't redirect even if token exists)
  // This prevents redirect loops and allows re-login
  if (pathname === '/login') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
