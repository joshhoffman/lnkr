module.exports = function(ShowUser, LinkManager,
                          Backbone, Marionette, $, _) {
    ShowUser.Controller = {
        showUser: function() {
            var fetchingLink;
            if(LinkManager.User) {
                fetchingLink = LinkManager.request("user:entity", LinkManager.User.get("displayName"));
            } else {
                LinkManager.trigger("login:unauthorized");
                return;
            }
            $.when(fetchingLink).done(function(user){
                var userLayoutView = new ShowUser.Layout();
                if(user !== undefined) {
                    var userFormView = new ShowUser.Form();
                    var userDataView = new ShowUser.DataView({
                        model: user
                    });

                    userFormView.on("user:edit", function () {
                        LinkManager.UserModule.Edit.Controller.showEdit();
                    });

                    userLayoutView.on("show", function () {
                        userLayoutView.formRegion.show(userFormView);
                        userLayoutView.dataRegion.show(userDataView);
                    });
                } else {
                   // TODO: add missing link view
                    console.log("missing view");
                }

                LinkManager.mainRegion.show(userLayoutView);
            });
        }
    };
};
