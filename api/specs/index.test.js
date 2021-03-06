
import supertest from 'supertest';
import chai from 'chai';
import jwt from 'jsonwebtoken';

import app from '../server';
import order from '../model/orderModel';
import * as test from '../model/userEntries';
import * as item from '../model/itemEntries';
import * as orderItem from '../model/orderEntries';


const { expect } = chai;


const request = supertest.agent(app);
const username = 'admin';
const username2 = 'james';
const username3 ='test';

const userType = 'admin';
const userType2 = 'customer';
const token = jwt.sign({ username, userType }, process.env.SECRET_KEY, { expiresIn: '1h' });
const token2 = jwt.sign({ username2, userType2 }, process.env.SECRET_KEY, { expiresIn: '1h' });
const token3 = jwt.sign({ username3, userType2 }, process.env.SECRET_KEY, { expiresIn: '1h' });

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
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
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
  it('Valid should return status 201', (done) => {
    const testData = test.signUpData7;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(201)
      .end(done);
  });
  it('Valid should return status 201', (done) => {
    const testData = test.signUpData11;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(201)
      .end(done);
  });
  it('Duplicate username should return status 409', (done) => {
    const testData = test.signUpData8;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(409)
      .end(done);
  });
  it('Duplicate email should return status 409', (done) => {
    const testData = test.signUpData9;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(409)
      .end(done);
  });
  it('Duplicate phoneNumber should return status 409', (done) => {
    const testData = test.signUpData10;
    request
      .post('/auth/signup')
      .send(testData)
      .expect(409)
      .end(done);
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
describe('All Test Cases for Users Login', () => {
  it('EMPTY LOGIN DATA should return status 404', (done) => {
    const emptyData = {};
    request
      .post('/auth/login')
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
  it('EMPTY LOGIN DATA should return status 404', (done) => {

    const testData = test.signInData;
    request
      .post('/auth/login')
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
  it('EMPTY LOGIN DATA should return status 404', (done) => {
    const testData = test.signInData1;
    request
      .post('/auth/login')
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
  it('username must be an alphabet should return status 404', (done) => {
    const testData = test.signInData2;
    request
      .post('/auth/login')
      .send(testData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Invalid Data',
          message: `Username  must be an alphabet`,
        });
        if (err) done(err);
        done();
      });
  });
  it('Valid should return status 200', (done) => {
    const testData = test.signInData4;
    request
      .post('/auth/login')
      .send(testData)
      .expect(200)
      .end(done);
  });
  it('Valid should return status 200', (done) => {
    const testData = test.signInData5;
    request
      .post('/auth/login')
      .send(testData)
      .expect(200)
      .end(done);
  });
  it('Valid request should return JSON Format', (done) => {
    const testData = test.signInData2;
    request
      .post('/auth/login')
      .send(testData)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('Invalid Login', () => {
  const testData = test.signInData3;
  it('Invalid login should return status 404', (done) => {
    request
      .post('/auth/login')
      .send(testData)
      .expect(404)
      .end(done);
  });
  it('Valid request should return JSON Format', (done) => {
    request
      .post('/auth/login')
      .send(testData)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('All Test Cases for Add food to menu ', () => {
  it('Non Admin should return status 401', (done) => {
    const emptyData = item.itemData4;
    request
      .post('/menu/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token2}`)
      .send(emptyData)
      .expect(401)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Unauthorized',
          message: 'Unauthorized access',
        });
        if (err) done(err);
        done();
      });
  });
  it('EMPTY  DATA should return status 404', (done) => {
    const emptyData = {};
    request
      .post('/menu/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
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
  it('EMPTY empty data should return status 404', (done) => {

    const testData = item.itemData;
    request
      .post('/menu/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Blank Data',
          message: `Food  Details  cannot be blank`,
        });
        if (err) done(err);
        done();
      });
  });
  it('EMPTY ITEM DATA should return status 404', (done) => {
    const testData = item.itemData1;
    request
      .post('/menu/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Blank Data',
          message: `Food  Details  cannot be blank`,
        });
        if (err) done(err);
        done();
      });
  });
  it('item Name or menu must be an alphabet should return status 404', (done) => {
    const testData = item.itemData2;
    request
      .post('/menu/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Invalid Data',
          message: `Item Name and/or Menu  must be an alphabet`,
        });
        if (err) done(err);
        done();
      });
  });
  it('item Price must be a number  should return status 404', (done) => {
    const testData = item.itemData3;
    request
      .post('/menu/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          status: 'Invalid Data',
          message: 'Item price  must be a number and also not zero',
        });
        if (err) done(err);
        done();
      });
  });
  it('Valid item Data should return status 201', (done) => {
    const testData = item.itemData4;
    request
      .post('/menu/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .expect(201)
      .end(done);
  });
  it('Valid request should return JSON Format', (done) => {
    const testData = item.itemData2;
    request
      .post('/menu/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('Duplicate Item', () => {
  const testData = item.itemData4;
  it('duplicate Item should return status 409', (done) => {
    request
      .post('/menu/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .expect(409)
      .end(done);
  });
  it('Valid request should return JSON Format', (done) => {
    request
      .post('/menu/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});
describe('GET ALL MENU', () => {
  it('should return status 200', (done) => {
    request
      .get('/menu/')
      .expect(200)
      .end(done);
  });
  it('should return all order in JSON format', (done) => {
    request
      .get('/menu/')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
});

describe('POST ORDER /api/v1/orders', () => {
  it('EMPTY ORDER DATA should return status 404', (done) => {
    const emptyOrder = {};
    request
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token2}`)
      .send(emptyOrder)
      .expect(400)
      .end(done);
  });
  it('EMPTY ORDER ITEM  should return status 400', (done) => {
    const newOrder2 = orderItem.orderData2;
    request
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token2}`)
      .send(newOrder2)
      .expect(400)
      .end(done);
  });
  it('EMPTY ORDER ITEM  should return status 400', (done) => {
    const newOrder3 = orderItem.orderData3;
    request
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token2}`)
      .send(newOrder3)
      .expect(400)
      .end(done);
  });
  it('EMPTY ORDER ITEM  should return status 400', (done) => {
    const newOrder3 = orderItem.orderData4;
    request
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token2}`)
      .send(newOrder3)
      .expect(400)
      .end(done);
  });
  it('ITEM ID AND QUANTITY ON ORDER ITEM  that is not Number should return status 400', (done) => {
    const newOrder4 = orderItem.orderData5;
    request
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token2}`)
      .send(newOrder4)
      .expect(400)
      .end(done);
  });
  it('AMOUNT DUE AND QUANTITY ON ORDER ITEM  that is  zero should return status 400', (done) => {
    const newOrder6 = orderItem.orderData6;
    request
      .post('/api/v1/orders')
      .send(newOrder6)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token2}`)
      .expect(400)
      .end(done);
  });
    it('should return  order in JSON format', (done) => {
    const newOrder = orderItem.orderData2;
    request
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token2}`)
      .send(newOrder)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
});
});
describe( 'POST ORDER with valid ID',()=>{
  it('USERSNAME NOT FOUND ON ORDER ITEM   should return status 404', (done) => {
    const newOrder6 = {
      item:[
        {itemId:'1',quantity:'12'}
        ]
    }
    request
      .post('/api/v1/orders')
      .send(newOrder6)
      .expect(401)
      .end(done);
  });
  it('ORDER WITH NO VALID ITEM should return status 400', (done) => {
    const itemOrder = orderItem.orderData7;
    request
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(itemOrder)
      .expect(400)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
  it('ORDER WITH VALID PARAMETERS should return status 201', (done) => {
    const itemOrder = orderItem.orderData;
    request
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(itemOrder)
      .expect(201)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});
describe('PUT/UPDATE ORDER /api/v1/orders/:id', () => {
  // it('ORDER WITH NO VALID ID should return  status 404', (done) => {
  //   orderId = 3;
  //   request
  //     .get(`/api/v1/orders/${orderId}`)
  //     .set('Accept', 'application/json')
  //     .set('Content-Type', 'application/x-www-form-urlencoded')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(404)
  //     .expect('Content-Type', 'application/json; charset=utf-8')
  //     .end(done);
  // });
  it('VALID ORDER WITH VALID ID should return  status 200', (done) => {
    orderId = 1;
    const newStatus = { orderStatus: 'Processing' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(newStatus)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID should return  status 200', (done) => {
    orderId = 1;
    const newStatus = { orderStatus: 'pending' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(newStatus)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID should return  status 200', (done) => {
    orderId = 1;
    const newStatus = { orderStatus: 'COMPLETE' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(newStatus)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID with empty string should return  status 400', (done) => {
    orderId = 1;
    const newStatus = { orderStatus: '' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(newStatus)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID with empty space should return  status 400', (done) => {
    orderId = 1;
    const newStatus = { orderStatus: ' ' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(newStatus)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID with no string data should return  status 400', (done) => {
    orderId =  1;
    const newStatus = { orderStatus: ' 123' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(newStatus)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID with no valid values return  status 400', (done) => {
    orderId = 1;
    const newStatus = { orderStatus: ' ' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(newStatus)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID with same orderStatus return  status 400', (done) => {
    orderId =  1;
    const newStatus = { orderStatus: 'complete' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(newStatus)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('VALID ORDER WITH VALID ID should return  json format', (done) => {
    orderId = 1;
    const newStatus = { orderStatus: 'Processing' };
    request
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send(newStatus)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('Non Admin should return status 401', (done) => {
    const newStatus = { orderStatus: 'Processing' };
    request
      .post('/menu/')
      .send(newStatus)
      .expect(401)
      .end(done);
  });
});
describe('GET ALL ORDER /api/v1/orders', () => {
  it('should return status 200', (done) => {
    request
      .get('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end(done);
  });
  it('should return all order in JSON format', (done) => {
    request
      .get('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('Non Admin should return status 401', (done) => {
    request
      .get('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token2}`)
      .expect(401)
      .end(done);
  });
});
describe('GET SELECTED ORDER /api/v1/orders/:id', () => {
  it('ORDER WITH NO  VALID ID should return  status 404', (done) => {
    orderId = order.length + 1;
    request
      .get(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  // it('ORDER WITH VALID ID should return  status 200', (done) => {
  //   orderId = order.length - 1;
  //   const orderDetails = order.find(c => c.id === orderId);
  //   request
  //     .get(`/api/v1/orders/${orderId}`)
  //     .set('Accept', 'application/json')
  //     .set('Content-Type', 'application/x-www-form-urlencoded')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200)
  //     .expect('Content-Type', 'application/json; charset=utf-8')
  //     .end(done);
  // });
  it('should return  selected order in JSON format', (done) => {
    request
      .get(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('Non Admin should return status 401', (done) => {
    request
      .get(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token2}`)
      .expect(401)
      .end(done);
  });
});
// fix failing test