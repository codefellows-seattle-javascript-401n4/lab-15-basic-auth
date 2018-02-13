'use strict';
 //TODO npm install --save-dev debug
 //TODO potentially install jwt and findHash, google first.
const debug = require('debug');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  debug(`userSchema`);
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
  randomHash: {type: String,  unique: true, default: ''},
});

module.exports = mongoose.model('user', userSchema);
