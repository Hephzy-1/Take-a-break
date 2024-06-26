const Users = require('../models/auth');
const { hashPassword, comparePassword } = require('../utils/hash');
const { registerEmail, resetLinkMail } = require('../utils/email');
const { validationResult } = require('express-validator');
const { generateToken, verifyToken } = require('../utils/jwt')

async function register (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const checkUser = await Users.findOne({ email });

    if (checkUser) {
      res.status(400).json({ message: 'User already exists. Please use another email' })
    } else {
      if (confirmPassword !== password) {
        res.status(400).json({ message: 'Passwords should be the same.'})
      }

      const hashed = await hashPassword(password);
      console.log(hashed);

      const newUser = new Users({ fullname, email, password: hashed })
      console.log(newUser);

      const response = await registerEmail(email);

      await newUser.save()
      res.status(201).json({ message: 'SignUp Successful', response})
    }

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message})
  }
}

async function login (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const checkUser = await Users.findOne({ email });
    console.log(checkUser)

    if(!checkUser) {
      res.status(400).json({ message: 'User not found. Please register first.' })
    }

    const compare = await comparePassword(password, checkUser.password)
    console.log(compare)

    if (!compare) {
      res.status(400).json({ message: 'Password is incorrect'})
    } else {

      const token = await generateToken(email)

      res.cookie('token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'development', maxAge: 1 * 60 * 60 * 1000 })
      res.status(200).json({ message: 'Welcome'})
    }

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message })
  }
}

async function resetLink (req, res) {
 try {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }

  const { email } = req.body;

  const checkUser = await Users.findOne({ email });

  if (!checkUser) {
    res.status(400).json({ message: "You don't have an account with us. Please register"})
  }

  const token = await generateToken(email)
  console.log(token)

  const resetMail = await resetLinkMail(email, token)

  res.status(200).json({ message: 'Reset link has been sent', token})
 } catch (err) {
  res.status(500).json({ message: 'Internal Server Error', error: err.message })
 } 
}

async function reset (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }
    const decoded = await verifyToken(req.params.token);
    console.log(decoded);

    if(!decoded) {
      res.status(401).json({ message: 'Reset link is invalid'})
    }

    const { password, confirmPassword } = req.body;

    const checkUser = await Users.findOne({ email: decoded.email });

    if (!checkUser) {
      res.status(400).json({ message: "You don't have an account with us."})
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords should match' })
    }

    const hashed = await hashPassword(password);
    await Users.updateOne({ email: decoded.email }, { $set: { password: hashed } })

    res.status(200).json({ message: 'Password has been updated' })

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message })
  }
}

module.exports = {
  register,
  login, 
  resetLink,
  reset
}