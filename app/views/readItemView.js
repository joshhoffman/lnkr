var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var ReadItemView = Backbone.View.extend({
    tagname: 'article',
    className: 'readItem',
    template: '<h1><%= title %> | <%= link %><hr></h1>',
    initialize: function(options) {
        console.log("Init ReadItemView");
        this.listenTo(this.model, 'change', this.render);
        this.router = options.router;
    },
    render: function() {
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));

        this.$el.toggleClass('selected', this.model.get('selected'));
        return this;
    },
    events: {
        'click': 'selectItem'
    },
    selectItem: function(ev) {
        if(!this.model.get('selected')) {
            console.log('!!! ' + this.model.id);
            console.log(this.model);
            this.router.navigate('/items/' + this.model.id, {trigger: true});
        }
    }
});

module.exports = ReadItemView;