class Controller
    constructor: (app, config) ->
        self = this
        name = '/api/' + this._name
        this._name = name
        app.post name, config.EnsureLogin('/'), (req, res, next) ->
            self._post req, res, next
        app.get name, config.EnsureLogin('/'), (req, res, next) ->
            console.log self._get
            self._get req, res, next
        app.put name, config.EnsureLogin('/'), (req, res, next) ->
            self._put req, res, next
        app.delete name, config.EnsureLogin('/'), (req, res, next) ->
            self._delete req, res, next

    _get: (req, res, next) ->

    _post: (req, res, next) ->

    _put: (req, res, next) ->

    _delete: (req, res, next) ->

module.exports = Controller
