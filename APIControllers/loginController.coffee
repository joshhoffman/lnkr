Controller = require '../configure/controller'
sift = require '../configure/utils/utils'
settings = require '../configure/settings'

class LoginController extends Controller
    constructor: (app, config) ->
        this._name = 'login'
        this.User = config.User
        this.passport = config.Passport
        super app, config

    _post: (req, res, next) ->
        console.log 'in login post top'
        console.log req.body
        this.passport.authenticate('local', (err, user) ->
            if err
                console.log err
                res.status 401
                return res.json { 'status' : 'failed' }

            if not user
                res.status 401
                console.log 'not user'
                return res.json { 'status' : 'failed' }

            req.logIn user, (err) ->
                if err
                    res.status 401
                    return res.json { 'status': 'failed' }
                console.log 'logged in'
                res.json user
        )(req, res, next)

    _get: (req, res, next) ->
        res.json({"test": "test"})


module.exports = LoginController