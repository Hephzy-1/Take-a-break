const express = require('express');
const route = express.Router();
const { body } = require('express-validator')
const { contact, feedbackMessage } = require('../controllers/contact');

route.post('/message', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('fullName').isAlpha().withMessage('Please input your full name'),
  body('subject').isAlpha().withMessage('Please enter a contact subject'),
  body('message').exists().withMessage('Contact has to include a message')
], contact);

route.post('/feedback', [
  body('message').exists().withMessage('Please input a feedback message.')
], feedbackMessage);

module.exports = route;