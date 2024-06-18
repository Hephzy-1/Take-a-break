const bcrypt = require('bcrypt');

async function hashPassword (password) {
 return bcrypt.hash(password, 10);
}

async function comparePassword (password, userPassword) {
  await bcrypt.compare(password, userPassword);
}

module.exports = {
  hashPassword,
  comparePassword
}