'use strict';
const jwt = require('jsonwebtoken');
const jwtAuthz = require('express-jwt-authz');
const User = require('../models/user');
module.exports = (req, res, next) => {
    if(!req.headers.authorization) throw new Error('you must authorize');

    let token = req.headers.authorization.split('Bearer ')[1];
    if(!token) throw new Error('invalid authorization');
    let secret = process.env.APP_SECRET||encryptthis;
    let decodedToken = jwt.verify(token, secret);
    console.log(decodedToken);
    User.findOne({_id:decodedToken._id})
    .then(user =>{
        return user;
    })
    .catch()
}