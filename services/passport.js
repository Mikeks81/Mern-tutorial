const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const OAuth2Strategy = require('passport-oauth2').Strategy
const mongoose = require('mongoose')
// oath variables, mongo url
const keys = require('../config/keys')
const User = mongoose.model('users')

// the "user" passed to the serialize function is the value of the done callback in the GoogleStrategy done callback -- confusing - it's a passport thing
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // persisint to the db is still an asych call so you must use promises beofore calling done
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser)
        } else {
          // persisint to the db is still an asych call so you must use promises beofore calling done
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user))
        }
      })
    }
  )
)

// bungie auth config
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: 'https://www.bungie.net/en/OAuth/Authorize',
      tokenURL: 'https://www.bungie.net/platform/app/oauth/token/',
      clientID: keys.bungieClientId,
      clientSecret: keys.bungieSecret,
      callbackURL: 'https://localhost:5000/auth/bungie/callback'
    },
    (accessToken, refreshToken, params, profile, done) => {
      User.findOneAndUpdate(
        {
          bungieId: params.membership_id
        },
        {
          accessToken: accessToken,
          accessExp: params.expires_in,
          accessSet: new Date(),
          refreshToken: refreshToken,
          refreshExp: params.refresh_expires_in,
          refreshSet: new Date(),
          accessType: params.token_type
        }
      ).then(exisitingUser => {
        if (exisitingUser) {
          done(null, exisitingUser)
        } else {
          new User({
            bungieId: params.membership_id,
            accessToken: accessToken,
            accessExp: params.expires_in,
            accessSet: new Date(),
            refreshToken: refreshToken,
            refreshExp: params.refresh_expires_in,
            refreshSet: new Date(),
            accessType: params.token_type
          })
            .save()
            .then(user => done(null, user))
        }
      })
    }
  )
)
