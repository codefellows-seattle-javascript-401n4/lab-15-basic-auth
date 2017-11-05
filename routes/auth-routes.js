'use strict';

const User = require(__dirname + '/../models/user');
const basicHTTP = require('../lib/basic-http');
const jsonParser = require('body-parser').json();

const authRouter = module.exports = require('express').Router();

authRouter.post('/signup', jsonParser, (req, res, next) => {

  if(!req.body.username || !req.body.password || !req.body.email) next(400);

  User.findOne({ username: req.body.username })
  .then(userExists => {
    if(userExists) next(400);
  }).catch(500);

  const password = req.body.password;
  delete req.body.password;

  (new User(req.body)).generateHash(password)
    .then(user => {
        user.save()
       .then(user => res.send(user.generateToken()))
       .catch(401);
    })
    .catch(next);

});


authRouter.get('/signin', basicHTTP, (req, res, next) => {

  console.log('req.auth.password is ', req.auth.password)
  User.findOne({username: req.auth.username})
    .then(user => {
      console.log('user is ', user);
      if(!user) { console.log('in the if'); next(401);}
      user.verifyPassword(req.auth.password)
        .then(user => res.send(user.generateToken()))
        .catch(console.log('in the first catch'));
    })
    .catch(console.log('in the second catch'));

});
