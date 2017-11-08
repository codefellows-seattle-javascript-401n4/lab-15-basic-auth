'use strict';
const jwt = require('jsonwebtoken');
// const jwtAuthz = require('express-jwt-authz');
const User = require('../models/user');

module.exports = (req, res, next) => {
    if(!req.headers.authorization) return next({statusCode:401, message:'you must authorize'});

    let token = req.headers.authorization.split('Bearer ')[1];
    if(!token) return next({statusCode:401, message:'invalid authorization'});

    let secret = process.env.APP_SECRET||'encryptthis';
    let decodedToken = jwt.verify(token, secret);
    console.log(decodedToken.id);

    User.findOne({_id:decodedToken.id})
    .then(user =>{
        // console.log('user : ',user)
        req.userID = user._id;
        next()
    })
    .catch(next)
}