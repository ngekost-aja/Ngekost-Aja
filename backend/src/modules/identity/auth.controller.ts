import {
  Body,
  Controller,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
  TsoaResponse,
  Res,
} from 'tsoa';
import { IdentityService } from './identity.service';
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  VerifyTokenRequest,
  VerifyTokenResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './identity.dto';

@Route('auth')
@Tags('Authentication')
export class AuthController extends Controller {
  private identityService: IdentityService;

  constructor() {
    super();
    this.identityService = new IdentityService();
  }

  /**
   * Register a new user account
   */
  @Post('register')
  @SuccessResponse('201', 'User registered successfully')
  @Response('400', 'Bad Request')
  public async register(
    @Body() body: RegisterRequest,
  ): Promise<RegisterResponse> {
    try {
      const result = await this.identityService.register(body);
      this.setStatus(201);
      return result;
    } catch (error: any) {
      this.setStatus(400);
      return { message: error.message || 'Registration failed' };
    }
  }

  /**
   * Login user and get JWT token
   */
  @Post('login')
  @SuccessResponse('200', 'Login successful')
  @Response('401', 'Invalid credentials')
  public async login(
    @Body() body: LoginRequest,
    @Res() unauthorizedResponse: TsoaResponse<401, { message: string }>,
  ): Promise<LoginResponse> {
    try {
      const result = await this.identityService.login(body);
      return result;
    } catch (error: any) {
      return unauthorizedResponse(401, {
        message: error.message || 'Invalid credentials',
      });
    }
  }

  /**
   * Verify an existing JWT token
   */
  @Post('verify')
  @SuccessResponse('200', 'Token verified')
  public async verifyToken(
    @Body() body: VerifyTokenRequest,
  ): Promise<VerifyTokenResponse> {
    return await this.identityService.verifyToken(body.token);
  }

  /**
   * Refresh a JWT token
   */
  @Post('refresh')
  @SuccessResponse('200', 'Token refreshed')
  @Response('401', 'Invalid token')
  public async refreshToken(
    @Body() body: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    try {
      const token = await this.identityService.refreshToken(body.token);
      return { token };
    } catch (error: any) {
      this.setStatus(401);
      throw new Error(error.message || 'Invalid token');
    }
  }
}
