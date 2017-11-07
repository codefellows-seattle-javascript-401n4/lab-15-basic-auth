'use strict';

// require('dotenv').config();
const request = require('superagent');
const expect = require('expect');
const User = require('../models/user');
const mongoose = require('mongoose');
const url = 'http://localhost:5500';

process.env.MONGODB_URI = 'monogdb://localhost/users-test';
process.env.PORT = 5500;



beforeAll(() => {
  require('../lib/_server').start(process.env.PORT);
  return User.remove({});
});

afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});


describe('POST/signup/', () => {
  test('should return hash and 200 status code', () => {
    return request
      .post(`${url}/signup`)
      .send({'username':'viscous', 'password':'1234'})
      .then(res => { 
        expect(res.status).toEqual(200);
        expect(typeof res.text).toBe('string');
      });
  });

  // describe('POST/signup/ with no user name or password', () => {
  // test('Should give us a 400 with no password', function() {
  //   return request
  //     .post(`${url}/signup`)
  //     .send({})
  //     .then(res => {
  //       expect(res.body.statusCode).toEqual(400);
  //       expect(res.body.message).toEqual('missing body');
  //     });
  // });

  test('should give status code 400 with no body', function () {
    return request
      .post(`${url}/signup`)
      .send({})
      .then(Promise.reject)
      .catch(res => {
        expect(res.response.status).toEqual(400);
        expect(res.response.text).toBe('bad request');
      });
  });

  // describe('GET/sigin', () => {   
  test('Bad URI should return a 404', () => {

    return request
      .get(`${url}/signin`)
      .auth('not me', 'pass')
      .then(Promise.reject)
      .catch(res => {
        expect(res.response.statusCode).toBe(404);
        expect(res.response.text).toBe('verboden');
      });
  });


  test('Should reutrn 401 because passwords did not match', () => {
  
    return request
      .get(`${url}/signin`)
      .auth('viscous', 'pass')
      .then(Promise.reject)
      .catch(res => { 
        expect(res.response.statusCode).toEqual(404);
        expect(res.response.text).toBe('Authenticat seyyyzzz no!!!!');
      });

  });
  test('Route not registered', () => {
    return request
      .get(`${url}/pi`)
      .send({'username':'magnum', 'password':'pi'})
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toBe(404);
        expect(res.message).toBe('Not Found');
      });
  });
});