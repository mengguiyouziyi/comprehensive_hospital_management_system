const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes'); // 添加医生路由
const config = require('./config');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 数据库连接
mongoose.connect(config.database.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB数据库连接成功'))
.catch((error) => console.error('MongoDB数据库连接失败:', error));

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes); // 添加医生路由

// 根路径
app.get('/', (req, res) => {
  res.json({ message: '医院管理系统API服务' });
});

module.exports = app;