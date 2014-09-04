morgan = require 'morgan'
expressJson = require 'express-json'
methodOverride = require 'method-override'
errorHandler = require 'errorhandler'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
session = require 'express-session'

module.exports = (app) ->
    app.set 'port', process.argv[2] || process.env.PORT || 3000
    app.use morgan('dev', {immediate: true})
    app.use expressJson()
    app.use bodyParser.urlencoded({extended: true})
    app.use bodyParser.json()
    app.use methodOverride()

    app.use cookieParser('totes secret')
    app.use session({
        secret: 'yeaaaboy',
        resave: true,
        saveUninitialized: false
    })

    app.use errorHandler() if 'development' is app.get('env')