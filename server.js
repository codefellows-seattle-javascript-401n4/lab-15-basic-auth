'use strict';
const jsonParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').load();
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_dev', {useMongoClient:true});

const app = require('express')();
app.use(jsonParser.json())
app.use(require(__dirname + '/route/authenticate-routes'));

app.use((err,req,res,next) => {
  console.log(err);
  res.status( 500|| err.statusCode).send(err.message || 'server error');
});

app.listen(process.env.PORT || 3000);
