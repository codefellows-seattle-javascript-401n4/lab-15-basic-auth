const Food = require('../lib/sushiSushi.js');
const foodRouter = module.exports = require('express').Router();
const jsonParser = require('body-parser').json();
const bearAuth = require('../lib/bearer-authentication');

foodRouter.post('/sushi', jsonParser, bearAuth, (req,res,next) => {
  req.body.userId = req.user_id;
  (new Food(req.body)).save()
    .then( res.send.bind(res.status(200)))
    .catch(next);
});

foodRouter.get('/sushi/', jsonParser, bearAuth, (req,res,next) => {
  Food.find({userId: req.user_id})
    .then( res.send.bind(res.status(200)))
    .catch(next);
});

foodRouter.delete('/sushi/:id', jsonParser, bearAuth, (req,res,next) => {
  Food.findOne({_id: req.params.id})
  .then( food => {


    Food.remove({_id: req.params.id})
    .then(() => res.status(200).send('success1'))
    .catch(next);
  })
  .catch(next);
});
