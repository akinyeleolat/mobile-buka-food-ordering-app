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
 
  async.forEach(messageIds, (messageId, callback) => { //The second argument, `callback`, is the "task callback" for a specific `messageId`
  //When the db has deleted the item it will call the "task callback"
  //This way async knows which items in the collection have finished
  db.delete('messages', messageId, callback);
}, err => {
  if (err) return next(err);
  //Tell the user about the great success
  res.json({
      success: true,
      message: `${messageIds.length} message(s) was deleted.`
  });
});
const getUsersOrder = (req, res) => {
  const { id } = req.params;
  const userId = Number(id);
  db.any('SELECT * FROM ORDERS WHERE userId = $1', [userId])
    .then((orderDetails) => {
      if (orderDetails.length < 1) {
        return res.status(404).send({
          status: 'failed',
          message: 'The order with given userId was not found',
        });
      }
      const orders = [];
      let order;
      res.writeHead(200, {
        'content-type': 'application/json',
      });
      // const returnOrders = (data, key) => {
      //   order = data[0];
      //   order[0].items = data[1];
      //   orders.push(order[key]);
      //   console.log(orders);
      //   // res.write(JSON.stringify(orders));
      //   res.end(JSON.stringify(orders));
      // };
      for (let key = 0; key < orderDetails.length; key++) {
        const orderId = orderDetails[key].id;
        db.multi(`SELECT orders.id, orders.delivery,orders.amountdue,orders.orderstatus,orders.createdat FROM orders WHERE  orders.id=${[orderId]};
    SELECT item.itemName, item.itemPrice,item.imageurl,item.menu,orderitem.quantity FROM orderitem INNER JOIN item ON itemid=item.id WHERE  orderitem.orderId=${[orderId]}`)
          // .then(returnOrders);
          .then((data) => {
            order = data[0];
            order[0].items = data[1];
            orders.push(order);
            console.log(orders);
            // res.write(JSON.stringify(orders));
            res.end(JSON.stringify(orders));
          });
        // if (key === orderDetails.length) {
        //   res.end();
        // }
        // console.log('full', orders);
        // return orders;
      }
      // res.end();
      // return res.status(200).send({
      //   status: 'success',
      //   order,
      //   message: `retrieved  order for user ${userId}`,
      // });
      // res.end('ok');
    })
    .catch(error => res.status(500).send({
      status: 'order error',
      message: error.message,
    }));
};
  