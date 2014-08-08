(function() {
  var app, config, db, express, fs, mongoose, path, port, redis, ret, routes;

  express = require('express');

  path = require('path');

  redis = require('redis');

  fs = require('fs');

  config = require('./configure/config');

  routes = require('./apiRoutes/apiRoutes');

  mongoose = require('mongoose');

  app = express();

  db = mongoose.connection;

  db.on("error", function(err) {
    return console.log("Mongo Error " + err);
  });

  mongoose.connect('mongodb://localhost/lnkr');

  config.config(app);

  routes.routes(app);


  /*
  app.get '/readitem', (req, res) ->
      console.log('')
  
  app.get '/readitems', (req, res) ->
      console.log('readitems')
       *db.set('key', 'val', redis.print)
      db.hgetall 'test1', (err, obj) ->
          console.log 'getting all'
          console.log(obj)
          res.json(obj)
  
  app.post '/readitem', (req, res) ->
      console.log 'post readitem'
      console.log(req.body)
      console.log db.hmset 'test1', 'name', req.body.name, 'link', req.body.link, (err, obj) ->
          console.log('saved')
          res.json({ status: 'success' })
   */

  port = app.get('port');

  ret = app.listen(port, function() {
    return console.log('api connected on port ' + port);
  });

}).call(this);
