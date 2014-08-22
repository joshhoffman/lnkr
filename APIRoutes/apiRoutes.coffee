LinksController = require('../APIControllers/linksController')
LinkController = require('../APIControllers/linkController')
LoginController = require('../APIControllers/loginController')

exports.routes = (app, routesConfig) ->
    app.get '/api/test', (req, res) ->
        res.json({'test': 'testdata'})

    linkController = new LinkController app, routesConfig
    linksController = new LinksController app, routesConfig
    loginController = new LoginController app, routesConfig