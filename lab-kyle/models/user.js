'use strict';
 //TODO npm install --save-dev debug
const debug = require('debug');

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  debug(`userSchema`);
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  randomHash: {type: String,  unique: true, default: ''},
});

module.exports = mongoose.model('user', userSchema);
