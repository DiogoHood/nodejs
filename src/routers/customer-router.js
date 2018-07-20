'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authenticate = require('../services/auth-service');

router.post('/', controller.post);
router.post('/auth', controller.authenticate);
router.post('/refresh-token', authenticate.authorize, controller.authenticate);

module.exports = router;