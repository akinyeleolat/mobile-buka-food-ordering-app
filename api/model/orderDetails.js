import order from './orderModel';
import orderItems from './orderedItemModel';

/**
 * This function return the order data and order items base on order id.
 * @param {number} orderId from order and orderitems
 * @returns {objects} order data and order items base on order id in a single response.
 */
const fetchOrderDetails = () => {
  order.forEach((val) => {
    const orderId = Number(val.id);
    const orderItemDetails = orderItems.filter(obj => obj.orderId === orderId);
    if (orderItemDetails.length < 1) {
      val.item = 'No item added to this order';
    } else {
      val.item = orderItemDetails;
    }
    return val;
  });
  return order;
};
export default fetchOrderDetails();
