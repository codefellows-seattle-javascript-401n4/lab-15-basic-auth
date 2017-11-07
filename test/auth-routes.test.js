'use strict';

const mongoose = require('mongoose');
const expect = require('expect');
const User = require('../models/user');
const request = require('superagent');
const server = require('../server.js');
process.env.DB_URL = 'mongodb://localhost:27017/auth_test';

process.env.PORT = 5000;

beforeAll(() => {
  return User.remove({});
});

describe('Signing a user up' , () =>{
  test('if a username isnt provided 403 message forbidden' , () => {
    return request
    .post('localhost:5000/api/signup/')
    .then((res) =>{
      expect();
    });
  });

});
