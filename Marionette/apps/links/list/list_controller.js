module.exports = function(List, LinkManager,
                          Backbone, Marionette, $, _) {
    List.Controller = {
        listLinks: function() {
            var loadingView = new LinkManager.Common.Views.Loading();
            LinkManager.mainRegion.show(loadingView);
            
            var fetchingLinks = LinkManager.request("link:entities");
            
            $.when(fetchingLinks).done(function(links) {
                console.log('done fetching');
                var linksListView = new List.Links({
                    collection: links
                });
                
                linksListView.on("childview:link:delete", function(childView, model) {
                    model.destroy();
                });
                
                linksListView.on("childview:link:show", function(childview, model) {
                    LinkManager.trigger("link:show", model.get("id"));
                });
                
                LinkManager.mainRegion.show(linksListView);
            });
        }
    };
};