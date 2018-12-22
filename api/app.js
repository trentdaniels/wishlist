const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const path = require('path');

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const wishlistRoutes = require('./routes/wishlist');
const db = require('./config/database');
const { storage, fileFilter } = require('./middleware/multer');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'images')));
app.use('/images', multer({ storage, fileFilter }).single('image'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(productRoutes);
app.use(wishlistRoutes);
app.use(authRoutes);

app.use((error, req, res) => {
  const { statusCode, message, data } = error;
  res.status(500).json({
    statusCode,
    message,
    data,
  });
});

const startServer = async () => {
  try {
    await connect(
      db.MONGODB_URI,
      { useNewUrlParser: true },
    );
    return app.listen(3001);
  } catch (err) {
    return err;
  }
};

startServer();
