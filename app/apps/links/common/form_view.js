Syphon = require('backbone.syphon');
$ = require('jquery');

module.exports = function(Views, LinkManager,
                          Backbone, Marionette, $, _) {
    Views.Form = Marionette.ItemView.extend({
        events: {
            "click button.js-submit": "submitClicked"
        },

        initialize: function () {
            this.title = "Edit " + this.model.get("name");
        },

        submitClicked: function (e) {
            e.preventDefault();
            var data = Syphon.serialize(this);
            this.trigger("form:submit", data);
        },

        onFormDataInvalid: function (errors) {
            var $view = this.$el;

            var clearFormErrors = function () {
                console.log('form data invalid');
                var $form = $view.find('form');
                $form.find(".help-inline.error").each(function () {
                    $(this.remove);
                });
                $form.find(".control-group.error").each(function () {
                    $(this.remove);
                });
            };

            console.log('errors');

            var markError = function (value, key) {
                var $controlGroup = $view.find("#link-" + key).parent();
                var $errorEl = $("<span>", {class: "help-inline error", text: value});
                $controlGroup.append($errorEl).addClass("error");
            };

            clearFormErrors();
            _.each(errors, markError);
        }
    });
};
