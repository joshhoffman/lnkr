module.exports = function(ShowUser, LinkManager,
                          Backbone, Marionette, $, _) {
    ShowUser.Controller = {
        showUser: function() {
            console.log(LinkManager.User);
        }
    };
};
