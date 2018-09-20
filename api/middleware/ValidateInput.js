import * as valid from './validate';

export const validateOrderInput = (req, res, next) => {
  const { customerName, deliveryAddress, item } = req.body;
  if ((!customerName) || (!deliveryAddress) || (!item)) {
    return res.status(400).send({
      status: 'Blank Data',
      message: 'customer name,delivery address and/or item cannot be blank',
    });
  }
  if (valid.checkSpace(customerName) || valid.checkSpace(deliveryAddress)) {
    return res.status(400).send({
      status: 'Blank Data',
      message: 'customer name and/or delivery address cannot be blank',
    });
  }
  if (item.length < 1) {
    return res.status(400).send({
      status: 'Blank Data',
      message: 'item cannot be Empty',
    });
  }
  let msg = '';
  for (let key = 0; key < item.length; key++) {
    const { itemName, itemPrice, quantity } = item[key];
    if ((!itemName) || (!itemPrice) || (!quantity)) {
      msg = {
        status: 'Blank Data',
        message: 'item name, item price and/or quantity cannot be blank',
      };
      return res.status(400).send(msg);
    }
    if (valid.checkSpace(itemName)) {
      msg = {
        status: 'Blank Data',
        message: 'item name, item price and/or quantity cannot be blank',
      };
      return res.status(400).send(msg);
    }
    if (!valid.checkString(itemName)) {
      msg = {
        status: 'Invalid Data',
        message: 'item name must be an alphabet',
      };
      return res.status(400).send(msg);
    }
    if (!valid.checkNumber(itemPrice) || !valid.checkNumber(quantity)) {
      msg = {
        status: 'Invalid Data',
        message: 'Item price and/or quantity must be a number and also not zero',
      };
      return res.status(400).send(msg);
    }
  }
  next();
};
export default validateOrderInput;
