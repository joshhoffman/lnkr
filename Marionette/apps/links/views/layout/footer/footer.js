var Marionette = require('backbone.marionette');

var tmpl = require('./footer.hbs');

module.exports = Marionette.ItemView.extend({
    template: tmpl,

    ui: {
        filters: '#filters a'
    },

    events: {
        'click #clear-completed': 'onClearClick'
    },

    collectionEvents: {
        'all': 'render'
    },

    templateHelpers: {
        activeCountLabel: (this.activeCount === 1 ? 'item' : 'items') + 'left'
    },

    serializeData: function () {
        var active = this.colleciton.getActive().length;
        var total = this.collection.length;

        return {
            activeCount: active,
            totalCount: total,
            completedCount: total - active
        };
    },

    onRender: function () {
        this.update();
    },

    onShow: function () {
        this.update();
    },

    onClearClick: function () {
        var completed = this.collection.getRead();
        completed.forEach(function (link) {
            link.destroy();
        });
    },
    
    update: function () {
        this.$el.parent.toggle(this.collection.length > 0);
    }
});