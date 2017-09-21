const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String,
  bungieId: String,
  accessToken: String,
  accessExp: Number,
  accessSet: Date,
  refreshToken: String,
  refreshExp: Number,
  refreshSet: Date,
  accessType: String,
  lastLogIn: Date,
  createdAt: { type: Date, default: Date.now }
})

// passing in a 2nd arg to mongoose set up the collection(class)
// pass 1 arg and you will get that collection(class) from mongoose
mongoose.model('users', userSchema)
