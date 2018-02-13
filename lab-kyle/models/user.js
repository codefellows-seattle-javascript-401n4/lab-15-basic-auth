'use strict';
 //TODO npm install --save-dev debug
const debug = require('debug');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  debug();
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
  randomHash: {type: String,  unique: true, default: ''},
});

module.exports = mongoose.model('user', userSchema);
