var validator = require('validator');

module.exports = function(Entities, LinkManager,
                          Backbone, Marionette, $, _) {
    Entities.LoginModel = Backbone.Model.extend({
        defaults: {
            email: '',
            password: '',
        },

        urlRoot: '/api/login',

        validate: function(attrs, options) {
            var errors = {};
            if(!validator.isEmail(attrs.email)) {
                errors.email = "invalid email";
            }

            if(!_.isEmpty(errors)) {
                return errors;
            }
        }
    });

    Entities.RegisterModel = Backbone.Model.extend({
        defaults: {
            email: '',
            password: '',
            confirmPassword: '',
            displayName: ''
        },

        urlRoot: '/api/register',

        validate: function(attrs, options) {
            var errors = {};
            if(!validator.isEmail(attrs.email)) {
                errors.email = "invalid email";
            }
            if(attrs.password !== attrs.confirmPassword) {
                errors.confirmPassword = "passwords must match";
            }
            if(attrs.password.length < 5) {
                errors.password = "password must be 5 characters";
            }

            if(!_.isEmpty(errors)) {
                return errors;
            }
        }
    });
};