(function() {
  var bodyParser, cookieParser, errorHandler, express, expressJson, favicon, methodOverride, morgan, path, session, url;

  favicon = require('serve-favicon');

  morgan = require('morgan');

  cookieParser = require('cookie-parser');

  session = require('express-session');

  expressJson = require('express-json');

  methodOverride = require('method-override');

  errorHandler = require('errorhandler');

  bodyParser = require('body-parser');

  path = require('path');

  express = require('express');

  url = require('url');

  exports.config = function(app) {
    app.set('port', process.argv[2] || 5001);
    app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
    app.use(morgan('dev', {
      immediate: true
    }));
    app.use(expressJson());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('totes secret'));
    app.use(session({
      secret: 'yeaaaboy',
      resave: true,
      saveUninitialized: false
    }));
    app.use(express["static"](path.join(__dirname, '../public')));
    if ('development' === app.get('env')) {
      return app.use(errorHandler());
    }
  };

}).call(this);
