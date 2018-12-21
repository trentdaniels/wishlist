const express = require('express');

const productsController = require('../controllers/products');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/products', productsController.getProducts);

router.get('/product/:productId', productsController.getProduct);

router.post('/products', isAuth, productsController.createProduct);

router.put('/product/:productId', isAuth);

module.exports = router;
