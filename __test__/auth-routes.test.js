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
          // console.log(jwt.verify(res.text, process.env.SECRET));
        });
    });
  });
});