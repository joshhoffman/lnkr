Controller = require '../configure/controller'

class LinkController extends Controller
    constructor: (app, Link) ->
        console.log('link controller init')
        this._name = 'links/:id'
        this.Link = Link
        super app

    _get: (req, res, next) ->
        this.Link.findOne {name: req.params.id}, (err, model) ->
            if err
                console.log 'find failed'
                res.status 404
                res.json { "status": false }
                return
            res.json model

    _put: (req, res, next) ->
        console.log('put test')
        console.log req.body

        this.Link.findOne {name: req.body.name}, (err, link) ->
            if err
                res.status 404
                res.json {"success":false}
                return
            link.name = req.body.name
            link.link = req.body.link
            link.description = req.body.description
            link.save (err, data) ->
                if err
                    res.status 404
                    res.json {"success": false}
                    return
                res.json(data)

    _delete: (req, res, next) ->
        this.Link.findOneAndRemove {name: req.body.name}, (err, link) ->
            if err
                res.status 404
                res.json {"success": false}
                return
            res.json {"success": true}

module.exports = LinkController