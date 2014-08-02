var $ = require('jquery')(window);
var Backbone = require('backbone');
Backbone.$ = $;

var ReadItem = require('../models/readItem');

Items = Backbone.Collection.extend({
    url: '/readitems',
    model: ReadItem,
    initialize: function(models, options) {
        //this.bind("add", options.view.addItemLi);
    }
});

module.exports = Items;