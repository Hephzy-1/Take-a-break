const { contactUs } = require('../utils/email');

async function contact (req, res) {
  try {
    const { email, subject, message } = req.body;

    const sent = await contactUs(email, subject, message);
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
  contact
};