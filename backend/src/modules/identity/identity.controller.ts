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
	TsoaResponse,
	Res,
} from "tsoa";
import { IdentityService } from "./identity.service";
import type {
	RegisterRequest,
	RegisterResponse,
	LoginRequest,
	LoginResponse,
	VerifyTokenRequest,
	VerifyTokenResponse,
	RefreshTokenRequest,
	RefreshTokenResponse,
	CreateUserRequest,
	UpdateUserRequest,
	UserResponse,
} from "./identity.dto";

@Route("auth")
@Tags("Authentication")
export class AuthController extends Controller {
	private identityService: IdentityService;

	constructor() {
		super();
		this.identityService = new IdentityService();
	}

	/**
	 * Register a new user account
	 */
	@Post("register")
	@SuccessResponse("201", "User registered successfully")
	@Response("400", "Bad Request")
	public async register(
		@Body() body: RegisterRequest
	): Promise<RegisterResponse> {
		try {
			const result = await this.identityService.register(body);
			this.setStatus(201);
			return result;
		} catch (error: any) {
			this.setStatus(400);
			return { message: error.message || "Registration failed" };
		}
	}

	/**
	 * Login user and get JWT token
	 */
	@Post("login")
	@SuccessResponse("200", "Login successful")
	@Response("401", "Invalid credentials")
	public async login(
		@Body() body: LoginRequest,
		@Res() unauthorizedResponse: TsoaResponse<401, { message: string }>
	): Promise<LoginResponse> {
		try {
			const result = await this.identityService.login(body);
			return result;
		} catch (error: any) {
			return unauthorizedResponse(401, {
				message: error.message || "Invalid credentials",
			});
		}
	}

	/**
	 * Verify an existing JWT token
	 */
	@Post("verify")
	@SuccessResponse("200", "Token verified")
	public async verifyToken(
		@Body() body: VerifyTokenRequest
	): Promise<VerifyTokenResponse> {
		return await this.identityService.verifyToken(body.token);
	}

	/**
	 * Refresh a JWT token
	 */
	@Post("refresh")
	@SuccessResponse("200", "Token refreshed")
	@Response("401", "Invalid token")
	public async refreshToken(
		@Body() body: RefreshTokenRequest
	): Promise<RefreshTokenResponse> {
		try {
			const token = await this.identityService.refreshToken(body.token);
			return { token };
		} catch (error: any) {
			this.setStatus(401);
			throw new Error(error.message || "Invalid token");
		}
	}
}

@Route("users")
@Tags("Users")
export class UserController extends Controller {
	private identityService: IdentityService;

	constructor() {
		super();
		this.identityService = new IdentityService();
	}

	/**
	 * Get all users
	 */
	@Get("/")
	@SuccessResponse("200", "OK")
	public async getUsers(): Promise<UserResponse[]> {
		return await this.identityService.getUsers();
	}

	/**
	 * Get user by ID
	 */
	@Get("{id}")
	@SuccessResponse("200", "OK")
	@Response("404", "Not Found")
	public async getUserById(@Path() id: number): Promise<UserResponse> {
		try {
			return await this.identityService.getUserById(id);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "User not found");
		}
	}

	/**
	 * Create a new user
	 */
	@Post("/")
	@SuccessResponse("201", "Created")
	@Response("400", "Bad Request")
	public async createUser(
		@Body() body: CreateUserRequest
	): Promise<UserResponse> {
		try {
			const result = await this.identityService.createUser(body);
			this.setStatus(201);
			return result;
		} catch (error: any) {
			this.setStatus(400);
			throw new Error(error.message || "Failed to create user");
		}
	}

	/**
	 * Update user
	 */
	@Put("{id}")
	@SuccessResponse("200", "Updated")
	@Response("404", "Not Found")
	@Response("400", "Bad Request")
	public async updateUser(
		@Path() id: number,
		@Body() body: UpdateUserRequest
	): Promise<UserResponse> {
		try {
			return await this.identityService.updateUser(id, body);
		} catch (error: any) {
			if (error.message === "User not found") {
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
	@Delete("{id}")
	@SuccessResponse("200", "Deleted")
	@Response("404", "Not Found")
	public async deleteUser(@Path() id: number): Promise<{ success: boolean }> {
		try {
			await this.identityService.deleteUser(id);
			return { success: true };
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "User not found");
		}
	}
}
