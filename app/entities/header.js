module.exports = function(Entities, LinkManager, Backbone, Marionette, $, _) {
    Entities.Header = Backbone.Model.extend({
        initialize: function() {
            var selectable = new Backbone.Picky.Selectable(this);
            _.extend(this, selectable);
        }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
        model: Entities.Header,

        initialize: function() {
            var singleSelect = new Backbone.Picky.SingleSelect(this);
            _.extend(this, singleSelect);
        }
    });

    var initializeHeaders = function() {
        Entities.headers = {
            auth: new Entities.HeaderCollection([{
                name: "Links",
                url: "links",
                navigationTrigger: "links:list"
            }, {
                name: "About",
                url: "about",
                navigationTrigger: "show:about"
            }, {
                name: "User",
                url: "about",
                navigationTrigger: "show:user"
            }, {
                name: "Logout",
                url: "Logout",
                navigationTrigger: "navigate:logout"
            }]),
            
            notAuth: new Entities.HeaderCollection([{
                name: "About",
                url: "about",
                navigationTrigger: "show:about"
            }, {
                name: "Login",
                url: "login",
                navigationTrigger: "navigate:login"
            }, {
                name: "Register",
                url: "register",
                navigationTrigger: "navigate:register"
            }])
        };
    };

    var API = {
        getAuthHeaders: function() {
            if (Entities.headers === undefined) {
                initializeHeaders();
            }
            return Entities.headers.auth;
        },
        getNotAuthHeaders: function() {
            if (Entities.headers === undefined) {
                initializeHeaders();
            }
            return Entities.headers.notAuth;
        }
    };

    LinkManager.reqres.setHandler("header:entities:auth", function() {
        return API.getAuthHeaders();
    });
    
    LinkManager.reqres.setHandler("header:entities:notAuth", function() {
        return API.getNotAuthHeaders();
    });
};
