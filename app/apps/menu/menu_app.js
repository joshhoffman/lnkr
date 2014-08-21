module.exports = function(MenuApp, LinkManager,
                                Backbone, Marionette, $, _) {
    MenuApp.Router = Marionette.AppRouter.extend();
    
    var API = {
    };
    
    LinkManager.on("show:menu", function() {
        MenuApp.Navigation.Controller.showMenu();
    });
    
    LinkManager.addInitializer(function() {
        new MenuApp.Router({
            controller: API
        });
    });
};