'use strict';

const User = require('../models/user');
const basicHTTP = require('../lib/basic-https');
const checkToken = require('../lib/check-token');
const bodyParser = require('body-parser').json();
const authRouter = module.exports = require('express').Router();

authRouter.post('/signup', bodyParser, (req, res, next) => {
    let password = req.body.password;
    // console.log(password);
    delete req.body.password;
    (new User(req.body)).generateHash(password)
    .then(user => {
        // console.log ('USER ', user);
        user.save()
        .then(user => res.send(user.generateToken()))
        .catch(next)
    })
    .catch(next)
})

authRouter.get('/signin', basicHTTP, (req, res, next) => {
    User.findOne({username: req.auth.username})
    .then(user => {
        if(!user) next({statusCode:402, message:'user not found'});
        user.comparePasswords(req.auth.password)
        .then(user => res.send(user.generateToken()))
        .catch(err => next({statusCode:403, message:'incorrect password, your password is guest1234 :)'}))
    })
    .catch(next)
})

authRouter.get('/email', checkToken, (req, res, next)=>{

})