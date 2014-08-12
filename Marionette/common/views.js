var loadingTemplate = require('./templates/loading.hbs');

module.exports = function(Views, LinkManager,
                          Backbone, Marionette, $, _) {
    Views.Loading = Marionette.ItemView.extend({
        template: loadingTemplate,
        title: "Loading Data",
        message: "test loading",
        serialzeData: function() {
            return {
                title: Marionette.getOption(this, "title"),
                message: Marionette.getOption(this, "message")
            };
        }
    });
};