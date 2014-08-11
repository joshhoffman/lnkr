var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

// create app module
var LinkModule = require('apps/links/module');

var app = Marionette.Application();

// register module
app.module('link', LinkModule);

app.start();

//LinkApplication.start();
Backbone.history.start();

module.exports = app;