import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { db } from '../config/config';
dotenv.config();

export const signup = (req, res) => {
  const {
    fullname, deliveryAddress, username, userType, email, phoneNumber, password
  } = req.body;
  const createdAt = new Date();
  db.any('SELECT * FROM users WHERE email = $1', [email])
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).send({
          status: 'Conflicts',
          message: 'user with this email already exist',
        });
      }
      db.any('SELECT * FROM users WHERE phonenumber = $1', [phoneNumber])
        .then((user) => {
          if (user.length >= 1) {
            return res.status(409).send({
              status: 'Conflicts',
              message: 'user with this phone details already exist',
            });
          }
          db.any('SELECT * FROM users WHERE username = $1', [username])
            .then((user) => {
              if (user.length >= 1) {
                return res.status(409).send({
                  status: 'Conflicts',
                  message: 'username already exist',
                });
              }
              const userpassword = bcrypt.hashSync(password, 10);

              db.query('INSERT INTO users (fullname, deliveryAddress, username, userType, email, phoneNumber, userpassword, createdAt) VALUES ($1, $2, $3, $4, $5,$6,$7,$8) RETURNING id ', [fullname, deliveryAddress, username, userType, email, phoneNumber, userpassword, createdAt])
                .then((id) => {
                  const { userId } = id;
                  const token = jwt.sign({
                    username,
                    userType,
                  }, process.env.SECRET_KEY,
                    {
                      expiresIn: '1h',
                    });
                  res.status(201).send({
                    status: 'success',
                    token,
                    message: 'user created',
                  })
                })
                .catch(error => res.status(500).send({
                  status: 'Signup error',
                  message: error.message,
                }));
            })
        })
    })
    .catch(error => res.status(500).send({
      status: 'Signup error',
      message: error.message,
    }));
};

export const login = (req, res) => {

  const {
    username, userpassword,
  } = req.body;
  db.any('SELECT * FROM users WHERE username = $1', [username])
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).send({
          status: 'User not found',
          message: 'Auth failed',
        });
      }
      console.log(user[0].usertype);
      const result = bcrypt.compareSync(userpassword, user[0].userpassword);
      if (result) {
        const token = jwt.sign({
          username: user[0].username,
          userType: user[0].usertype,
        }, process.env.SECRET_KEY,
          {
            expiresIn: '1h',
          });
        return res.status(200).json({
          status: 'success',
          message: 'Auth Successful',
          Token: token,
        });
      }
      return res.status(401).send({
        status: 'failed',
        message: 'Auth Failed',
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};
