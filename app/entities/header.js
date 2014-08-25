module.exports = function(Entities, LinkManager, Backbone, Marionette, $, _){
    Entities.Header = Backbone.Model.extend({
        initialize: function(){
            var selectable = new Backbone.Picky.Selectable(this);
            _.extend(this, selectable);
        }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
        model: Entities.Header,

        initialize: function(){
            var singleSelect = new Backbone.Picky.SingleSelect(this);
            _.extend(this, singleSelect);
        }
    });

    var initializeHeaders = function(){
        Entities.headers = new Entities.HeaderCollection([
            { name: "Links", url: "links", navigationTrigger: "links:list" },
            { name: "About", url: "about", navigationTrigger: "about:show" },
            { name: "Login", url: "login", navigationTrigger: "navigate:login" },
            { name: "Register", url: "register", navigationTrigger: "navigate:register" }
        ]);
    };

    var API = {
        getHeaders: function(){
            if(Entities.headers === undefined){
                initializeHeaders();
            }
            return Entities.headers;
        }
    };

    LinkManager.reqres.setHandler("header:entities", function(){
        return API.getHeaders();
    });
};
