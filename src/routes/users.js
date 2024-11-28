const express = require('express');
const { register, getFavoritesController } = require('../controllers/user-controller.js');
const authMiddleware = require('../utils/middlewares/auth-middleware.js');
const router = express.Router();

router.post('/register', register);
router.get('/get-favorites', authMiddleware, getFavoritesController);

module.exports = router;