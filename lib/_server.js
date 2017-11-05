'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_prod', {useMongoClient: true});

const app = module.exports = require('express')();

app.use('/api/1.0', require(__dirname + '/../routes/auth-routes'));



app.use((err, req, res, next) => {

   console.log('in the errorhandler')
   res.send(err);

});

app.all('*', (req, res, next) => {

  next(404);

});


module.exports = {
  start: (port, cb) => {
    app.listen(port, cb);
    console.log(`Server is up on PORT ${process.env.PORT}!`);
  },
  stop: (cb) => app.close(cb),
};
