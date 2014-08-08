var _ = require('underscore');
var Backbone = require('backbone');

var ItemListView = require('views/itemListView');
var DetailsView = require('views/details');
var ChoseView = require('views/chose');

var Handlebars = require('handlebars');
Handlebars.getTemplate = require('utils/utils');

var Layout = Backbone.View.extend({
    template: Handlebars.getTemplate('layout'),
    render: function() {
        this.$el.html(this.template());
        this.currentDetails.setElement(this.$('#details')).render();
        this.overview.setElement(this.$('#overview')).render();
        return this;
    },
    initialize: function(options) {
        this.currentDetails = new ChoseView();
        this.overview = new ItemListView({
            collection: options.router.items,
            router: options.router
        });
    },
    setDetails: function(item) {
        if(this.currentDetails) this.currentDetails.remove();
        this.currentDetails = new DetailsView({model: item});
        this.render();
    },
    setChose: function(item) {
        if(this.currentDetails) this.currentDetails.remove();
        this.currentDetails = new ChoseView();
        this.render();
    }
});

var instance;
Layout.getInstance = function(options) {
    if(!instance) {
        instance = new Layout({
            el: options.el,
            router: options.router,
            collection: options.router.items
        });
    }

    return instance;
};

module.exports = Layout;