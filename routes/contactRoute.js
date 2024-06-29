const express = require('express');
const route = express.Router();
const { contact } = require('../controllers/contact');

route.post('/message', contact);

module.exports = route;