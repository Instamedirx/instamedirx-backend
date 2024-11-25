const nodemailer = require('nodemailer')
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = require('./config')

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
})

module.exports = transporter