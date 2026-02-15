export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  role?: 'owner' | 'manager' | 'user';
}

export interface RegisterResponse {
  message: string;
  userId?: number;
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

export interface VerifyTokenRequest {
  token: string;
}

export interface VerifyTokenResponse {
  valid: boolean;
  decoded?: any;
  message?: string;
}

export interface RefreshTokenRequest {
  token: string;
}

export interface RefreshTokenResponse {
  token: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  role: 'owner' | 'manager' | 'user';
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  role?: 'owner' | 'manager' | 'user';
  password?: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
