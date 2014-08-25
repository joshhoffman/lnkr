var aboutTemplate = require('./templates/about.hbs');

module.exports = function(Pages, LinkManager,
                          Backbone, Marionette, $, _) {
    Pages.About = Marionette.ItemView.extend({
        template: aboutTemplate
    });
};
