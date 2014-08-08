###
Controller = (app) ->
    var self = this;
    var name = '/api/' + this._name;
    app.post name, (req, res, next) ->
        self._post req, res, next
    app.get name, (req,res,next) ->
        self._get req, res, next

Controller.prototype._name = ''

Controller.prototype._get = (req, res, next) ->
    pass

Controller.prototype._post = (req, res, next) ->
    pass
###
    
class Controller
    constructor: (app) ->
        console.log('controller init')
        self = this
        name = '/api/' + this._name
        app.post name, (req, res, next) ->
            self._post req, res, next
        app.get name, (req,res,next) ->
            self._get req, res, next
        app.put name, (req,res,next) ->
            self._put req, res, next
        app.delete name, (req,res,next) ->
            self._delete req, res, next

    #_name: ''
    
    _get: (req, res, next) ->
    
    _post: (req, res, next) ->
    
    _put: (req, res, next) ->
    
    _delete: (req, res, next) ->

module.exports = Controller