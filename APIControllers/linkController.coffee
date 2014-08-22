Controller = require '../configure/controller'

class LinkController extends Controller
    constructor: (app, config) ->
        this._name = 'links/:id'
        this.Link = config.Link
        super app

    _get: (req, res, next) ->
        this.Link.findOne {name: req.params.id}, (err, model) ->
            if err
                res.status 404
                res.json { "status": false }
                return
            res.json model

    _put: (req, res, next) ->
        this.Link.findOne {name: req.body.name}, (err, link) ->
            if err
                res.status 404
                res.json {"status":false}
                return
            link.name = req.body.name
            link.link = req.body.link
            link.description = req.body.description
            link.save (err, data) ->
                if err
                    res.status 404
                    res.json {"status": false}
                    return
                res.json(data)

    _delete: (req, res, next) ->
        this.Link.findOneAndRemove { name: req.params.id }, (err, link) ->
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