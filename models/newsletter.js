const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    email: {
      type: String,
      required: true
    }
});

const list = mongoose.model('newsletter', listSchema);

module.exports = list;