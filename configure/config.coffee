#passport = require 'passport'
#configPassport = require './configurePassport'
favicon = require 'serve-favicon'
morgan = require 'morgan'
cookieParser = require 'cookie-parser'
session = require 'express-session'
expressJson = require 'express-json'
methodOverride = require 'method-override'
errorHandler = require 'errorhandler'
bodyParser = require 'body-parser'
path = require 'path'
express = require 'express'
url = require 'url'

exports.config = (app) ->
    app.set 'port', process.env.port || process.argv[2] || 5001
    app.use favicon(path.join(__dirname, '../public/favicon.ico'))
    app.use morgan('dev', {immediate: true})
    # proxy
    #app.use('/api', proxy(url.parse('http://0.0.0.0:' + app.get 'port' + '/api')))
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
    #app.use passport.initialize()
    #app.use passport.session()

    app.use express.static(path.join(__dirname, '../public'))

    app.use errorHandler() if 'development' is app.get('env')
