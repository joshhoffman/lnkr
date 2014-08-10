var Marionette = require('marionette');

var tmpl = require('./link.hbs');

// Link Item
// Display a link item, and respond
// to changes
module.exports = Marionette.ItemView.extend({
    tagName: 'li',
    template: tmpl,

    ui: {
        edit: '.edit'
    },

    events: {
        'click .destroy': 'destroy',
        'click .toggle': 'toggle',
        'dblclick label': 'onEditClick',
        'keydown @ui.edit': 'onEditKeypress',
        'focusout @ui.edit': 'onEditFocusout'
    },

    modelEvents: {
        'change': 'render'
    },

    onRender: function () {
        this.$el.removeClass('active read');

        if (this.model.get('read')) {
            this.$el.addClass('read');
        } else {
            this.$el.addClass('active');
        }
    },

    destroy: function () {
        this.model.destroy();
    },

    toggle: function () {
        this.model.toggle().save();
    },
    
    onEditClick: function () {
        
    }
});