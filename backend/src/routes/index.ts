import { Router } from 'express';
import { UserController, ProductController } from '../controllers';

const router = Router();

// Initialize controllers
const userController = new UserController();
const productController = new ProductController();

// Define your API routes here
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);

export default router;