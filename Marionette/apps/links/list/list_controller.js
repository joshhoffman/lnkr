var $ = require('jquery');
require('jquery-ui');

module.exports = function(List, LinkManager,
                          Backbone, Marionette, $, _) {
    List.Controller = {
        listLinks: function() {
            var loadingView = new LinkManager.Common.Views.Loading();
            LinkManager.mainRegion.show(loadingView);

            var linksLayoutView = new List.Layout();
            var linksListPanel = new List.Panel();
            
            var fetchingLinks = LinkManager.request("link:entities");
            
            $.when(fetchingLinks).done(function(links) {
                console.log('done fetching');
                var linksListView = new List.Links({
                    collection: links
                });

                linksLayoutView.on("show", function() {
                    linksLayoutView.panelRegion.show(linksListPanel);
                    linksLayoutView.linksRegion.show(linksListView);
                });

                linksListView.on("childview:link:delete", function(childView, model) {
                    console.log('in delete');
                    model.destroy({
                        success: function() {
                            console.log('delete success');
                        },
                        error: function() {
                            console.log('error');
                        }
                    });
                });
                
                linksListView.on("childview:link:show", function(childView, model) {
                    LinkManager.trigger("link:show", model.get("id"));
                });

                linksListView.on("childview:link:edit", function(childView, model) {
                    var view = new LinkManager.LinksModule.Edit.Link({
                        model: model,
                        asModal: true
                    });
                    
                    view.on("form:submit", function(data) {
                        if(model.save(data)) {
                            childView.render();
                            LinkManager.dialogRegion.empty();
                            childView.flash("success");
                        } else {
                            view.triggerMethod("form:data:invalid", model.validationError);
                        }
                    });

                    LinkManager.dialogRegion.show(view);
                });
                
                LinkManager.mainRegion.show(linksLayoutView);
            });
        }
    };
};