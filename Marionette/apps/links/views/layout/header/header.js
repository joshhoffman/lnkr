var Marionette = require('backbone.marionette');

var tmpl = require('./header.hbs');

module.exports = Marionette.ItemView.extend({
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
            console.log('before create ' + linkText);
            console.log(this.collection);
            this.collection.create({
                name: linkText
            });
            console.log('after cretea');
            this.ui.input.val('');
        }
    }
});