module.exports = function(MenuApp, LinkManager,
                                Backbone, Marionette, $, _) {
    var API = {
        listHeader: function() {
            MenuApp.Navigation.Controller.listHeader();
        }
    };
    
    LinkManager.commands.setHandler("set:active:header", function(name) {
        MenuApp.Navigation.Controller.setActiveHeader(name);
    });
    
    MenuApp.on("start", function() {
        API.listHeader();
        
        LinkManager.on("navigate:login", function() {
            MenuApp.Common.AuthenticationController.showLogin();
        });
        
        LinkManager.on("navigate:register", function() {
            MenuApp.Common.AuthenticationController.showRegister();
        });
        
        LinkManager.on("login:unauthorized", function(text) {
            MenuApp.Common.AuthenticationController.showLogin(text);
        });
    });
};