Controller = require '../configure/controller'
settings = require '../configure/settings'
require 'array.prototype.find'

class LinkController extends Controller
    constructor: (app, config) ->
        this._name = 'links/:id'
        this.Link = config.Link
        super app, config

    _get: (req, res, next) ->
        this.Link.findOne { user: req.body.email }, (err, links) ->
            if err
                console.log 'err'
                res.status 400
                res.json { "status": false }
                return
            
            if not links
                console.log 'not links'
                res.json null
                return
            
            link = links.links.find (element, index) ->
                if element.name == req.params.id
                    retIndex = index
                    return true
                return false
            
            res.json link

    _put: (req, res, next) ->
        this.Link.findOne { user: req.body.email }, (err, links) ->
            #respond with error if there was a problem
            if err or not links
                res.status 400
                res.json {"status":false}
                return
            
            # search available links
            retIndex = -1
            link = links.links.find (element, index) ->
                if element.name == req.params.id
                    retIndex = index
                    return true
                return false
            
            if retIndex == -1 or not link
                res.status 400
                res.json {"status":false}
                return
            
            link.name = req.body.name
            link.link = req.body.link
            link.description = req.body.description
            link.tags = req.body.tags
            links.links[retIndex] = link
            links.save (err, data) ->
                if err
                    res.status 400
                    res.json {"status": false}
                    return
                res.json data.links

    _delete: (req, res, next) ->
        this.Link.findOne { user: req.body.email }, (err, links) ->
            if err or not links
                res.status 400
                res.json { status: false }
                return
            linkIndex = -1
            link = links.links.find (element, index) ->
                if element.name == req.params.id
                    linkIndex = index
                    return true
                return false
            links.links.splice(linkIndex, 1)

            links.save (err, data) ->
                if err
                    res.status 400
                    res.json { status: false }
                    return
                res.json links.links

module.exports = LinkController