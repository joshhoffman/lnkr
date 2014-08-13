Link = require('../models/link').linkModel
Controller = require '../configure/controller'

class LinkController extends Controller
    constructor: (app) ->
        console.log('link controller init')
        this._name = 'links/:id'
        super app

    _get: (req, res, next) ->
        Link.findOne {name: req.params.id}, (err, model) ->
            if err
                console.log 'find failed'
                res.json { "status": false }
            res.json model

module.exports = LinkController