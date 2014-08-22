SecureController = require '../configure/secureController'

class LogoutController extends SecureController
    constructor: (app, configure) ->
        this._name = 'logout'

    _get: (req, res, next) ->
        console.log 'logging out'
        req.logOut()

module.exports = LogoutController