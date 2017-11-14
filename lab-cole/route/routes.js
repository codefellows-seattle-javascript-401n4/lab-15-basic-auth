'use strict';

const User = require('../models/user.js');
const basicHTTP = require('../lib/basic-http.js');
const jsonParser = require('body-parser').json();//do we even need this?

const authRouter = module.exports = require('express').Router();

authRouter.post('/signup', jsonParser, (req, res, next) => {
    //enter an error code for no username
    //enter an error code for no password
    const password = req.body.password; //why not let instead of const here?
    delete req.body.password;
    (new User(req.body)).generateHash(password)
        .then((user) => {
            user.save()
                .then(user => res.send(user.generateToken()))
                .catch(next);
        })
        .catch(next);
});

authRouter.get('/signin', basicHTTP, (req, res, next) => {
    User.findOne({username: req.auth.username})
        .then((user) => {
            if (!user) next({statusCode:403, message: 'Prohibited'});
            user.comparePassword(req.auth.pasword)
                .then(user => res.send(user.generateToken()))
                .catch((err) => res.status(401).send(err.message));
        })
        .catch(next);
});

authRouter.put('/update', jsonParser, (req, res, next) => {
    User.findOne({})
});