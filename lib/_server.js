'use strict';



const express = require ('mongoose');
mongoose.Promise = require ('bluebird');
mongoose.connect (process.env.MONGODB_URI || 'mongodb : //localhost:27017/auth_prod', {useMongoClient: true});


const app = module.exports = require ('express') ();
app.use ('/api/1.0', require (_dirname + '/../routes/auth-routes.js'));


app.all ('*', (req, res, next) => {
  next (404);
});


app.use ((err, req, res, next) => {
  console.log ('go to errorhandler')
  res.send (err);
});


module.exports = {
  start : (port, cb) => {
    app.listen (port, cb);
    console.log ('server is up on PORT ${process.env.PORT}!');
  }
  stop : (cb) => app.close (cb);
};
