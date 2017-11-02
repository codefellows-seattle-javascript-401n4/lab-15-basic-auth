'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lab15', {useMongoClient: true});

app.use('/api', require('../routes/routes.js'));

module.exports = app;