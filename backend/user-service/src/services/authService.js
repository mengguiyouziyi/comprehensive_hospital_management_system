const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const config = require('../config');

class AuthService {
  /**
   * 用户注册
   * @param {Object} userData - 用户数据
   * @returns {Object} 注册结果
   */
  async register(userData) {
    try {
      const { username, password, email, fullName, phone, departmentId, roleId } = userData;

      // 检查用户是否已存在
      const existingUser = await User.findOne({ 
        $or: [{ username }, { email }] 
      });
      
      if (existingUser) {
        throw new Error('用户名或邮箱已存在');
      }

      // 检查角色是否存在
      if (roleId) {
        const role = await Role.findById(roleId);
        if (!role) {
          throw new Error('指定的角色不存在');
        }
      }

      // 创建新用户
      const newUser = new User({
        username,
        password,
        email,
        fullName,
        phone,
        departmentId,
        roleId
      });

      await newUser.save();

      // 返回用户信息（不包含密码）
      const userObject = newUser.toObject();
      delete userObject.password;

      return { user: userObject };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * 用户登录
   * @param {string} username - 用户名
   * @param {string} password - 密码
   * @returns {Object} 登录结果和用户信息
   */
  async login(username, password) {
    try {
      // 查找用户
      const user = await User.findOne({ username }).populate('roleId');
      if (!user) {
        throw new Error('用户不存在');
      }

      // 验证密码
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error('密码错误');
      }

      // 生成JWT令牌
      const payload = {
        userId: user._id,
        username: user.username,
        roleId: user.roleId._id,
        roleName: user.roleId.name
      };

      const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

      // 返回用户信息和令牌
      const userObject = user.toObject();
      delete userObject.password;

      return {
        access_token: token,
        expires_in: 86400, // 24小时
        user: userObject
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * 验证JWT令牌
   * @param {string} token - JWT令牌
   * @returns {Object} 解码后的令牌信息
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      throw new Error('无效的令牌');
    }
  }

  /**
   * 获取用户信息
   * @param {string} userId - 用户ID
   * @returns {Object} 用户信息
   */
  async getUserInfo(userId) {
    try {
      const user = await User.findById(userId).populate('roleId', 'name description');
      if (!user) {
        throw new Error('用户不存在');
      }
      
      const userObject = user.toObject();
      delete userObject.password;
      
      return userObject;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new AuthService();