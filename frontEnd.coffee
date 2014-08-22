express = require 'express'
path = require 'path'
fs = require 'fs'
config = require './configure/config'

settings = require './configure/settings'

proxy = require('proxy-middleware')
url = require('url')

app = express()

APIAddress = settings.APIAddress + ':' + settings.APIPort + settings.APIUri

app.use settings.APIUri, proxy(url.parse(APIAddress))

config(app)

app.get '/', (req, res) ->
    fs.readFile '/public/index.html', (err, html) ->
        if err
            throw err
        res.writeHeader(200, {"Content-Type": "text/html"})
        res.write(html)
        res.end()

port = app.get 'port'
ret = app.listen port, () ->
    console.log 'front endconnected on port ' + port
