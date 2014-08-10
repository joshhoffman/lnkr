var Marionette = require('marionette');

module.exports = Marionette.AppRouter.extend({
    constructor: function(options) {
        Marionette.AppRouter.prototype.constructor.call(this, options);
        this._getController().triggerMethod('start');
    },

    appRoutes: {
        '*filter': 'filterItems'
    }
});