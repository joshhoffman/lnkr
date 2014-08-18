LinksController = require('../APIControllers/linksController')
LinkController = require('../APIControllers/linkController')

exports.routes = (app, Link) ->
    app.get '/api/test', (req, res) ->
        res.json({'test': 'testdata'})

    linkController = new LinkController app, Link
    linksController = new LinksController app, Link

###
    app.post '/api/links', (req, res) ->
        console.log('test')
        console.log req.body

    app.get '/api/links', (req, res) ->
        link.find (err, links) ->
            if err
                console.log err
                return

            console.log links
###