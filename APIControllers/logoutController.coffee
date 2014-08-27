SecureController = require '../configure/secureController'

class LogoutController extends SecureController
    constructor: (app, configure) ->
        this._name = 'logout'
        super app, configure

    _get: (req, res, next) ->
        console.log 'logging out'
        req.logOut()
        res.json { status: "success" }

module.exports = LogoutController