module.exports = function(Common, LinkManager,
                          Backbone, Marionette, $, _) {
    Common.AuthenticationController = {
        showLogin: function () {
            var view = new LinkManager.MenuModule.Login.Login();

            view.on("form:submit", function(data) {
                if(!validator.isEmail(data.email)) {
                    console.log('invalid email');
                }
            });

            LinkManager.dialogRegion.show(view);
        },

        showRegister: function() {
            var view = new LinkManager.MenuModule.Register.Register();

            view.on("form:submit", function(data) {
                console.log(data);
            });

            LinkManager.dialogRegion.show(view);
        }
    };
};