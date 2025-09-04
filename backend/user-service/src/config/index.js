const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 3001,
  // 更新MongoDB连接URL以指向远程服务器
  mongoUri: process.env.MONGO_URI || 'mongodb://192.168.1.246:27017/hospital_management',
  jwtSecret: process.env.JWT_SECRET || 'hospital_management_secret_key',
  // 添加Redis配置
  redis: {
    host: process.env.REDIS_HOST || '192.168.1.246',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || null
  },
  // 添加MySQL配置
  mysql: {
    host: process.env.MYSQL_HOST || '192.168.1.246',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'hospital_management'
  }
};