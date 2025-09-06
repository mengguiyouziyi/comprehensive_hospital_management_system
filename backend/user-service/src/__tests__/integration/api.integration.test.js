const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const User = require('../../models/User');
const Role = require('../../models/Role');

describe('API Integration Tests', () => {
  let mongoServer;
  let testRole;
  let testUser;
  let authToken;

  // 在所有测试开始前启动服务器并连接数据库
  beforeAll(async () => {
    // 断开现有连接
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    
    // 启动内存数据库
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // 创建测试角色
    testRole = await Role.create({
      name: 'user',
      description: '普通用户'
    });

    // 创建测试用户
    testUser = new User({
      username: 'api_testuser',
      email: 'api_test@example.com',
      password: 'password123',
      fullName: 'API Test User',
      roleId: testRole._id
    });

    await testUser.save();
  }, 30000); // 增加超时时间

  // 在所有测试结束后清理
  afterAll(async () => {
    try {
      // 清理测试数据
      await User.deleteMany({ username: { $in: ['api_testuser', 'new_user'] } });
      
      // 关闭数据库连接
      await mongoose.connection.close();
      
      // 关闭内存数据库
      if (mongoServer) {
        await mongoServer.stop();
      }
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }, 30000); // 增加超时时间

  // 每个测试前清理数据
  beforeEach(async () => {
    // 清理可能创建的用户
    await User.deleteMany({ username: 'new_user' });
  });

  describe('Authentication Flow', () => {
    it('should register, login, and get user info successfully', async () => {
      // 1. 注册新用户
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'new_user',
          email: 'new_user@example.com',
          password: 'password123',
          fullName: 'New User',
          roleId: testRole._id
        })
        .expect(201);

      expect(registerResponse.body.code).toBe(0);
      expect(registerResponse.body.message).toBe('用户注册成功');
      expect(registerResponse.body.data.user.username).toBe('new_user');

      // 2. 登录
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'new_user',
          password: 'password123'
        })
        .expect(200);

      expect(loginResponse.body.code).toBe(0);
      expect(loginResponse.body.message).toBe('登录成功');
      expect(loginResponse.body.data).toHaveProperty('access_token');
      expect(loginResponse.body.data.user.username).toBe('new_user');

      // 保存认证token用于后续测试
      authToken = loginResponse.body.data.access_token;

      // 3. 获取用户信息
      const userResponse = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(userResponse.body.code).toBe(0);
      expect(userResponse.body.message).toBe('获取用户信息成功');
      expect(userResponse.body.data.username).toBe('new_user');
    });
  });

  describe('Protected Routes', () => {
    it('should deny access to protected routes without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.code).toBe(1002);
      expect(response.body.message).toBe('未提供认证token');
    });

    it('should allow access to protected routes with valid token', async () => {
      // 登录获取token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'api_testuser',
          password: 'password123'
        })
        .expect(200);

      const token = loginResponse.body.data.access_token;

      // 使用token访问受保护的路由
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.code).toBe(0);
      expect(response.body.data.username).toBe('api_testuser');
    });
  });
});