var Marionette = require('backbone.marionette');

var LinkItemView = require('./link');
var tmpl = require('./collection.hbs');

// Controls the rendering of a list of items,
// including filtering
module.exports = Marionette.CompositeView.extend({
    template: tmpl,
    childView: LinkItemView,
    childViewContainer: "#link-list",

    /*initialize: function(options) {
        console.log('in collection init');
        console.log(options);
        this.collection = options.collection;
    },*/
    
    ui: {
        toggle: "#toggle-all"
    },
    
    events: {
        'click @ui.toggle': 'onToggleAllClick'
    },
    
    collectionEvents: {
        'all': 'update'
    },
    
    onShow: function() {
        this.update();
    },
    
    update: function() {
        function reduceRead(left, right) {
            return left && right.get('read');
        }
        console.log('in collection update');
        console.log(this.options.collection);

        //var allRead = this.collection.reduce(reduceRead, true);
        var allRead = false;
        
        this.ui.toggle.prop('read', allRead);
        //this.$el.parent().toggle(!!this.collection.length);
    },
    
    onToggleAllClick: function(e) {
        var isRead = e.currentTarget.checked;

        console.log('onToggleAllClick');
        console.log(this.options.collection);
        //console.log(this.template);
        
        this.collection.each(function(link){
            console.log('in collection each');
            link.save({ 'read': isRead });
        });
    }
});