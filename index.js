const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./services/passport')
require('./routes/authRoutes')

const db = mongoose.connect(keys.mongodbDevURI)

const app = express()

// authroutes returns a function and we call it and poss app value into thtat function
require('./routes/authRoutes')(app)

app.use((req, res, next) => {
  req.db = db
  next()
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
