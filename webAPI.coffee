express = require 'express'
path = require 'path'
redis = require 'redis'
fs = require 'fs'
config = require './configure/config'
routes = require './APIRoutes/apiRoutes'
passport = require 'passport'
hashPassword = require 'password-hash'
ensureLogin = require('connect-ensure-login').ensureLoggedIn
configPassport = require './configure/configPassport'

mongoose = require 'mongoose'

Link = require('./models/link').linkModel
User = require('./models/user').userModel

app = express()

#db = redis.createClient()
db = mongoose.connection

db.on "error", (err) ->
    console.log("Mongo Error " + err)

mongoose.connect('mongodb://localhost/lnkr')

config app
configPassport app, passport, User

routesConfig = {
    Link: Link
    User: User
    Passport: passport
    HashPassword: hashPassword
    EnsureLogin: ensureLogin
}

routes.routes app, routesConfig

port = app.get 'port'
ret = app.listen port, () ->
    console.log 'api connected on port ' + port
