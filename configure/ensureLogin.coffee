module.exports = (passport) ->
    return (req, res, next) ->
        if req.isAuthenticated()
            next()
        else
            res.status 401
            res.json { status: "not logged in" }
###
        passport.authenticate('local', (err, user, info) ->
            console.log 'in authenticate'
            if err
                console.log err
                res.status 401
                return res.json { "status": "failed" }
            if not user
                console.log 'not user'
                console.log user
                res.status 401
                return res.json { "status": "failed" }
            req.logIn user, (err) ->
                if err
                    console.log 'login err'
                    return next(err)
                return res.json { "status": "success" }
        )(req, res, next)
###