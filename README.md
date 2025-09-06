# 综合医院管理系统

[![CI/CD Pipeline](https://github.com/your-organization/hospital-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/your-organization/hospital-management-system/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

综合医院管理系统是为医疗机构提供全面管理解决方案的系统，整合了设备资产管理、培训考试、不良事件管理、设备报废管理等多个子系统，实现医院管理的数字化、自动化和智能化。

## 功能模块

- 用户认证与权限管理
- 设备资产管理
- 维修管理
- 预防性维护管理
- 培训考试管理
- 不良事件管理
- 设备报废管理
- 库存管理
- 统计分析
- 移动端应用

## 技术架构

### 前端
- React 18 + Hooks
- Ant Design 组件库
- React Router v6
- Axios HTTP 客户端

### 后端
- Node.js + Express
- MongoDB (主数据库)
- Redis (缓存)
- MySQL (关系型数据)
- JWT 身份认证

### DevOps
- Docker 容器化
- Docker Compose 编排
- GitHub Actions CI/CD
- Nginx 反向代理

## CI/CD 自动化部署

### 什么是 CI/CD？

**CI/CD (持续集成/持续部署)** 是现代软件开发的最佳实践：

- **持续集成 (CI)**: 自动化代码构建、测试和集成
- **持续部署 (CD)**: 自动化部署到生产环境

### 我们的 CI/CD 流程包含：

1. **自动化测试**:
   - 单元测试 (Jest)
   - 集成测试
   - 代码质量检查 (ESLint)

2. **安全扫描**:
   - npm audit 漏洞检测
   - 代码安全分析

3. **构建和部署**:
   - 自动化 Docker 镜像构建
   - 生产环境部署
   - Slack 通知

### GitHub Actions 工作流：

- `ci-cd.yml`: 主要的 CI/CD 流水线
- `docker.yml`: Docker 容器构建和推送

### 工作原理：

1. **代码提交/PR**: 自动触发测试和构建
2. **安全扫描**: 检测安全漏洞
3. **Docker 构建**: 创建容器镜像
4. **自动部署**: 测试通过后自动部署到生产环境

### 运行测试

```bash
# 安装依赖
npm install

# 运行所有测试
npm test

# 运行代码检查
npm run lint

# 构建生产版本
npm run build
```

### 部署流程

CI/CD 流水线会自动：
- 运行所有测试
- 构建 Docker 镜像
- 合并到主分支时部署到生产环境
- 通过 Slack 发送通知

## 快速开始

### 环境要求
- Node.js 16+
- Docker & Docker Compose
- Git

### 本地开发

1. 克隆项目
```bash
git clone <repository-url>
cd comprehensive_hospital_management_system
```

2. 启动所有服务
```bash
docker-compose up -d
```

3. 访问应用
- 前端界面: http://localhost
- 后端API: http://localhost:3001

### 开发模式

#### 后端服务
```bash
cd backend/user-service
npm install
npm run dev
```

#### 前端应用
```bash
cd frontend/web
npm install
npm start
```

## 项目结构

```
comprehensive_hospital_management_system/
├── backend/
│   └── user-service/     # 用户服务
├── frontend/
│   └── web/              # Web前端
├── docker-compose.yml    # Docker编排文件
├── README.md             # 项目说明文档
└── .gitignore            # Git忽略文件
```

## 测试

### 运行所有测试
```bash
./run-tests.sh
```

### 后端测试
```bash
cd backend/user-service
npm test
```

### 前端测试
```bash
cd frontend/web
npm test
```

## 部署

### Docker部署
```bash
docker-compose up -d
```

### 生产环境部署
请参考 [部署指南](./deployment_guide.md)

## 文档

- [技术规格说明书](./technical_specification.md)
- [API文档](./api_documentation.md)
- [数据库设计](./database_design.md)
- [部署指南](./deployment_guide.md)
- [项目管理文档](./project_management.md)

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助我们改进系统。

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。