'use strict';

require('dotenv').config();
const request = require('superagent');
const expect = require('expect');
const User = require('../models/user');
const mongoose = require('mongoose');
const url = 'http://localhost:5500';



beforeAll(() => {
  require('../lib/_server').start(5500);
  return User.remove({});
});

afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});

const expampeUser = {
  username:'studley',
  password:'12345'
};

describe()
