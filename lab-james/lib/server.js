'use strict';

const express = require('express');
const mongoose = require('mongoose');

let app = express();
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/basic-auth', {useMongoClient: true});

app.use(require('../routes/auth-routes.js'));

app.use(require('./middleware/error.js'));

let isRunning = false;

module.exports = {
  start: () => {
    return new Promise( (resolve, reject) => {
      if(!isRunning){

        app.listen(3000, err => {
          if(err){
            reject(err);
          } else {
            isRunning = true;
            console.log('Server up');
          }
        });

      } else {

        reject(console.log('Server is already running'));

      }
    });
  },
  stop: () => {
    return new Promise( (resolve, reject) => {
      if(!isRunning){

        reject(console.log('Server is not running'));

      } else {

        app.close(err => {
          if(err){
            reject(err);
          } else {
            isRunning = false;
            console.log('Server off');
          }
        });

      }
    });
  },
};
