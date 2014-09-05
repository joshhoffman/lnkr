Controller = require '../configure/controller'
settings = require '../configure/settings'

class UserController extends Controller
    constructor: (app, config) ->
        this._name = 'users/:id'
        this.User = config.User
        super app, config

    _get: (req, res, next) ->
        this.User.findOne { displayName: req.params.id }, (err, user) ->
            if err
                console.log err
                res.status 401
                return res.json { status: "failed" }
            res.json {
                id: user.email
                email: user.email
                displayName: user.displayName
            }

module.exports = UserController