Controller = require '../configure/controller'

class LinksController extends Controller
    constructor: (app, Link) ->
        this._name = 'links'
        this.Link = Link
        super app
    
    _get: (req, res, next) ->
        console.log(this.Link)
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
            description: req.body.description
        })

        newLink.save (err, data) ->
            console.log err if err
            console.log(data)
            res.json({'success': true})

module.exports = LinksController