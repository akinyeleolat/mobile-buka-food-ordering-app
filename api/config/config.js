import pg from 'pg-promise';
import dotenv from 'dotenv';
// import createTable from '../db/createTableSchema';
dotenv.config();

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_URL || process.env.CONNECT;
  console.log('test');
} else {
  connectionString = process.env.DATABASE_URL || process.env.CONNECT;
  console.log('dev');
}

const pgp = pg();

export const db = pgp(connectionString);