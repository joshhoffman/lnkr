module.exports = function(LinksApp, LinkManager,
                                Backbone, Marionette, $, _) {
    LinksApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "links(/filter/criterion::criterion)": "listLinks",
            "links/:id": "showLink",
            "links/:id/edit": "editLink"
        }
    });
    
    var API = {
        editLink: function(id) {
            LinksApp.Edit.Controller.editLink(id);
            LinkManager.execute("set:active:header", "links");
        },
        listLinks: function() {
            LinksApp.List.Controller.listLinks();
            LinkManager.execute("set:active:header", "links");
        },
        showLink: function(id) {
            LinksApp.Show.Controller.showLink(id);
            LinkManager.execute("set:active:header", "links");
        }
    };

    LinkManager.on("link:edit", function(id) {
        LinkManager.navigate('links/' + id + '/edit');
        API.editLink(id);
    });
    
    LinkManager.on("links:list", function(){
        console.log('got event');
        LinkManager.navigate("links");
        API.listLinks();
    });

    LinkManager.on("link:show", function(id) {
        LinkManager.navigate("links/" + id);
        API.showLink(id);
    });

    LinkManager.addInitializer(function() {
        new LinksApp.Router({
            controller: API
        });
    });
};