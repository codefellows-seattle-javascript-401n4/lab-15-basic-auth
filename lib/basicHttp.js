'use strict';

module.exports = (req,res,next) => {
  try{
    let authHeader = req.headers.authorization;
    let base64Header = authHeader.split('Basic ')[1];
    let base64Buf = new Buffer(base64Header, 'base64');
    let stringHeader = base64Buf.toString();
    let authArray = stringHeader.split(':');
    let authObj = {
      username: authArray[0],
      password: authArray[1],
    };
    if(!(authObj.username || authObj.password)) throw new Error('no no no mr superman not here');
    req.auth = authObj;
    next();
  }
  catch(e){
    next(e);
  }
};
