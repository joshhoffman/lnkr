var newTemplate = require('./templates/new.hbs');

module.exports = function(New, LinkManager,
                          Backbone, Marionette, $, _) {
    New.Link = LinkManager.LinksModule.Common.Views.Form.extend({
        template: newTemplate
    });
};
