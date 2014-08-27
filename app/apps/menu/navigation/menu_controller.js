module.exports = function(Navigation, LinkManager,
                          Backbone, Marionette, $, _) {
    Navigation.Controller = {
        listNotAuthHeader: function() {
            var links = LinkManager.request("header:entities:notAuth");
            var headers = new Navigation.Headers({collection: links});
            
            headers.on("brand:clicked", function() {
                LinkManager.trigger("show:home");
            });
            
            headers.on("childview:navigate", function(childview, model) {
                var trigger = model.get("navigationTrigger");
                LinkManager.trigger(trigger);
            });
            
            LinkManager.headerRegion.show(headers);
        },
        
        listAuthHeader: function() {
            var links = LinkManager.request("header:entities:auth");
            var headers = new Navigation.Headers({collection: links});
            
            headers.on("brand:clicked", function() {
                LinkManager.trigger("show:home");
            });
            
            headers.on("childview:navigate", function(childview, model) {
                var trigger = model.get("navigationTrigger");
                LinkManager.trigger(trigger);
            });
            
            LinkManager.headerRegion.show(headers);
        },
        
        setActiveHeader: function(headerUrl) {
            var links;
            console.log(LinkManager.User);
            if(LinkManager.User) {
                links = LinkManager.request("header:entities:auth");
            } else {
                links = LinkManager.request("header:entities:notAuth");
            }
            
            var headerToSelect = links.find(function(header) { return header.get("url") == headerUrl; });
            headerToSelect.select();
            links.trigger("reset");
        }
    };
};