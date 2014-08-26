var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
Backbone.Picky = require('./vendor/backbone.picky');

var LinkManager = new Marionette.Application();

var LinksApp = require('./apps/links/links_app');
var LinkEntity = require('./entities/link');
var Header = require('./entities/header');
var CommonEntities = require('./entities/common');
var AuthenticationEntities = require('./entities/authentication');
var Views = require('./common/views');
var MenuApp = require('./apps/menu/menu_app');
var NavigationController = require('./apps/menu/navigation/menu_controller');
var NavigationView = require('./apps/menu/navigation/menu_view');
var LoginView = require('./apps/menu/login/login_view');
var RegisterView = require('./apps/menu/register/register_view');
var AuthenticationController = require('./apps/menu/common/authentication_controller');

var StaticApp = require('./apps/static/static_app');
var PagesController = require('./apps/static/pages/pages_controller');
var HomeView = require('./apps/static/pages/home_view');
var AboutView = require('./apps/static/pages/about_view');

var ListLayout = require('./apps/links/list/list_layout');
var ListController = require('./apps/links/list/list_controller');
var ListView = require('./apps/links/list/list_view');
var EditController = require('./apps/links/edit/edit_controller');
var EditView = require('./apps/links/edit/edit_view');
var NewView = require('./apps/links/new/new_view');
var ShowController = require('./apps/links/show/show_controller');
var ShowView = require('./apps/links/show/show_view');

var dialog = require('./apps/config/marionette/dialog');

Marionette.Region.Dialog = Marionette.Region.extend(dialog);

LinkManager.addRegions({
    mainRegion: "#main-region",
    dialogRegion: Marionette.Region.Dialog.extend({
        el: "#dialog-region"
    }),
    headerRegion: "#menu-region"
});

LinkManager.navigate = function(route, options) {
    options = options || {};
    console.log(route);
    Backbone.history.navigate(route, options);
};

LinkManager.getCurrentRoute = function() {
    return Backbone.history.fragment;
};

LinkManager.on("login:success", function() {
    LinkManager.navigate(LinkManager.getCurrentRoute());
});

LinkManager.on("start", function() {
    if(Backbone.history) {
        Backbone.history.start();
    }
    
    if(this.getCurrentRoute() === "") {
        LinkManager.trigger("show:home");
    }
    
    LinkManager.trigger("show:menu");
    
    console.log("LinkManager has started");
});

LinkManager.module("Entities", LinkEntity);
LinkManager.module("Entities", Header);
LinkManager.module("Entities", CommonEntities);
LinkManager.module("Entities", AuthenticationEntities);
LinkManager.module("Common.Views", Views);

LinkManager.module("MenuModule", MenuApp);
LinkManager.module("MenuModule.Navigation", NavigationView);
LinkManager.module("MenuModule.Navigation", NavigationController);
LinkManager.module("MenuModule.Login", LoginView);
LinkManager.module("MenuModule.Register", RegisterView);
LinkManager.module("MenuModule.Common", AuthenticationController);

LinkManager.module("StaticModule", StaticApp);
LinkManager.module("StaticModule.Pages", HomeView);
LinkManager.module("StaticModule.Pages", AboutView);
LinkManager.module("StaticModule.Pages", PagesController);

LinkManager.module("LinksModule", LinksApp);
LinkManager.module("LinksModule.List", ListLayout) ;
LinkManager.module("LinksModule.List", ListView);
LinkManager.module("LinksModule.List", ListController);
LinkManager.module("LinksModule.Edit", EditView);
LinkManager.module("LinksModule.Edit", EditController);
LinkManager.module("LinksModule.New", NewView);
LinkManager.module("LinksModule.Show", ShowView);
LinkManager.module("LinksModule.Show", ShowController);

LinkManager.start();