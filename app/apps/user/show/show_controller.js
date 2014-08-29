module.exports = function(ShowUser, LinkManager,
                          Backbone, Marionette, $, _) {
    ShowUser.Controller = {
        showUser: function() {
            console.log(LinkManager.User);
            var userLayoutView = new ShowUser.Layout();
            var userFormView = new ShowUser.Form();
            var userDataView = new ShowUser.DataView();

            userFormView.on("user:edit", function() {
                console.log("edit user");
            });

            userLayoutView.on("show", function() {
                userLayoutView.formRegion.show(userFormView);
                userLayoutView.dataRegion.show(userDataView);
            });

            LinkManager.mainRegion.show(userLayoutView);
        }
    };
};
