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

exports.createProduct = async (req, res, next) => {
  const { title, description } = req.body;
  if (!req.file) {
    const error = new Error('No Image was Provided!');
    error.statusCode = 403;
    throw error;
  }
  const imageUrl = req.file.path;
  const product = new Product({
    title,
    imageUrl,
    description,
    creator: req.userId,
  });
  try {
    await product.save();
    res.status(201).json({
      product,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
