'use strict';

const User = require('../models/user.js');
const jsonParser = require('body-parser').json();
const basicHTTP = require('../lib/basic-http.js');
const bearAuth = require('../lib/bear-auth.js');

const authRouter = module.exports = require('express').Router();

authRouter.post('/signup', jsonParser, (req,res,next) => {
  if(!req.body.username) return res.send(400, 'no username given');
  if(!req.body.password) return res.send(400, 'no password given');
  let password = req.body.password;
  delete req.body.password;
  (new User(req.body)).generateHash(password)
    .then(user => {
      user.save()
        .then(user => res.send(user.generateToken()))
        .catch(next);
    })
    .catch(next);
}); 

authRouter.get('/signin', basicHTTP, (req,res,next) => {
  User.findOne({username:req.auth.username})
    .then(user => {
      if(!user) res.status(403).send('derp. user does not exist');
      user.comparePassword(req.auth.password)
        .then(user => res.send(user.generateToken()))
        .catch((err) => res.status(401).send(err.message));
    });
});

authRouter.put('/update', bearAuth, jsonParser, (req,res,next) => {
  User.findOne({_id: req.userId})
    .then(user => {
      if(!user) res.status(404).send('user not found');
      
      res.status(200).send(user);
    })
    .catch(next);
});

