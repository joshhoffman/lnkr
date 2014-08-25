module.exports = function(Edit, LinkManager,
                          Backbone, Marionette, $, _) {
    Edit.Controller = {
        editLink: function(id) {
            var fetchingLink = LinkManager.request("link:entity", id);
            $.when(fetchingLink).done(function(link) {
                var view;
                if(link !== undefined) {
                    view = new Edit.Link({
                        model: link,
                        generateTitle: true
                    });

                    view.on("form:submit", function(data) {
                        data.tags = data.tags.split(" ");
                        if(link.save(data)) {
                            LinkManager.trigger("link:show", link.get("id"));
                        } else {
                            console.log('triggering method');
                            view.triggerMethod("form:data:invalid", link.validationError);
                        }
                    });
                } else {
                    view = new LinkManager.LinksApp.Show.MissingLink();
                }

                LinkManager.mainRegion.show(view);
            });
        }
    };
};
