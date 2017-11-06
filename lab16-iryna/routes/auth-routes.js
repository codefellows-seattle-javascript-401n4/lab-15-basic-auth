'use strict';

const User = require('../models/user');
const basicHTTP = require('../lib/basic-https');
const checkToken = require('../lib/check-token');
const bodyParser = require('body-parser').json();
const authRouter = module.exports = require('express').Router();

authRouter.post('/api/signup', bodyParser, (req, res, next) => {

    if (!req.body.username||!req.body.email||!req.body.password){
        return next({statusCode:400, message:"bad request"})
    }
    
    User.findOne({username:req.body.username})
    .then(user => {
        if (user) return next({statusCode:400, message:'user exists'})
        // res.send('user exists')
    })
    .catch(next);

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


authRouter.get('/api/signin', basicHTTP, (req, res, next) => {
    
    User.findOne({username: req.auth.username})
    .then(userFound => {
        if (userFound){
            userFound.comparePasswords(req.auth.password)
            .then(userAuthorized => {
                console.log('checking pass');
                if(userAuthorized) res.send(userAuthorized.generateToken())
                else next({statusCode:404, message:'not authorized'})
            })
            .catch(next)
        } 
        else next({statusCode:404, message:'User not found'})
    })
    .catch(next)
})

authRouter.get('/api/email', checkToken, (req, res, next)=>{

})