'use strict';

const debug = require('debug')('basicA:user-auth-routes');

const User = require('../models/user');
const errorHandler = require('../lib/middleware/error-handler');

module.exports = function(router) {

  router.post('/api/signup', (req, res, next) => {
    debug('POST /api/signup');
    return new User(req.body).save()
      .then(user => res.status(201).json(user))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/signin', (req, res, next) => {
    debug('GET /api/signin');

    return User.findById(req.body)
      .then(user => res.json(user))
      .catch(err => errorHandler(err, req, res));
  });
};
