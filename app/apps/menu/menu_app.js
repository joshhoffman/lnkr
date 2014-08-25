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
            var view = new LinkManager.MenuModule.Login.Login();
            
            LinkManager.dialogRegion.show(view);
        });
        
        LinkManager.on("navigate:register", function() {
            var view = new LinkManager.MenuModule.Register.Register();
            
            LinkManager.dialogRegion.show(view);
        });
    });
};