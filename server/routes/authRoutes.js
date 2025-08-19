const express = require('express');
const { signup } = require('../controllers/AuthControllers/auth');
const { login } = require('../controllers/AuthControllers/auth');


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;