import { Request, Response } from "express";

export default class UserController {
	public async getUsers(req: Request, res: Response): Promise<void> {
		// Logic to get users
		res.send("Get users");
	}

	public async createUser(req: Request, res: Response): Promise<void> {
		// Logic to create a user
		res.send("Create user");
	}
}
