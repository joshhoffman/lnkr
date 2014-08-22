localStrategy = require('passport-local').Strategy
userModel = require '../models/user'
passwordHash = require 'password-hash'

module.exports = (app, passport) ->
    app.use passport.initialize()
    app.use passport.session()
    passport.use new localStrategy (username, password, done) ->
        userModel.userModel.findOne {username: username}, (err, user) ->
            if err
                console.log 'Error in find'
                return done(err)
            if not user
                console.log 'err usr ' + username + ' ' + password
                return done(null, false, {message: 'Incorrect username'})
            if passwordHash.verify(password, user.password)
                console.log 'err pass'
                return done(null, user)

            console.log 'wow... not logged in'
            console.log 'user password ' + user.password
            console.log passwordHash.generate(password)
            return done(null, false, {message: 'Incorrect password'})

    passport.serializeUser (user, done) ->
        console.log 'in serialize '+ user
        done null, user.id

    passport.deserializeUser (id, done) ->
        console.log 'in deserialize ' + id
        userModel.userModel.findById id, (err, user) ->
            done(err) if err
            done(null, user)