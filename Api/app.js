var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development';
var config = require('./config.js');
var db = require(config.DB_PATH + '/index')
db.connect(config[env].url);
var cors = require('cors');

var app = express();

app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//allow CORS
app.use(cors());

app.set('config', config);
app.set('db', db);
app.use(express.static('attachments'));

require('./initialization.js')(app);

module.exports = app;
