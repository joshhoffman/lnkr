Marionette = require 'backbone.marionette'

# routers and controller get required here

class LinkModule extends Marionette.Module
    initialize: () ->
        this.linkRegionId = 'link-region'