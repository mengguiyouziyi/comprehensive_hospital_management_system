const AuthService = require('../services/authService');

/**
 * 认证中间件
 * 验证JWT token并设置用户信息
 */
const authMiddleware = async (req, res, next) => {
  try {
    // 从请求头获取token
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        code: 1002,
        message: '未提供认证token',
        data: null
      });
    }
    
    // 验证token
    const decoded = await AuthService.verifyToken(token);
    
    // 将用户信息添加到请求对象
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({
      code: 1002,
      message: '无效的认证token',
      data: null
    });
  }
};

module.exports = authMiddleware;