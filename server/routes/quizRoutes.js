const express = require('express');
const router = express.Router();
const { createQuiz, postScore} = require('../controllers/QuizControllers/quiz');
const { verifyToken } = require('../middlewares/verify');

router.post('/create', verifyToken, createQuiz);
router.post('/score', verifyToken, postScore);

module.exports = router;