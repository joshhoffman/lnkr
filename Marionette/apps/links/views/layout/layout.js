var Marionette = require('backbone.marionette');

var HeaderView = require('./header/header');
var LinksView = require('../links/collection');
var FooterView = require('./footer/footer');
var tmpl = require('./layout.hbs');

module.exports = Marionette.LayoutView.extend({
    template: tmpl,

    ui: {
        app: '#linkapp'
    },

    regions: {
        header: '#header',
        main: '#main',
        footer: '#footer'
    },

    updateFilter: function (filter) {
        this.ui.app.attr('class', 'filter-' + filter);
    },

    onShow: function () {
        var options = {collection: this.options.linksCollection};
        console.log(this.options);

        this.header.show(new HeaderView(options));
        this.main.show(new LinksView(options));
        this.footer.show(new FooterView(options));
    }
});