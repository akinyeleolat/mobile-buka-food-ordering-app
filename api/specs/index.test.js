
import supertest from 'supertest';
import chai from 'chai';
import app from '../server';

import order from '../model/orderModel';
import * as test from '../model/userEntries';

const { expect } = chai;


const request = supertest.agent(app);

const newCustomerName = 'test';
const newDeliveryAddress = 'CA Test';
const itemDetails = [
  { itemName: 'Sushi Cuisine', itemPrice: 250, quantity: 20 },
  { itemName: 'Vegies Chicken', itemPrice: 250, quantity: 25 },
];
const { id } = order;
let orderId = id;
describe('Invalid routes', () => {
  it('should return status 404', (done) => {
    request
      .get('/v1/order')
      .expect(404)
      .end(done)
  });
  it('should return all order in JSON format', (done) => {
    request
      .get('/v1/order')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('Valid routes', () => {
  it('should return status 200', (done) => {
    request
      .get('/api/v1/orders')
      .expect(200)
      .end(done);
  });
  it('should return all order in JSON format', (done) => {
    request
      .get('/api/v1/orders')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('GET ALL ORDER /api/v1/orders', () => {
  it('should return status 200', (done) => {
    request
      .get('/api/v1/orders')
      .expect(200)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'success',
          order,
          message: 'Retrieved all order',
        });
        if (err) done(err);
        done();
      });
  });
  it('should return all order in JSON format', (done) => {
    request
      .get('/api/v1/orders')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('GET SELECTED ORDER /api/v1/orders/:id', () => {
  it('ORDER WITH NO  VALID ID should return  status 404', (done) => {
    orderId = order.length + 1;
    request
      .get(`/api/v1/orders/${orderId}`)
      .expect(404)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'failed',
          message: 'The order with given id was not found',
        });
        if (err) done(err);
        done();
      });
  });
  it('ORDER WITH VALID ID should return  status 200', (done) => {
    orderId = order.length - 1;
    const orderDetails = order.find(c => c.id === orderId);
    request
      .get(`/api/v1/orders/${orderId}`)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'success',
          order: orderDetails,
          message: 'Retrieved single order',
        });
        if (err) done(err);
        done();
      });
  });
  it('should return  selected order in JSON format', (done) => {
    request
      .get(`/api/v1/orders/${orderId}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('POST ORDER /api/v1/orders', () => {
  const newOrder = {
    id: order.length + 1,
    customerName: newCustomerName,
    deliveryAddress: newDeliveryAddress,
    orderStatus: 'New',
    item: itemDetails,
  };
  it('EMPTY ORDER DATA should return status 404', (done) => {
    const emptyOrder = {};
    request
      .post('/api/v1/orders')
      .send(emptyOrder)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Blank Data',
          message: 'customer name,delivery address and/or item cannot be blank',
        });
        if (err) done(err);
        done();
      });
  });
  it('EMPTY ORDER ITEM  should return status 400', (done) => {
    const newOrder2 = {
      customerName: 'Adebisi Felicia',
      deliveryAddress: 'CA 60, Ambrose Street,Allen',
      orderStatus: 'Not Accepted',
    }
    request
      .post('/api/v1/orders')
      .send(newOrder2)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Blank Data',
          message: 'customer name,delivery address and/or item cannot be blank',
        });
        if (err) done(err);
        done();
      });
  });
  it('EMPTY ORDER ITEM  should return status 400', (done) => {
    const newOrder3 = {
      customerName: 'Adebisi Felicia',
      deliveryAddress: 'CA 60, Ambrose Street,Allen',
      orderStatus: 'Not Accepted',
      item: [],
    };
    request
      .post('/api/v1/orders')
      .send(newOrder3)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Blank Data',
          message: 'item cannot be Empty',
        });
        if (err) done(err);
        done();
      });
  });
  it('EMPTY ORDER ITEM  should return status 400', (done) => {
    const newOrder3 = {
      customerName: 'Adebisi Felicia',
      deliveryAddress: 'CA 60, Ambrose Street,Allen',
      orderStatus: 'Not Accepted',
      item: [
        { itemName: ' ', itemPrice: 230, quantity: 23 }
      ],
    };
    request
      .post('/api/v1/orders')
      .send(newOrder3)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Blank Data',
          message: 'item name, item price and/or quantity cannot be blank',
        });
        if (err) done(err);
        done();
      });
  });
  it('EMPTY ORDER ITEM  should return status 400', (done) => {
    const newOrder3 = {
      customerName: 'Adebisi Felicia',
      deliveryAddress: 'CA 60, Ambrose Street,Allen',
      orderStatus: 'Not Accepted',
      item: [
        { itemName: '', itemPrice: 230, quantity: 23 }
      ],
    };
    request
      .post('/api/v1/orders')
      .send(newOrder3)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Blank Data',
          message: 'item name, item price and/or quantity cannot be blank',
        });
        if (err) done(err);
        done();
      });
  });
  it('PRICE AND QUANTITY ON ORDER ITEM  that is not Number should return status 400', (done) => {
    const newOrder4 = {
      customerName: 'Adebisi Felicia',
      deliveryAddress: 'CA 60, Ambrose Street,Allen',
      orderStatus: 'Not Accepted',
      item: [
        { itemName: 'asd ', itemPrice: 'asd', quantity: 23 }
      ],
    };
    request
      .post('/api/v1/orders')
      .send(newOrder4)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Invalid Data',
          message: 'Item price and/or quantity must be a number and also not zero',
        });
        if (err) done(err);
        done();
      });
  });
  it('ITEM NAME that is not an alphabet should return status 400', (done) => {
    const newOrder5 = {
      customerName: 'Adebisi Felicia',
      deliveryAddress: 'CA 60, Ambrose Street,Allen',
      orderStatus: 'Not Accepted',
      item: [
        { itemName: 123, itemPrice: 250, quantity: 23 },
      ],
    };
    request
      .post('/api/v1/orders')
      .send(newOrder5)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Invalid Data',
          message: 'item name must be an alphabet',
        });
        if (err) done(err);
        done();
      });
  });
  it('PRICE AND QUANTITY ON ORDER ITEM  that is  zero should return status 400', (done) => {
    const newOrder6 = {
      customerName: 'Adebisi Felicia',
      deliveryAddress: 'CA 60, Ambrose Street,Allen',
      orderStatus: 'Not Accepted',
      item: [
        { itemName: 'asd ', itemPrice: '0', quantity: 23 },
      ],
    };
    request
      .post('/api/v1/orders')
      .send(newOrder6)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Invalid Data',
          message: 'Item price and/or quantity must be a number and also not zero',
        });
        if (err) done(err);
        done();
      });
  });
  it('ITEM NAME ON ORDER ITEM  that is  not string should return status 400', (done) => {
    const newOrder6 = {
      customerName: 'Adebisi Felicia',
      deliveryAddress: 'CA 60, Ambrose Street,Allen',
      orderStatus: 'Not Accepted',
      item: [
        { itemName: 127, itemPrice: 250, quantity: 23 },
      ],
    };
    request
      .post('/api/v1/orders')
      .send(newOrder6)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Invalid Data',
          message: 'item name must be an alphabet',
        });
        if (err) done(err);
        done();
      });
  });
  it('ORDER WITH VALID PARAMETERS should return status 201', (done) => {
    request
      .post('/api/v1/orders')
      .send(newOrder)
      .expect(201)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'success',
          newOrder,
          message: 'order created, add order items',
        });
        if (err) done(err);
        done();
      });
  });
  it('should return  order in JSON format', (done) => {
    request
      .post('/api/v1/orders')
      .send(newOrder)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('PUT/UPDATE ORDER /api/v1/orders/:id', () => {
  it('ORDER WITH NO VALID ID should return  status 404', (done) => {
    orderId = order.length + 1;
    request
      .get(`/api/v1/orders/${orderId}`)
      .expect(404)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'failed',
          message: 'The order with given id was not found',
        });
        if (err) done(err);
        done();
      });
  });
  it('VALID ORDER WITH VALID ID should return  status 200', (done) => {
    orderId = order.length - 1;
    const newStatus = { orderStatus: 'Processing' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .send(newStatus)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID should return  status 200', (done) => {
    orderId = order.length - 1;
    const newStatus = { orderStatus: 'pending' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .send(newStatus)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID should return  status 200', (done) => {
    orderId = order.length - 1;
    const newStatus = { orderStatus: 'COMPLETE' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .send(newStatus)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID with empty string should return  status 400', (done) => {
    orderId = order.length - 1;
    const newStatus = { orderStatus: '' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .send(newStatus)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID with empty space should return  status 400', (done) => {
    orderId = order.length - 1;
    const newStatus = { orderStatus: ' ' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .send(newStatus)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID with no string data should return  status 400', (done) => {
    orderId = order.length - 1;
    const newStatus = { orderStatus: ' 123' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .send(newStatus)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID with no valid values return  status 400', (done) => {
    orderId = order.length - 1;
    const newStatus = { orderStatus: ' ' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .send(newStatus)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID with same orderStatus return  status 400', (done) => {
    orderId = order.length - 1;
    const orderDetails = order.find(c => c.id === orderId);
    const newStatus = { orderStatus: orderDetails.orderStatus };
    request
      .put(`/api/v1/orders/${orderId}`)
      .send(newStatus)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID should return  json format', (done) => {
    orderId = order.length - 1;
    const newStatus = { orderStatus: 'Processing' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .send(newStatus)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('All Test Cases for Users Sign Up', () => {
  it('EMPTY SIGNUP DATA should return status 404', (done) => {
    const emptyData = {};
    request
      .post('/auth/signup')
      .send(emptyData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Blank Data',
          message: 'No input recieved',
        });
        if (err) done(err);
        done();
      });
  });
  it('EMPTY SIGNUP DATA should return status 404', (done) => {

    const testData = test.signUpData;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Blank Data',
          message: `users  Details  cannot be blank`,
        });
        if (err) done(err);
        done();
      });
  });
  it('EMPTY SIGNUP DATA should return status 404', (done) => {

    const testData = test.signUpData1;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Blank Data',
          message: `users  Details  cannot be blank`,
        });
        if (err) done(err);
        done();
      });
  });
  it('username, usertype and fullname must be an alphabet should return status 404', (done) => {

    const testData = test.signUpData2;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Invalid Data',
          message: `Username, fullname, and userType  must be an alphabet`,
        });
        if (err) done(err);
        done();
      });
  });
  it('Invalid PhoneNumber should return status 404', (done) => {

    const testData = test.signUpData3;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Invalid Data',
          message: `Users phoneNumber must be a valid telephone number  with country code (for example +234) and must not be less than 10 character`,
        });
        if (err) done(err);
        done();
      });
  });
  it('Invalid Email should return status 404', (done) => {

    const testData = test.signUpData4;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Invalid Email',
          message: 'Enter Valid Email',
        });
        if (err) done(err);
        done();
      });
  });
  it('Invalid Password should return status 404', (done) => {

    const testData = test.signUpData5;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Invalid Password',
          message: 'Password must contain symbols,alphabet and not less 6 charaters',
        });
        if (err) done(err);
        done();
      });
  });
  it('Invalid Users type should return status 404', (done) => {

    const testData = test.signUpData6;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Invalid Data',
          message: 'incorrect userType value',
        });
        if (err) done(err);
        done();
      });
  });
  it('Valid should return status 200', (done) => {
    const testData = test.signUpData7;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(200)
      .end(done);
  });
  it('Duplicate username should return status 409', (done) => {
    const testData = test.signUpData8;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(409)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Conflicts',
          message: 'username already exist',
        });
        if (err) done(err);
        done();
      });
  });
  it('Duplicate email should return status 409', (done) => {
    const testData = test.signUpData9;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(409)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Conflicts',
          message: 'user with this email already exist',
        });
        if (err) done(err);
        done();
      });
  });
  it('Duplicate phoneNumber should return status 409', (done) => {
    const testData = test.signUpData10;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(409)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Conflicts',
          message: 'user with this phone details already exist',
        });
        if (err) done(err);
        done();
      });
  });
  it('Valid request should return JSON Format', (done) => {
    const testData = test.signUpData6;
    request
      .post('/auth/signup')
      .send(testData)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});