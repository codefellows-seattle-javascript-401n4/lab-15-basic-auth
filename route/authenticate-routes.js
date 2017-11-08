'use strict';

const User = require('../model/sushiSchema.js');
const basicHttp = require('../lib/basicHttp.js');
const jsonParser = require('body-parser').json();
const authRouter = module.exports = require('express').Router();
const bearAuth = require('../lib/bearer-authentication.js');
const Food = require('../lib/sushiSushi.js');

authRouter.post('/signup', jsonParser, (req,res,next) => {
  const password = req.body.password;
  delete req.body.password;

  (new User(req.body)).generateHash(password)
    .then( user => {
      user.save()
      .then( user => res.send(user.generateToken()))
      .catch(err => next({statusCode:400, message: 'bad request'}));
    })
    .catch(next);
});
authRouter.post('api/sushi', jsonParser, (req,res,next) => {
  new Food(req.body)
  .then( user => {
    user.save()
    .then( food => res.send(req.body))
    .catch(err => next({statusCode:400, message: 'bad request'}));
  })
  .catch(next);
});
authRouter.get('/signin', basicHttp, (req,res,next) => {
  User.findOne({username: req.auth.username})
  .then( user => {
    if(!user) next({statusCode: 401, message: 'thou shall not pass'});
    user.comparePassword(req.auth.password)
    .then(user => res.send(user.generateToken()))
    .catch(err => next({statusCode:403, message: 'no no no mr superman'}));
  })
  .catch(next);
});

authRouter.get('/getMoney', bearAuth, (req,res,next) => {
  res.send(200, "ID ", req.userId);
});
