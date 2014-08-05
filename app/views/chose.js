var Backbone = require('backbone');

var ChoseView = Backbone.View.extend({
    template: '<h1>lnkr</h1>',
    render: function() {
        this.$el.html(this.template);
        return this;
    }
});

module.exports = ChoseView;