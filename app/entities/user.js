module.exports = function(Entities, LinkManager,
                          Backbone, Marionette, $, _) {
    Entities.User = Backbone.Model.extend({
        defaults: {
            email: '',
            roles: []
        }
    });
    
    LinkManager.reqres.setHandler("get:new:user", function(data) {
        return new Entities.User(data);
    });
};