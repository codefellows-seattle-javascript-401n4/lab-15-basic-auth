'use strict';

const User = require('../../models/user.js');

const create = () => {
  let result = {
    request: {
      username: 'goozgooz',
      password: 'derp123',
    },
  };

  return User.create(result.request)
    .then(user => {
      result.user = user;
      return user.generateToken();
    })
    .then(token => {
      result.token = token;
      return result;
    });
};

const remove = () => User.remove({});

module.exports = {create, remove};