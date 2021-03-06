import { db } from '../config/config';

export const addFood = (req, res) => {
  const {
    itemName, itemPrice, imageUrl, menu } = req.body;
  const createdAt = new Date();
  const { userType } = req.userData;
  if (userType != 'admin') {
    return res.status(401).send({
      status: 'Unauthorized',
      message: 'Unauthorized access'
    });
  }
  db.any('SELECT * FROM Item WHERE itemName = $1', [itemName])
    .then((item) => {
      if (item.length >= 1) {
        return res.status(409).send({
          status: 'Conflicts',
          message: `item ${itemName} already exist`,
        });
      }
      db.query('INSERT INTO Item (itemName, itemPrice, imageUrl, menu) VALUES ($1, $2, $3, $4) RETURNING id ', [itemName, Number(itemPrice), imageUrl, menu, createdAt])
        .then((id) => {
          const itemDetails = { itemName, itemPrice, imageUrl, menu };
          res.status(201).send({
            status: 'success',
            itemDetails,
            message: `Item with  added to  menu`
          })
        })
        .catch(error => res.status(500).send({
          status: 'add Food error',
          message: error.message,
        }))
        .catch(error => res.status(500).send({
          status: 'add Food error',
          message: error.message,
        }));
    });
}

export const getMenu = (req, res) => {
  db.query('SELECT * from item order by menu ASC')
    .then(menuItem => res.status(200).send({
      status: 'success',
      menuItem,
      message: `Food items on  menu retrieved`,
    }))
    .catch(() => res.status(500).send({ message: 'internal server error' }));
};
