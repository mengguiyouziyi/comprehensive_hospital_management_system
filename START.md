# 医院管理系统启动说明

## 开发环境启动

### 方法一：使用启动脚本（推荐）

```bash
# 运行启动脚本（已包含端口冲突检测）
./start-dev.sh
```

这将自动：
- 检查并清理端口占用（3000, 4000）
- 启动后端服务：http://localhost:4000
- 启动前端服务：http://localhost:3000
- 显示服务状态和PID信息

### 方法二：手动启动

1. 启动后端服务：
```bash
cd backend/user-service
npm start
```

2. 启动前端服务：
```bash
cd frontend/web
npm start
```

## 生产环境启动（Docker）

使用Docker Compose启动整个应用：

```bash
docker-compose up -d
```

这将启动以下服务：
- MongoDB数据库：端口 27017
- Redis缓存：端口 6379
- MySQL数据库：端口 3306
- 后端服务：端口 4000
- 前端Web应用：端口 5000

访问地址：
- Web应用：http://localhost:5000
- API服务：http://localhost:4000/api

## 停止服务

### 开发环境

#### 方法一：使用停止脚本（推荐）
```bash
./stop-dev.sh
```

#### 方法二：使用启动脚本
如果使用启动脚本启动的，直接按 `Ctrl+C` 即可停止所有服务。

#### 方法三：手动停止
```bash
# 查找并终止Node.js进程
lsof -ti:4000 | xargs kill -9  # 停止后端
lsof -ti:3000 | xargs kill -9  # 停止前端
```

### 生产环境（Docker）

```bash
docker-compose down
```

## 故障排除

### 端口占用问题
如果遇到端口占用错误，启动脚本会自动处理。如果需要手动处理：

```bash
# 查看端口占用情况
lsof -i :4000  # 查看后端端口
lsof -i :3000  # 查看前端端口

# 强制停止占用端口的进程
lsof -ti:4000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### 服务启动失败
1. 检查日志文件：
   ```bash
   # 后端日志
   tail -f backend/user-service/server.log
   
   # 前端日志
   tail -f frontend/web/client.log
   ```

2. 确保依赖已安装：
   ```bash
   # 安装后端依赖
   cd backend/user-service && npm install
   
   # 安装前端依赖
   cd frontend/web && npm install
   ```

3. 检查Node.js版本（推荐16+）：
   ```bash
   node --version
   npm --version
   ```

## 环境变量配置

### 后端服务环境变量

- `PORT`: 服务端口，默认4000
- `MONGODB_URI`: MongoDB连接字符串
- `REDIS_URL`: Redis连接URL
- `JWT_SECRET`: JWT密钥

### 前端服务环境变量

前端服务在开发环境通过代理访问后端API，在生产环境通过Nginx反向代理访问。

## 系统要求

- Node.js 16+
- npm 8+
- Docker & Docker Compose（生产环境）
- 至少4GB内存
- 至少2GB磁盘空间