const list = require('../models/newsletter');
const { newsletterMail } = require('../utils/email');
const { validationResult } = require('express-validator')

const newLetter = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

  const checkUser = await list.findOne({ email })

  if (checkUser) {
    throw Error('subsribed')
  }

  const newLetter = new list({ email });
  const saved = await newLetter.save();

  if (!saved) {
    res.status(500).json({ message: 'Something went wrong' })
  }
  const added = newsletterMail(email);
  res.status(200).json({ message: 'You have successfully subscibed to our newletter', added });
  } catch (err) {
    if (err.message === 'subscribed') {
      res.status(400).json({ message: 'This user has already subscribed to our nesletter' })
    } else {
      res.status(500).json({ message: 'Internal Server Error', error: err.message })
    }
  }
}

module.exports = { newLetter };