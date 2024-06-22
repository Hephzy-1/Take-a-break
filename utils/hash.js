const bcrypt = require('bcrypt');

async function hashPassword (password) {
 return bcrypt.hash(password, 10);
}

async function comparePassword (password, userPassword) {
   return await bcrypt.compare(password, userPassword);
}

module.exports = {
  hashPassword,
  comparePassword
}