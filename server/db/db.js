import pkg from "pg";
const { Pool } = pkg;
import { configDotenv } from "dotenv";
configDotenv();

const pool = new Pool({
    port:     process.env.DB_PORT,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host:     process.env.DB_HOST,
    database: process.env.DB_NAME,
});

export default pool;