var editTemplate = require('./templates/edit.hbs');

module.exports = function(Edit, LinkManager,
                          Backbone, Marionette, $, _) {
    Edit.Link = LinkManager.Common.Views.Form.extend({
        template: editTemplate,

        initialize: function () {
            this.title = "Edit " + this.model.get("name");
            this.model.set("tags", this.model.get("tags").join(" "));
        },

        onRender: function() {
            if(this.options.generateTitle) {
                var $title = $("<h1>", { text: this.title });
                this.$el.prepend($title);
            }
        }
    });
};
