const express = require('express');
const route = express.Router();
const { register } = require('../controllers/authCon');

route.post('/register', register);

module.exports = route;