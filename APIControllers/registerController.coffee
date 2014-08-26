Controller = require '../configure/controller'
sify = require('../configure/utils/utils').sify

class RegisterController extends Controller
    constructor: (app, config) ->
        this._name = 'register'
        this.User = config.User
        this.HashPassword = config.HashPassword
        super app

    _post: (req, res) ->
        console.log 'register'
        password = req.body.password
        confirmPassword = req.body.confirmPassword

        self = this

        this.User.findOne {email: req.body.email}, (err, foundUser) ->
            console.log err if err
            if not foundUser and not err and password is confirmPassword
                usr = new self.User {
                    'email': req.body.email
                    'password': self.HashPassword.generate(req.body.password)
                    'displayName': req.body.displayName
                }
                console.log 'register' + usr.email
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
                        console.log sify({"status":"success"})
                        res.json usr
                        return
            else
                console.log foundUser
                console.log password
                console.log confirmPassword
                console.log '!!! error' if err
                res.writeHead 200, {"Content-type": 'application/json'}
                console.log 'register failed. user already exists'
                res.json {"status":"failed"}


module.exports = RegisterController
