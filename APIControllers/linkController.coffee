Link = require('../models/link');
Controller = require('../configure/controller');

class LinkController extends Controller
    constructor: (app) ->
        console.log('link controller init')
        this.name = 'links/:id'
        super app

    _get: (req, res, next) ->
        Link.findById req.params.id, (err, model) ->
            if err
                console.log 'find failed'
                res.json { "status": false }
            res.json model