'use strict';

const User = require('../models/user.js');
const basicHTTP = require('../lib/middleware/basicHTTP.js');
const jsonParser = require('body-parser').json();

const authRouter = module.exports = require('express').Router();

authRouter.post('/newUser', jsonParser, (req, res, next) => {
  const password = req.body.password;
  delete req.body.password;

  let newUser = new User(req.body);
  newUser.hashPass(password)
    .then(user => {
      user.save()
        .then(user => {
          res.send(user.generateToken());
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
});

authRouter.get('/signIn', basicHTTP, (req, res, next) => {
  User.findOne({username: req.auth.username})
    .then(user => {
      if(!user){
        next({statusCode: 404, message: 'User not found'});
      }

      user.checkPass(req.auth.password)
        .then(user => {
          res.send(user.generateToken());
        })
        .catch( () => {
          next({statusCode: 403, message: 'Invalid password'});
        });
    })
    .catch(err => {
      next(err);
    });
});
