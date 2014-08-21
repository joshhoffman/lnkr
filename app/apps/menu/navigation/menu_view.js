var menuTemplate = require('./templates/menu.hbs');

module.exports = function(Navigation, LinkManager,
                          Backbone, Marionette, $, _) {
    Navigation.Menu = Marionette.ItemView.extend({
        template: menuTemplate,
        
        events: {
            "a.js-home": "homeClicked"
        },
        
        homeClicked: function(e) {
            e.stopPropogation();
            e.preventDefault();
            this.trigger("navigate:home");
        }
    });
};