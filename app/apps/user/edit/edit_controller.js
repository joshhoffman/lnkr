module.exports = function(UserEdit, LinkManager,
                          Backbone, Marionette, $, _) {
    UserEdit.EditController = {
        showEdit: function(errorText) {
            if(!LinkManager.User) {
                LinkManager.trigger("login:unauthorized");
                return;
            }

            var view = new LinkManager.EditModule.Edit.Edit({
                model: LinkManager.User
            });

            LinkManager.dialogRegion.show(view);
        }
    };
};