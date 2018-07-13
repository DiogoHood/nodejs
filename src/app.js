'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to database
mongoose.connect('mongodb://admin:admin1@ds018258.mlab.com:18258/products_ndstr');

// Load models
const Product = require('./models/product');

// Load routers
const indexRouter = require('./routers/index-router');
const productRouter = require('./routers/product-router')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/products', productRouter);

module.exports = app;