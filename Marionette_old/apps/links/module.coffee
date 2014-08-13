Marionette = require 'backbone.marionette'
Router = require './router'
Controller = require './controller'

# routers and controller get required here

class LinkModule extends Marionette.Module
    initialize: () ->
        this.linkRegionId = 'link-app-region'
        
    onStart: ->
        # encapsulate each module in a container
        # so you can do what you want without
        # affecting other modules
        this._createContainer()
        this._addRegion()
        this._startMediator()

    onStop: ->
        # remove region & container when stopping
        # unload of module could be important in big app / modules
        this._stopMediator()
        this._removeRegion()
        this._destroyContainer()

    _createContainer: ->
        node = document.createElement 'div'
        node.id = this.linkRegionId
        document.body.appendChild node

    _addRegion: ->
        this.app.addRegions linkRegion: '#' + this.linkRegionId

    _startMediator: ->
        this.controller = new Controller linkRegion: this.app.linkRegion
        router = new Router controller: this.controller

    _destroyContainer: ->
        node = document.getElementById this.linkRegionId
        node?.parentElement.removeChild node

    _removeRegion: ->
        this.app.removeRegion 'linkRegion'

    _stopMediator: ->
        this.controller.stop()

module.exports = LinkModule