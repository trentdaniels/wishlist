const { validationResult } = require('express-validator/check');

const Wishlist = require('../models/wishlist');
const User = require('../models/user');

exports.getWishlists = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate('wishlists.products');
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ wishlists: user.wishlists });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getWishlist = async (req, res, next) => {
  const { wishListId } = req.params;
  try {
    const wishlist = await Wishlist.findById(wishListId).populate('products');
    if (!wishlist) {
      const error = new Error('Wishlist not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ wishlist });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createWishlist = async (req, res, next) => {
  const { title } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const wishlist = new Wishlist({
    title,
    creator: req.userId,
    products: [],
  });
  try {
    const newWishlist = await wishlist.save();
    res.status(201).json({ wishlist: newWishlist });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
