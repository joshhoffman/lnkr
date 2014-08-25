var $ = require('jquery');

module.exports = function(Entities, LinkManager,
                          Backbone, Marionette, $, _) {
    Entities.Link = Backbone.Model.extend({
        urlRoot: "/api/links",
        defaults: {
            name: '',
            description: '',
            link: '',
            createdOn: '',
            tags: []
        },
        
        validate: function(attrs, options) {
            console.log('in validate');
            var errors = {};

            if(!attrs.name) {
                errors.name = "can't be blank";
            }
            if(!attrs.link) {
                errors.link = "can't be blank";
            }

            if(!_.isEmpty(errors)) {
                console.log('errors not empty');
                return errors;
            }
        }
    });
    
    Entities.LinkCollection = Backbone.Collection.extend({
        url: '/api/links',
        model: Entities.Link,
        comparator: 'name'
    });
    
    var API = {
        getLinkEntities: function() {
            var links = new Entities.LinkCollection();
            var defer = $.Deferred();
            links.fetch({
                success: function(data) {
                    defer.resolve(data);
                }
            });
            
            return defer.promise();
        },
        
        getLinkEntity: function(linkId) {
            var link = new Entities.Link({id: linkId});
            var defer = $.Deferred();
            link.fetch({
                success: function(data) {
                    console.log(data);
                    
                    defer.resolve(data);
                },
                error: function(data) {
                    defer.resolve(undefined);
                }
            });
            return defer.promise();
        }
    };
    
    LinkManager.reqres.setHandler("link:entities", function() {
        return API.getLinkEntities();
    });
    
    LinkManager.reqres.setHandler("link:entity", function(id) {
        return API.getLinkEntity(id);
    });
};