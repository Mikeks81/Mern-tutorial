const express = require('express')
const mongoose = require('mongoose')
const https = require('https')
const fs = require('fs')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
require('./models/User')
require('./services/passport')

// connecting to mongodDB via mongoose
mongoose.connect(keys.mongoURI)

const app = express()

// user bodyParse to parse the request body to req.body
app.use(bodyParser.json())
app.use(
  cookieSession({
    // cookie expires in 30 days (in milliseconds)
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
// passsport is our authentication library
app.use(passport.initialize())
// use passport to set session cookies on client browser
app.use(passport.session())

// routes returns a function and we call it and poss app value into thtat function
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

// loading up ssl certs if in something other than production -- heroku has it's own certs
let httpsOptions = {}
if (process.env.NODE_ENV !== 'production') {
  httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
  }
} else {
  httpsOptions = {}
}
// setting port from env or default to 5000
const PORT = process.env.PORT || 5000

// using https for localhost to satisfy bungies API requirements
// setting https to be false all the time for now
if (true || process.env.NODE_ENV === 'production') {
  app.listen(PORT)
} else {
  // this code is just for running an https server -- isn't needed for dev vs prod.
  const server = https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('server running at ' + PORT)
  })
}
