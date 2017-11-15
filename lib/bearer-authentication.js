'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/sushiSchema.js');
const Food = require('../lib/sushiSushi.js');
module.exports = (req,res,next) => {

  if(!req.headers.authorization){
    throw new Error('Authorize you must');
  }

  let token = req.headers.authorization.split('Bearer ')[1];
  if(!token){
    throw new Error('Invalid authorization provided');
  }

  let secret = process.env.SECRET || 'changethis';
  let decodedToken = jwt.verify(token,secret);
  req.userId = decodedToken.id;
  User.findOne({_id: req.userId})
  .then( user => {
    if(!user) next({statusCode: 403, err: new Error('no user found')});
    req.user = user;
  });
  next();
};
