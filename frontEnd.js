(function() {
  var app, config, express, fs, path, port, proxy, ret, url;

  express = require('express');

  path = require('path');

  fs = require('fs');

  config = require('./configure/config');

  proxy = require('proxy-middleware');

  url = require('url');

  app = express();

  app.use('/api', proxy(url.parse('http://0.0.0.0:5001/api')));

  config.config(app);

  app.get('/', function(req, res) {
    return fs.readFile('/public/index.html', function(err, html) {
      if (err) {
        throw err;
      }
      res.writeHeader(200, {
        "Content-Type": "text/html"
      });
      res.write(html);
      return res.end();
    });
  });

  port = app.get('port');

  ret = app.listen(port, function() {
    return console.log('front endconnected on port ' + port);
  });

}).call(this);
