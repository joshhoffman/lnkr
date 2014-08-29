Controller = require '../configure/secureController'

class LinkController extends Controller
    constructor: (app, config) ->
        this._name = 'links/:id'
        this.Link = config.Link
        super app, config

     # 1) read in links
     # 2) return error if not found
     # 3) search links element for correct name
     # 4) return error if not found
     # 5) return model if found
    _get: (req, res, next) ->
        this.Link.findOne { user: req.user.email, name: req.params.id }, (err, model) ->
            if err
                res.status 404
                res.json { "status": false }
                return
            res.json model

    # 1) read in links
    # 2) return error if not found
    # 3) search links element for correct name
    # 4) return error if element not found
    # 5) update found record
    # 6) return updated record
    _put: (req, res, next) ->
        this.Link.findOne { user: req.user.email, name: req.body.name }, (err, link) ->
            if err
                res.status 404
                res.json {"status":false}
                return
            link.name = req.body.name
            link.link = req.body.link
            link.description = req.body.description
            link.tags = req.body.tags
            link.save (err, data) ->
                if err
                    res.status 404
                    res.json {"status": false}
                    return
                res.json(data)

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