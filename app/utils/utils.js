var Handlebars = require('handlebars');
var $ = require('jquery');

module.exports = function(name) {
    if(Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        $.ajax({
            url: 'templates/' + name + '.hbs',
            success: function(data) {
                if(Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(data);
                console.log('setting template for ' + name);
            },
            async: false
        });
    }

    return Handlebars.templates[name];
};