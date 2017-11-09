'use strict';


const User = require (__dirname + '/../models/user');
const basicHTTP = require ('../lib/http');
const jsonParser = require ('body-parser').json ();


const authRouter = module.exports = require ('express').Router ();
authRouter.post ('/signup', jsonParser, (req, res, next) => {

  if (!req.body.username || !req.body.password || !req.body.email)
  return next (400);

  User.findOne ({ username : req.body.username })
  .then (userExists => {
    if (userExists) return next (400);

  })
  .catch (500);
};


const password = req.body.password;
delete req.body.password;

(new User (req.body)).generateHash (password)
.then (user => {
  user.save ()
  .then (user => res.send (user.generateToken ()))
  .catch (400);
})
  .catch (400);
});


authRouter.get ('/signin', HTTP, (req, res, next) => {
  User.findOne ({ username : req.auth.username})
  .then (user => {
    user.verifyPassword (req.auth.password)
    .then (verified => {
      if (verified) res.send (verified.generateToken ());
      else (next (401));
    });
  })
  .catch (next);
});
