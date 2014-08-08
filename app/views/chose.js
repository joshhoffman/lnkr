var Backbone = require('backbone');

var Handlebars = require('handlebars');
Handlebars.getTemplate = require('utils/utils');

var ChoseView = Backbone.View.extend({
    template: Handlebars.getTemplate('chose'),
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});

module.exports = ChoseView;