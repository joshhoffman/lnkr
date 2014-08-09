Controller = require '../configure/controller'
Link = require('../models/link').linkModel

class LinkController extends Controller
    constructor: (app) ->
        console.log('link controller init')
        this._name = 'links'
        super app
    
    _get: (req, res, next) ->
        Link.find().exec (err, links) ->
            if err
                console.log err
                return

            console.log 'find success'
            console.log links.length
            res.json(links)

    _post: (req, res, next) ->
        console.log('post test')
        console.log req.body

        newLink = new Link({
            name: req.body.name,
            link: req.body.link,
            description: req.body.description
        })

        newLink.save (err, data) ->
            console.log err if err
            console.log(data)
            res.json({'success': true})

    _put: (req, res, next) ->
        console.log('put test')
        console.log req.body

        newLink = new Link({
            name: req.body.name,
            link: req.body.link,
            description: req.body.description
        })

        newLink.save()

module.exports = LinkController