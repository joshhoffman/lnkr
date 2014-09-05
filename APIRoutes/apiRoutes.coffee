LinksController = require '../APIControllers/linksController'
LinkController = require '../APIControllers/linkController'
UserController = require '../APIControllers/userController'
UsersController = require '../APIControllers/usersController'

exports.routes = (app, routesConfig) ->
    app.get '/api/test', routesConfig.EnsureLogin('/'), (req, res) ->
        res.json({'test': 'testdata'})
    
    linkController = new LinkController app, routesConfig
    linksController = new LinksController app, routesConfig
    userController = new UserController app, routesConfig
    usersController = new UsersController app, routesConfig
