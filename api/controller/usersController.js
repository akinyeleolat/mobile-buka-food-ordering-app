import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/config';

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
          console.log('here1');
          db.any('SELECT * FROM users WHERE username = $1', [username])
            .then((user) => {
              if (user.length >= 1) {
                return res.status(409).send({
                  status: 'Conflicts',
                  message: 'username already exist',
                });
              }
              console.log('here1');
              const userpassword = bcrypt.hashSync(password, 10);
              console.log(userpassword);

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
                  const userDetails = { id: userId, fullname, deliveryAddress, username, email, phoneNumber, userType };
                  res.status(201).send({
                    status: 'success',
                    userDetails,
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

  if ((!username) || (!userpassword)) {
    return res.status(400).send({
      status: 'Blank Data',
      message: 'Users\' data cannot be blank'
    });
  }

  db.any('SELECT * FROM users WHERE username = $1', [username])
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).send({
          status: 'success',
          message: 'Auth failed',
        });
      }

      const result = bcrypt.compareSync(userpassword, user[0].userpassword);
      if (result) {
        const token = jwt.sign({
          username: user[0].username,
          userType: user[0].userType,
        }, process.env.SECRET_KEY,
          {
            expiresIn: '1h',
          });

        return res.status(200).json({
          status: 'success',
          user,
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
