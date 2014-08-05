var Backbone = require('backbone');

ReadItem = Backbone.Model.extend({
    defaults: {
        name: '',
        title: '',
        link: '',
        selected: false,
        dateAdded: 'L2Dates',
        description: 'desc'
    }
    //initialize: function() {
    //    console.log('creating new ReadItem');
        /*this.on("change:name", function(model) {
         console.log('name changed');
         });*/
    //}
    /*parse: function(response, options) {
     if(options.collection) return response;
     return response.
     }*/
});

module.exports = ReadItem;