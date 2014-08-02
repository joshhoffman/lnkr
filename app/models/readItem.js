
var $ = require('jquery')(window);
var Backbone = require('backbone');
Backbone.$ = $;


ReadItem = Backbone.Model.extend({
    //url: '/readitem',
    defaults: {
        name: '',
        link: ''
    },
    initialize: function() {
        console.log('creating new ReadItem');
        /*this.on("change:name", function(model) {
         console.log('name changed');
         });*/
    }
    /*parse: function(response, options) {
     if(options.collection) return response;
     return response.
     }*/
});

module.exports = ReadItem;