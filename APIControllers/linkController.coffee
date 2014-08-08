Controller = require '../configure/controller'
link = require('./models/link').linkModel

class LinkController extends Controller
    initialize: (app) ->
        this._name = 'link'
        super app
    
    _get: (req, res, next) ->
        link.find (err, links) ->
            if err
                console.log err
                return

            console.log links
    
    _post: (req, res, next) ->
        console.log('post test')
        console.log req.body