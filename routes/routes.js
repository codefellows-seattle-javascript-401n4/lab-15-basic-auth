const express = require('express');
const User = require(`${__dirname}/../models/User.js`);
const jsonParser = require('body-parser').json();
const auth = require('../lib/basic-http');

const Router = module.exports = express.Router();

Router.get('/signin', auth, (req, res, next) => {

    User.findOne({username: req.auth.username}).then(user => {
        user.comparePassword(req.auth.password).then(result => res.send(result));
    }); 
});

Router.post('/signup', jsonParser, (req, res, next) => {
   const password = req.body.password;
   delete req.body.password;
   (new User(req.body)).generateHash(password).then(user => {
       user.save()
            .then(saved => res.send(saved))
            .catch(next);
   });  
});