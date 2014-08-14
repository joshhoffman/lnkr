var editTemplate = require('./templates/edit.hbs');

module.exports = function(Edit, LinkManager,
                          Backbone, Marionette, $, _) {
    Edit.Link = LinkManager.LinksModule.Common.Views.Form.extend({
        template: editTemplate
    });
};
