const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, jwtExpiration } = require('../config');

class AuthService {
  /**
   * 用户登录
   * @param {string} username - 用户名
   * @param {string} password - 密码
   * @returns {Object} 包含token和用户信息的对象
   */
  async login(username, password) {
    // 查找用户
    const user = await User.findOne({ 
      $or: [{ username }, { email: username }] 
    }).populate('roleId').populate('departmentId');
    
    if (!user) {
      throw new Error('用户不存在');
    }
    
    // 检查用户状态
    if (user.status !== 1) {
      throw new Error('用户已被禁用');
    }
    
    // 验证密码
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('密码错误');
    }
    
    // 更新最后登录时间
    user.lastLoginAt = new Date();
    await user.save();
    
    // 生成JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        username: user.username,
        roleId: user.roleId._id
      },
      jwtSecret,
      { expiresIn: jwtExpiration }
    );
    
    return {
      access_token: token,
      expires_in: jwtExpiration,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        departmentId: user.departmentId,
        roleId: user.roleId,
        status: user.status,
        lastLoginAt: user.lastLoginAt
      }
    };
  }
  
  /**
   * 用户登出
   * @param {string} token - JWT token
   * @returns {boolean} 登出是否成功
   */
  async logout(token) {
    // 在实际应用中，可能需要将token加入黑名单
    // 这里简化处理，直接返回成功
    return true;
  }
  
  /**
   * 验证JWT token
   * @param {string} token - JWT token
   * @returns {Object} 解码后的token信息
   */
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      return decoded;
    } catch (error) {
      throw new Error('无效的token');
    }
  }
  
  /**
   * 刷新token
   * @param {string} refreshToken - 刷新token
   * @returns {Object} 新的访问token
   */
  async refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, jwtSecret);
      const newToken = jwt.sign(
        { 
          userId: decoded.userId,
          username: decoded.username,
          roleId: decoded.roleId
        },
        jwtSecret,
        { expiresIn: jwtExpiration }
      );
      
      return {
        access_token: newToken,
        expires_in: jwtExpiration
      };
    } catch (error) {
      throw new Error('无效的刷新token');
    }
  }
}

module.exports = new AuthService();