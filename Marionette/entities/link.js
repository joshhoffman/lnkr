var $ = require('jquery');

module.exports = function(Entities, LinkManager,
                          Backbone, Marionette, $, _) {
    Entities.Link = Backbone.Model.extend({
        urlRoot: "/api/links",
        defaults: {
            name: '',
            description: '',
            link: ''
        },
        
        validate: function(attrs, options) {
            
        }
    });
    
    Entities.LinkCollection = Backbone.Collection.extend({
        url: '/api/links',
        model: Entities.Link,
        comparator: 'name'
    });
    
    var links;
    var initializeLinks = function() {
        var links = new Entities.LinkCollection([
            {
                id: 1,
                name: 'test',
                description: 'test desc',
                link: 'google.com'
            }
        ]);
        
        return links.models;
    };
    
    var API = {
        getLinkEntities: function() {
            var links = new Entities.LinkCollection();
            var defer = $.Deferred();
            links.fetch({
                success: function(data) {
                    defer.resolve(data);
                }
            });
            
            var promise = defer.promise();
            
            $.when(promise).done(function(links) {
                if(links.length === 0) {
                    var models = initializeLinks();
                    links.reset(models);
                }
            });
            return promise;
        },
        
        getLinkEntity: function(linkId) {
            var link = new Entities.Link({id: linkId});
            var defer = $.Deferred();
            link.fetch({
                success: function(data) {
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