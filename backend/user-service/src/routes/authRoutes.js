const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// 登录接口
router.post('/login', authController.login);

// 登出接口
router.post('/logout', authController.logout);

// 刷新token接口
router.post('/refresh', authController.refreshToken);

// 获取当前用户信息接口
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;