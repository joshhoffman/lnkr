Controller = require '../configure/controller'
sift = require '../configure/utils/utils'

class LoginController extends Controller
    constructor: (app, config) ->
        console.log 'login constructor'
        this._name = 'login'
        this.User = config.User
        this.passport = config.Passport
        super app

    _post: (req, res, next) ->
        console.log 'in login post top'
        this.passport.authenticate('local', (err, user) ->
            if err
                console.log 'login failed'
                console.log err
                return res.json { 'status' : 'failed' }
            console.log 'no err'

            if not user
                console.log 'not user'
                return res.json { 'status' : 'failed' }

            req.logIn user, (err) ->
                console.log 'in login'
                return res.json { 'status': 'failed' } if err
                console.log 'about to redirect'
                res.json { 'status': 'success' }
        )(req, res, next)

    _get: (req, res, next) ->
        res.json({"test": "test"})


module.exports = LoginController