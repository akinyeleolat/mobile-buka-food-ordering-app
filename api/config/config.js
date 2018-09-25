import pg from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pgp = pg();

export const db = pgp(connectionString);
if (db) {
  console.log('database connected');
}