const express = require('express');
const {verifyToken} = require('../middlewares/verify')
const router = express.Router();

const {getAllExperiences,createExperience} = require('../controllers/ExperienceControllers/Experience');

router.post('/create', verifyToken, createExperience);
router.get('/get', getAllExperiences);

module.exports = router;