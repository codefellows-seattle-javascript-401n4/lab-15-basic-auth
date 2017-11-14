/*global beforeAll afterAll expect */
'use strict';

const request = require('superagent');
const server = require('../lib/server.js');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
require('./lib/test-env.js');  // mock .env for test 

// helper stuff for tests
const url = 'http://localhost:3000';

const newUser = {
  username: 'goozgooz',
  password: 'derp',
};

let userToken = '';

const badUser = {
  derp: 'halp',
  moreDerp: 'derppp',
};
describe('auth router', () => {
  beforeAll(() => {
    server.start();
    return User.remove({});
  });
  afterAll(() => {
    server.stop();
  });
  

  describe('signup route', () =>{
    test('should return 200 if signup succesful', () => {
      return request.post(url + '/signup')
        .send(newUser)
        .then(res => {
          userToken = res.text;
          expect(res.status).toBe(200);
        });
    });
    test('should return 400 if username or password isn\'t given', () => {
      return request.post(url + '/signup')
        .send(badUser)
        .catch(res => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe('signin route', () => {
    test('should return 403 if user isn\'t created already', () => {
      return request.get(url + '/signin')
        .auth('gandalf','nopassword')
        .catch(res => {
          expect(res.status).toBe(403);
        });
    });
    test('should return 401 if password is wrong', () => {
      return request.get(url + '/signin')
        .auth('goozgooz','iforgot')
        .catch(res => {
          expect(res.status).toBe(401);
        });
    });
    test('should return 200 if authentication succesful', () => {
      return request.get(url + '/signin')
        .auth('goozgooz','derp')
        .then(res => {
          expect(res.status).toBe(200);
          // console.log('verified ID ' + jwt.verify(res.text, process.env.SECRET).id);
        });
    });
  });

  describe('update route', () => {
    test('should return the info of the JWT owner', () => {
      return request.put(url + '/update')
        .set('Authorization', `Bearer ${userToken}`)
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body.username).toBe('goozgooz');
        });
    });
    test('should return 401 if no token given', () => {
      return request.put(url + '/update')
        .set('Authorization', `Bearer `)
        .catch(res => {
          expect(res.status).toBe(401);
        });
    });
    test('should return 400 if invalid token sent', () => {
      return request.put(url + '/update')
        .set('Authorization', `Bearer 6969`)
        .catch(res => {
          expect(res.status).toBe(400);
        });
    });
  });

});