var LinkTemplate = require('./templates/link.hbs');
var LinksTemplate = require('./templates/links.hbs');

module.exports = function(List, LinkManager,
                          Backbone, Marionette, $, _) {
    List.Link = Marionette.ItemView.extend({
        tagName: "tr",
        template: LinkTemplate,
        events: {
            "click": "linkClicked",
            "click button.js-delete": "deleteClicked",
            "click td a.js-show": "showClicked",
            "click td a.js-edit": "editClicked"
        },
        
        linkClicked: function() {
            console.log('linkClicked');
            this.$el.toggleClass("warning");
        },
        
        deleteClicked: function(e) {
            e.stopPropagation();
            this.trigger("link:delete", this.model);
        },
        
        showClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("link:show", this.model);
        },

        editClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("link:edit", this.model);
        },
        
        remove: function() {
            console.log('remove');
            var self = this;
            this.$el.fadeOut(function() {
                Marionette.ItemView.prototype.remove.call(self);
            });
        },

        flash: function(cssClass) {
            $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                setTimeout(function() {
                    $view.toggleClass(cssClass);
                }, 500);
            });
        }
    });
    
    List.Links = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: LinksTemplate,
        childView: List.Link,
        childViewContainer: "tbody"
    });
};