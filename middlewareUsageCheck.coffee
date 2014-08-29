express = require 'express'
path = require 'path'
redis = require 'redis'
url = require 'url'
settings = require './configure/settings'
config = require './configure/configMiddleware'

client = redis.createClient()

APIAddress = settings.APIAddress + ':' + settings.APIPort + settings.APIUri

# all requests coming in should be validated, if the user in the request doesnt
# exist, it should be rejected. except for requests to /login and /register
# If the user exists, check redis with how many requests that user has had
# can maybe use IP instead? Increment number, and reset expiration timer
# on that entry


app = express()

config app

app.get settings.MiddlewareUri + "/:uri", (req, res) ->
    console.log req.uri

port = app.get 'port'
ret = app.listen port, () ->
    console.log 'middleware connected on port ' + port