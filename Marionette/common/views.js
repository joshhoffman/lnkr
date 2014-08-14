var loadingTemplate = require('./templates/loading.hbs');

module.exports = function(Views, LinkManager,
                          Backbone, Marionette, $, _) {
    Views.Loading = Marionette.ItemView.extend({
        template: loadingTemplate,
        title: "Loading Data",
        message: "test loading",
        initialize: function() {
            console.log('loading init');
        },
        serializeData: function() {
            console.log("loading serialize");
            return {
                title: Marionette.getOption(this, "title"),
                message: Marionette.getOption(this, "message")
            };
        }
    });
};