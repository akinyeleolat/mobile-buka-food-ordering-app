db.task((t) => {
  const getOrder = t.any('SELECT * FROM ORDERS WHERE userId = $1', [userId]);
  const orderId = getOrder.id;
  const getOrderItem = t.multi(`SELECT orders.id, orders.delivery,orders.amountdue,orders.orderstatus,orders.createdat FROM orders WHERE  orders.id=${[orderId]};
  SELECT item.itemName, item.itemPrice,item.imageurl,item.menu,orderitem.quantity FROM orderitem INNER JOIN item ON itemid=item.id WHERE  orderitem.orderId=${[orderId]}`);
  return { getOrder, getOrderItem };
})
  .then((data) => {
    // success, data = {child, parent, associates}
    data =  { getOrder,getOrderItem };
  })
  .catch((error) => {
    // error
  });
