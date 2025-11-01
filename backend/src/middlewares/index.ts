import { Request, Response, NextFunction } from 'express';

// Example middleware for logging requests
export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// Example middleware for handling errors
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

// Export all middleware functions
export default {
    logger,
    errorHandler,
};