var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Handlebars = require('handlebars');
Handlebars.getTemplate = require('utils/utils');

var ReadItemView = require('views/readItemView');

var ItemListView = Backbone.View.extend({
    //el: $("body"),
    //template: Handlebars.getTemplate('index'),
    tagName: 'section',
    initialize: function (options) {
        this.router = options.router;
        this.listenTo(this.collection, 'reset', this.render);
        var that = this;
        this.collection.fetch({
            success: function(models) {
                console.log(models.models.length);
                models.each(function(model) { console.log('in each'); console.log(model); });
                //that.collection = models;
                that.render();
            }
        });
        //this.listenTo(this.collection, 'add', this.render);
        /*me = this;
        itemList = new Items(null, { view: this });
        this.items = itemList;
        itemList.fetch({
            success: function (model) {
                console.log('success');
                console.log(itemList.models.count);
                me.render();
            }
        });*/
        console.log('init item list view');
    },
    render: function() {
        /*var that = this;
        var readItemView = this.collection.map(function(readItem) {
            return (new ReadItemView({model: readItem, router: that.router})).render().el;
        });
        this.$el.html(readItemView);*/
        console.log('list view render');
        console.log(this.collection.length);
        var that = this;
        var itemsView = this.collection.map(function(item) {
            console.log('!!!! ' + item.get('name'));
            return (new ReadItemView({model: item, router: that.router})).render().el;
        });
        this.$el.html(itemsView);
        return this;
    }//,
    /*render: function () {
            //var self = this;
            _(this.items.models).each(function(item) {
             self.appendItem(item)
             }, this);
        },
    events: {
        "click #addItem": "addItem"
    },
    addItem: function () {
        // TODO: Add stuff here
        var item_model = new ReadItem({
            name: $('#itemName').val(),
            link: $('#itemLink').val()
        });
        item_model.save({
            name: item_model.get('name'),
            link: item_model.get('link')
        }, {
            success: function (ret) {
                console.log('save success');
                console.log(ret.toJSON());
            }
        })
        this.items.add(item_model);
    },
    addItemLi: function (model) {
        console.log('additemli');
        $('<li>').text(model.get('name') + ' ' + model.get('link')).appendTo("#readingList");
    }*/
});

var instance;
ItemListView.getInstance = function(options) {
    if(!instance) {
        instance = new ItemListView({
            el: options.el,
            collection: options.collection,
            router: options.router
        });
    }
};

module.exports = ItemListView;
