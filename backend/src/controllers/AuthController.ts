import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import users from "@/repositories/users";
import User from "@/models/User";
import {
	Body,
	Controller,
	Post,
	Route,
	Tags,
	Response,
	SuccessResponse,
	Res,
	TsoaResponse,
} from "tsoa";
import {
	RegisterRequest,
	RegisterResponse,
	LoginRequest,
	LoginResponse,
	VerifyTokenRequest,
	VerifyTokenResponse,
	RefreshTokenRequest,
	RefreshTokenResponse,
} from "@/dto/auth.dto";

@Route("auth")
@Tags("Authentication")
export class AuthController extends Controller {
	/**
	 * Register a new user account
	 */
	@Post("register")
	@SuccessResponse("201", "User registered successfully")
	@Response("400", "Bad Request")
	public async register(
		@Body() body: RegisterRequest
	): Promise<RegisterResponse> {
		const { email, password } = body;

		if (!email || !password) {
			this.setStatus(400);
			return { message: "Email and password are required" };
		}

		const existingUser = users.find((u) => u.email === email);
		if (existingUser) {
			this.setStatus(400);
			return { message: "Email already registered" };
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const newUser: User = { email, passwordHash, role: "user" };
		users.push(newUser);

		this.setStatus(201);
		return { message: "User registered successfully" };
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
		const { email, password } = body;
		const user = users.find((u) => u.email === email);

		if (!user) {
			return unauthorizedResponse(401, { message: "Invalid credentials" });
		}

		const validPassword = await bcrypt.compare(password, user.passwordHash);
		if (!validPassword) {
			return unauthorizedResponse(401, { message: "Invalid credentials" });
		}

		const SECRET_KEY = process.env.JWT_SECRET;
		if (!SECRET_KEY) throw new Error("JWT_SECRET not set");

		const token = jwt.sign(
			{ email: user.email, role: user.role },
			SECRET_KEY,
			{ expiresIn: "1d" }
		);

		console.log("user role: ", user.role);

		return { token, role: user.role };
	}

	/**
	 * Verify an existing JWT token
	 */
	@Post("verify")
	public async verifyToken(
		@Body() body: VerifyTokenRequest
	): Promise<VerifyTokenResponse> {
		const { token } = body;
		const SECRET_KEY = process.env.JWT_SECRET;
		if (!SECRET_KEY) throw new Error("JWT_SECRET not set");

		try {
			const decoded = jwt.verify(token, SECRET_KEY);
			return { valid: true, decoded };
		} catch (error) {
			return { valid: false, message: "Invalid or expired token" };
		}
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
		const { token } = body;
		const SECRET_KEY = process.env.JWT_SECRET;
		if (!SECRET_KEY) throw new Error("JWT_SECRET not set");

		try {
			const decoded = jwt.verify(token, SECRET_KEY, {
				ignoreExpiration: true,
			}) as { email: string };

			const newToken = jwt.sign({ email: decoded.email }, SECRET_KEY, {
				expiresIn: "1d",
			});

			return { token: newToken };
		} catch (error) {
			this.setStatus(401);
			throw new Error("Invalid token");
		}
	}
}
