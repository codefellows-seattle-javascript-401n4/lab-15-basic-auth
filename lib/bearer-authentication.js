'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/sushiSchema.js');

module.exports = (req,res,next) => {

  if(!req.headers.authorization){
    throw new Error('Authorize you must');
  }
  console.log(req.headers.authorization);
  let token = req.headers.authorization.split('Bearer ')[1];
  if(!token){
    throw new Error('Invalid authorization provided');
  }

  let secret = process.env.SECRET || 'changethis';
  let decodedToken = jwt.verify(token,secret);
  req.userId = decodedToken.id;
  next();
};
