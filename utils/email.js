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
    from: 'Take A Break',
    to: email,
    subject: 'You have been registered',
    text: `Thank you for signing up to Take A Break`
  }

  const info = transporter.sendMail(mailOptions)

  await info.response
}

async function resetLinkMail (email, token) {
  const mailOptions = {
    from: 'Take A Break',
    to: email,
    subject: 'Reset Link',
    text: `Here is your reset link \nhttp://localhost:${process.env.PORT}/auth/reset/${token}
    
    This link expires in ${process.env.EXPIRY}`
  }

  const info = await transporter.sendMail(mailOptions);

  return info.response
}

async function contactUs (email, subject, fullname, message) {
  const mailOptions = {
    from: email,
    to: process.env.Email,
    subject: `Contact Us TAB: ${subject}`,
    text: `Name: ${fullname} \nEmail: ${email} \nMessage: ${message}`
  }

  const info = await transporter.sendMail(mailOptions);
  return info.response
}

module.exports = {
  registerEmail,
  resetLinkMail,
  contactUs
}