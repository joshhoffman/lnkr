var MissingLinkTmpl = require('./templates/missingLink.hbs');
var ShowLinkTmpl = require('./templates/showLink.hbs');

module.exports = function(Show, LinkManager,
                          Backbone, Marionette, $, _) {
    Show.MissingLink = Marionette.ItemView.extend({
        template: MissingLinkTmpl
    });

    Show.Link = Marionette.ItemView.extend({
        template: ShowLinkTmpl,
        events: {
            'click a.js-edit': 'editClicked'
        },

        editClicked: function(e) {
            e.preventDefault();
            this.trigger("link:edit", this.model);
        }
    });
};