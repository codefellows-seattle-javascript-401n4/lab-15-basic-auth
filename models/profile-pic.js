'use strict';

const mongoose = require('mongoose');

const ProfilePicSchema = mongoose.Schema({
  url: {type: String, required: true},
  account: {type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('profile pic', ProfilePicSchema);