const express = require('express');

const router = express.Router();
const { getUniqueCompanies, getQuestionsByCompany } = require('../controllers/DsaControllers/dsaController');

router.get('/get/companies', getUniqueCompanies);

router.get('/get/questions/:company', getQuestionsByCompany);

module.exports = router;