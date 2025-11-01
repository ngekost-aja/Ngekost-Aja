import { Request, Response } from 'express';

export class UserController {
    public async getUsers(req: Request, res: Response): Promise<void> {
        // Logic to get users
        res.send('Get users');
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        // Logic to create a user
        res.send('Create user');
    }
}

export class ProductController {
    public async getProducts(req: Request, res: Response): Promise<void> {
        // Logic to get products
        res.send('Get products');
    }

    public async createProduct(req: Request, res: Response): Promise<void> {
        // Logic to create a product
        res.send('Create product');
    }
}