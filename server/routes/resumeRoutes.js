const express = require('express');
const router = express.Router();
const { saveResume } = require('../controllers/ResumeControllers/resume');
const {verifyToken} = require('../middlewares/verify')
const { generateSummary } = require('../controllers/ResumeControllers/resume');
const { getResume } = require('../controllers/ResumeControllers/resume');

router.post('/generate-summary', verifyToken, generateSummary);

router.post('/save', verifyToken, saveResume);

router.get('/get', getResume);

module.exports = router;