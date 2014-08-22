 module.exports = function(StaticApp, LinkManager,
                           Backbone, Marionette, $, _) {
     StaticApp.Router = Marionette.AppRouter.extend({
         appRoutes: {
             "/": "showHome",
             "/#": "showHome"
         }
     });

     var API = {
         showHome: function() {
             console.log('show home');
             StaticApp.Pages.Controller.showHome();
         }
     };

     LinkManager.on("show:home", function() {
         LinkManager.navigate("/");
         API.showHome();
     });

     LinkManager.addInitializer(function() {
         new StaticApp.Router({
             controller: API
         });
     });
 };