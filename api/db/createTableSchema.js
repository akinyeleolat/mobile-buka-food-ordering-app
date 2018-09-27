import { Client } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const client = new Client({ connectionString, ssl: true });

client.connect();


export const createTable = () => {
  const query = ` 
  DROP TABLE IF EXISTS Item CASCADE;
  DROP TABLE IF EXISTS Users CASCADE;
  DROP TABLE IF EXISTS Orders CASCADE;
CREATE TABLE
IF NOT EXISTS Item
  (
  id SERIAL PRIMARY KEY,
  itemName VARCHAR(255) UNIQUE NOT NULL,
  itemPrice FLOAT NOT NULL,
  imageUrl TEXT NOT NULL,
  menu VARCHAR(255) NOT NULL,
  createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
CREATE TABLE
IF NOT EXISTS Users
  (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(150) NOT NULL,
  deliveryAddress VARCHAR(150) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  userType VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phoneNumber VARCHAR(255) UNIQUE NOT NULL,
  userpassword VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
CREATE TABLE
IF NOT EXISTS Orders
  (
  id SERIAL PRIMARY KEY,
  userId int REFERENCES Users(id),
  itemName VARCHAR(255) UNIQUE NOT NULL,
  itemPrice FLOAT NOT NULL,
  menu VARCHAR(255) NOT NULL,
  quantity FLOAT  NOT NULL,
  imageUrl TEXT NOT NULL,
  amountDue  FLOAT NOT NULL,
  delivery VARCHAR(150)  NOT NULL,
  orderStatus VARCHAR(255) NOT NULL,
  createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

  // client.query(query, (err) => {
  //   if (err) {
  //     return err.message;
  //   }
  //   client.end();
  // }
  // );
  return query;
};
export default createTable();