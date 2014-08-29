var LayoutTemplate = require('./templates/layout.hbs');
var FormTemplate = require('./templates/form.hbs');

module.exports = function(ShowUser, LinkManager,
                          Backbone, Marionette, $, _) {
    ShowUser.Layout = Marionette.LayoutView.extend({
        template: LayoutTemplate,
        regions: {
            dataRegion: "#data-region",
            formRegion: "#form-region"
        }
    });

    ShowUser.Form = Marionette.ItemView.extend({
        template: FormTemplate,
        trigger: {
            "click button.js-edit": "user:edit"
        }
    });
};