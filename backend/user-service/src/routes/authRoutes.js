const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// 注册路由
router.post('/register', authController.register);

// 登录路由
router.post('/login', authController.login);

// 获取当前用户信息路由
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;