module.exports = function(Pages, LinkManager,
                          Backbone, Marionette, $, _) {
    Pages.Controller = {
       showHome: function() {
           var view = new Pages.Home();
           LinkManager.mainRegion.show(view);
       },
       
        showAbout: function() {
            var view = new Pages.About();
            LinkManager.mainRegion.show(view);
        }
    };
};
