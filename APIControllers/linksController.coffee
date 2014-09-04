Controller = require '../configure/controller'
settings = require '../configure/settings'

class LinksController extends Controller
    constructor: (app, config) ->
        this._name = 'links'
        this.Link = config.Link
        super app, config
    
    _get: (req, res, next) ->
        #this.Link.find().exec (err, links) ->
        console.log 'in links get'
        this.Link.findOne { user: req.body.email }, (err, links) ->
            if err
                console.log err
                res.json null
                return
            
            if not links
                res.json null
                return

            res.json(links.links)

    _post: (req, res, next) ->
        newLink = {
            id: req.body.name,
            name: req.body.name,
            link: req.body.link,
            description: req.body.description,
            tags: req.body.tags,
            createdOn: new Date().getDate(),
            user: req.user.email
        }

        self = this

        this.Link.findOne { user: req.user.email }, (err, links) ->
            if err
                console.log err
                res.json null
                return
            
            if not links
                links = new self.Link({ user: req.user.email })
            
            links.links.push newLink
        
            # 1) read links document
            # 2) if links dont exist, create new one
            # 3) if links do exist, add new field and return

            links.save (err, data) ->
                console.log err if err
                console.log(data)
                res.json newLink

module.exports = LinksController