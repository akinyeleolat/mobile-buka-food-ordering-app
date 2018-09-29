import { Client } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_URL || process.env.CONNECT;
  console.log('test');
} else {
  connectionString = process.env.DATABASE_URL || process.env.CONNECT;
  console.log('dev');
}

const client = new Client({ connectionString, ssl: true });

client.connect();


export const createTable = () => {
  const query = ` 
  DROP TABLE IF EXISTS Item CASCADE;
  DROP TABLE IF EXISTS Users CASCADE;
  DROP TABLE IF EXISTS Orders CASCADE;
  DROP TABLE IF EXISTS OrderItem CASCADE;

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
  amountDue  FLOAT NOT NULL,
  delivery VARCHAR(150)  NOT NULL,
  orderStatus VARCHAR(255) NOT NULL,
  createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE
IF NOT EXISTS OrderItem
  (
  id SERIAL PRIMARY KEY,
  orderId int REFERENCES orders(id),
  itemId int REFERENCES item(id),
  quantity FLOAT  NOT NULL,
  createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
  return new Promise((resolve, reject) => {
    client.query(query, (err, response) => {
      if (err) {
        reject(Error(err.message));
      }
      if (response) {
        client.end();
        resolve();
      }
    });
  });
};

createTable().then(() => {
  console.log('Tables destroyed and created');
}).catch((error) => {
  console.log('There was an error. ', error);
});
