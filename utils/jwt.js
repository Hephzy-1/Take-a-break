const jwt = require('jsonwebtoken');
require('dotenv').config()

async function generateToken (email) {
  const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRY}) 
  return token
}

async function verifyToken (token) {
  const verify = await jwt.verify(token, process.env.JWT_SECRET)
  return verify
}

module.exports = {
  generateToken,
  verifyToken
}