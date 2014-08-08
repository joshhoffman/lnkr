
/*
Controller = (app) ->
    var self = this;
    var name = '/api/' + this._name;
    app.post name, (req, res, next) ->
        self._post req, res, next
    app.get name, (req,res,next) ->
        self._get req, res, next

Controller.prototype._name = ''

Controller.prototype._get = (req, res, next) ->
    pass

Controller.prototype._post = (req, res, next) ->
    pass
 */

(function() {
  var Controller;

  Controller = (function() {
    function Controller(app) {
      var name, self;
      console.log('controller init');
      self = this;
      name = '/api/' + this._name;
      app.post(name, function(req, res, next) {
        return self._post(req, res, next);
      });
      app.get(name, function(req, res, next) {
        return self._get(req, res, next);
      });
      app.put(name, function(req, res, next) {
        return self._put(req, res, next);
      });
      app["delete"](name, function(req, res, next) {
        return self._delete(req, res, next);
      });
    }

    Controller.prototype._get = function(req, res, next) {};

    Controller.prototype._post = function(req, res, next) {};

    Controller.prototype._put = function(req, res, next) {};

    Controller.prototype._delete = function(req, res, next) {};

    return Controller;

  })();

  module.exports = Controller;

}).call(this);
