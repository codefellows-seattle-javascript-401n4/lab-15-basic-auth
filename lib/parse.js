'use strict';


module.exports = (req) => {

  let text = '';

  req.on('data', (buffer) => {
    text += buffer.toString();
  });

  req.on('end', () => {
    try {
      if(req.headers['content-type'] === 'application/json') {

        req.body = JSON.parse(text);
        return req.body;
      }
    }
    catch(err) {
      console.log('in the parse error')
      throw(err);
    }
  });

};
