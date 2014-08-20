var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var ItemsRouter = require('routers/itemRouter');

$(document).ready(function() {
    console.log("Init app");
    var router = new ItemsRouter({
        el: $('#items')
    });

    console.log('in ready');

    Backbone.history.start({
        pushState: true,
        root: '/'
    });
});

/*var Items = require('collections/items');

var ReadItemView = require('views/readItemView');
var ItemListView = require('views/itemListView');

var data = require('../items.json');
console.log('data');
console.log(data);
var items = new Items(data);

module.exports = {
    items: items,
    ReadItemView: ReadItemView,
    ItemListView: ItemListView
};

Monitor = require('./monitor');
monitor = new Monitor(items);*/
