express = require 'express'
path = require 'path'
fs = require 'fs'
config = require './configure/config'

proxy = require('proxy-middleware')
url = require('url')

app = express()

app.use '/api', proxy(url.parse('http://0.0.0.0:5001/api'))

config.config(app)

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
