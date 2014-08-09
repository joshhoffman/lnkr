var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var Handlebars = require('handlebars');
Handlebars.getTemplate = require('utils/utils');

var ReadItemView = Backbone.View.extend({
    tagName: 'article',
    className: 'readItem',
    template: Handlebars.getTemplate('readItemView'),
    initialize: function(options) {
        console.log("Init ReadItemView " + this.model.get('name'));
        this.listenTo(this.model, 'change', this.render);
        this.router = options.router;
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

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