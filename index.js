const express = require('express')
const mongoose = require('mongoose')
const https = require('https')
const fs = require('fs')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

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

// loading up ssl certs if in something other than production -- heroku has it's own certs
let httpsOptions = {}
// setting any http
if (process.env.NODE_ENV !== 'production') {
  httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
  }
} else {
  httpsOptions = {}
}

const PORT = process.env.PORT || 5000

// using https for localhost to satisfy bungies API requirements
// setting https to be false all the time for now
if (true || process.env.NODE_ENV === 'production') {
  app.listen(PORT)
} else {
  const server = https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('server running at ' + PORT)
  })
}
