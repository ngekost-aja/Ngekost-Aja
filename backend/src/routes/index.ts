import { Router } from 'express';
import { UserController, ProductController } from '../controllers';

const router = Router();

// Initialize controllers
const userController = new UserController();
const productController = new ProductController();

// Welcome route
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Ngekost-Aja API',
        version: '1.0.0',
        status: 'active',
    });
});

// Define your API routes here
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);

export default router;