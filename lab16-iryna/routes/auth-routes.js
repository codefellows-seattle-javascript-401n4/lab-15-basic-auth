'use strict';

const User = require('../models/user');
const basicHTTP = require('../lib/basic-https');
// const jwtAuthz = require('express-jwt-authz');
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
         .then( user => res.send(user.generateToken()))
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
    console.log('userID: ', req.userID);
    res.send(200, req.userID);
})

//update user:
authRouter.put('/api/edit',  checkToken, bodyParser, (req, res, next)=>{
    console.log('in edit user');
        User.findOne({_id:req.userID})
        .then( user => {
            if (!req.body.username||!req.body.email||!req.body.password) return next({statusCode:400, message: 'no body'});
            if(!user) next({statusCode:404, message: 'User not found'});
                console.log(user);
                user.username = req.body.username;
                user.email = req.body.email;
                user.password = req.body.password;
                user.save()
                .then(res.send(res.status(200).send(user)))
                .catch(err => res.send(err))
        })
        .catch(next)
})

//delete user:
authRouter.delete('/api/delete/:id', checkToken, bodyParser, (req, res, next)=>{
    User.findOne({_id:req.params.id})
    .then( user => {
        if (user){
            User.remove({_id:req.params.id})
            .then(res.send("success!"))
            .catch(err => res.send(err))
        }
        else next({statusCode:404, message: 'User not found'})
    })
    .catch(next)
})