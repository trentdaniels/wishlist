const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const { TOKEN_SECRET } = require('../config/auth');

exports.signup = async (req, res, next) => {
  const { email, password, name } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed;');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      name,
      password: hashedPassword,
      role: 'CLIENT',
      wishlists: [],
    });
    const newUser = await user.save();
    res.status(201).json({ user: newUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 401;
      throw error;
    }
    const isEqual = bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong Password');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email,
        userId: user._id.toString(),
      },
      TOKEN_SECRET,
      { expiresIn: '1h' },
    );
    res.status(200).json({
      token,
      userId: user._id.toString(),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
