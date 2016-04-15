var express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  misspell = require('../../keys');

module.exports = function(app, config) {
  //Configuration Section
  app.set('views', config.rootPath + '/public');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(session({secret: misspell.secret, resave:false, saveUninitialized:false}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(config.rootPath + '/public'));

  //End of Configuration Section
};
