export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
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

