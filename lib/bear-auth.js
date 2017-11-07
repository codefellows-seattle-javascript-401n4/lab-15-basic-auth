'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
require('dotenv').config();

module.exports = (req,res,next) => {

  if(!req.headers.authorization) throw new Error('no authorization given');

  let token = req.headers.authorization.split('Bearer ')[1];
  if(!token) throw new Error('no token sent!');

  let userToken = jwt.verify(token, process.env.SECRET);
  let user = userToken.id;
  req.userId = user;
  
  next();
};




//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMDBmOTkyZDYwZWJlNjVmM2ZmNzE5MSIsImlhdCI6MTUxMDAxMzMzMH0.VviZIPLnJM60yjklg-ULvMHAQ1Rk0DK_YFC1Te9oAoI