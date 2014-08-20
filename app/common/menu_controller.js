module.exports = function(Menu, LinkManager,
                          Backbone, Marionette, $, _) {
    Menu.Controller = {
        showMenu: function() {
            var view = new Menu.Menu();
            LinkManager.menuRegion.show(view);
            
            view.on("childview:navigate:home", function() {
                LinkManager.navigate("/");
            });
        }
    };
};