'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req,res,next) => {

  if(!req.headers.authorization){
    throw new Error('Authorization Required');
  }
  console.log(req.headers.authorization);
  let token = req.headers.authorization.split('Bearer ')[1];
  if(!token){
    throw new Error('Authorization Failed');
  }

  let secret = process.env.APP_SECRET || 'aKJfjk4927lkjfdpp9';
  let decodedToken = jwt.verify(token, secret);

  User.findOne({_id:decodedToken.id})
    .then(user => {
      req.userId = user._id;
      console.log("setting ID:", req.userId);
      next();
    })
    .catch(next);

};
