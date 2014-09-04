LoginController = require '../APIControllers/loginController'
RegisterController = require '../APIControllers/registerController'
LogoutController = require '../APIControllers/logoutController'

exports.routes = (app, routesConfig) ->
    loginController = new LoginController app, routesConfig
    registerController = new RegisterController app, routesConfig
    logoutController = new LogoutController app, routesConfig
