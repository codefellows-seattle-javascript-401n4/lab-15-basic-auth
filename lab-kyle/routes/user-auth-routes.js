'use strict';

const debug = require('debug')('user-auth-routes');

const User = require('../models/user');
const errorHandler = require('../lib/middleware/error-handler');

module.exports = function(router) {

  router.post('/signup', (req, res, next) => {
    debug('POST /signup');
    return new User(req.user).save()
      .then(user => res.status(201).json(user))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/signin', (req, res, next) => {
    debug('GET /signin');
  });
};
