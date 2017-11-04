'use strict';

const User = require('../models/user');
const basicHTTP = require('../lib/basic-https');
const checkToken = require('../lib/check-token');
const bodyParser = require('body-parser').json();
const authRouter = module.exports = require('express').Router();

authRouter.post('/signup', bodyParser, (req, res, next) => {
    User.findOne({username:req.body.username})
    .then(user => {
        if (user) next({statusCode:400, message:'bad request, user exists'});
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
    .catch(next)
})

authRouter.get('/signin', basicHTTP, (req, res, next) => {
    User.findOne({username: req.auth.username})
    .then(user => {
        if(!user) next({statusCode:401, message:'Unauthorized access'});
        user.comparePasswords(req.auth.password)
        .then(user => res.send(user.generateToken()))
        .catch(err => next({statusCode:401, message:'Unauthorized. Check password'}))
    })
    .catch(next)
})

authRouter.get('/email', checkToken, (req, res, next)=>{

})