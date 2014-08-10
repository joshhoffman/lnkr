var Marionette = require('marionette');

var LinkLayout = require('./views/layout/layout')
var LinksCollection = require('./models/todos')

module.exports = Marionette.Controller.extend({
    onStart: function () {
        this.linksCollection = new LinksCollection();
        this.linkLayout = new LinkLayout({linksCollection: this.linksCollection});

        var onSuccess = function() {
            this.options.linkRegion.show(this.linksLayout);
        }.bind(this);
        this.linksCollection.fetch({success: onSuccess});
    },

    filterItems: function(filter) {
        filter = (filter && filter.trim() || 'all')
        this.linksLayout.updateFilter(filter);
    }
});