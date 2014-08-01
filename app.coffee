express = require 'express'
path = require 'path'
redis = require 'redis'
fs = require 'fs'
config = require './configure/config'

app = express()

db = redis.createClient()

config.config(app)

app.get '/', (res, req) ->
    fs.readFile '/public/index.html', (err, html) ->
        if err
            throw err
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

port = app.get 'port'
ret = app.listen port, () ->
    console.log 'connected on port ' + port
