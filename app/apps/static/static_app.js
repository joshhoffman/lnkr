 module.exports = function(StaticApp, LinkManager,
                           Backbone, Marionette, $, _) {
     StaticApp.Router = Marionette.AppRouter.extend();

     var API = {
     };

     LinkManager.on("show:home", function() {
         StaticApp.Pages.Controller.showHome();
     });

     LinkManager.addInitializer(function() {
         new StaticApp.Router({
             controller: API
         });
     });
 };