'use strict';


// || or
const User = require(__dirname + '../model/user');
const jsonParser = require('body-parser').json();
const authRouter = module.exports = require('express').Router();



authRouter.post('/signup', jsonParser, (req, res, next) => {
  const password = req.body.password;
  delete req.body.password;
  (new User(req.body)).generateHash(password)
    .then((user) => {
      user.save()
        .then(res.send.bind(res))
        .catch(next);
    })
    .catch(next);
});
//takes password and sets it
