var homeTemplate = require('./templates/home.hbs');

module.exports = function(Pages, LinkManager,
                          Backbone, Marionette, $, _) {
    Pages.Home = Marionette.ItemView.extend({
        template: homeTemplate
    });
};
