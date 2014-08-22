Controller = require '../configure/controller'
sift = require '../configure/utils/utils'

class LoginController extends Controller
    constructor: (app, config) ->
        this._name = 'login'
        this.User = config.User
        this.passport = config.Passport
        super app

    _post: (req, res, next) ->
        console.log 'in login post'
        this.passport.authenticate('local', (err, user) ->
            if err
                console.log 'login failed'
                console.log err
                return res.json sify({ 'status' : 'failed' })

            if not user
                console.log 'not user'

            return res.redirect '/#login' if not user
            req.logIn user, (err) ->
                console.log 'in login'
                return next err if err
                console.log 'about to redirect'
                return next null, user
        )(req, res, next)

    _get: (req, res, next) ->
        res.json({"test": "test"})


module.exports = LoginController