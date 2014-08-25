var menuTemplate = require('./templates/menu.hbs');
var headerLinkTemplate = require('./templates/headerLink.hbs');

module.exports = function(Navigation, LinkManager,
                          Backbone, Marionette, $, _) {
    Navigation.Header = Marionette.ItemView.extend({
        template: headerLinkTemplate,
        tagName: "li",
        
        events: {
            "click a": "navigate"
        },
        
        navigate: function(e) {
            e.preventDefault();
            this.trigger("navigate", this.model);
        },
        
        onRender: function() {
            console.log('on render');
            if(this.model.selected) {
                console.log('model seleted');
                this.$el.addClass("selected");
            }
        }
    });
    
    Navigation.Headers = Marionette.CompositeView.extend({
        template: menuTemplate,
        className: "navbar navbar-inverse navbar-fixed-top",
        childView: Navigation.Header,
        childViewContainer: "ul",
        
        events: {
            "click a.brand": "brandClicked"
        },
        
        brandClicked: function(e) {
            e.preventDefault();
            this.trigger("brand:clicked");
        }
    });
};