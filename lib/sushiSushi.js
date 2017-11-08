'use strict';


const mongoose = require('mongoose');

let foodSchema = new mongoose.Schema({
  name: {type: String, required:true},
  fish: String,
  userId: String,
});
module.exports = mongoose.model('Food', foodSchema);
