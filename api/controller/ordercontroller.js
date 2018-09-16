import order from '../model/orderModel';
import orderItems from '../model/orderedItemModel';
import orderDetailItem from '../model/orderDetails';


export const getAllOrder = (req, res) => {
  res.status(200).send({
    status: 'success',
    order: orderDetailItem,
    message: 'Retrieved all order',
  });
};
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
export const createOrder = (req, res) => {
  const { customerName, deliveryAddress } = req.body;
  const newOrder = {
    id: order.length + 1,
    customerName,
    deliveryAddress,
    Accepted: false,
    orderStatus: 'Not Accepted',
  };
  if ((!customerName) || (!deliveryAddress)) {
    return res.status(400).send({
      status: 'Blank Data',
      message: 'customer name and/or delivery address cannot be blank',
    });
  }
  order.push(newOrder);
  return res.status(201).send({
    status: 'success',
    newOrder,
    message: 'order created, add order items',
  });
};
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
  const newOrderItems = {
    id: orderItems.length + 1,
    orderId,
    itemName,
    itemPrice: Number(itemPrice),
    quantity: Number(quantity),
  };
  if ((!itemName) || (!itemPrice) || (!quantity)) {
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
