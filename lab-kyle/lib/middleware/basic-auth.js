'use strict';

const debug = require('debug')('basicA:basicA-middleware');

module.exports = function(req,res,next){
  debug('basic auth');

  let authHead = req.head.authorization;
  if(!authHead) return next(new Error('authorization failed, auth headers required'));

  
};
