var Marionette = require('backbone.marionette');

var LinkLayout = require('./views/layout/layout');
var LinksCollection = require('./models/links');

module.exports = Marionette.Controller.extend({
    onStart: function () {
        this.linksCollection = new LinksCollection();
        this.linksLayout = new LinkLayout({linksCollection: this.linksCollection});

        var onSuccess = function() {
            console.log('on success');
            this.options.linkRegion.show(this.linksLayout);
        }.bind(this);
        this.linksCollection.fetch({success: onSuccess});
    },

    filterItems: function(filter) {
        filter = (filter && filter.trim() || 'all');
        this.linksLayout.updateFilter(filter);
    }
});