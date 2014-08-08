var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Handlebars = require('handlebars');
Handlebars.getTemplate = require('utils/utils');

var ReadItem = require('models/readItem');

var NewLinkView = Backbone.View.extend({
    template: Handlebars.getTemplate('newLink'),
    events: {
        'click #newLinkButton' : 'addLink'
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    addLink: function(ev) {
        console.log('add dat item');
        console.log($('#newName').val());
        console.log($('#newDescription').val());
        console.log($('#newLinkItem').val());
        readItem = new ReadItem({
            name: $('#newName').val(),
            description: $('#newDescription').val(),
            link: $('#newLink').val()
        });
        readItem.save();
    }
});

module.exports = NewLinkView;