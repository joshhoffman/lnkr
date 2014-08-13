var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

var LinkManager = require('./app');

var LinksApp = require('./apps/links/links_app');
var Entities = require('./entities/link');
var Views = require('./common/views');

var ListController = require('./apps/links/list/list_controller');
var ListView = require('./apps/links/list/list_view');
var EditController = require('./apps/links/edit/edit_controller');
var EditView = require('./apps/links/edit/edit_view');
var ShowController = require('./apps/links/show/show_controller');
var ShowView = require('./apps/links/show/show_view');

LinkManager.addRegions({
    mainRegion: "#main-region",
    dialogRegion: "#dialog-region"
});

LinkManager.navigate = function(route, options) {
    options = options || {};
    Backbone.history.navigate(route, options);
};

LinkManager.getCurrentRoute = function() {
    return Backbone.history.fragment;
};

LinkManager.on("start", function() {
    if(Backbone.history) {
        Backbone.history.start();
    }
    
    if(this.getCurrentRoute() === "") {
        console.log("triggering event");
        LinkManager.trigger("links:list");
    }
    console.log("LinkManager has started");
});

LinkManager.module("Entities", Entities);
LinkManager.module("Common.Views", Views);
LinkManager.module("LinksModule", LinksApp);
LinkManager.module("LinksModule.List", ListView);
LinkManager.module("LinksModule.List", ListController);
LinkManager.module("LinksModule.Edit", EditView);
LinkManager.module("LinksModule.Edit", EditController);
LinkManager.module("LinksModule.Show", ShowView);
LinkManager.module("LinksModule.Show", ShowController);

LinkManager.start();