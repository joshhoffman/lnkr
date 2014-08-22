Controller = require '../configure/controller'

class LoginController extends Controller
    constructor: (app, config) ->
        this._name = 'login'
        this.User = config.User
        super app

module.exports = LoginController