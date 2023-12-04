const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login',authController.login);
router.post('/register',authController.register);
router.get('/userData',authMiddleware, authController.userData);

module.exports = router;