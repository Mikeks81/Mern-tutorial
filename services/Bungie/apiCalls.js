const axios = require('axios')
const keys = require('../../config/keys')
const Logger = require('../../lib/logger')

class Bungie {
  async get(endpoint, options = {}, cb) {
    try {
      Logger(`fetching ${keys.bungieBaseUrl}${endpoint}`)
      const response = await axios(`${keys.bungieBaseUrl}${endpoint}`, {
        headers: { 'X-API-KEY': keys.bungieApiKey }
      })
      if (cb) cb(response.data)
      return response.data
    } catch (error) {
      if (cb) cb(error)
      return error
    }
  }

  post(endpoint, options = {}, cb) {
    console.log('HELLO POST')
  }
}

module.exports = Bungie
