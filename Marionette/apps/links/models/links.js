var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');

var LinkModel = require('./link');

module.exports = Backbone.Collection.extend({
    model: LinkModel,
    //url: '/api/links',
    localStorage: new Backbone.LocalStorage('links-backbone'),

    getRead: function () {
        return this.filter(this._isRead);
    },

    getActive: function () {
        return this.reject(this._isRead);
    },

    comparator: function (link) {
        return link.get('created');
    },
    
    _isRead: function (link) {
        return link.isRead();
    }
});