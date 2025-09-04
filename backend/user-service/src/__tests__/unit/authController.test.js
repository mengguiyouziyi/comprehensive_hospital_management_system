const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = require('../../models/User');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let agent;

// 测试前连接内存数据库
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  
  // 创建测试代理
  agent = request.agent(app);
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
  roleId: new mongoose.Types.ObjectId()
};

describe('Auth Controller', () => {
  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      // 创建测试用户
      const user = new User(mockUserData);
      await user.save();

      const response = await agent
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        })
        .expect(200);

      expect(response.body.code).toBe(0);
      expect(response.body.message).toBe('success');
      expect(response.body.data).toHaveProperty('access_token');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user.username).toBe('testuser');
    });

    it('should fail to login with invalid credentials', async () => {
      // 创建测试用户
      const user = new User(mockUserData);
      await user.save();

      const response = await agent
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.code).toBe(1002);
      expect(response.body.message).toBe('密码错误');
    });

    it('should fail to login with missing credentials', async () => {
      const response = await agent
        .post('/api/auth/login')
        .send({
          username: 'testuser'
          // 缺少密码
        })
        .expect(400);

      expect(response.body.code).toBe(1001);
      expect(response.body.message).toBe('用户名和密码不能为空');
    });
  });

  describe('GET /api/auth/me', () => {
    it('should get current user info with valid token', async () => {
      // 创建测试用户
      const user = new User(mockUserData);
      const savedUser = await user.save();

      // 先登录获取token
      const loginResponse = await agent
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        });

      const token = loginResponse.body.data.access_token;

      // 使用token获取用户信息
      const response = await agent
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.code).toBe(0);
      expect(response.body.message).toBe('success');
      expect(response.body.data.username).toBe('testuser');
      expect(response.body.data.email).toBe('test@example.com');
      expect(response.body.data.password).toBeUndefined(); // 不应该包含密码
    });

    it('should fail to get user info without token', async () => {
      const response = await agent
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.code).toBe(1002);
      expect(response.body.message).toBe('未提供认证token');
    });
  });
});