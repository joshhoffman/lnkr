Controller = require '../configure/controller'

class LinksController extends Controller
    constructor: (app, config) ->
        this._name = 'links'
        this.Link = config.Link
        super app
    
    _get: (req, res, next) ->
        this.Link.find().exec (err, links) ->
            if err
                console.log err
                return

            console.log 'find success'
            console.log links.length
            res.json(links)

    _post: (req, res, next) ->
        newLink = new this.Link({
            id: req.body.name,
            name: req.body.name,
            link: req.body.link,
            description: req.body.description,
            tags: req.body.tags
        })

        newLink.save (err, data) ->
            console.log err if err
            console.log(data)
            res.json({'success': true})

module.exports = LinksController