module.exports = function(Pages, LinkManager,
                          Backbone, Marionette, $, _) {
    Pages.Contoller = {
       showHome: function() {
           var view = new Pages.Home();
           LinkManager.staticRegion.show(view);
       }
    };
};
