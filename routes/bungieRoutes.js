const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const Bungie = require('../services/Bungie/apiCalls')

const bungie = new Bungie()

module.exports = app => {
  app.get('/api/profile', requireLogin, (req, res) => {
    const data = bungie.get(
      `/User/GetBungieNetUserById/${req.user.bungieId}/`,
      {},
      data => {
        res.send(data)
      }
    )
  })
}

// GET MEMEBERSHIP TYPE /DESTINY ID BY LOOKING UP DESINY PLAYER
// FOR NOW TRY membershipType 1 THEN 2 AND SEE WHAT COMESBACK
// /Destiny2/SearchDestinyPlayer/{membershipType}/{displayName}/

// CHARACTER ID'S, MEMBERSHIPTYPE
// /Destiny2/{membershipType}/Profile/{destinyMembershipId}?components=100
