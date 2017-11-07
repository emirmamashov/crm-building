var jwt = require('jsonwebtoken');


module.exports = function(app) {
  var db = app.get('db');
  var config = app.get('config');
  var token = {};
  
  token.sign = function(data) {
    return jwt.sign(data, config.PRIVATE_KEY, {expiresIn: '1d'});
  },
   
   token.auth = function(req, res, next) {
     var token = req.get('CRM-Auth-Token');
     if(!token) {
       return next();
     }
     jwt.verify(token, config.PRIVATE_KEY, function(err, data) {
       if(!data) {
         return next();
       }
       req.user_id = data.user_id;
       next();
     })
   }
  
  app.use(token.auth);
  app.set('token', token);
}