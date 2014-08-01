(function($) {
    ReadItem = Backbone.Model.extend({
        url: '/readitem',
        defaults: {
            name: '',
            link: ''
        },
        initialize: function() {
            console.log('creating new ReadItem');
            /*this.on("change:name", function(model) {
                console.log('name changed');
            });*/
        }
        /*parse: function(response, options) {
            if(options.collection) return response;
            return response.
        }*/
    });

    Items = Backbone.Collection.extend({
        url: '/readitems',
        model: ReadItem,
        initialize: function(models, options) {
            this.bind("add", options.view.addItemLi);
        }
    });

    window.AppView = Backbone.View.extend({
        el: $("body"),
        initialize: function(models, options) {
            me = this;
            itemList = new Items(null, { view: this });
            this.items = itemList;
            itemList.fetch({
                success: function(model) {
                    console.log('success');
                    console.log(itemList.models.count);
                    me.render();
                }
            });
        },
        render: function() {
            var self = this;
            /*_(this.items.models).each(function(item) {
                self.appendItem(item)
            }, this);*/
        },
        events: {
            "click #addItem": "addItem"
        },
        addItem: function() {
            // TODO: Add stuff here
            var item_model = new ReadItem({
                name: $('#itemName').val(),
                link: $('#itemLink').val()
                });
            item_model.save({
                name: item_model.get('name'),
                link: item_model.get('link')
            }, {
                success: function(ret) {
                    console.log('save success');
                    console.log(ret.toJSON());
                }
            })
            this.items.add(item_model);
        },
        addItemLi: function(model) {
            console.log('additemli');
            $('<li>').text(model.get('name') + ' ' + model.get('link')).appendTo("#readingList");
        },
        appendItem: function(model) {
            console.log('calling append item');
            $('<li>').text(model.get('name') + ' ' + model.get('link')).appendTo("#readingList");
        }
    });

    var appView = new AppView;
})(jQuery)