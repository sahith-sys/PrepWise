const express = require('express');

const router = express.Router();
const {verifyToken} = require('../middlewares/verify')
const {
    createSession,
    getSessions,
    getSession,
    deleteSession,
} = require('../controllers/QnaControllers/sessionController');

router.post('/create', verifyToken, createSession);
router.get('/get', verifyToken, getSessions);
router.get('/get/:sessionId', verifyToken, getSession);
router.delete('/delete/:id', verifyToken, deleteSession);

module.exports = router;