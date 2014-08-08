var Backbone = require('backbone');
var _ = require('underscore');
var moment = require('moment');

var Handlebars = require('handlebars');
Handlebars.getTemplate = require('utils/utils');

var DetailsView = Backbone.View.extend({
    el: '#details',
    template: Handlebars.getTemplate('details'),
    render: function() {
        this.model.set('dateAdded', moment());
        var dateAdded = this.model.dateAdded;
        var data = _.extend(this.model.toJSON(), {dateAddedFormatted: dateAdded});

        this.$el.html(this.template(data));

        return this;
    }
});

module.exports = DetailsView;