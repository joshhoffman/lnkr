Controller = require '../configure/controller'

class RegisterController extends Controller
    constructor: (app, config) ->
        this._name = 'register'
        this.User = config.User
        this.HashPassword = config.HashPassword
        super app



module.exports = RegisterController
