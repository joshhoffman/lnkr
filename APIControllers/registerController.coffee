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

        # this.User.find().or([{email: req.body.email}, {displayName: req.body.displayName}]).exec()
        query = this.User.find()
        query.or [{email: req.body.email}, {displayName: req.body.displayName}]
        query.exec (err, foundUser) ->
            console.log 'in find'
            console.log err if err
            validUser = foundUser? and foundUser.length == 0
            if validUser and not err and password is confirmPassword
                usr = new self.User {
                    'email': req.body.email
                    'password': self.HashPassword.generate(req.body.password)
                    'displayName': req.body.displayName
                }
                console.log 'in big if'

                usr.save (err, result) ->
                    if err
                        console.log err
                        res.status 401
                        return res.json {"status":"failed"}
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
                res.status 401
                res.json {"status":"failed"}

module.exports = RegisterController
