module.exports = function(MenuApp, LinkManager,
                                Backbone, Marionette, $, _) {
    var API = {
        listAuthHeader: function() {
            MenuApp.Navigation.Controller.listAuthHeader();
        },
        listNotAuthHeader: function() {
            MenuApp.Navigation.Controller.listNotAuthHeader();
        }
    };
    
    LinkManager.commands.setHandler("set:active:header", function(name) {
        MenuApp.Navigation.Controller.setActiveHeader(name);
    });
    
    var getAuthorized = function(fireEvent) {
            $.ajax("api/loggedin", {
                type: "GET",
                dataType: "json",
                success: function(data) {
                    if(data.email) {
                        LinkManager.User = LinkManager.request("get:new:user", data);
                        if(fireEvent) {
                            LinkManager.trigger("authentication:auth");
                        }
                    }
                },
                error :function(data) {
                    if(fireEvent) {
                        LinkManager.trigger("authentication:notAuth");
                    }
                }
            });
        };
    
    MenuApp.on("start", function() {
        getAuthorized(true);
        
        LinkManager.on("login:success", function() {
            getAuthorized(false);
        });
        
        LinkManager.on("register:success", function() {
            getAuthorized(false);
        });
        
        LinkManager.on("authentication:notAuth", function() {
            API.listNotAuthHeader();
        });
        
        LinkManager.on("authentication:auth", function() {
            API.listAuthHeader();
        });

        LinkManager.on("authentication:loggedOut", function() {
            LinkManager.trigger("show:home");
            API.listNotAuthHeader();
        });
        
        LinkManager.on("navigate:login", function() {
            MenuApp.Common.AuthenticationController.showLogin();
        });
        
        LinkManager.on("navigate:register", function() {
            MenuApp.Common.AuthenticationController.showRegister();
        });
        
        LinkManager.on("navigate:logout", function() {
            $.ajax("api/logout", {
                type: "GET",
                dataType: "json",
                success: function(data) {
                    console.log('success');
                    console.log(data);
                    LinkManager.trigger("authentication:loggedOut");
                }
            });
        });
        
        LinkManager.on("login:unauthorized", function(text) {
            LinkManager.trigger("authentication:notAuth");
            MenuApp.Common.AuthenticationController.showLogin(text);
        });
    });
};