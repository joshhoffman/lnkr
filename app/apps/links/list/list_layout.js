var LayoutTemplate = require('./templates/layout.hbs');
var PanelTemplate = require('./templates/panel.hbs');

module.exports = function(List, LinkManager,
                          Backbone, Marionette, $, _) {
    List.Layout = Marionette.LayoutView.extend({
        template: LayoutTemplate,
        regions: {
            panelRegion: "#panel-region",
            linksRegion: "#links-region"
        }
    });

    List.Panel = Marionette.ItemView.extend({
        template: PanelTemplate,
        triggers: {
            "click button.js-new": "link:new"
        },

        events: {
            "submit #filter-form": "filterContacts"
        },

        ui: {
            criterion: "input.js-filter-criterion"
        },

        filterContacts: function(e) {
            e.preventDefault();
            var criterion = this.$(".js-filter-criterion").val();
            this.trigger("links:filter", criterion);
        },

        onSetFilterCriteron: function (criterion) {
            this.ui.criterion.val(criterion);
        }
    });
};
