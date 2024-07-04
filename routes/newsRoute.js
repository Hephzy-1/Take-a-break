const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { newLetter } = require('../controllers/listCon');

// newsletter route
router.post('/newletter', [
  check('email', 'Please include a valid email').isEmail(),
], newLetter);

module.exports = router;