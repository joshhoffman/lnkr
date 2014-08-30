module.exports = function(UserApp, LinkManager,
                          Backbone, Marionette, $, _) {
    UserApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "user": "showUser"
        }
    });

    var API = {
        showUser: function() {
            console.log("show user");
            UserApp.Show.Controller.showUser();
        }
    };

    UserApp.on("start", function () {
    });

    LinkManager.addInitializer(function() {
        console.log('in start');
        new UserApp.Router({
            controller: API
        });

        LinkManager.on("show:user", function() {
            console.log("in show user");
            API.showUser();
            LinkManager.navigate("user");
        });
    });
};