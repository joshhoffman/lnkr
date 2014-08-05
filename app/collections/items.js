var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var ReadItem = require('../models/readItem');

Items = Backbone.Collection.extend({
    model: ReadItem,
    initialize: function(models, options) {
        //this.bind("add", options.view.addItemLi);
    },

    resetSelected: function() {
        this.each(function(model) {
            model.set({"selected": false});
        });
    },

    getSelected: function() {
        return this.pluck('selected').indexOf(true);
    },

    selectById: function(id) {
        console.log(id);
        var item = this.get(id);
        item.set({"selected": true})
        return item.id;
    }
});

module.exports = Items;