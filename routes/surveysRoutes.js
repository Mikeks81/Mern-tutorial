const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Logger = require('../lib/logger')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = app => {
  app.get('/api/surveys', requireLogin, (req, res) => {
    Survey.find({}, async (err, docs) => {
      try {
        const surveys = await docs
        res.send(surveys)
      } catch (err) {
        Logger(err)
        res.status(500).send({ error: 'Internal Server Error' })
      }
    })
  })

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body
    const survey = await new Survey({
      title,
      subject,
      body,
      // es6 needs an extra () around the object being returned in the map function
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })
    // the survey won't be save until we know our survey ahs been saved
    const mailer = new Mailer(survey, surveyTemplate(survey))

    try {
      await mailer.send()
      await survey.save()
      req.user.credits -= 1
      const user = await req.user.save()

      res.send(user)
    } catch (err) {
      res.status(422).send(err)
    }
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body)
    res.send({})
  })
}
