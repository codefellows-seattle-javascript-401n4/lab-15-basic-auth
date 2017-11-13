'use strict';

const User = require(__dirname + '/../models/user');
const basicHTTP = require(__dirname + '/../lib/basic-http');
const jsonParser = require('body-parser').json();

const authRouter = module.exports = require('express').Router();

authRouter.post('/signup', jsonParser, (req, res, next) => {
  if(!req.body.username || !req.body.password || !req.body.email)
    return next({statusCode: 400, err: new Error('Request Error: must provide username, password and email')});
  const password = req.body.password;
  delete req.body.password;
  (new User(req.body)).generateHash(password)
    .then((user) => {
      user.save()
        //.then(res.send.bind(res))
        .then(user => res.send(user.generateToken()))
        .catch(next);
    })
    .catch(next);
});

authRouter.get('/signin', basicHTTP, (req, res, next) => {
  User.findOne({username: req.auth.username})
    .then(user => {
      //if no matched user/ an empty response/null comes back then send 403
      if(!user) next({statusCode: 403, message: 'Forbidden'});
      user.comparePassword(req.auth.password)
      .then(user => res.send(user.generateToken()))
      .catch(err => next({statusCode: 403, message: 'Unsuccessful Authentication'}));
    }).catch(next);
});
