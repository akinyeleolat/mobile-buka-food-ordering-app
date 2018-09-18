import * as valid from './validate';

export const validateItemInput = (req, res, next) => {
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
  next();
};
export const validateOrderInput = (req, res, next) => {
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
  next();
}
