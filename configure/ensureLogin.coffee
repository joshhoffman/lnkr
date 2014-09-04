settings = require '../configure/settings'

module.exports = (passport, client) ->
    return (req, res, next) ->
        if req.isAuthenticated()
            client.get req.user.email, (err, resp) ->
                if err
                    res.status 401
                    return res.json { status: "middle failure" }
                
                # If the user has too many requests, don't let them continue
                if resp > settings.MaxRequestsPerMinute
                    res.status 400
                    return res.json { status: "Too many requests" }
                
                # If the user is good on requests, increment their counters and continue
                if not resp
                    client.set req.user.email, 1
                else
                    client.incr req.user.email
                
                # reset expiration timer
                client.expire req.user.email, 60
                    
                next()
        else
            res.status 401
            res.json { status: "not logged in" }