const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const config = require('./config');

const app = express();

// 中间件
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 安全中间件
app.use(require('helmet')());
app.use(require('cors')());

// 速率限制
const limiter = require('express-rate-limit').rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// 连接MongoDB
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB连接成功');
})
.catch((error) => {
  console.error('数据库连接错误:', error);
  process.exit(1); // 数据库连接失败时退出进程
});

// 创建Redis客户端并连接
const redisClient = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  legacyMode: true // 使用legacy模式以兼容旧版本API
});

redisClient.connect()
  .then(() => {
    console.log('Redis连接成功');
  })
  .catch((error) => {
    console.error('Redis连接错误:', error);
  });

// 将Redis客户端添加到应用 locals 中，以便在路由中使用
app.locals.redisClient = redisClient;

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    code: 0,
    message: 'User service is running',
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    code: 1004,
    message: '接口不存在',
    data: null
  });
});

// 全局错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误'
  });
});

module.exports = app;