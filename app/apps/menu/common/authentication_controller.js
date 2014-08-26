module.exports = function(Common, LinkManager,
                          Backbone, Marionette, $, _) {
    Common.AuthenticationController = {
        showLogin: function (errorText) {
            var view = new LinkManager.MenuModule.Login.Login();
            
            view.on("show", function() {
                if(errorText) {
                    console.log(errorText);
                    var $form = this.$el.find('form');
                    console.log($form);
                    err = JSON.parse(errorText);
                    $form.prepend($('<div>', { class: 'control-group error'}));
                    var $ret = $form.find('div.control-group.error');
                    $ret.prepend($('<span>', { text: err.status, class: 'help-inline error' }));
                }
            });

            view.on("form:submit", function(data) {
                var model = new LinkManager.Entities.LoginModel(data);
                console.log(model);

                if(model.save(data)) {
                    view.trigger("dialog:close");
                    LinkManager.trigger("login:success");
                } else {
                    view.triggerMethod("form:data:invalid", model.validationError);
                }
            });

            LinkManager.dialogRegion.show(view);
        },

        showRegister: function() {
            var view = new LinkManager.MenuModule.Register.Register();

            view.on("form:submit", function(data) {
                var model = new LinkManager.Entities.RegisterModel(data);

                if(model.save(data)) {
                    view.trigger("dialog:close");
                } else {
                    view.triggerMethod("form:data:invalid", model.validationError);
                }
            });

            LinkManager.dialogRegion.show(view);
        }
    };
};