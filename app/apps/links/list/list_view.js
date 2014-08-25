var LinkTemplate = require('./templates/link.hbs');
var LinksTemplate = require('./templates/links.hbs');
var NoneTemplate = require('./templates/none.hbs');

module.exports = function(List, LinkManager,
                          Backbone, Marionette, $, _) {
    List.Link = Marionette.ItemView.extend({
        tagName: "tr",
        template: LinkTemplate,
        triggers: {
            "click button.js-delete": "link:delete",
            "click td a.js-show": "link:show",
            "click td a.js-edit": "link:edit"
        },
        events: {
            "click": "linkClicked"
        },

        linkClicked: function() {
            console.log('linkClicked');
            this.$el.toggleClass("warning");
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
    
    var NoContactsView = Marionette.ItemView.extend({
        template: NoneTemplate,
        tagName: "tr",
        className: "alert"
    });
    
    List.Links = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: LinksTemplate,
        childView: List.Link,
        childViewContainer: "tbody",
        emptyView: NoContactsView,

        initialize: function() {
            this.listenTo(this.collection, "reset", function() {
                this.attachHtml = function(collectionView, childView, index) {
                    collectionView.$el.append(childView.el);
                };
            });
        },

        onRenderCollection: function() {
            this.attachHtml = function(collectionView, childView, index) {
                collectionView.$el.prepend(childView.el);
            };
        }
    });
};