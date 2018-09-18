import orderDetailItem from '../model/orderDetails';
import order from '../model/orderModel';
import orderItems from '../model/orderedItemModel';
import * as valid from '../middleware/validate';

/**
 * This function gets all order.
 * @returns {object} all order and order items in a single response.
 */
export const getAllOrder = (req, res) => {
  res.status(200).send({
    status: 'success',
    order: orderDetailItem,
    message: 'Retrieved all order',
  });
};

/**
 * This function get selected order.
 * @param {number} orderId any number
 * @returns {objects} order and order items base on the orderId.
 */
export const getSelectedOrder = (req, res) => {
  // receive params
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
  // find the orderItems that has the order id
  const orderItemDetails = orderItems.filter(obj => obj.orderId === orderId);
  if (orderItemDetails.length < 1) {
    orderDetails.item = 'No item added to this order';
    res.status(200).send({
      status: 'success',
      order: orderDetails,
      message: 'Retrieved single order',
    });
    return;
  }
  orderDetails.item = orderItemDetails;
  res.status(200).send({
    status: 'success',
    order: orderDetails,
    message: 'Retrieved single order',
  });
};

/**
 * This function creates order .
 * @param {string} customerName any string
 * @param {string} deliveryAddress any string
 * @returns {objects} order data
 */
export const createOrder = (req, res) => {
  const { customerName, deliveryAddress } = req.body;
  if ((!customerName) || (!deliveryAddress)) {
    return res.status(400).send({
      status: 'Blank Data',
      message: 'customer name and/or delivery address cannot be blank',
    });
  }
  if (valid.checkSpace(customerName) || valid.checkSpace(deliveryAddress)) {
    return res.status(400).send({
      status: 'Blank Data',
      message: 'customer name and/or delivery address cannot be blank',
    });
  }
  const newCustomerName = customerName.trim();
  const newDeliveryAddress = deliveryAddress.trim();
  const newOrder = {
    id: order.length + 1,
    customerName: newCustomerName,
    deliveryAddress: newDeliveryAddress,
    Accepted: false,
    orderStatus: 'Not Accepted',
  };
  order.push(newOrder);
  return res.status(201).send({
    status: 'success',
    newOrder,
    message: 'order created, add order items',
  });
};

/**
 * This function creates order items .
 * @param {string} itemName any string
 * @param {number} itemPrice any number
* @param {number} quantity any number
 * @returns {objects} order items data
 */
export const createOrderItems = (req, res) => {
  const { id } = req.params;
  const orderId = Number(id);
  const orderDetails = order.find(c => c.id === orderId);
  if (!orderDetails) {
    return res.status(404).send({
      status: 'failed',
      message: 'The order with given id was not found',
    });
  }
  const { itemName, itemPrice, quantity } = req.body;
  if ((!itemName) || (!itemPrice) || (!quantity)) {
    return res.status(400).send({
      status: 'Blank Data',
      message: 'item name, item price and/or quantity cannot be blank',
    });
  }
  if (valid.checkSpace(itemName)) {
    return res.status(400).send({
      status: 'Blank Data',
      message: 'item name, item price and/or quantity cannot be blank',
    });
  }
  if (!valid.checkNumber(itemPrice) || !valid.checkNumber(quantity)) {
    return res.status(400).send({
      status: 'Invalid Data',
      message: 'Item price and/or quantity must be a number and also not zero',
    });
  }
  const newItemName = itemName.trim();
  const newItemPrice = itemPrice;
  const newQuantity = quantity;
  const newOrderItems = {
    id: orderItems.length + 1,
    orderId,
    itemName: newItemName,
    itemPrice: Number(newItemPrice),
    quantity: Number(newQuantity),
  };
  if ((!newItemName) || (!newItemPrice) || (!newQuantity)) {
    return res.status(400).send({
      status: 'Blank Data',
      message: 'item name, item price and/or quantity cannot be blank',
    });
  }
  orderItems.push(newOrderItems);
  return res.status(201).send({
    status: 'success',
    newOrderItems,
    message: `order items created added to order ${orderId} `,
  });
};

/**
 * This function accepts order.
 * @param {number} orderId any number
 * @returns {object} order with the id.
 */
export const AcceptOrder = (req, res) => {
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
  const arrayIndex = orderId - 1;
  // console.log(arrayIndex);
  const { customerName, deliveryAddress } = orderDetails;
  const newOrder = {
    id: orderId,
    customerName,
    deliveryAddress,
    Accepted: true,
    orderStatus: 'In progress',
  };
  order[arrayIndex] = newOrder;
  // console.log(order[arrayIndex]);
  res.status(201).send({
    status: 'success',
    newOrder,
    message: 'order accepted',
  });
};

/**
 * This function marks order as complete.
 * @param {number} orderId any number
 * @returns {objects} that order data base on orderId.
 */
export const CompleteOrder = (req, res) => {
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
  const { customerName, deliveryAddress, Accepted } = orderDetails;
  if (orderDetails.Accepted !== true) {
    res.status(404).send({
      status: 'failed',
      message: 'The order has not been accepted',
    });
    return;
  }
  const arrayIndex = orderId - 1;
  // console.log(arrayIndex);
  const newOrder = {
    id: orderId,
    customerName,
    deliveryAddress,
    Accepted,
    orderStatus: 'Completed',
  };
  order[arrayIndex] = newOrder;
  // console.log(order[arrayIndex]);
  res.status(201).send({
    status: 'success',
    newOrder,
    message: 'order accepted',
  });
};
