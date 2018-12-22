const express = require('express');
const { body } = require('express-validator/check');

const productsController = require('../controllers/products');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/products', productsController.getProducts);

router.get('/product/:productId', productsController.getProduct);

router.post(
  '/products',
  [
    body('title')
      .isString()
      .trim()
      .not()
      .isEmpty(),
    body('description')
      .trim()
      .isString()
      .isLength({ min: 5 }),
    body('price')
      .isFloat()
      .not()
      .isEmpty(),
  ],
  isAuth,
  productsController.createProduct,
);

router.put(
  '/product/:productId',
  [
    body('title')
      .isString()
      .trim()
      .not()
      .isEmpty(),
    body('description')
      .trim()
      .isString()
      .isLength({ min: 5 }),
    body('price')
      .isFloat()
      .not()
      .isEmpty(),
  ],
  isAuth,
  productsController.updateProduct,
);

router.delete('/product/:productId', isAuth, productsController.deleteProduct);

module.exports = router;
