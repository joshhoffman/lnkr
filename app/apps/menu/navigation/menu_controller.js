module.exports = function(Navigation, LinkManager,
                          Backbone, Marionette, $, _) {
    Navigation.Controller = {
        
        showMenu: function() {
            var view = new Navigation.Menu();
            
            view.on("navigate:home", function() {
                console.log('got navigate home');
                LinkManager.trigger("show:home");
            });
            
            view.on("navigate:login", function() {
                console.log('got navigate login');
                var view = new LinkManager.MenuModule.Login.Login();
                
                LinkManager.dialogRegion.show(view);
            });
            
            LinkManager.menuRegion.show(view);
        }
    };
};