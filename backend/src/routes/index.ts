import { Router } from "express";
import UserController from "@/controllers/UserController";

const router = Router();

// Initialize controllers
const userController = new UserController();

// Welcome route
router.get("/", (req, res) => {
	res.json({
		message: "Welcome to Ngekost-Aja API",
		version: "1.0.0",
		status: "active",
	});
});

// Define your API routes here
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);

export default router;
