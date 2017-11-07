var glob = require('glob');

module.exports = function(app) {
  var config = app.get('config');
  //Token initialized
  require('./token')(app);
  //midlleware initialized
  var middlewares = glob.sync(config.ROOT + '/middleware/*.js');
  
  middlewares.forEach(function(file) {
    require(file)(app);
  });
  
  //filters initialized
  var filterFiles = glob.sync(config.ROOT + '/filters/*.js');
  var filters = {};
  
  filterFiles.forEach(function(filterFile) {
    require(filterFile)(filters);
  });
  app.set('filters', filters);
  
  
  //Routes initialized
  var routes = glob.sync(config.ROOT + '/routes/*.js');
  
  routes.forEach(function(route) {
    require(route)(app);
  });
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
}