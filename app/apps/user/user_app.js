module.exports = function(UserApp, LinkManager,
                          Backbone, Marionette, $, _) {
    UserApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "user": "showUser"
        }
    });

    var API = {
        showUser: function() {
            UserApp.Show.Controller.showUser();
        }
    };

    LinkManager.on("show:user", function() {
        API.showUser();
    });

    LinkManager.addInitializer(function() {
        new UserApp.Router({
            controller: API
        });
    });
};