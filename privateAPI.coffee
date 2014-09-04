express = require 'express'
path = require 'path'
fs = require 'fs'
config = require './configure/config'
routes = require './APIRoutes/apiRoutes'
passport = require 'passport'
hashPassword = require 'password-hash'
#ensureLogin = require('connect-ensure-login').ensureLoggedIn
ensureLogin = require('./configure/ensureLogin')
configPassport = require './configure/configPassport'
settings = require('./configure/settings')

mongoose = require 'mongoose'

Links = require('./models/links').linksModel
Link = require('./models/link').linkModel
User = require('./models/user').userModel

app = express()

#db = redis.createClient()
db = mongoose.connection

db.on "error", (err) ->
    console.log("Mongo Error " + err)

mongoAddress = 'mongodb://'
mongoAddress = mongoAddress + settings.MongoServer
mongoAddress = mongoAddress + '/'
mongoAddress = mongoAddress + settings.MongoDBName
mongoose.connect(mongoAddress)

config app

routesConfig = {
    Link: Links
    User: User
    Passport: passport
    HashPassword: hashPassword
    EnsureLogin: ensureLogin
    UriPrefix: settings.APIUri
}

routes.routes app, routesConfig

port = app.get 'port'
ret = app.listen port, () ->
    console.log 'api connected on port ' + port
