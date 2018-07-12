'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// load routers
const indexRouter = require('./routers/index-router');
const productRouter = require('./routers/product-router')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/products', productRouter);

module.exports = app;