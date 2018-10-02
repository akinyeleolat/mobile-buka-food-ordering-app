import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/config';
import order from '../model/orderModel';
import { isNull } from 'util';


/**
 * This function gets all order.
 * @returns {object} all order and order items in a single response.
 */
export const getAllOrder = (req, res) => {
  const { username, userType }=req.userData;
     if (userType != 'admin') {
      return res.status(401).send({
      status: 'Unauthorized',
      message: 'Unauthorized access'
    });
  }
  db.query('SELECT orders.id,users.fullname,users.phonenumber,orders.delivery,orders.amountdue,orders.orderstatus,orders.createdat FROM orders INNER JOIN Users ON orders.userid=users.id order by orders.createdat DESC')
    .then((order)=>{
            return res.status(200).send({
                status:'success',
                order,
                message:`retrieved ${order.length} order`,
                  })
        })
    .catch(error => res.status(500).send({
                  status: 'order error',
                  message: error.message,
                }));
};

/**
 * This function get selected order.
 * @param {number} orderId any number
 * @returns {objects} order and order items base on the orderId.
 */
export const getSelectedOrder = (req, res) => {
  const { id } = req.params;
  const orderId = Number(id);
  const { username, userType }=req.userData;
     if (userType != 'admin') {
      return res.status(401).send({
      status: 'Unauthorized',
      message: 'Unauthorized access'
    });
  }
  db.any('SELECT * FROM ORDERS WHERE id = $1', [orderId])
  .then((orderDetails) => {
  if (orderDetails.length<1) {
    return res.status(404).send({
      status: 'failed',
      message: 'The order with given id was not found',
    });
  }
  db.multi(`SELECT orders.id,users.fullname,users.phonenumber,orders.delivery,orders.amountdue,orders.orderstatus,orders.createdat FROM orders INNER JOIN Users ON orders.userid=users.id  WHERE  orders.id=${[orderId]};
    SELECT item.itemName, item.itemPrice,item.imageurl,item.menu,orderitem.quantity FROM orderitem INNER JOIN item ON itemid=item.id WHERE  orderitem.orderId=${[orderId]}`)
    .then(data => {
      const orders=data[0];
        const items = data[1];
        const orderDetails=data[0];
        orderDetails[0].items=data[1];
        return res.status(200).send({
                status:'success',
                orderDetails,
                message:`retrieved  order ${orderId}`,
                  })
    })
    .catch(error => res.status(500).send({
                  status: 'order error',
                  message: error.message,
                }))

})
    .catch(error => res.status(500).send({
                  status: 'order error',
                  message: error.message,
                }));
};

/**
 * This function creates order .
 * @param {object} req.item any string
 * @param {number} req.amountDue any string
 * @returns {objects} order data
 */
export const createOrder = (req, res) => {
  const { item, amountDue } = req.body;
  const { username }=req.userData;
  db.any('SELECT * FROM users WHERE username = $1', [username])
  .then((user) => {
    if (user.length < 1) {
      return res.status(404).send({
        status: 'users auth',
        message: 'users not registered/logged in',
      });
    }
    const userId = user[0].id;
    const delivery = user[0].deliveryaddress;
    const customerName =user[0].fullname;
    const orderStatus ='NEW';
    const createdAt=new Date();
    let msg ='';
    for (let key = 0; key < item.length; key++) {
      const { itemId, quantity } = item[key];
      db.any('SELECT * FROM item WHERE id = $1', [itemId])
             .then((item) => {
              if (item.length < 1) {
                msg = {
                       status: 'item issues',
                       message: 'item not found',
                       };
      return res.status(404).send(msg);
    }
    })
    .catch(error => res.status(500).send({
      status: 'order error',
      message: error.message,
    }));
    }
    db.query('INSERT INTO ORDERS (userId,amountDue,delivery,orderStatus,createdAt) VALUES ($1,$2,$3,$4,$5) RETURNING id', [userId,amountDue,delivery,orderStatus,createdAt])
    .then((order)=>{
      const orderId=order[0].id;
      for (let key = 0; key < item.length; key++) {
        const { itemId, quantity } = item[key];
        db.query('INSERT INTO ORDERITEM (orderId,itemId,quantity,createdAt) VALUES ($1,$2,$3,$4)',[orderId,itemId,quantity,createdAt])
      }
    const orderDetails={orderId,customerName,delivery,amountDue,orderStatus};

                  orderDetails.item=item;
                  res.status(201).send({
                    status: 'success',
                    orderDetails,
                    message: 'order created',
                  })
                })
                .catch(error => res.status(500).send({
                  status: 'order error',
                  message: error.message,
                }));
  })
  .catch(error => res.status(500).send({
    status: 'order error',
    message: error.message,
  }));
};
/**
 * This function update order.
 * @param {number} orderId any number
 * @param {string} orderStatus Processing, Pending, Complete, Cancel
 * @returns {objects} that order data base on orderId.
 */
export const updateOrder = (req, res) => {
  const { id } = req.params;
  const orderId = Number(id);
  const { orderStatus } = req.body;
  const newStatus = orderStatus.toLowerCase().trim();
  const { username,userType } = req.userData;
  if (userType !='admin') {
    return res.status(401).send({
      status: 'Unauthorized',
      message: 'Unauthorized access'
    });
  }
  db.any('SELECT * FROM ORDERS WHERE id = $1', [orderId])
  .then((orderDetails) => {
  if (orderDetails.length<1) {
    return res.status(404).send({
      status: 'failed',
      message: 'The order with given id was not found',
    });
  }
  if(orderDetails[0].orderstatus.toLowerCase()==newStatus){
    return res.status(400).send({
      status: 'Failed',
      message: `order with id ${orderId} is already ${newStatus}`,
    })  ;
  }
    db.any('SELECT * FROM users WHERE username = $1', [username])
    .then((user) => {
      const delivery = user[0].deliveryaddress;
      const customerName =user[0].fullname;
      const amountDue=user[0].amountDue;
      const updatedOrderDetails={orderId,customerName,delivery,amountDue,orderStatus};
      db.query('UPDATE ORDERS SET orderstatus=$1  WHERE id=$2',
          [newStatus, orderId])
          .then(() => {
            return res.status(200).send({
              status: 'success',
              updatedOrderDetails,
              message: `order with id ${orderId} is ${newStatus}`,
            });
    })
    .catch(error => res.status(500).send({
      status: 'update orderStatus error',
      message: error.message,
    }));
  })
  .catch(error => res.status(500).send({
    status: 'update orderStatus error',
    message: error.message,
  }));

  })
.catch(error => res.status(500).send({
  status: 'update orderStatus error',
  message: error.message,
}));
};
