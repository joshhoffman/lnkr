var validator = require('validator');

module.exports = function(Entities, LinkManager,
                          Backbone, Marionette, $, _) {
    Entities.User = Backbone.Model.extend({
        urlRoot: '/api/users',
        defaults: {
            email: '',
            roles: [],
            displayName: ''
        },

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

    Entities.UserCollection = Backbone.Collection.extend({
        url: '/api/users',
        model: Entities.User
    });

    var API = {
        getUserEntities: function() {
            var users = new Entities.UserCollection();
            var defer = $.Deferred();
            users.fetch({
                success: function(data) {
                    defer.resolve(data);
                },
                error: function(collection, error, options) {
                    if(error.status === 401) {
                        LinkManager.trigger("login:unauthorized", error.responseText);
                    }
                }
            });

            return defer.promise();
        },

        getUserEntity: function(userId) {
            var user = new Entities.User({id: userId});
            var defer = $.Deferred();
            user.fetch({
                success: function(data) {
                    defer.resolve(data);
                },
                error: function(collection, error, options) {
                    if(error.status === 401) {
                        LinkManager.trigger("login:unauthorized", error.responseText);
                    } else {
                        defer.resolve(undefined);
                    }
                }
            });
            
            return defer.promise();
        }
    };
    
    LinkManager.reqres.setHandler("get:new:user", function(data) {
        return new Entities.User(data);
    });

    LinkManager.reqres.setHandler("user:entities", function () {
        return API.getUserEntities();
    });

    LinkManager.reqres.setHandler("user:entity", function (id) {
        return API.getUserEntity(id);
    });
};