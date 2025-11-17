const express = require('express');
const router = express.Router();
const { getuserDetails, getQuizNumber, updateUserDetails } = require('../controllers/UserDashboardControllers/userDashboard');
const { verifyToken } = require('../middlewares/verify');

router.get('/userDetails', verifyToken, getuserDetails);
router.get('/quizNumber', verifyToken, getQuizNumber);
router.put('/updateUserDetails', verifyToken, updateUserDetails);

module.exports = router;