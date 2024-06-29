const express = require('express');
const route = express.Router();
const { body } = require('express-validator')
const { register, login, resetLink, reset } = require('../controllers/authCon');

// Register Route
route.post('/sign-up', [
  body('firstName').isAlpha().withMessage('Please enter a valid first name'),
  body('lastName').isAlpha().withMessage('Please enter a valid last name'),
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/ ).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/ ).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character'),
  body('confirmPassword')
], register);

// Login Route
route.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
], login);

// Reset link Route
route.post('/reset-password', [
  body('email').isEmail().withMessage('Please enter a valid email address')
], resetLink)

// Reset Password Route
route.put('/reset/:token', [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/ ).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/ ).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character'),
  body('confirmPassword')
], reset)
module.exports = route;