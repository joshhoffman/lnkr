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
            
            view.on("navigate:register", function() {
                console.log('got navigate register');
                var view = new LinkManager.MenuModule.Register.Register();
                
                LinkManager.dialogRegion.show(view);
            });
            
            LinkManager.menuRegion.show(view);
        }
    };
};