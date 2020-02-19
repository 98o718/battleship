const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
})

module.exports = transporter
