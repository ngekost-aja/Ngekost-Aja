import dotenv from 'dotenv';

// Load .env file
dotenv.config();

const config = {
  port: process.env.PORT || 8000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database',
  },
  webFrontend: {
    url: process.env.WEB_FRONTEND_URL
  }
  // Add other configuration settings as needed
};

export default config;