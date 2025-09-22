const express = require('express');
const { resumeAnalysis } = require('../controllers/ResumeAtsControllers/ResumeAts');
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single("resume"), resumeAnalysis);

module.exports = router;