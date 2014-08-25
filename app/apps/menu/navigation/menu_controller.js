module.exports = function(Navigation, LinkManager,
                          Backbone, Marionette, $, _) {
    Navigation.Controller = {
        
        listHeader: function() {
            var links = LinkManager.request("header:entities");
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
            var links = LinkManager.request("header:entities");
            var headerToSelect = links.find(function(header) { return header.get("url") == headerUrl; });
            headerToSelect.select();
            links.trigger("reset");
        }
    };
};