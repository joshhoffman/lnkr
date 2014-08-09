var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var ReadItem = require('../models/readItem');

Items = Backbone.Collection.extend({
    model: ReadItem,
    url: '/api/links',
    initialize: function(models, options) {
        //this.bind("add", options.view.addItemLi);
        this.bind('add', this.test);
    },

    test: function() {
        console.log('testing');
        this.each(function(model) {
            console.log('in testing each');
            console.log(model.get('name'));
        });
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
        item.set({"selected": true});
        return item.id;
    }
});

module.exports = Items;