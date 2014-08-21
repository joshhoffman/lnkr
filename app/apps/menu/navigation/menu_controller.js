module.exports = function(Navigation, LinkManager,
                          Backbone, Marionette, $, _) {
    Navigation.Controller = {
        showMenu: function() {
            var view = new Navigation.Menu();
            LinkManager.menuRegion.show(view);
            
            view.on("childview:navigate:home", function() {
                LinkManager.navigate("/");
            });
        }
    };
};