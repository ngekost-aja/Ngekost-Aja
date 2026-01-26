/**
 * Authentication-related TypeScript types
 * Aligned with backend API responses
 */

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
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  userId: number;
  name: string;
  email: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
}

export interface RegisterResponse {
  message: string;
  userId: number;
}

export interface VerifyTokenRequest {
  token: string;
}

export interface VerifyTokenResponse {
  valid: boolean;
  decoded?: DecodedToken;
  message?: string;
}

export interface RefreshTokenRequest {
  token: string;
}

export interface RefreshTokenResponse {
  token: string;
}

export type UserRole = 'admin' | 'owner' | 'manager' | 'user';
