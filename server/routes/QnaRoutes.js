const express = require('express');

const router = express.Router();
const {verifyToken} = require('../middlewares/verify')
const {
    createSession,
    getSessions,
    getSession
} = require('../controllers/QnaControllers/sessionController');

router.post('/create', verifyToken, createSession);
router.get('/get', verifyToken, getSessions);
router.get('/get/:sessionId', verifyToken, getSession);

module.exports = router;