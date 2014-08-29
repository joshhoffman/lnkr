module.exports = function(UserEdit, LinkManager,
                          Backbone, Marionette, $, _) {
    UserEdit.EditController = {
        showEdit: function(errorText) {
            var view = new LinkManager.EditModule.Edit.Edit({
                model: LinkManager.User
            });

            LinkManager.dialogRegion.show(view);
        }
    };
};