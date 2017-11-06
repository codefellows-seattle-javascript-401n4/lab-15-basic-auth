'use strict';

const superagent = require('superagent');
const server = require('../lib/server.js');
const User = require('../models/user.js');

describe('authorization tests', function(){

  beforeAll( () => {
    server.start();
    return User.remove({});
  });
  afterAll( () => {
    server.stop();
  });

  describe('Invalid route', function(){

    test('should respond with a 404 for undefined routes', function(){
      return superagent.post('http://localhost:3000/wrong')
        .set('content-type', 'application/json')
        .send({
          username: 'test',
          password: 'password',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

  });

  describe('/signup routes', function(){

    test('should respond with a 400 if body is invalid', function(){
      return superagent.post('http://localhost:3000/signup')
        .set('content-type', 'application/json')
        .send({
          username: 'testPOST1',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 200 if body is valid', function(){
      return superagent.post('http://localhost:3000/signup')
        .set('content-type', 'application/json')
        .send({
          username: 'testPOST2',
          password: 'password',
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

  });

  describe('/signin routes', function(){

    test('should respond with a 401 if user could not be validated', function(){
      return superagent.get('http://localhost:3000/signin')
        .auth('testPOST2', 'wrongPassword')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });

    test('should respond with a 200 if user was validated', function(){
      return superagent.get('http://localhost:3000/signin')
        .auth('testPOST2', 'password')
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

  });


});
