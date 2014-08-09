Marionette = require 'backbone.marionette'

class LinkModule extends Marionette.Module
    initialize: () ->
        this.linkRegionId = 'link-region'