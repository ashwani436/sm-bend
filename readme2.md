


protected routes (login required)

    check for toke in global middleware (jwtParser)
        if valid token 
            set the req.authUser
        else
            req.authUser = undefined
        
    next();

    (login Requi   red)
    check if req.authUser has value 
        if yes 
            next()
        if no 
            Please login

    protectedFunction
        sendTheData