'use strict';

const express = require('express');
//TODO npm install --save body-parser
const jsonParser = require('body-parser').json();
const User = require(__dirname + '/../models/user');

const authRouter = module.exports = express.Router();

authRouter.post('/signup', jsonParser, (req, res, next) => {
  next();
});

authRouter.get('/signin', jsonParser, (req, res, next) => {
  next();
});
