
import supertest from 'supertest';
import chai from 'chai';
import app from './api/server';

import order from './api/model/orderModel';

import orderItems from './api/model/orderedItemModel';

const { expect } = chai;


const request = supertest.agent(app);

const customerName = 'test';
const deliveryAddress = 'CA Test';
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
    const orderItemDetails = orderItems.filter(obj => obj.orderId === orderId);
    request
      .get(`/v1/order/${orderId}`)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'success',
          orderDetails,
          orderItemDetails,
          message: 'Retrieved single order',
        });
        if (err) done(err);
        done();
      });
  });
  it('ORDER WITH VALID ID BUT NO ORDER ITEM should return  status 200', (done) => {
    orderId = order.length;
    const orderDetails2 = order.find(c => c.id === orderId);
    request
      .get(`/v1/order/${orderId}`)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'success',
          orderDetails: orderDetails2,
          orderItemDetails: 'No item added to this order',
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
    customerName,
    deliveryAddress,
    Accepted: false,
    orderStatus: 'Not Accepted',
  };
  it('EMPTY ORDER DATA should return status 404', (done) => {
    request
      .post('/v1/order')
      .send({})
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Blank Data',
          message: 'customer name and/or delivery address cannot be blank',
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
describe('POST ORDER ITEMS /v1/order/:id', () => {
  it('EMPTY ORDER ITEMS should return status 404', (done) => {
    request
      .post(`/v1/order/${orderId}`)
      .send({})
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
  it('ORDER ITEMS CANNOT BE ADDED TO NULL ORDER AND should return  status 404', (done) => {
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
  it('VALID ORDER ITEMS WITH VALID ORDER ID should return status 201', (done) => {
    orderId = order.length - 1;
    const newOrderItems = {
      id: orderItems.length + 1,
      orderId,
      itemName: 'testItem',
      itemPrice: Number('200'),
      quantity: Number('25'),
    };
    request
      .post(`/v1/order/${orderId}`)
      .send(newOrderItems)
      .expect(201)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'success',
          newOrderItems,
          message: `order items created added to order ${orderId} `,
        });
        if (err) done(err);
        done();
      });
  });
  it('should return  order in JSON format', (done) => {
    const newOrderItems = {
      id: orderItems.length + 1,
      orderId,
      itemName: 'testItem',
      itemPrice: Number('200'),
      quantity: Number('25'),
    };
    request
      .post(`/v1/order/${orderId}`)
      .send(newOrderItems)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('PUT/ACCEPT ORDER /v1/order/:id', () => {
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
