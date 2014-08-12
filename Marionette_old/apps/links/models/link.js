var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    defaults: {
        name: '',
        link: '',
        description: '',
        created: 0,
        read: false
    },

    initialize: function() {
        console.log('new item');
        if(this.isNew()) {
            console.log('is new');
            this.set('created', Date.now());
        }
    },

    toggle: function() {
        return this.set('read', !this.isRead());
    },

    isRead: function() {
        return this.get('read');
    }
});