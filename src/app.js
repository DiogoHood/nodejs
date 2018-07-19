'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

// Loading environment variables
require('dotenv').config();

// Connect to database
mongoose.connect(process.env.DB_URL_MONGO, { useNewUrlParser: true });

// Load models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Load routers
const indexRouter = require('./routers/index-router');
const productRouter = require('./routers/product-router');
const customerRouter = require('./routers/customer-router');
const orderRouter = require('./routers/order-router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRouter);

module.exports = app;