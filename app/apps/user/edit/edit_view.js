var EditTemplate = require('./templates/edit.hbs');

module.exports = function(UserEdit, LinkManager,
                          Backbone, Marionette, $, _) {
    UserEdit.Edit = LinkManager.Common.Views.Form.extend({
        template: EditTemplate,

        initialize: function() {
            this.title = "Edit " + this.model.get("displayName");
        }
    });
};
