const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const Bungie = require('../services/Bungie/apiCalls')

const bungie = new Bungie()

module.exports = app => {
  app.get('/api/profile', requireLogin, async (req, res) => {
    await bungie.get(
      `/User/GetBungieNetUserById/${req.user.bungieId}/`,
      {},
      data => {
        res.send(data)
      }
    )
  })

  app.get('/api/player', async (req, res) => {
    const memberId = await bungie.get(
      `/Destiny2/SearchDestinyPlayer/2/${req.query.player}/`
    )
    let playerCharacters = await bungie.get(
      `/Destiny2/2/Profile/${memberId.Response[0]
        .membershipId}?components=100,200,202,205`
    )
    res.send(playerCharacters)
  })

  app.get('/api/itemInstance/:membershipId/:instanceHash', async (req, res) => {
    const { membershipId, instanceHash } = req.params

    const itemFetch = await bungie.get(
      `/Destiny2/2/Profile/${membershipId}/Item/${instanceHash}?components=300,307`
    )

    const itemDisplayObj = await bungie.get(
      `/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemFetch.Response
        .item.data.itemHash}`
    )
    const itemObj = {
      itemFetch: itemFetch.Response,
      itemDefinition: itemDisplayObj.Response
    }
    res.send(itemObj)
  })

  app.get('/api/get_user_group/:user_id', async (req, res) => {
    const { group_id } = req.params
    const { Response } = await bungie.get(
      `/GroupV2/User/2/4611686018458111348/0/1/`
    )
    res.send(Response[0])
  })

  app.get('/api/get_group_details/:group_id', async (req, res) => {
    const { group_id } = req.params

    const groupDetails = await bungie.get(`/GroupV2/${group_id}/`)
  })

  app.get('/api/get_group_members/:group_id', async (req, res) => {
    const { group_id } = req.params
    const groupDetails = await bungie.get(
      `/GroupV2/${group_id}/Members?memberType=0&currentpage=1`
    )
  })
}

// GET MEMEBERSHIP TYPE /DESTINY ID BY LOOKING UP DESINY PLAYER
// FOR NOW TRY membershipType 1 THEN 2 AND SEE WHAT COMESBACK
// /Destiny2/SearchDestinyPlayer/{membershipType}/{displayName}/

// CHARACTER ID'S, MEMBERSHIPTYPE
// /Destiny2/{membershipType}/Profile/{destinyMembershipId}?components=100
