LinksController = require '../APIControllers/linksController'
LinkController = require '../APIControllers/linkController'
LoginController = require '../APIControllers/loginController'
RegisterController = require '../APIControllers/registerController'
LogoutController = require '../APIControllers/logoutController'

exports.routes = (app, routesConfig) ->
    app.get '/api/test', routesConfig.EnsureLogin('/'), (req, res) ->
        res.json({'test': 'testdata'})
    
    app.get '/api/loggedin', (req, res) ->
        if req.user?
            console.log 'logged in'
            res.json { email: req.user.email, roles: req.user.roles }
        else
            res.status 401
            res.json { status: "failed" }

    linkController = new LinkController app, routesConfig
    linksController = new LinksController app, routesConfig
    loginController = new LoginController app, routesConfig
    registerController = new RegisterController app, routesConfig
    logoutController = new LogoutController app, routesConfig
