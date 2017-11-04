'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_dev', {useMongoClient: true});

const app = require('express')();
app.use(require('./routes/auth-routes'));
app.use((err, req, res, next) => {
  res.status(500 || err.statusCode).send(err.message || 'server error');
});

app.listen(process.env.PORT || 5000);
