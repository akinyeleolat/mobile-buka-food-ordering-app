import pg from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_URL;
  console.log('test');
} else {
  connectionString = process.env.DATABASE_URL;
  console.log('dev');
}

const pgp = pg();

export const db = pgp(connectionString);
if (db) {
  console.log('database connected');
}