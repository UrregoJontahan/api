const express = require('express');
const router = express.Router();
const authController = require('../services/login');

router.post('/login', authController.login);

module.exports = router;