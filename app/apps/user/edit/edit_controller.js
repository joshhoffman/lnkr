module.exports = function(UserEdit, LinkManager,
                          Backbone, Marionette, $, _) {
    UserEdit.Controller = {
        showEdit: function(errorText) {
            if(!LinkManager.User) {
                LinkManager.trigger("login:unauthorized");
                return;
            }

            var view = new UserEdit.Edit({
                model: LinkManager.User
            });

            LinkManager.dialogRegion.show(view);
        }
    };
};