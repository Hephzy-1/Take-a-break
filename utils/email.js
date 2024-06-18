const nodemailer = require('nodemailer');
require('dotenv').config()

// Transporter Object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'stmp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.Email,
    pass: process.env.EmailPassword
  }
});

async function registerEmail (email) {
  const mailOptions = {
    from: process.env.Email,
    to: email,
    subject: 'You have been registered',
    text: `Thank you for signing up to Take A Break`
  }

  const info = transporter.sendMail(mailOptions)

  await info.response
}

module.exports = {
  registerEmail
}