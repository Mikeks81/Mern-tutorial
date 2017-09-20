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
let httpsOptions = {}
if (process.env.NODE_ENV === 'develop') {
  httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
  }
} else {
  httpsOptions = {}
}

const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
  const server = https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('server running at ' + PORT)
  })
} else {
  app.listen(PORT)
}
