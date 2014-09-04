localStrategy = require('passport-local').Strategy
userModel = require '../models/user'
passwordHash = require 'password-hash'

module.exports = (app, passport, User) ->
    app.use passport.initialize()
    app.use passport.session()
    console.log 'setup passport'
    passport.use new localStrategy { usernameField: 'email' }, (email, password, done) ->
        User.findOne {email: email}, (err, user) ->
            if err
                console.log 'Error in find'
                return done(err)
            if not user
                console.log 'err usr ' + email + ' ' + password
                return done(null, false, {message: 'Incorrect username'})
            if not passwordHash.verify(password, user.password)
                console.log 'err pass ' + password + ' ' + user.password
                return done(null, false, {message: 'Incorrect username'})

            console.log passwordHash.generate(password)
            return done(null, user)

    passport.serializeUser (user, done) ->
        done null, user.id

    passport.deserializeUser (id, done) ->
        console.log 'in deserialize ' + id
        User.findById id, (err, user) ->
            done(err) if err
            done(null, user)