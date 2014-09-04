express = require 'express'
path = require 'path'
redis = require 'redis'
url = require 'url'
settings = require './configure/settings'
config = require './configure/configMiddleware'
http = require 'http'
request = require 'request'
passport = require 'passport'
hashPassword = require 'password-hash'
ensureLogin = require('./configure/ensureLogin')
mongoose = require 'mongoose'

configPassport = require './configure/configPassport'
configRoutes = require './APIRoutes/middlewareRoutes'

User = require('./models/user').userModel

client = redis.createClient()

APIAddress = settings.APIAddress + ':' + settings.APIPort + settings.APIUri

# all requests coming in should be validated, if the user in the request doesnt
# exist, it should be rejected. except for requests to /login and /register
# If the user exists, check redis with how many requests that user has had
# can maybe use IP instead? Increment number, and reset expiration timer
# on that entry


app = express()

db = mongoose.connection

db.on "error", (err) ->
    console.log("Mongo Error " + err)

mongoose.connect('mongodb://localhost/lnkr')

config app
configPassport app, passport, User

routesConfig = {
    User: User
    Passport: passport
    HashPassword: hashPassword
    EnsureLogin: ensureLogin
    UriPrefix: settings.MiddlewareUri
}

configRoutes.routes app, routesConfig


app.use (req, res, next) ->
    console.log 'request'
    console.log req.url
    next()

app.get '/' + settings.MiddlewareUri + '/loggedin', (req, res) ->
    console.log 'in logged in'
    if req.user?
        console.log 'logged in'
        res.json { email: req.user.email, roles: req.user.roles }
    else
        console.log 'not logged in'
        res.status 401
        res.json { status: "failed" }


app.get '/' + settings.MiddlewareUri + "/:uri", (req, res) ->
    console.log req.params.uri

    options = {
        url: APIAddress + "/" + req.params.uri
    }

    request options, (err, resp, body) ->
        console.log err if err
        console.log body
        console.log resp.statusCode

        res.status resp.statusCode
        res.end body

app.post '/' + settings.MiddlewareUri + "/:uri", (req, res)->
    console.log 'post'
    console.log req.body

    options = {
        url: APIAddress + "/" + req.params.uri
        method: "POST"
        form: req.body
    }

    request options, (err, resp, body) ->
        console.log err if err
        console.log body
        console.log resp.statusCode

        res.status resp.statusCode
        res.end body

port = app.get 'port'
ret = app.listen port, () ->
    console.log 'middleware connected on port ' + port