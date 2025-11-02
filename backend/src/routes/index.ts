import { Router } from "express";
import AuthController from "@/controllers/AuthController";

const router = Router();

// Initialize controllers
const authController = new AuthController();

// Welcome route
router.get("/", (req, res) => {
	res.json({
		message: "Welcome to Ngekost-Aja API",
		version: "1.0.0",
		status: "active",
	});
});

// Define your API routes here
router.post("/auth/register", (req, res) => authController.register);
router.post("/auth/login", (req, res) => authController.login);
router.get("/profile", (req, res) => authController.getProfile);
router.post("/auth/verify", (req, res) => authController.verifyToken);
router.post("/auth/refresh", (req, res) => authController.refreshToken);

export default router;
