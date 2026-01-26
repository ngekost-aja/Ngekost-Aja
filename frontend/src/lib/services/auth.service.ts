/**
 * Authentication Service
 * Handles all authentication-related operations including login, register,
 * token management, and API communication with Express.js backend
 */

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyTokenResponse,
  RefreshTokenResponse,
  DecodedToken,
  UserInfo,
  UserRole,
} from '@/lib/types';

// ============================================================================
// Constants
// ============================================================================

const TOKEN_KEY = 'token';
const USER_INFO_KEY = 'userInfo';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ============================================================================
// Storage Utilities
// ============================================================================

/**
 * Get JWT token from localStorage
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error reading token from localStorage:', error);
    return null;
  }
}

/**
 * Store JWT token in localStorage
 */
export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing token in localStorage:', error);
  }
}

/**
 * Remove JWT token from localStorage
 */
export function removeToken(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token from localStorage:', error);
  }
}

/**
 * Store user info in localStorage
 */
export function setUserInfo(userInfo: UserInfo): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  } catch (error) {
    console.error('Error storing user info in localStorage:', error);
  }
}

/**
 * Get user info from localStorage
 */
export function getUserInfo(): UserInfo | null {
  if (typeof window === 'undefined') return null;
  try {
    const userInfoStr = localStorage.getItem(USER_INFO_KEY);
    if (!userInfoStr) return null;
    return JSON.parse(userInfoStr) as UserInfo;
  } catch (error) {
    console.error('Error reading user info from localStorage:', error);
    return null;
  }
}

/**
 * Remove user info from localStorage
 */
export function removeUserInfo(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(USER_INFO_KEY);
  } catch (error) {
    console.error('Error removing user info from localStorage:', error);
  }
}

/**
 * Clear all auth data from localStorage
 */
export function clearAuthData(): void {
  removeToken();
  removeUserInfo();
}

// ============================================================================
// Token Utilities
// ============================================================================

/**
 * Decode JWT token (client-side only, for reading payload)
 * Note: This does NOT verify the token signature
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload) as DecodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

/**
 * Check if token is expired (client-side check only)
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
}

/**
 * Get user role from stored token
 */
export function getUserRole(): UserRole | null {
  const token = getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return (decoded?.role as UserRole) || null;
}

/**
 * Get user ID from stored token
 */
export function getUserId(): number | null {
  const token = getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.userId || null;
}

// ============================================================================
// API Communication
// ============================================================================

/**
 * Make authenticated API request
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error('API_URL is not configured');
  }

  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'An error occurred',
    }));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Login user with email and password
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  // Store token and user info
  setToken(response.token);
  setUserInfo({
    userId: response.userId,
    email: response.email,
    role: response.role,
    name: response.name,
  });

  return response;
}

/**
 * Register new user
 */
export async function register(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await apiRequest<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return response;
}

/**
 * Verify token with backend API
 */
export async function verifyToken(token: string): Promise<VerifyTokenResponse> {
  try {
    const response = await apiRequest<VerifyTokenResponse>('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
    return response;
  } catch (error) {
    return {
      valid: false,
      message: error instanceof Error ? error.message : 'Verification failed',
    };
  }
}

/**
 * Refresh JWT token
 */
export async function refreshToken(): Promise<string> {
  const currentToken = getToken();
  if (!currentToken) {
    throw new Error('No token to refresh');
  }

  const response = await apiRequest<RefreshTokenResponse>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ token: currentToken }),
  });

  setToken(response.token);
  return response.token;
}

// ============================================================================
// Authentication State
// ============================================================================

/**
 * Check if user is authenticated
 * Performs both client-side and server-side validation
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;

  // Client-side expiration check
  if (isTokenExpired(token)) {
    clearAuthData();
    return false;
  }

  // Server-side validation
  try {
    const result = await verifyToken(token);
    if (!result.valid) {
      clearAuthData();
      return false;
    }
    return true;
  } catch (error) {
    // If backend is unavailable, trust client-side validation
    console.warn('Backend verification failed, using client-side validation');
    return true;
  }
}

/**
 * Check if user is authenticated (synchronous, client-side only)
 * Use this for quick checks, but prefer isAuthenticated() for accuracy
 */
export function isAuthenticatedSync(): boolean {
  const token = getToken();
  if (!token) return false;
  return !isTokenExpired(token);
}

/**
 * Logout user and clear all auth data
 */
export function logout(redirectTo: string = '/login'): void {
  if (typeof window === 'undefined') return;

  clearAuthData();
  window.location.href = redirectTo;
}

// ============================================================================
// Authorization
// ============================================================================

/**
 * Check if user has required role(s)
 */
export function hasRole(requiredRole: UserRole | UserRole[]): boolean {
  const role = getUserRole();
  if (!role) return false;

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(role);
  }

  return role === requiredRole;
}

/**
 * Check if user is admin
 */
export function isAdmin(): boolean {
  return hasRole('admin');
}

/**
 * Check if user is owner
 */
export function isOwner(): boolean {
  return hasRole('owner');
}

/**
 * Check if user is manager
 */
export function isManager(): boolean {
  return hasRole('manager');
}

// ============================================================================
// Export default service object (optional, for cleaner imports)
// ============================================================================

const AuthService = {
  // Storage
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
  clearAuthData,

  // Token utilities
  decodeToken,
  isTokenExpired,
  getUserRole,
  getUserId,

  // API methods
  login,
  register,
  verifyToken,
  refreshToken,

  // Authentication
  isAuthenticated,
  isAuthenticatedSync,
  logout,

  // Authorization
  hasRole,
  isAdmin,
  isOwner,
  isManager,
};

export default AuthService;
