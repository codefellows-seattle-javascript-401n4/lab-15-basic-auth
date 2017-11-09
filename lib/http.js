'use strict';



module.exports = (req, res, next) => {

  try {

    let authHead = req.headers.authorization;
    let base64Head = authHead.split ('basic ') [1];
    let base64buf = new Buffer (base64Head, 'base64');
    let stringifiedHead = base64buf.toString ();
    let authArray = stringifiedHead.split (':');
    let authObject = {
      username : authArray [0];
      password : authArray [1];
    };

    if (!authObject.username || !authObject.password) {
      throw new Error ('need username / password');
    }

    req.auth = authObject;
    next ();
  }

  catch (err) {
    next (err);
  }
};
