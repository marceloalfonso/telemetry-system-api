import { createPool } from 'mysql2';
import { config } from 'dotenv';

config();

const pool = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: 3306,
  database: process.env.DATABASE,
});

export default pool;
