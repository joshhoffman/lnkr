LinksController = require '../APIControllers/linksController'
LinkController = require '../APIControllers/linkController'

exports.routes = (app, routesConfig) ->
    app.get '/api/test', routesConfig.EnsureLogin('/'), (req, res) ->
        res.json({'test': 'testdata'})
    
    linkController = new LinkController app, routesConfig
    linksController = new LinksController app, routesConfig
