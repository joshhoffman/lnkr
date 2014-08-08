Controller = require '../configure/controller'
Link = require('../models/link').linkModel

class LinkController extends Controller
    constructor: (app) ->
        console.log('link controller init')
        this._name = 'links'
        super app
    
    _get: (req, res, next) ->
        Link.find (err, links) ->
            if err
                console.log err
                return

            console.log links
    
    _post: (req, res, next) ->
        console.log('post test')
        console.log req.body

        newLink = new Link({
            name: req.body.name,
            link: req.body.link,
            description: req.body.description
        });

        newLink.save (err, data) ->
            console.log(data)
            res.json({'success': true})

module.exports = LinkController