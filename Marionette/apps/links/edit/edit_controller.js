module.exports = function(Edit, LinkManager,
                          Backbone, Marionette, $, _) {
    Edit.Controller = {
        editLink: function(id) {
            /*var loadingView = LinkManager.Common.Views.Loading({
                title: "Loading edit",
                message: "Please wait"
            });
            console.log('before show');
            LinkManager.mainRegion.show(loadingView);

            console.log('after show');*/

            var fetchingLink = LinkManager.request("link:entity", id);
            $.when(fetchingLink).done(function(link) {
                var view;
                if(link !== undefined) {
                    view = new Edit.Link({
                        model: link,
                        generateTitle: true
                    });

                    view.on("form:submit", function(data) {
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
