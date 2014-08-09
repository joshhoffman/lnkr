var Backbone = require('backbone');
var _ = require('underscore');

// data
var Items = require('collections/items');
//var data = require('./items.json');
var items = new Items();

// views
var Layout = require('views/layout');

var ItemsRouter = Backbone.Router.extend({
    routes: {
        'items/:id': 'selectItem',
        '': 'showMain'
    },

    selectItem: function(id){
        console.log(id);
        this.items.resetSelected();
        this.items.selectById(id);
        this.layout.setDetails(this.items.get(id));
    },

    showMain: function() {
        console.log('in show main');
        this.items.resetSelected();
        this.layout.setChose();
    },

    initialize: function(options) {
        this.items = items;
        this.layout = Layout.getInstance({
            el: '#items',
            router: this
        });
        this.layout.render();
    }
});

module.exports = ItemsRouter;