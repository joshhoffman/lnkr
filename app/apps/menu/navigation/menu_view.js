var menuTemplate = require('./templates/menu.hbs');

module.exports = function(Navigation, LinkManager,
                          Backbone, Marionette, $, _) {
    Navigation.Menu = Marionette.ItemView.extend({
        template: menuTemplate,
        
        triggers: {
            "click a.js-home": "navigate:home",
            "click li a.js-login": "navigate:login",
            "click li a.js-register": "navigate:register"
        },
        
        events: {
            //"click li a.js-home": "homeClicked",
            //"click li a.js-login": "loginClicked"
        }
    });
};