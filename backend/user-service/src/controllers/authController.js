const AuthService = require('../services/authService');
const User = require('../models/User');

class AuthController {
  /**
   * 用户登录
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // 验证输入
      if (!username || !password) {
        return res.status(400).json({
          code: 1001,
          message: '用户名和密码不能为空',
          data: null
        });
      }
      
      // 执行登录
      const result = await AuthService.login(username, password);
      
      res.json({
        code: 0,
        message: 'success',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        code: 1002,
        message: error.message,
        data: null
      });
    }
  }
  
  /**
   * 用户登出
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      await AuthService.logout(token);
      
      res.json({
        code: 0,
        message: 'success',
        data: null
      });
    } catch (error) {
      res.status(500).json({
        code: 1006,
        message: '登出失败',
        data: null
      });
    }
  }
  
  /**
   * 刷新token
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(400).json({
          code: 1001,
          message: '刷新token不能为空',
          data: null
        });
      }
      
      const result = await AuthService.refreshToken(refreshToken);
      
      res.json({
        code: 0,
        message: 'success',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        code: 1002,
        message: error.message,
        data: null
      });
    }
  }
  
  /**
   * 获取当前用户信息
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async getCurrentUser(req, res) {
    try {
      const user = await User.findById(req.user.userId)
        .populate('roleId')
        .populate('departmentId');
      
      if (!user) {
        return res.status(404).json({
          code: 1004,
          message: '用户不存在',
          data: null
        });
      }
      
      res.json({
        code: 0,
        message: 'success',
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          avatarUrl: user.avatarUrl,
          departmentId: user.departmentId,
          roleId: user.roleId,
          status: user.status,
          lastLoginAt: user.lastLoginAt,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    } catch (error) {
      res.status(500).json({
        code: 1006,
        message: '获取用户信息失败',
        data: null
      });
    }
  }
}

module.exports = new AuthController();