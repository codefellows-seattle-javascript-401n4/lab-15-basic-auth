'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_dev', {useMongoClient: true});

const app = require('express')();

app.use(require('../route/auth_routes.js'));

app.use((err,req, res, next) => {
  console.log(err);
  res.status(500 || err.statusCode).send(err.message || 'server error');
  next();
});

app.listen(process.env.PORT || 5000);
