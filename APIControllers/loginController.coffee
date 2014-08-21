Controller = require '../configure/controller'

class LoginController extends Controller
    constructor: (app, User) ->
        this._name = 'login'
        this.User = User
        super app