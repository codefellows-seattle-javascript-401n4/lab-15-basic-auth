'use strict';

module.exports = (err,req,res,next) => {
  console.log(err.message);

  // put request errors
  if(err.message === 'jwt malformed') return res.send(400, err.message);
  if(err.message === 'no token sent!') return res.send(401, err.message);

  return res.send(err.statusCode || 500, err.message);  // check this line 
};


