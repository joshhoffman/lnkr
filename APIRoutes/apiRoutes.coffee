LinksController = require('../APIControllers/linksController')
LinkController = require('../APIControllers/linkController')

exports.routes = (app, Link, User) ->
    app.get '/api/test', (req, res) ->
        res.json({'test': 'testdata'})

    linkController = new LinkController app, Link
    linksController = new LinksController app, Link
    loginController = new LoginController app, User