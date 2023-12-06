const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login',authController.login);
router.post('/register',authController.register);
router.get('/userData',authMiddleware, authController.userData);
router.post('/household', authMiddleware, authController.createOrJoinHousehold);
router.put('/userData/:userId', authMiddleware, authController.updateUserData);


module.exports = router;