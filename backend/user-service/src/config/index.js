// 环境配置
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 4000,
    database: {
      mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://192.168.1.246:27017/hospital_dev'
      },
      redis: {
        host: process.env.REDIS_HOST || '192.168.1.246',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || ''
      },
      mysql: {
        host: process.env.MYSQL_HOST || '192.168.1.246',
        port: process.env.MYSQL_PORT || 3306,
        username: process.env.MYSQL_USERNAME || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'hospital_dev'
      }
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'hospital-management-secret-key',
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    }
  },
  
  production: {
    port: process.env.PORT || 4000,
    database: {
      mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://192.168.1.246:27017/hospital'
      },
      redis: {
        host: process.env.REDIS_HOST || '192.168.1.246',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || ''
      },
      mysql: {
        host: process.env.MYSQL_HOST || '192.168.1.246',
        port: process.env.MYSQL_PORT || 3306,
        username: process.env.MYSQL_USERNAME || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'hospital'
      }
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'hospital-management-secret-key',
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    }
  },
  
  test: {
    port: process.env.PORT || 4000,
    database: {
      mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://192.168.1.246:27017/hospital_test'
      },
      redis: {
        host: process.env.REDIS_HOST || '192.168.1.246',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || ''
      },
      mysql: {
        host: process.env.MYSQL_HOST || '192.168.1.246',
        port: process.env.MYSQL_PORT || 3306,
        username: process.env.MYSQL_USERNAME || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'hospital_test'
      }
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'hospital-management-test-secret-key',
      expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    }
  }
};

module.exports = config[env];