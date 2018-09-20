
import supertest from 'supertest';
import chai from 'chai';
import app from '../server';

import order from '../model/orderModel';

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
describe('GET ALL ORDER /v1/order', () => {
  it('should return status 200', (done) => {
    request
      .get('/v1/order')
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
      .get('/v1/order')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('GET SELECTED ORDER /v1/order/:id', () => {
  it('ORDER WITH NO  VALID ID should return  status 404', (done) => {
    orderId = order.length + 1;
    request
      .get(`/v1/order/${orderId}`)
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
      .get(`/v1/order/${orderId}`)
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
      .get(`/v1/order/${orderId}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('POST ORDER /v1/order', () => {
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
      .post('/v1/order')
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
      .post('/v1/order')
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
      .post('/v1/order')
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
      .post('/v1/order')
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
      .post('/v1/order')
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
      .post('/v1/order')
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
      .post('/v1/order')
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
  it('ORDER WITH VALID PARAMETERS should return status 201', (done) => {
    request
      .post('/v1/order')
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
      .post('/v1/order')
      .send(newOrder)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('PUT/UPDATE ORDER /v1/order/:id', () => {
  it('ORDER WITH NO VALID ID should return  status 404', (done) => {
    orderId = order.length + 1;
    request
      .get(`/v1/order/${orderId}`)
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
  it('VALID ORDER WITH VALID ID should return  status 201', (done) => {
    orderId = order.length - 1;
    request
      .put(`/v1/order/${orderId}`)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID should return  json format', (done) => {
    orderId = order.length - 1;
    request
      .put(`/v1/order/${orderId}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
