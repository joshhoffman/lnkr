var validator = require('validator');

module.exports = function(Entities, LinkManager,
                          Backbone, Marionette, $, _) {
    Entities.LoginModel = Backbone.Model.extend({
        defaults: {
            email: '',
            password: ''
        },

        urlRoot: '/api/login',

        validate: function(attrs, options) {
        }
    });

    Entities.RegisterModel = Backbone.Model.extend({
        defaults: {
            email: '',
            password: '',
            confirmpassword: '',
            displayName: ''
        },

        urlRoot: '/api/register',

        validate: function(attrs, options) {
        }
    });
};