var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var ReadItemView = require('views/readItemView');

var ItemListView = Backbone.View.extend({
    //el: $("body"),
    initialize: function (models, options) {
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
        console.log('init item list view')
    },
    render: function() {
        var readItemView = this.collection.map(function(readItem) {
            return (new ReadItemView({model: readItem})).render().el;
        });
        this.$el.html(readItemView);
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

module.exports = ItemListView;
