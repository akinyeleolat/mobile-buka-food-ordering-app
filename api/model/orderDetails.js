import order from './orderModel';
import orderItems from './orderedItemModel';

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
