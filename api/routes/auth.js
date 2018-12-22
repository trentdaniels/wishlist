const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.post('/login', authController.login);

router.post(
  '/signup',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          const error = new Error('Email already exists');
          error.statusCode = 401;
          throw error;
        }
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isString()
      .isLength({ min: 7 })
      .withMessage('Invalid Password')
      .not()
      .isEmpty(),
    body('confirmPassword')
      .exists()
      .custom(async (value, { req }) => value === req.body.password),
  ],
  authController.signup,
);

module.exports = router;
