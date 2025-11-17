const express = require('express');
const { signup } = require('../controllers/AuthControllers/auth');
const { login } = require('../controllers/AuthControllers/auth');
const { getUserId } = require('../middlewares/verify');
const { verifyToken } = require('../middlewares/verify');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getUserId', verifyToken, getUserId);
module.exports = router;