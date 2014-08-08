(function() {
  var LinkController;

  LinkController = require('../APIControllers/linkController');

  exports.routes = function(app) {
    var linkController;
    app.get('/api/test', function(req, res) {
      return res.json({
        'test': 'testdata'
      });
    });
    return linkController = new LinkController(app);
  };


  /*
      app.post '/api/links', (req, res) ->
          console.log('test')
          console.log req.body
  
      app.get '/api/links', (req, res) ->
          link.find (err, links) ->
              if err
                  console.log err
                  return
  
              console.log links
   */

}).call(this);
