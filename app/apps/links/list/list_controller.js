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

                linksListPanel.on("link:new", function() {
                    var newLink = new LinkManager.Entities.Link();

                    var view = new LinkManager.LinksModule.New.Link({
                        model: newLink,
                        asModal: true
                    });

                    view.on("form:submit", function(data) {
                        if(newLink.save(data)) {
                            links.add(newLink);
                            view.trigger("dialog:close");
                            linksListView.children.findByModel(newLink).flash("success");
                        } else {
                            view.triggerMethod("form:data:invalid", newLink.validationError);
                        }
                    });

                    LinkManager.dialogRegion.show(view);
                });

                linksListView.on("childview:link:delete", function(childView, args) {
                    var model = args.model;
                    console.log('in delete');
                    console.log(model);
                    model.destroy({
                        success: function() {
                            console.log('delete success');
                        },
                        error: function() {
                            console.log('error');
                        }
                    });
                });
                
                linksListView.on("childview:link:show", function(childView, args) {
                    LinkManager.trigger("link:show", args.model.get("id"));
                });

                linksListView.on("childview:link:edit", function(childView, args) {
                    var model = args.model;
                    var view = new LinkManager.LinksModule.Edit.Link({
                        model: model
                    });
                    
                    view.on("form:submit", function(data) {
                        if(model.save(data)) {
                            childView.render();
                            view.trigger("dialog:close");
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