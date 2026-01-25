import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { IdentityService } from './identity.service';
import type {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from './identity.dto';

@Route('users')
@Tags('Users')
export class UserController extends Controller {
  private identityService: IdentityService;

  constructor() {
    super();
    this.identityService = new IdentityService();
  }

  /**
   * Get all users
   */
  @Get('/')
  @SuccessResponse('200', 'OK')
  public async getUsers(): Promise<UserResponse[]> {
    return await this.identityService.getUsers();
  }

  /**
   * Get user by ID
   */
  @Get('{id}')
  @SuccessResponse('200', 'OK')
  @Response('404', 'Not Found')
  public async getUserById(@Path() id: number): Promise<UserResponse> {
    try {
      return await this.identityService.getUserById(id);
    } catch (error: any) {
      this.setStatus(404);
      throw new Error(error.message || 'User not found');
    }
  }

  /**
   * Create a new user
   */
  @Post('/')
  @SuccessResponse('201', 'Created')
  @Response('400', 'Bad Request')
  public async createUser(
    @Body() body: CreateUserRequest,
  ): Promise<UserResponse> {
    try {
      const result = await this.identityService.createUser(body);
      this.setStatus(201);
      return result;
    } catch (error: any) {
      this.setStatus(400);
      throw new Error(error.message || 'Failed to create user');
    }
  }

  /**
   * Update user
   */
  @Put('{id}')
  @SuccessResponse('200', 'Updated')
  @Response('404', 'Not Found')
  @Response('400', 'Bad Request')
  public async updateUser(
    @Path() id: number,
    @Body() body: UpdateUserRequest,
  ): Promise<UserResponse> {
    try {
      return await this.identityService.updateUser(id, body);
    } catch (error: any) {
      if (error.message === 'User not found') {
        this.setStatus(404);
      } else {
        this.setStatus(400);
      }
      throw error;
    }
  }

  /**
   * Delete user
   */
  @Delete('{id}')
  @SuccessResponse('200', 'Deleted')
  @Response('404', 'Not Found')
  public async deleteUser(@Path() id: number): Promise<{ success: boolean }> {
    try {
      await this.identityService.deleteUser(id);
      return { success: true };
    } catch (error: any) {
      this.setStatus(404);
      throw new Error(error.message || 'User not found');
    }
  }
}
