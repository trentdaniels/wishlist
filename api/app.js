const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('mongoose');

const productRoutes = require('./routes/products');
const db = require('./config/database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(productRoutes);


const startServer = async () => {
  try {
    await connect(db.MONGODB_URI, { useNewUrlParser: true });
    return app.listen(3001);
  } catch (err) {
    return err;
  }
};

startServer();
