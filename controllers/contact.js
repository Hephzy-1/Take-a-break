const { contactUs, feedback } = require('../utils/email');
const { validationResult } = require('express-validator');

async function contact (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, fullname, subject, message } = req.body;

    const sent = await contactUs(email, subject, fullname, message);
    console.log(sent);

    if (!sent) {
      throw Error('Email not sent')
    }

    res.status(200).json({ message: 'Your message has been sent'})
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message })
  }
}

async function feedbackMessage (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message } = req.body;

    const sent = await feedback(message);
    console.log(sent);

    if (!sent) {
      throw Error('Email not sent')
    }

    res.status(200).json({ message: 'Your message has been sent'})
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message })
  }
}

module.exports = {
  contact,
  feedbackMessage
};