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

APIAddress = settings.APIAddress + ':' + settings.APIPort + '/' + settings.APIUri

# all requests coming in should be validated, if the user in the request doesnt
# exist, it should be rejected. except for requests to /login and /register
# If the user exists, check redis with how many requests that user has had
# can maybe use IP instead? Increment number, and reset expiration timer
# on that entry


app = express()

db = mongoose.connection

db.on "error", (err) ->
    console.log("Mongo Error " + err)

mongoAddress = 'mongodb://'
mongoAddress = mongoAddress + settings.MongoServer
mongoAddress = mongoAddress + '/'
mongoAddress = mongoAddress + settings.MongoDBName
mongoose.connect(mongoAddress)

config app
configPassport app, passport, User

routesConfig = {
    User: User
    Passport: passport
    HashPassword: hashPassword
    EnsureLogin: ensureLogin
    UriPrefix: settings.MiddlewareUri
    Client: client
}

configRoutes.routes app, routesConfig

app.use (req, res, next) ->
    console.log 'request'
    console.log req.url
    next()

app.get '/' + settings.MiddlewareUri + '/loggedin', (req, res) ->
    console.log 'in logged in'
    if req.user?
        res.json { email: req.user.email, roles: req.user.roles }
    else
        res.status 401
        res.json { status: "failed" }


app.get '/' + settings.MiddlewareUri + "/:uri/:param?", ensureLogin(passport, client), (req, res) ->
    console.log 'get'
    
    requestUrl = APIAddress + "/" + req.params.uri
    requestUrl = requestUrl + '/' + req.params.param if req.params.param

    options = {
        url: requestUrl
        json: req.user
    }

    request options, (err, resp, body) ->
        console.log err if err

        res.status resp.statusCode
        res.json body

app.post '/' + settings.MiddlewareUri + "/:uri", ensureLogin(passport, client), (req, res)->
    console.log 'post'
    req.body.email = req.user.email
    console.log req.body

    options = {
        url: APIAddress + "/" + req.params.uri
        method: "POST"
        form: req.body
    }

    request options, (err, resp, body) ->
        console.log err if err

        res.status resp.statusCode
        res.json body

app.put '/' + settings.MiddlewareUri + "/:uri/:param?", ensureLogin(passport, client), (req, res) ->
    console.log 'put'
    
    requestUrl = APIAddress + "/" + req.params.uri
    requestUrl = requestUrl + '/' + req.params.param if req.params.param
    req.body.email = req.user.email

    options = {
        url: requestUrl
        method: "PUT"
        form: req.body
    }

    request options, (err, resp, body) ->
        console.log err if err

        res.status resp.statusCode
        res.json body

app.delete '/'+settings.MiddlewareUri+"/:uri/:param?", ensureLogin(passport, client), (req, res) ->
    console.log 'delete'
    
    requestUrl = APIAddress + "/" + req.params.uri
    requestUrl = requestUrl + '/' + req.params.param if req.params.param
    req.body.email = req.user.email

    options = {
        url: requestUrl
        method: "DELETE"
        form: req.body
    }

    request options, (err, resp, body) ->
        console.log err if err

        res.status resp.statusCode
        res.json body

port = app.get 'port'
ret = app.listen port, () ->
    console.log 'middleware connected on port ' + port