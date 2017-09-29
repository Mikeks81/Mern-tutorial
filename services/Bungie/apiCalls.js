const axios = require('axios')
const keys = require('../../config/keys')

class Bungie {
  async get(endpoint, options = {}, cb) {
    try {
      const response = await axios(`${keys.bungieBaseUrl}${endpoint}`, {
        headers: { 'X-API-KEY': keys.bungieApiKey }
      })
      cb(response.data)
    } catch (error) {
      cb(error)
    }
  }

  post(endpoint, options = {}, cb) {
    console.log('HELLO POST')
  }
}

module.exports = Bungie
