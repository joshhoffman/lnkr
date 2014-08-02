var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var ReadItemView = Backbone.View.extend({
    tagname: 'article',
    className: 'readItem',
    template: '<h1><%= name %> | <%= link %><hr></h1>',
    initialize: function() {
        console.log("Init ReadItemView");
        this.listenTo(this.model, 'change:title', this.render);
    },
    render: function() {
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));

        return this;
    },
    events: {
        'click': '_selectItem'
    },
    _selectItem: function(ev) {
        ev.preventDefault();

        console.log($(ev.currentTarget).html());
    }
});

module.exports = ReadItemView;