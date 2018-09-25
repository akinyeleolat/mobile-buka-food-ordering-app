import * as valid from './validate';

export const validateOrderInput = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log('Object missing');
    return res.status(400).send({
      status: 'Blank Data',
      message: "No input recieved",
    });
  }
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
export const validateOrderStatus = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log('Object missing');
    return res.status(400).send({
      status: 'Blank Data',
      message: "No input recieved",
    });
  }
  let { orderStatus } = req.body;
  orderStatus = orderStatus.toLowerCase().trim()
  if (!orderStatus) {
    return res.status(400).send({
      status: 'Blank Data',
      message: 'orderStatus cannot be blank',
    });
  }
  if (valid.checkSpace(orderStatus)) {
    return res.status(400).send({
      status: 'Blank Data',
      message: 'orderStatus cannot be blank',
    });
  }
  if (!valid.checkString(orderStatus)) {
    return res.status(400).send({
      status: 'Invalid Data',
      message: 'orderStatus must be an alphabet',
    });
  }
  if (['new', 'processing', 'pending', 'cancel', 'complete'].indexOf(orderStatus) < 0) {
    return res.status(400).send({
      status: 'Invalid Data',
      message: 'incorrect orderStatus value',
    });
  }
  next();
};
export const ValidateUsersInput = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send({
      status: 'Blank Data',
      message: "No input recieved",
    });
  }
  let {
    fullname, deliveryAddress, username, userType, email, phoneNumber, password
  } = req.body;
  fullname = fullname.trim();
  deliveryAddress = deliveryAddress.trim();
  username = username.toLowerCase().trim();
  userType = userType.toLowerCase().trim();
  email = email.toLowerCase().trim();
  phoneNumber = phoneNumber.trim();
  password = password.trim();

  if ((!username) || (!fullname) || (!password) || (!userType) || (!email) || (!phoneNumber) || (!deliveryAddress)) {
    return res.status(400).send({
      status: 'Blank Data',
      message: `users  Details  cannot be blank`,
    });
  }
  if (valid.checkSpace(username) || valid.checkSpace(fullname) || valid.checkSpace(password) || valid.checkSpace(userType) || valid.checkSpace(email) || valid.checkSpace(phoneNumber) || valid.checkSpace(deliveryAddress)) {
    return res.status(400).send({
      status: 'Blank Data',
      message: `Users Details  cannot be blank`,
    });
  }
  if (!valid.checkString(username) || !valid.checkString(fullname) || !valid.checkString(userType)) {
    return res.status(400).send({
      status: 'Invalid Data',
      message: `Username, fullname, and userType  must be an alphabet`,
    });
  }
  if (!valid.checkPhoneNumber(phoneNumber)) {
    return res.status(400).send({
      status: 'Invalid Data',
      message: `Users phoneNumber must be a valid telephone number  with country code (for example +234) and must not be less than 10 character`,
    });
  }
  if (!valid.checkEmail(email)) {
    return res.status(400).send({
      status: 'Invalid Email',
      message: 'Enter Valid Email',
    });
  }
  if (!valid.checkPassword(password)) {
    return res.status(400).send({
      status: 'Invalid Password',
      message: 'Password must contain symbols,alphabet and not less 6 charaters',
    });
  }
  if (['customer', 'admin'].indexOf(userType) < 0) {
    return res.status(400).send({
      status: 'Invalid Data',
      message: 'incorrect userType value',
    });
  }
  next();
}
// export default validateOrderInput;
