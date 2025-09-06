const authService = require('../services/authService');
const User = require('../models/User');

/**
 * 认证控制器类
 * 处理用户认证相关的所有操作
 */
class AuthController {
  /**
   * 用户注册
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async register(req, res) {
    try {
      console.log('收到注册请求:', req.body);
      const { username, password, email, fullName, phone, departmentId, roleId } = req.body;

      // 验证必填字段
      if (!username || !password || !email || !fullName) {
        return res.status(400).json({
          code: 1,
          message: '所有字段都是必填的'
        });
      }

      // 调用认证服务进行用户注册
      const result = await authService.register({ 
        username, 
        password, 
        email, 
        fullName, 
        phone, 
        departmentId, 
        roleId 
      });
      
      console.log('用户注册成功:', result);
      res.status(201).json({
        code: 0,
        message: '用户注册成功',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        code: 1,
        message: error.message
      });
    }
  }

  /**
   * 用户登录
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async login(req, res) {
    try {
      console.log('收到登录请求:', req.body);
      const { username, password } = req.body;
      
      // 验证必填字段
      if (!username || !password) {
        return res.status(400).json({
          code: 1,
          message: '用户名和密码为必填字段'
        });
      }
      
      // 调用认证服务进行用户登录
      const result = await authService.login(username, password);
      
      // 更新最后登录时间
      await User.findByIdAndUpdate(result.user._id, { lastLogin: new Date() });
      
      console.log('用户登录成功:', result);
      res.status(200).json({
        code: 0,
        message: '登录成功',
        data: result
      });
    } catch (error) {
      // 处理登录错误
      console.error('登录失败:', error);
      if (error.message === '用户不存在' || error.message === '密码错误') {
        return res.status(401).json({
          code: 401,
          message: error.message,
          data: null
        });
      }
      
      res.status(500).json({
        code: 500,
        message: '登录失败: ' + error.message,
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
      // 在JWT模式下，登出通常由前端删除token完成
      // 这里可以添加其他登出逻辑，如添加token到黑名单等
      
      res.status(200).json({
        code: 0,
        message: '登出成功',
        data: null
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '登出失败: ' + error.message,
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
      console.log('收到刷新token请求:', req.body);
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        console.error('刷新token失败: 缺少refreshToken');
        return res.status(400).json({
          code: 400,
          message: '缺少refreshToken',
          data: null
        });
      }
      
      // 调用认证服务刷新token
      const result = await authService.refreshToken(refreshToken);
      
      console.log('token刷新成功:', result);
      res.status(200).json({
        code: 0,
        message: 'token刷新成功',
        data: result
      });
    } catch (error) {
      console.error('刷新token失败:', error);
      if (error.message === '无效的refreshToken' || error.message === 'refreshToken已过期') {
        return res.status(401).json({
          code: 401,
          message: error.message,
          data: null
        });
      }
      
      res.status(500).json({
        code: 500,
        message: 'token刷新失败: ' + error.message,
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
      res.status(200).json({
        code: 0,
        message: '获取用户信息成功',
        data: req.user
      });
    } catch (error) {
      res.status(500).json({
        code: 1,
        message: '服务器内部错误'
      });
    }
  }
}

module.exports = new AuthController();