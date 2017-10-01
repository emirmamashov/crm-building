var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var glob = require('glob');
var i18n = require('i18n');
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
var jwt = require('jsonwebtoken');
var cors = require('cors');


var db = require('../Database/index');
var app = express();

i18n.configure({
  locales: ['ru', 'en', 'ky'],
  defaultLocale: 'ru',
  directory: __dirname + '/locales'
});

var sockets = {};

app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

db.Promise = require('bluebird');
db.connect(config.DB_URL);

app.set('db', db);
app.set('config', config);
app.set('superSecret', config.secret);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);


io.use((socket, next) => {
  let token = socket.handshake.query.token;
  //console.log(socket);
  if (!token) {
      return next(new Error("Not Authorized"));
  }
  jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      //console.log(decoded._doc);

      if (!decoded) {
          return next(new Error("Not Authorized"));
      }
      db.User.findById(decoded._doc._id, function(err, user) {
          if (err) {
              console.log(err);
              return next(new Error(err));
          }
          if (!user) {
              return next(new Error("Not Authorized"));
          }
          user.is_online = true;
          user.last_visit_date = new Date();
          user.save(function(err) {
              if (err) {
                  console.log(err);
                  return next(new Error(err));
              }
              socket.user = user;
              sockets[user._id] = socket;
              var userId = user._id;

              next();
          });

      });
  });
});


io.on('connection', (socket) => {
  console.log('--------------connected ' + socket.user._id + '-----------');
  var userId = socket.user._id;
  console.log('userId: ' + userId);
  socket.on('disconnect', () => {
      console.log('---------------disconnect ' + socket.user._id + '-------------');
      delete sockets[socket.user._id];
      socket.user.is_online = false;
      socket.user.last_visit_date = new Date();
      socket.user.save();

  });
});

var middlewares = glob.sync('./middleware/*.js');
middlewares.forEach(function(file) {
    require(file)(app, db);
});

var filters = glob.sync('./preroutes/*.js');
filters.forEach(function(file) {
    require(file)(preRoutes, app, db, sockets);
});
app.set('filters', preRoutes);


var routes = glob.sync('./routes/*.js');

routes.forEach(function(route) {
    require(route)(app, db);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app: app,
  io: io
}
