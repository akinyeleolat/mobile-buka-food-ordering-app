db.task( (t)=> {
    const addOrder = yield t.one('SELECT * FROM child WHERE id = $1', 123);
    for (let key = 0; key < item.length; key++) {
        const { itemId, quantity } = item[key];
        const addOrderItem= yield t.one('SELECT * FROM parent WHERE id = $1', addOrder.id);
      }
    return {addOrder,addOrderItem};
})
    .then(data => {
        // success, data = {child, parent, associates}
    })
    .catch(error => {
        // error
    });