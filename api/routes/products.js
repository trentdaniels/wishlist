const express = require('express');

const productsController = require('../controllers/products');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/products', productsController.getProducts);

router.get('/product/:productId');

router.post('/products', isAuth);

router.put('/product/:productId', isAuth);

module.exports = router;
