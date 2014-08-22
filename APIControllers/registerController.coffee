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
        confirmPassword = req.body.confirmpassword

        self = this

        this.User.findOne {username: req.body.username}, (err, foundUser) ->
            if not foundUser and not err and password is confirmPassword
                usr = new self.User {
                    'username': req.body.username
                    'password': req.body.password
                    'displayname': req.body.displayname
                }
                console.log 'register' + usr.displayname
                usr.save (err, result) ->
                    if not err
                        console.log err
                    else
                        console.log result
                        console.log 'success!'
                    req.logIn usr, (err) ->
                        console.log 'login failed'
                        res.end sify({"status":"failed"})
                    console.log sify({"status":"success"})
                    res.end sify({"status":"success"})
            else
                console.log foundUser
                console.log password
                console.log confirmPassword
                console.log '!!! error' if err
                res.writeHead 200, {"Content-type": 'application/json'}
                console.log 'register failed. user already exists'
                res.end(sify({"status":"failed"}))


module.exports = RegisterController
