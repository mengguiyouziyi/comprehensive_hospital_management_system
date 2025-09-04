// Jest setup file
const mongoose = require('mongoose');

// 设置测试环境变量
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_secret_key';
process.env.DB_URI = 'mongodb://localhost:27017/hospital_management_test';

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// 添加测试套件全局设置
global.beforeEach = beforeEach;
global.afterAll = afterAll;
global.beforeAll = beforeAll;
global.describe = describe;
global.it = it;
global.expect = expect;

// Jest teardown
afterAll(async () => {
  // 断开数据库连接
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
});