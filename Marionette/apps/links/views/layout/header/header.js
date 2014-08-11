var Marionette = require('backbone.marionette');

var tmpl = require('./header.hbs');

module.exports = Marionette.Itemview.extend({
    template: tmpl,

    ui: {
        input: '#new-link'
    },

    events: {
        'submit form': 'onSubmit'
    },

    onSubmit: function (e) {
        e.preventDefault();

        var linkText = this.ui.input.val().trim();
        if(linkText) {
            this.collection.create({
                name: linkText
            });
            this.ui.input.val('');
        }
    }
});