import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/config';
import order from '../model/orderModel';


/**
 * This function gets all order.
 * @returns {object} all order and order items in a single response.
 */
export const getAllOrder = (req, res) => {
  return res.status(200).send({
    status: 'success',
    order,
    message: 'Retrieved all order',
  });
};

/**
 * This function get selected order.
 * @param {number} orderId any number
 * @returns {objects} order and order items base on the orderId.
 */
export const getSelectedOrder = (req, res) => {
  const { id } = req.params;
  const orderId = Number(id);
  const orderDetails = order.find(c => c.id === orderId);
  if (!orderDetails) {
    res.status(404).send({
      status: 'failed',
      message: 'The order with given id was not found',
    });
    return;
  }
  res.status(200).send({
    status: 'success',
    order: orderDetails,
    message: 'Retrieved single order',
  });
};

/**
 * This function creates order .
 * @param {object} req.item any string
 * @param {number} req.amountDue any string
 * @returns {objects} order data
 */
export const createOrder = (req, res) => {
  const { item, amountDue } = req.body;
  console.log(item,amountDue);
  const { username, usertype }=req.userData;
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
    const orderDetails={orderId,customerName,delivery,amountDue};

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
  const orderDetails = order.find(c => c.id === orderId);
  if (!orderDetails) {
    res.status(404).send({
      status: 'failed',
      message: 'The order with given id was not found',
    });
    return;
  }
  const { customerName, deliveryAddress, item } = orderDetails;
  if (orderDetails.orderStatus !== newStatus) {
    const arrayIndex = orderId - 1;
    const updateOrder = {
      id: orderId,
      customerName,
      deliveryAddress,
      orderStatus: newStatus,
      item,
    };
    order[arrayIndex] = updateOrder;
    res.status(200).send({
      status: 'success',
      updateOrder,
      message: `order with id ${orderId} is ${newStatus}`,
    });
    return;
  }
  res.status(400).send({
    status: 'Failed',
    message: `order with id ${orderId} is already ${newStatus}`,
  });
};
