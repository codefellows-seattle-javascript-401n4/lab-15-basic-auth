const Food = require('../lib/sushiSushi.js');
const foodRouter = module.exports = require('express').Router();
const jsonParser = require('body-parser').json();
const bearAuth = require('../lib/bearer-authentication');

foodRouter.post('/sushi', jsonParser, bearAuth, (req,res,next) => {
  req.body.userId = req.user_id;
  (new Food(req.body)).save()
    .then( res.send.bind(res))
    .catch(next);
});
