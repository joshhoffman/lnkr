Controller = require '../configure/secureController'
require('array.prototype.find')

class LinkController extends Controller
    constructor: (app, config) ->
        this._name = 'links/:id'
        this.Link = config.Link
        super app, config

    _get: (req, res, next) ->
        this.Link.findOne { user: req.user.email }, (err, links) ->
            if err
                res.status 404
                res.json { "status": false }
                return
            
            if not links
                res.json null
                return
            
            link = links.links.find (element, index) ->
                if element.name == req.params.id
                    retIndex = index
                    return true
                return false
            console.log link
            
            res.json link

    _put: (req, res, next) ->
        this.Link.findOne { user: req.user.email }, (err, links) ->
            #respond with error if there was a problem
            if err or not links
                res.status 404
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
                res.status 404
                res.json {"status":false}
                return
            
            link.name = req.body.name
            link.link = req.body.link
            link.description = req.body.description
            link.tags = req.body.tags
            links.links[retIndex] = link
            links.save (err, data) ->
                if err
                    res.status 404
                    res.json {"status": false}
                    return
                res.json(data.links)

    # TODO: delete functionality
    # 1) read in links
    # 2) return error if not found
    # 3) search links element for correct name
    # 4) remove that element
    # 5) save links
    _delete: (req, res, next) ->
        this.Link.findOneAndRemove { user: req.user.email, name: req.params.id },(err, link) ->
            if err
                console.log 'delete failed'
                res.status 400
                res.json {"status": false}
                return
            if not link?
                res.status 400
                return res.json {"status": false}
            res.json {"status": true}

module.exports = LinkController