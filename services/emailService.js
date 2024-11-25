const fs = require('fs').promises
const path = require('path')
const transporter = require('../utils/mailer')

const sendActivationEmail = async (to, code) => {
  let template = await fs.readFile(
    path.join(__dirname, '../views/emails/verification.html'),
    'utf-8'
  )

  template = template.replace('{{code}}', code)

  await transporter.sendMail({
    from: 'emmasela@gmail.com',
    to: to,
    subject: 'Email Verification',
    html: template
  })
}


module.exports = {
  sendActivationEmail
}