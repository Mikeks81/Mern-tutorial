const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')

// this Mailer is set up according to sendgrid documentation -- including methods that aren't represented in this codebase
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super()

    this.sgApi = sendgrid(keys.sendGridKey)
    this.from_email = new helper.Email('no-reply@emaily.com')
    this.subject = subject
    this.body = new helper.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)
    // addConent is inherited from helper.Mail
    this.addContent(this.body)
    this.addClickTracking()
    this.addRecipients()
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email)
    })
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)

    trackingSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(trackingSettings)
  }

  addRecipients() {
    const personalize = new helper.Personalization()
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient)
    })
    this.addPersonalization(personalize)
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      // toJSON() is a sendgrid function
      body: this.toJSON()
    })

    const response = await this.sgApi.API(request)
    return response
  }
}

module.exports = Mailer