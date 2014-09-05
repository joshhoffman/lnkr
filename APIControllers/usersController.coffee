Controller = require '../configure/controller'
settings = require '../configure/settings'

class UsersController extends Controller
    constructor: (app, config) ->
        this._name = 'users/:id'
        this.User = config.User
        super app, config

module.exports = UsersController