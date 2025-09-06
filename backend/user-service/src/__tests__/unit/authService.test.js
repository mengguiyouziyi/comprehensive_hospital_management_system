const AuthService = require('../../services/authService');
const User = require('../../models/User');
const Role = require('../../models/Role');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;
let testRole;

// 测试前连接内存数据库
beforeAll(async () => {
  // 设置测试环境
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test_secret_key';
  
  // 断开现有连接
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  
  // 创建测试角色
  testRole = await Role.create({
    name: 'user',
    description: '普通用户'
  });
});

// 测试后断开连接并清理
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

// 每个测试前清理数据
beforeEach(async () => {
  await User.deleteMany({});
});

// 模拟用户数据
const mockUserData = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123',
  fullName: 'Test User',
  roleId: testRole ? testRole._id : null
};

describe('AuthService', () => {
  describe('register', () => {
    it('should register user successfully', async () => {
      const userData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        fullName: 'New User',
        roleId: testRole._id
      };

      const result = await AuthService.register(userData);
      
      expect(result).toHaveProperty('user');
      expect(result.user.username).toBe(userData.username);
      expect(result.user.email).toBe(userData.email);
      expect(result.user.password).toBeUndefined(); // 不应该包含密码
    });
  });

  describe('login', () => {
    it('should login user successfully with correct credentials', async () => {
      // 创建测试用户
      await AuthService.register(mockUserData);

      // 尝试登录
      const result = await AuthService.login('testuser', 'password123');

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('expires_in');
      expect(result).toHaveProperty('user');
      expect(result.user.username).toBe('testuser');
      expect(result.user.email).toBe('test@example.com');
      expect(result.user.password).toBeUndefined(); // 不应该包含密码
    });

    it('should fail to login with incorrect password', async () => {
      // 创建测试用户
      await AuthService.register(mockUserData);

      // 尝试使用错误密码登录
      await expect(AuthService.login('testuser', 'wrongpassword'))
        .rejects
        .toThrow('密码错误');
    });

    it('should fail to login with non-existent user', async () => {
      // 尝试登录不存在的用户
      await expect(AuthService.login('nonexistent', 'password123'))
        .rejects
        .toThrow('用户不存在');
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', async () => {
      const payload = { userId: '123', username: 'testuser' };
      const token = jwt.sign(payload, 'test_secret_key');

      const decoded = await AuthService.verifyToken(token);
      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.username).toBe(payload.username);
    });

    it('should reject an invalid token', async () => {
      const invalidToken = 'invalid.token.here';

      await expect(AuthService.verifyToken(invalidToken))
        .rejects
        .toThrow('无效的token');
    });
  });
});