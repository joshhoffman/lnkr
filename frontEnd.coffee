express = require 'express'
path = require 'path'
redis = require 'redis'
fs = require 'fs'
config = require './configure/config'

app = express()

db = redis.createClient()

db.on "error", (err) ->
    console.log("Error " + err)

config.config(app)

app.get '/', (req, res) ->
    fs.readFile '/public/index.html', (err, html) ->
        if err
            throw err
        res.writeHeader(200, {"Content-Type": "text/html"})
        res.write(html)
        res.end()

###
app.get '/readitem', (req, res) ->
    console.log('')

app.get '/readitems', (req, res) ->
    console.log('readitems')
    #db.set('key', 'val', redis.print)
    db.hgetall 'test1', (err, obj) ->
        console.log 'getting all'
        console.log(obj)
        res.json(obj)

app.post '/readitem', (req, res) ->
    console.log 'post readitem'
    console.log(req.body)
    console.log db.hmset 'test1', 'name', req.body.name, 'link', req.body.link, (err, obj) ->
        console.log('saved')
        res.json({ status: 'success' })
###

port = app.get 'port'
ret = app.listen port, () ->
    console.log 'connected on port ' + port
