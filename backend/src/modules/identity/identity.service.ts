import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IdentityRepository } from './identity.repository';
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  VerifyTokenResponse,
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from './identity.dto';

export class IdentityService {
  private readonly JWT_SECRET: string;
  private repository: IdentityRepository;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || '';
    if (!this.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
    this.repository = new IdentityRepository();
  }

  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    // Check if user already exists
    const existingUser = await this.repository.findByEmailOrPhone(
      data.email,
      data.phone,
    );

    if (existingUser) {
      throw new Error('Email or phone already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await this.repository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role || 'user',
      passwordHash,
    });

    return {
      message: 'User registered successfully',
      userId: user.id,
    };
  }

  /**
   * Login user and generate JWT token
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    // Find user by email
    const user = await this.repository.findByEmail(data.email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const validPassword = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      this.JWT_SECRET,
      { expiresIn: '1d' },
    );

    return {
      token,
      role: user.role,
      userId: user.id,
      name: user.name,
      email: user.email,
    };
  }

  /**
   * Verify JWT token
   */
  async verifyToken(token: string): Promise<VerifyTokenResponse> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, message: 'Invalid or expired token' };
    }
  }

  /**
   * Refresh JWT token
   */
  async refreshToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET, {
        ignoreExpiration: true,
      }) as { userId: number; email: string; role: string };

      // Generate new token
      const newToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email, role: decoded.role },
        this.JWT_SECRET,
        { expiresIn: '1d' },
      );

      return newToken;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Get all users
   */
  async getUsers(): Promise<UserResponse[]> {
    const users = await this.repository.findAll();
    return users as UserResponse[];
  }

  /**
   * Get user by ID
   */
  async getUserById(id: number): Promise<UserResponse> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const { passwordHash, ...userResponse } = user;
    return userResponse as UserResponse;
  }

  /**
   * Create a new user (admin function)
   */
  async createUser(data: CreateUserRequest): Promise<UserResponse> {
    // Check if user already exists
    const existingUser = await this.repository.findByEmailOrPhone(
      data.email,
      data.phone,
    );

    if (existingUser) {
      throw new Error('Email or phone already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await this.repository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      passwordHash,
    });

    const { passwordHash: _, ...userResponse } = user;
    return userResponse as UserResponse;
  }

  /**
   * Update user
   */
  async updateUser(id: number, data: UpdateUserRequest): Promise<UserResponse> {
    // Check if user exists
    const existingUser = await this.repository.findById(id);

    if (!existingUser) {
      throw new Error('User not found');
    }

    // If updating email or phone, check for duplicates
    if (data.email || data.phone) {
      const duplicate = await this.repository.findByEmailOrPhoneExcludingId(
        data.email,
        data.phone,
        id,
      );

      if (duplicate) {
        throw new Error('Email or phone already in use');
      }
    }

    // Prepare update data
    const updateData: any = {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.phone && { phone: data.phone }),
      ...(data.role && { role: data.role }),
    };

    // Hash password if provided
    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    // Update user
    const user = await this.repository.update(id, updateData);

    const { passwordHash, ...userResponse } = user;
    return userResponse as UserResponse;
  }

  /**
   * Delete user
   */
  async deleteUser(id: number): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    await this.repository.delete(id);
  }
}
