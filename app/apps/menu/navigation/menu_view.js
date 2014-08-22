var menuTemplate = require('./templates/menu.hbs');

module.exports = function(Navigation, LinkManager,
                          Backbone, Marionette, $, _) {
    Navigation.Menu = Marionette.ItemView.extend({
        template: menuTemplate,
        
        triggers: {
            "click a.js-home": "navigate:home",
            "click li a.js-login": "navigate:login"
        },
        
        events: {
            //"click li a.js-home": "homeClicked",
            //"click li a.js-login": "loginClicked"
        },
        
        homeClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('home clicked');
            this.trigger("navigate:home");
        },
        
        loginClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('login clicked');
            this.trigger("navigate:login");
        }
    });
};