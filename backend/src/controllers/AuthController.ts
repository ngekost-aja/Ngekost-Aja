import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import users from "@/data/users";

interface User {
  email: string;
  passwordHash: string;
}

export default class AuthController {
  /**
   * @route POST /api/auth/register
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        res.status(400).json({ message: "Email already registered" });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser: User = { email, passwordHash };
      users.push(newUser); // ✅ Normally you'd use a database

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * @route POST /api/auth/login
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = users.find((u) => u.email === email);
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const validPassword = await bcrypt.compare(password, user.passwordHash);
      if (!validPassword) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const SECRET_KEY = process.env.JWT_SECRET;
      if (!SECRET_KEY) throw new Error("JWT_SECRET not set");

      const token = jwt.sign({ email: user.email }, SECRET_KEY, {
        expiresIn: "1d",
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * @route GET /api/auth/profile
   * Protected route example
   */
  public async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ message: "No token provided" });
        return;
      }

      const token = authHeader.split(" ")[1];
      const SECRET_KEY = process.env.JWT_SECRET;
      if (!SECRET_KEY) throw new Error("JWT_SECRET not set");

      const decoded = jwt.verify(token, SECRET_KEY) as { email: string };

      const user = users.find((u) => u.email === decoded.email);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json({ email: user.email });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  /**
   * @route POST /api/auth/verify
   * Simple token verification
   */
  public async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;
      const SECRET_KEY = process.env.JWT_SECRET;
      if (!SECRET_KEY) throw new Error("JWT_SECRET not set");

      const decoded = jwt.verify(token, SECRET_KEY);
      res.json({ valid: true, decoded });
    } catch (error) {
      res
        .status(401)
        .json({ valid: false, message: "Invalid or expired token" });
    }
  }

  /**
   * @route POST /api/auth/refresh
   * Optional: Refresh the token if expired
   */
  public async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;
      const SECRET_KEY = process.env.JWT_SECRET;
      if (!SECRET_KEY) throw new Error("JWT_SECRET not set");

      // Verify old token first
      const decoded = jwt.verify(token, SECRET_KEY, {
        ignoreExpiration: true,
      }) as { email: string };

      // Generate new token
      const newToken = jwt.sign({ email: decoded.email }, SECRET_KEY, {
        expiresIn: "1d",
      });

      res.json({ token: newToken });
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
}
