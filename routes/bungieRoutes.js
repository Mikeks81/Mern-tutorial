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

  app.get('/api/player', async (req, res) => {
    const memberId = await bungie.get(
      `/Destiny2/SearchDestinyPlayer/2/${req.query.player}/`
    )
    let playerCharacters = await bungie.get(
      `/Destiny2/2/Profile/${memberId.Response[0]
        .membershipId}?components=100,200,202,205`
    )
    // console.log(
    //   playerCharacters.Response.characterEquipment.data['2305843009265591113']
    //     .items
    // )
    // WORK OUT A MORE EFFICIENT WAY... LOAD ON CLIENT REQUEST -- TAKES 4-5 SECONSD TO LOAD
    // let charItemsInfo = {}
    // for (var character in playerCharacters.Response.characterEquipment.data) {
    //   let instanceIds = await Promise.all(
    //     playerCharacters.Response.characterEquipment.data[
    //       character
    //     ].items.map(async key => {
    //       const instance = key.itemInstanceId
    //       console.log(
    //         '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ',
    //         instance
    //       )
    //
    //       let itemFetch = await bungie.get(
    //         `/Destiny2/2/Profile/${memberId.Response[0]
    //           .membershipId}/Item/${key.itemInstanceId}?components=300,301,302,303,304,305,306,307`
    //       )
    //       console.log('------------- ', itemFetch.Response.item.data.itemHash)
    //       let item = { [instance]: itemFetch }
    //       return item
    //     })
    //   )
    //   charItemsInfo[character] = Object.assign({}, ...instanceIds)
    //   console.log('#$%%@#$%@#$ ', charItemsInfo)
    // }
    //
    // console.log(
    //   'GSSERGSRESR ',
    //   charItemsInfo['2305843009265591113']['6917529036434304692']
    // )

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
    itemObj = {
      itemFetch: itemFetch.Response,
      itemDefinition: itemDisplayObj.Response
    }
    res.send(itemObj)
  })
}

// GET MEMEBERSHIP TYPE /DESTINY ID BY LOOKING UP DESINY PLAYER
// FOR NOW TRY membershipType 1 THEN 2 AND SEE WHAT COMESBACK
// /Destiny2/SearchDestinyPlayer/{membershipType}/{displayName}/

// CHARACTER ID'S, MEMBERSHIPTYPE
// /Destiny2/{membershipType}/Profile/{destinyMembershipId}?components=100
