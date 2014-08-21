var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

var LinkManager = new Marionette.Application();

var LinksApp = require('./apps/links/links_app');
var Entities = require('./entities/link');
var Views = require('./common/views');
var MenuApp = require('./apps/menu/menu_app');
var MenuController = require('./apps/menu/navigation/menu_controller');
var MenuView = require('./apps/menu/navigation/menu_view');

var ListLayout = require('./apps/links/list/list_layout');
var ListController = require('./apps/links/list/list_controller');
var ListView = require('./apps/links/list/list_view');
var EditController = require('./apps/links/edit/edit_controller');
var EditView = require('./apps/links/edit/edit_view');
var NewView = require('./apps/links/new/new_view');
var ShowController = require('./apps/links/show/show_controller');
var ShowView = require('./apps/links/show/show_view');
var ListCommonViews = require('./apps/links/common/form_view');

var dialog = require('./apps/config/marionette/dialog');

Marionette.Region.Dialog = Marionette.Region.extend(dialog);

LinkManager.addRegions({
    mainRegion: "#main-region",
    dialogRegion: Marionette.Region.Dialog.extend({
        el: "#dialog-region"
    }),
    menuRegion: "#menu-region"
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
    //LinkManager.Common.Views.Menu.Controller.showMenu();
    LinkManager.trigger("show:menu");
    
    console.log("LinkManager has started");
});

LinkManager.module("Entities", Entities);
LinkManager.module("Common.Views", Views);

LinkManager.module("MenuModule", MenuApp);
LinkManager.module("MenuModule.Navigation", MenuView);
LinkManager.module("MenuModule.Navigation", MenuController);

LinkManager.module("LinksModule", LinksApp);
LinkManager.module("LinksModule.Common.Views", ListCommonViews);
LinkManager.module("LinksModule.List", ListLayout) ;
LinkManager.module("LinksModule.List", ListView);
LinkManager.module("LinksModule.List", ListController);
LinkManager.module("LinksModule.Edit", EditView);
LinkManager.module("LinksModule.Edit", EditController);
LinkManager.module("LinksModule.New", NewView);
LinkManager.module("LinksModule.Show", ShowView);
LinkManager.module("LinksModule.Show", ShowController);

LinkManager.start();