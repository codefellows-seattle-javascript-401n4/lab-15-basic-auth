'use strict';

module.exports = (err, req, res, next) => {
  console.log('error', err);

  if(err.statusCode){
    return res.sendStatus(err.statusCode);
  }

  return res.sendStatus(500);
};
