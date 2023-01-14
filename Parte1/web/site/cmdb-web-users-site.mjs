// Module responsibilities
// Register game api routes
// Have the functions that handle HTTP requests

import express from 'express'
import passport from 'passport'
import expressSession from 'express-session'
import toHttpResponse from '../response-errors.mjs'
import fileStore from 'session-file-store'


export default function(services) {
    const router = express.Router()

    router.use(expressSession(
        {
          secret: "Never give up",
          resave: false,
          saveUninitialized: false
        }
        ))

    // Passport initialization
    router.use(passport.initialize())
    router.use(passport.session())

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))    

    router.use('/groups', verifyAuthenticated)
    router.get('/signup', signupForm)                   // Get the signup
    router.post('/signup', signup)                      // Receive the signup data and create the new user
    router.get('/login', loginForm)                    // Get the login form
    router.get('/login', loginForm)                    // Get the login form
    router.post('/login', login)                       // Verify login credentials
    router.post('/logout',logout)                      // Get a form to create a game
    
    return router

    function verifyAuthenticated(req, rsp, next) {
        if(req.user)
            return next()
        rsp.redirect('/login')
    } 

    function loginForm(req, rsp) {
        rsp.render('login')
    }

    async function login(req, rsp) {
        let user = await services.validateCredentials(req.body.username, req.body.password)
        if(user) {
            console.log("login", user)
            return req.login(user, (err) => rsp.redirect('/groups'))
        } 
        rsp.render('login', {username: req.body.username, message: "Invalid credentials"})
    }

    function logout(req, rsp) {
        req.logout((err) => rsp.redirect('/'))
    }

    function signupForm(req, rsp) {
        rsp.render('signup')    
    }

    async function signup(req, rsp) {
        try {
            let user = await services.signup(req.body.username, req.body.email, req.body.password, req.body.passwordConfirm)
            rsp.redirect('/groups')
        } catch(e) {
            const response = toHttpResponse(e)
            console.log(response)
            rsp.status(response.status)
            rsp.render('signup', {username: req.body.username, email: req.body.email, message: response.body.message})
        }
    }
}