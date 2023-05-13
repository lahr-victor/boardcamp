// PACKAGE IMPORTS
import dotenv from 'dotenv';
import pg from 'pg';

// SERVER CONFIG
dotenv.config();

// DATABASE CONFIG
const { Pool } = pg;
const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
};

const db = new Pool(databaseConfig);
export default db;
