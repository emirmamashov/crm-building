var express = require('express');
var router = express.Router();

/* GET home page. */


module.exports = (app)=> {
  router.get('/', function (req, res, next) {
    res.json({message: 'Hello world'})
  });
  app.use('/', router)
  
};
