var app = require('../../app');

module.exports = function(LinksApp, LinkManager,
                                Backbone, Marionette, $, _) {
    LinksApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "links": "listLinks"
        }
    });
    
    var API = {
        listLinks: function() {
            LinksApp.List.Controller.listLinks();
        }
    };
    
    LinkManager.on("links:list", function(){
        console.log('got event');
        LinkManager.navigate("links");
        API.listLinks();
    });
    
    LinkManager.addInitializer(function() {
        new LinksApp.Router({
            controller: API
        });
    });
};