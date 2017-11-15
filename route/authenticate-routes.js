'use strict';

const User = require('../model/sushiSchema.js');
const basicHttp = require('../lib/basicHttp.js');
const jsonParser = require('body-parser').json();
const authRouter = module.exports = require('express').Router();
const bearAuth = require('../lib/bearer-authentication.js');


authRouter.post('/signup', jsonParser, (req,res,next) => {
  const password = req.body.password;
  delete req.body.password;

  (new User(req.body)).generateHash(password)
    .then( user => {
      user.save()
      .then( user => res.status(200).send(user.generateToken()))
      .catch(err => res.status(400).send(err));
    })
    .catch(next);
});

authRouter.get('/signin', basicHttp, (req,res,next) => {
  User.findOne({username: req.auth.username})
  .then( user => {
    user.comparePassword(req.auth.password)
    .then(user => res.status(200).send(user.generateToken()))
    .catch(err => res.status(401).send(err));
  })
  .catch(next);
});

authRouter.get('/getMoney', bearAuth, (req,res,next) => {
  res.send(200, 'ID ', req.userId);
  next();
});
