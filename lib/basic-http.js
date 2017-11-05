'use strict';

module.exports = (req,res,next) => {
  try{
    let base64Buf = new Buffer(req.headers.authorization.split('Basic ')[1], 'base64');
    let stringHeader = base64Buf.toString();
    let authArray = stringHeader.split(':');
    let authObject = {
      username: authArray[0],
      password: authArray[1],
    };
    if (!authObject.username || !authObject.password) throw new Error('derppp no username and/or password');
    req.auth = authObject;
    next();
  }
  catch(e){
    next(e);
  }
};