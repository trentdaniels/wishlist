const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
  try {
    const totalItems = await Product.find().countDocuments();
    const products = await Product.find().populate('creator');
    res.json({
      products,
      totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId).populate('creator');
    if (!product) {
      const error = new Error('Product Not Found');
      error.statusCode = 401;
      throw error;
    }
    res.json({ product });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
