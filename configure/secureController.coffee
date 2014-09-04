class Controller
    constructor: (app, config) ->
        self = this
        name = '/' + config.UriPrefix + '/' + this._name
        this._name = name
        #app.all name, config.Passport.authenticate('local')
        app.all name, config.EnsureLogin(config.Passport)
        
        app.post name, (req, res, next) ->
            self._post req, res, next
        app.get name, (req, res, next) ->
            self._get req, res, next
        app.put name, (req, res, next) ->
            self._put req, res, next
        app.delete name, (req, res, next) ->
            self._delete req, res, next

    _get: (req, res, next) ->

    _post: (req, res, next) ->

    _put: (req, res, next) ->

    _delete: (req, res, next) ->

module.exports = Controller
