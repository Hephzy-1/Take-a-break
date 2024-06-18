const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  }
});

const Users = mongoose.model('users', userSchema);
module.exports = Users;