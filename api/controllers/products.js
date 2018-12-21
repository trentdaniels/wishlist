const Product = require('../models/product');
const Wishlist = require('../models/wishlist');
const { deleteImage } = require('../util/image');

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

exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { title, description, image } = req.body;
  let imageUrl = image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error('Product not Fount');
      error.statusCode = 404;
      throw error;
    }
    if (product.creator.toString() !== req.userId) {
      const error = new Error('Not Authorized');
      error.statusCode = 403;
      throw error;
    }
    if (imageUrl !== product.imageUrl) {
      deleteImage();
    }
    product.title = title;
    product.description = description;
    product.imageUrl = imageUrl;
    res.status(204).json();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error('Product Not Found');
      error.statusCode = 404;
      throw error;
    }
    if (product.creator.toString() !== req.userId) {
      const error = new Error('Not Authorized');
      error.statusCode = 403;
      throw error;
    }
    deleteImage(product.imageUrl);
    await Product.findByIdAndDelete(productId);
    const wishlists = await Wishlist.find({ products: { $in: [productId] } });
    wishlists.forEach((wishlist) => {
      wishlist.products.remove(productId);
      wishlist.save();
    });
    res.status(204).json();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
