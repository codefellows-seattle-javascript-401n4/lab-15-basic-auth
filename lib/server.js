'use strict';

require('dotenv').config();
const app = require('express')();

const mongoose = require('mongoose');
mongoose.promise = require('bluebird');

app.use(require('../routes/auth-routes'));

app.use(require('./error-middleware.js'));


let server = null;
module.exports = {
  start: () => {
    return new Promise((resolve,reject) => {
      if(server) {
        return reject(new Error('Server is already running!'));
      }
      server = app.listen(process.env.PORT || 3000, () => {
        console.log(`Server up on port: ${process.env.PORT}`);
        resolve();
      });
    })
      .then(() => {
        mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});
      });
  },

  stop: () => {
    return new Promise((resolve, reject) => {
      if(!server) {
        return reject(new Error('Server is already shut down'));
      }
      server.close(() => {
        server = null;
        console.log('server closed');
        resolve();
      });
    })
      .then(() => mongoose.disconnect());
  },
};


