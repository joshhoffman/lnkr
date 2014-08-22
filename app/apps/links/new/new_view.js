var newTemplate = require('./templates/new.hbs');

module.exports = function(New, LinkManager,
                          Backbone, Marionette, $, _) {
    New.Link = LinkManager.Common.Views.Form.extend({
        template: newTemplate,

        initialize: function() {
            this.title = "New Link";
        }
    });
};
