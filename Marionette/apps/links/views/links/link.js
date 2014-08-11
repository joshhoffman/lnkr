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
        this.$el.addClass('editing');
        this.ui.edit.focus();
        this.ui.edit.val(this.ui.edit.val());
    },
    
    onEditFocusout: function() {
        var nameText = this.ui.edit.val().trim();
        if(linkText) {
            this.model.set('name', nameText).save();
            this.$el.removeClass('editing');
        } else {
            this.destroy();
        }
    },
    
    onEditKeypress: function(e) {
        var ENTER_KEY = 13, ESC_KEY = 27;
        
        if(e.which === ENTER_KEY) {
            this.onEditFocusout();
            return;
        }
        
        if(e.which === ESC_KEY) {
            this.ui.edit.val(this.model.get('link'));
            this.$el.removeClass('editing');
        }
    }
});