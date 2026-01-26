import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  decodeTokenServer,
  isDecodedTokenExpired,
} from '@/lib/services/auth.service';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get('token')?.value;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Decode token to get user role
  const decoded = decodeTokenServer(token);

  // If token is invalid or expired, redirect to login
  if (!decoded || isDecodedTokenExpired(decoded)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    // Clear invalid token
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set('token', '', { expires: new Date(0) });
    return response;
  }

  const userRole = decoded.role;

  // Handle owner role
  if (userRole === 'owner') {
    // Block manager-only routes
    if (
      pathname.startsWith('/booking') ||
      pathname.startsWith('/chat') ||
      pathname.startsWith('/property')
    ) {
      console.log('[PROXY] Owner blocked from manager route, redirecting');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Rewrite owner routes to /owner/* paths
    if (
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/finance-report') ||
      pathname.startsWith('/properties') ||
      pathname.startsWith('/manager') ||
      pathname.startsWith('/profile')
    ) {
      const newPath = `/owner${pathname}`;
      console.log('[PROXY] Rewriting owner route:', pathname, '→', newPath);
      const url = request.nextUrl.clone();
      url.pathname = newPath;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

  // Handle manager role
  if (userRole === 'manager') {
    // Block owner-only routes
    if (pathname.startsWith('/manager') || pathname.startsWith('/properties')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Rewrite manager routes to /manager/* paths
    if (
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/finance-report') ||
      pathname.startsWith('/property') ||
      pathname.startsWith('/booking') ||
      pathname.startsWith('/chat') ||
      pathname.startsWith('/profile')
    ) {
      const newPath = `/manager${pathname}`;
      const url = request.nextUrl.clone();
      url.pathname = newPath;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

  // If role is not owner or manager, redirect to login
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('error', 'unauthorized');
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    // Protected routes (clean URLs)
    '/dashboard/:path*',
    '/finance-report/:path*',
    '/properties/:path*',
    '/property/:path*',
    '/booking/:path*',
    '/chat/:path*',
    '/manager/:path*',
    '/profile/:path*',
    // Auth routes
    '/login',
    '/register',
  ],
};
