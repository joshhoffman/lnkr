var registerTemplate = require('./templates/register.hbs');

module.exports = function(Register, LinkManager,
                          Backbone, Marionette, $, _) {
    Register.Register = LinkManager.Common.Views.Form.extend({
        template: registerTemplate,

        initialize: function() {
            this.title = "Register";
        }
    });
};