const Logger = require('../lib/logger')
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecret)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    try {
      const charge = await stripe.charges.create({
        amount: 500,
        source: req.body.id,
        currency: 'usd',
        description: '$5 for 5 credits'
      })
      // passport sessions check the cleint cookie on each request to make sure the user is logged in. IF the user is logged in then it will attach the user(User model instance) specified in the cookie to to the req object. Since the user object instance is attached to the req object all of it's mongoose methods/functions come along with it including save.
      req.user.credits += 5
      // we save the updated user document to user uand send that to the client rather than the old non-updated req.user to the client
      const user = await req.user.save()

      Logger(`user : ${user.id} charge =====>  ${charge} was Successful!`)
      res.send(user)
    } catch (err) {
      Logger(`errrr ====> ${err.message}`)
    }
  })
}
