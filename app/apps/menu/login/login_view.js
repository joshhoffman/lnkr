var loginTemplate = require('./templates/login.hbs');

module.exports = function(Login, LinkManager,
                          Backbone, Marionette, $, _) {
    Login.Login = LinkManager.Common.Views.Form.extend({
        template: loginTemplate,

        initialize: function() {
            this.title = "Login";
        }
    });
};