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
 * @param {string} customerName any string
 * @param {string} deliveryAddress any string
 * @param {object} item any string
 * @returns {objects} order data
 */
export const createOrder = (req, res) => {
  const { customerName, deliveryAddress, item } = req.body;
  const newCustomerName = customerName.trim();
  const newDeliveryAddress = deliveryAddress.trim();
  const newItem = item;
  const newOrder = {
    id: order.length + 1,
    customerName: newCustomerName,
    deliveryAddress: newDeliveryAddress,
    orderStatus: 'New',
    item: newItem,
  };
  order.push(newOrder);
  return res.status(201).send({
    status: 'success',
    newOrder,
    message: 'order created, add order items',
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
  const { customerName, deliveryAddress, item } = orderDetails;
  const newOrder = {
    id: orderId,
    customerName,
    deliveryAddress,
    orderStatus: 'In progress',
    item,
  };
  order[arrayIndex] = newOrder;
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
  const { customerName, deliveryAddress, item } = orderDetails;
  if (orderDetails.orderStatus !== 'In progress') {
    res.status(404).send({
      status: 'failed',
      message: 'The order has not been accepted',
    });
    return;
  }
  const arrayIndex = orderId - 1;
  const newOrder = {
    id: orderId,
    customerName,
    deliveryAddress,
    orderStatus: 'Completed',
    item,
  };
  order[arrayIndex] = newOrder;
  res.status(201).send({
    status: 'success',
    newOrder,
    message: 'order accepted',
  });
};
