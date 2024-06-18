const Users = require('../models/auth');
const { hashPassword, comparePassword } = require('../utils/hash');
const { registerEmail } = require('../utils/email');

async function register (req, res) {
  try {
    const { email, username, password, firstname, lastname, phoneNumber } = req.body;

    const checkUser = await Users.findOne({ email });

    if (checkUser) {
      res.status(400).json({ message: 'User already exists. Please use another email' })
    } else {
      const hashed = await hashPassword(password);
      console.log(hashed);

      const newUser = new Users({ email, username, password: hashed, firstname, lastname, phoneNumber })
      console.log(newUser);

      const response = await registerEmail(email)

      await newUser.save()
      res.status(201).json({ message: 'SignUp Successful', response})
    }

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message})
  }
}

module.exports = {
  register
}