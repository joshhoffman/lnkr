Controller = require '../configure/secureController'

class LinksController extends Controller
    constructor: (app, config) ->
        this._name = 'links'
        this.Link = config.Link
        super app, config
    
    _get: (req, res, next) ->
        #this.Link.find().exec (err, links) ->
        console.log 'in links get'
        this.Link.find({ user: req.user.email }).exec (err, links) ->
            if err
                console.log err
                return

            res.json(links)

    _post: (req, res, next) ->
        newLink = new this.Link({
            id: req.body.name,
            name: req.body.name,
            link: req.body.link,
            description: req.body.description,
            tags: req.body.tags,
            createdOn: new Date().getDate(),
            user: req.user.email
        })

        newLink.save (err, data) ->
            console.log err if err
            console.log(data)
            res.json newLink

module.exports = LinksController