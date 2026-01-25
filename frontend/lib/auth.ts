/**
 * Authentication utility functions for managing JWT tokens and user sessions
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface DecodedToken {
  userId: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface UserInfo {
  userId: number;
  email: string;
  role: string;
  name?: string;
}

/**
 * Get JWT token from localStorage
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

/**
 * Store JWT token in localStorage
 */
export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
}

/**
 * Store user info in localStorage
 */
export function setUserInfo(userInfo: UserInfo): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

/**
 * Get user info from localStorage
 */
export function getUserInfo(): UserInfo | null {
  if (typeof window === 'undefined') return null;
  const userInfoStr = localStorage.getItem('userInfo');
  if (!userInfoStr) return null;

  try {
    return JSON.parse(userInfoStr);
  } catch {
    return null;
  }
}

/**
 * Decode JWT token (client-side only, for reading payload)
 * Note: This does NOT verify the token signature
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Get user role from token
 */
export function getUserRole(): string | null {
  const token = getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.role || null;
}

/**
 * Verify token with backend API
 */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;

  // Check if token is expired (client-side check)
  const decoded = decodeToken(token);
  if (!decoded) return false;

  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp < now) {
    // Token expired, clear it but don't redirect here
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    }
    return false;
  }

  // Token is valid on client-side
  // Optional: Verify with backend (skip if backend is not available)
  try {
    const isValid = await verifyToken(token);
    if (!isValid) {
      // Token invalid on server, clear it
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
      }
      return false;
    }
    return true;
  } catch (error) {
    // If backend verification fails, trust client-side validation
    // This allows the app to work even if backend is temporarily down
    console.warn(
      'Backend token verification failed, using client-side validation',
    );
    return true;
  }
}

/**
 * Logout user by clearing token and redirecting to login
 */
export function logout(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  window.location.href = '/login';
}

/**
 * Check if user has required role
 */
export function hasRole(requiredRole: string | string[]): boolean {
  const role = getUserRole();
  if (!role) return false;

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(role);
  }

  return role === requiredRole;
}
