const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const User = require('../../models/User');
const Role = require('../../models/Role');

describe('Auth Integration Tests', () => {
  let mongoServer;
  let testRole;

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
  }, 30000); // 增加超时时间

  // 在所有测试结束后清理
  afterAll(async () => {
    try {
      // 清理测试数据
      await User.deleteMany({ username: { $in: ['testuser'] } });
      
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
    await User.deleteMany({ username: 'testuser' });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        roleId: testRole._id
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.code).toBe(0);
      expect(response.body.message).toBe('用户注册成功');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user.username).toBe(userData.username);
      expect(response.body.data.user.email).toBe(userData.email);
    });

    it('should fail to register with duplicate username', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        roleId: testRole._id
      };

      // 先注册一个用户
      await request(app)
        .post('/api/auth/register')
        .send(userData);

      // 尝试用相同的用户名注册
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test2@example.com',
          password: 'password123',
          fullName: 'Test User 2',
          roleId: testRole._id
        })
        .expect(400);

      expect(response.body.code).toBe(1);
      expect(response.body.message).toBe('用户名或邮箱已存在');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        roleId: testRole._id
      };

      // 先注册用户
      await request(app)
        .post('/api/auth/register')
        .send(userData);

      // 登录
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        })
        .expect(200);

      expect(response.body.code).toBe(0);
      expect(response.body.message).toBe('登录成功');
      expect(response.body.data).toHaveProperty('access_token');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user.username).toBe(userData.username);
    });

    it('should fail to login with invalid password', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        roleId: testRole._id
      };

      // 先注册用户
      await request(app)
        .post('/api/auth/register')
        .send(userData);

      // 用错误密码登录
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.code).toBe(401);
      expect(response.body.message).toBe('密码错误');
    });
  });

  describe('GET /api/auth/me', () => {
    it('should get current user info with valid token', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        roleId: testRole._id
      };

      // 先注册用户
      await request(app)
        .post('/api/auth/register')
        .send(userData);

      // 登录获取token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        });

      const token = loginResponse.body.data.access_token;

      // 获取用户信息
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.code).toBe(0);
      expect(response.body.message).toBe('获取用户信息成功');
      expect(response.body.data.username).toBe(userData.username);
    });

    it('should fail to get user info without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.code).toBe(1002);
      expect(response.body.message).toBe('未提供认证token');
    });
  });
});