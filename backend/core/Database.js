import mysql from 'mysql2'
import dotenv from 'dotenv'


dotenv.config()

const pool = mysql.createPool({
    host: process.env.SERVER_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const connectionPool = pool.promise()

export default connectionPool
