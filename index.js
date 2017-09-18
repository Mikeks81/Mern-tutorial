const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongodbDevURI)

const app = express()
app.use(
  cookieSession({
    // 30 days in milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

// authroutes returns a function and we call it and poss app value into thtat function
require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000

app.listen(PORT)
