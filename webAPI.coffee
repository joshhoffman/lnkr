express = require 'express'
path = require 'path'
redis = require 'redis'
fs = require 'fs'
config = require './configure/config'
routes = require './APIRoutes/apiRoutes'

mongoose = require 'mongoose'

Link = require('./models/link').linkModel

app = express()

#db = redis.createClient()
db = mongoose.connection

db.on "error", (err) ->
    console.log("Mongo Error " + err)

mongoose.connect('mongodb://localhost/lnkr')

config.config app

routes.routes app, Link

port = app.get 'port'
ret = app.listen port, () ->
    console.log 'api connected on port ' + port
