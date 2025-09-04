const mongoose = require('mongoose');
const User = require('../../models/User');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// 测试前连接内存数据库
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
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

describe('User Model', () => {
  describe('User Creation', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toBe(userData.username);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.fullName).toBe(userData.fullName);
      expect(savedUser.password).not.toBe(userData.password); // 应该被加密
      expect(savedUser.createdAt).toBeDefined();
      expect(savedUser.updatedAt).toBeDefined();
    });

    it('should fail to create user without required fields', async () => {
      const userData = {
        username: 'testuser'
        // 缺少必需字段
      };

      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should fail to create user with duplicate username', async () => {
      const userData1 = {
        username: 'testuser',
        email: 'test1@example.com',
        password: 'password123',
        fullName: 'Test User 1'
      };

      const userData2 = {
        username: 'testuser', // 重复用户名
        email: 'test2@example.com',
        password: 'password123',
        fullName: 'Test User 2'
      };

      await new User(userData1).save();
      
      const user2 = new User(userData2);
      await expect(user2.save()).rejects.toThrow();
    });
  });

  describe('Password Handling', () => {
    it('should hash the password before saving', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.password).not.toBe(userData.password);
      expect(savedUser.password).toMatch(/^\$2[abxy]?\$\d{1,2}\$[.\/0-9A-Za-z]{53}$/); // bcrypt hash pattern
    });

    it('should validate password correctly', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      const isMatch = await savedUser.comparePassword('password123');
      expect(isMatch).toBe(true);

      const isNotMatch = await savedUser.comparePassword('wrongpassword');
      expect(isNotMatch).toBe(false);
    });
  });

  describe('JSON Serialization', () => {
    it('should not include password when converting to JSON', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      const userObject = savedUser.toJSON();
      expect(userObject.password).toBeUndefined();
      expect(userObject.username).toBe(userData.username);
      expect(userObject.email).toBe(userData.email);
    });
  });
});