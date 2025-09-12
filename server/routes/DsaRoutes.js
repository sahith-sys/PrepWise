const express = require('express');

const router = express.Router();
const { getUniqueCompanies, getQuestionsByCompany, updateProgress, getProgress } = require('../controllers/DsaControllers/dsaController');
const {verifyToken} = require('../middlewares/verify');

router.get('/get/companies', getUniqueCompanies);

router.get('/get/questions/:company', getQuestionsByCompany);

router.post('/update/progress', verifyToken, updateProgress);

router.get('/get/progress', verifyToken, getProgress);

module.exports = router;