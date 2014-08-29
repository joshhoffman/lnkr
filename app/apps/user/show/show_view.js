var DataTemplate = require('./templates/data.hbs');

module.exports = function(ShowUser, LinkManager,
                          Backbone, Marionette, $, _) {
    ShowUser.DataView = Marionette.ItemView.extend({
        template: DataTemplate
    });
};