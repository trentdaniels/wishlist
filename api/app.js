const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/products');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(productRoutes);

app.listen(3000);
