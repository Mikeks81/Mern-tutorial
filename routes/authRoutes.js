const passport = require('passport')
const Logger = require('../lib/logger')

module.exports = app => {
  // gooogle
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      Logger('Successful login, redirecting to /')
      res.redirect('/')
    }
  )

  // bungie
  app.get('/auth/bungie', passport.authenticate('oauth2'))

  app.get(
    '/auth/bungie/callback',
    passport.authenticate('oauth2', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect home.
      Logger('Successful login, redirecting to /')
      res.redirect('/')
    }
  )

  // user flow
  app.get('/api/logout', (req, res) => {
    req.logout()
    res.send(req.user)
  })

  app.get('/api/current_user', (req, res) => {
    // passport automatically attaches a user object to req
    res.send(req.user)
  })
}
