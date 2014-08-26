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
                var model = new LinkManager.Entities.RegisterModel(data);

                if(model.save(data)) {
                    view.trigger("dialog:close");
                } else {
                    console.log(model.validationError);
                    view.triggerMethod("form:data:invalid", model.validationError);
                }
            });

            LinkManager.dialogRegion.show(view);
        }
    };
};