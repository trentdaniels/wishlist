const express = require('express');
const { body } = require('express-validator/check');

const isAuth = require('../middleware/is-auth');
const wishlistController = require('../controllers/wishlist');

const router = express.Router();

router.get('/wishlists', isAuth, wishlistController.getWishlists);

router.get('/wishlist/:wishlistId', isAuth, wishlistController.getWishlist);

router.post(
  '/wishlists',
  [
    body('title')
      .isString()
      .trim()
      .not()
      .isEmpty(),
  ],
  isAuth,
  wishlistController.createWishlist,
);

router.put(
  '/wishlist/:wishlistId',
  [
    body('title')
      .isString()
      .trim()
      .not()
      .isEmpty(),
  ],
  isAuth,
  wishlistController.updateWishlist,
);

module.exports = router;
