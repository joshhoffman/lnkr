var Backbone = require('backbone');
var _ = require('underscore');
var moment = require('moment');

var DetailsView = Backbone.View.extend({
    el: '#details',
    template: _.template('<%= dateAddedFormatted %> <br> <%= description %>'),
    render: function() {
        var dateAdded = this.model.dateAdded;
        var data = _.extend(this.model.toJSON(), {dateAddedFormatted: dateAdded});
        this.$el.html(this.template(data));
        return this;
    }
});

module.exports = DetailsView;