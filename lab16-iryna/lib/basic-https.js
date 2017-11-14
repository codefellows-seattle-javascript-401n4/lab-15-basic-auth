'use strict';
module.exports = (req, res, next) => {
    try{
        let authHeader = req.headers.authorization;
        // console.log('authHeader: ', authHeader);
        let base64Header = authHeader.split('Basic ')[1];
        // console.log('base64Header: ', base64Header);
        let base64buff = new Buffer(base64Header,'base64');
        // console.log('buffer: ', base64buff);
        let stringHeader = base64buff.toString();
        let authArray = stringHeader.split(':');
        // console.log('AUTH array: ', authArray);
        let authObj = {
            username: authArray[0],
            password:authArray[1]
        }
        // console.log(authObj);
        if(!authObj.username||!authObj.password) throw new Error('no credentials were provided');
        req.auth = authObj;
        // console.log(req.auth);
        next();
    }
    catch(err){
        next(err)
    }
}