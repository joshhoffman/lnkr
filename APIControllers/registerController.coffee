Controller = require '../configure/controller'
sify = require('../configure/utils/utils').sify
settings = require '../configure/settings'

class RegisterController extends Controller
    constructor: (app, config) ->
        #this._name = settings.MiddlewareUri + '/register'
        this._name = 'register'
        this.User = config.User
        this.HashPassword = config.HashPassword
        super app, config

    _post: (req, res) ->
        console.log 'register'
        password = req.body.password
        confirmPassword = req.body.confirmPassword

        self = this

        this.User.findOne {email: req.body.email}, (err, foundUser) ->
            console.log 'in find'
            console.log err if err
            if not foundUser and not err and password is confirmPassword
                usr = new self.User {
                    'email': req.body.email
                    'password': self.HashPassword.generate(req.body.password)
                    'displayName': req.body.displayName
                }
                console.log 'in big if'

                usr.save (err, result) ->
                    if not err
                        console.log err
                    else
                        console.log result
                        console.log 'success!'
                    req.logIn usr, (err) ->
                        if err
                            res.status 401
                            return res.json {"status":"failed"}
                        res.json usr
                        return
            else
                console.log 'in delse'
                console.log err if err
                console.log foundUser
                res.status 401
                res.json {"status":"failed"}


module.exports = RegisterController
