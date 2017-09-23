const Logger = require('../lib/logger')

module.exports = app => {
  app.post('/api/stripe', (req, res) => {
    Logger(req.body)
    Logger(res.body)
    //console.log('res ', res)
  })
}
