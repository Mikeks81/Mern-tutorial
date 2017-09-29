const express = require('express')
const mongoose = require('mongoose')
const https = require('https')
const fs = require('fs')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
// express doesn't parse the req body for you so we need an additional library
const bodyParser = require('body-parser')
// requiring so that the schema gets ran and configured at run time
require('./models/User')
require('./models/Survey')
// requiring so that passport services are configured at run time
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
require('./routes/surveysRoutes')(app)
require('./routes/bungieRoutes')(app)

// made for routing in production ( where there isnt two servers but the client is just static files)
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file or main.css file!
  // if express sees get req for something and doesn't recognize it in any of the defined routes above then it will search client/build for a file that matches what the get req is looking for and respond
  app.use(express.static('client/build'))

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  // so if the route doesn't match a file from above ( client/build ) serve up the react index.html file and let react handle the route.
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

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

// the line below ffound under scripts in packaage.json is telling Heroku that after build of server production dependencies to now install developement dependencies for every command after, then runs npm install with prefix client ( so runs npm install for in the client folder for the react part of the app) and once done also npm build the react app as well.

// By default on each deployment NPM_CONFIG_PRODUCTION is set to true and we need to turn it off after server production dependencies have been installed.

// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
