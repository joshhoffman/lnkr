(function() {
  var Controller, Link, LinkController,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('../configure/controller');

  Link = require('../models/link').linkModel;

  LinkController = (function(_super) {
    __extends(LinkController, _super);

    function LinkController(app) {
      console.log('link controller init');
      this._name = 'links';
      LinkController.__super__.constructor.call(this, app);
    }

    LinkController.prototype._get = function(req, res, next) {
      return Link.find(function(err, links) {
        if (err) {
          console.log(err);
          return;
        }
        return console.log(links);
      });
    };

    LinkController.prototype._post = function(req, res, next) {
      console.log('post test');
      return console.log(req.body);
    };

    return LinkController;

  })(Controller);

  module.exports = LinkController;

}).call(this);
