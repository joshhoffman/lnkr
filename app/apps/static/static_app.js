 module.exports = function(StaticApp, LinkManager,
                           Backbone, Marionette, $, _) {
     StaticApp.Router = Marionette.AppRouter.extend({
         appRoutes: {
             "/": "showHome",
             "/#": "showHome",
             "about": "showAbout"
         }
     });

     var API = {
         showHome: function() {
             console.log('show home');
             StaticApp.Pages.Controller.showHome();
         },
         showAbout: function() {
             console.log("show about");
             StaticApp.Pages.Controller.showAbout();
         }
     };

     LinkManager.on("show:home", function() {
         LinkManager.navigate("/");
         API.showHome();
     });
     
     LinkManager.on("show:about", function() {
         LinkManager.navigate("about");
         API.showAbout();
     });

     LinkManager.addInitializer(function() {
         new StaticApp.Router({
             controller: API
         });
     });
 };