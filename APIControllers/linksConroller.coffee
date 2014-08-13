Controller = require '../configure/controller'
Link = require('../models/link').linkModel

class LinksController extends Controller
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
            id: req.body.name,
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

        Link.findById req.body.name, (err, link) ->
            res.json {"success":false} if err
            link.name = req.body.name
            link.link = req.body.link
            link.description = req.body.description
            link.save (err, data) ->
                res.json {"success":false} if err
                res.json(data)

    _delete: (req, res, next) ->
        console.log('delete test')

module.exports = LinksController