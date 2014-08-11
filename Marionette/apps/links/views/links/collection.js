var Marionette = require('backbone.marionette');

var LinkItemView = require('./link');
var tmpl = require('./collection.hbs');

// Controls the rendering of a list of items,
// including filtering
module.exports = Marionette.CompositeView.extend({
    template: tmpl,
    itemView: LinkItemView,
    itemViewContainer: "#link-list",
    
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
        console.log('in collection');
        console.log(this.collection);
        
        //var allRead = this.collection.reduce(reduceRead, true);
        allRead = false;
        
        this.ui.toggle.prop('read', allRead);
        //this.$el.parent().toggle(!!this.collection.length);
    },
    
    onToggleAllClick: function(e) {
        var isRead = e.currentTarget.checked;
        
        this.collection.each(function(link){
            link.save({ 'read': isRead });
        });
    }
});