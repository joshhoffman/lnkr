Syphon = require('backbone.syphon');
$ = require('jquery');
var editTemplate = require('./templates/edit.hbs');

module.exports = function(Edit, LinkManager,
                          Backbone, Marionette, $, _) {
    Edit.Link = Marionette.ItemView.extend({
        template: editTemplate,

        events: {
            "click button.js-submit": "submitClicked"
        },
        
        initialize: function() {
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
                var $errorEl = $("<span>", {class: "help-inline error", text:value});
                $controlGroup.append($errorEl).addClass("error");
            };

            clearFormErrors();
            _.each(errors, markError);
        },
        
        onRender: function() {
            if(!this.options.asModal) {
                var $title = $("<h1>", {text: this.title});
                this.$el.prepend($title);
            }
        },
        
        onShow: function() {
            if(this.options.asModal) {
                this.$el.dialog({
                    modal: true,
                    title: this.title,
                    width: "auto"
                });
            }
        }
    });
};
