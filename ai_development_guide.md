# 综合医院管理系统AI开发指南

## 1. 概述

### 1.1 目标
本指南旨在为AI开发人员提供综合医院管理系统的开发指导，包括项目结构、技术栈、开发流程、代码规范等内容，帮助AI快速理解和参与项目开发。

### 1.2 适用对象
- AI助手
- 自动化开发工具
- 代码生成系统

### 1.3 项目特点
- 微服务架构
- 前后端分离
- 多端支持（Web + 移动端）
- 模块化设计
- 高可用性要求

## 2. 项目结构

### 2.1 整体目录结构
```
comprehensive-hospital-management-system/
├── frontend/                  # 前端项目
│   ├── web/                   # Web管理端
│   └── mobile/                # 移动端应用
├── backend/                   # 后端服务
│   ├── gateway/               # API网关
│   ├── user-service/          # 用户服务
│   ├── device-service/        # 设备管理服务
│   ├── maintenance-service/   # 维修管理服务
│   ├── training-service/      # 培训考试服务
│   ├── adverse-service/       # 不良事件服务
│   ├── disposal-service/      # 报废管理服务
│   ├── inventory-service/     # 库存管理服务
│   └── analytics-service/     # 统计分析服务
├── database/                  # 数据库相关
│   ├── mysql/                 # MySQL脚本
│   ├── redis/                 # Redis配置
│   └── mongodb/               # MongoDB配置
├── infrastructure/            # 基础设施
│   ├── docker/                # Docker配置
│   ├── kubernetes/            # Kubernetes配置
│   └── nginx/                 # Nginx配置
├── documentation/             # 项目文档
└── testing/                   # 测试相关
    ├── unit/                  # 单元测试
    ├── integration/           # 集成测试
    └── e2e/                   # 端到端测试
```

### 2.2 前端项目结构 (React/Web)
```
web/
├── public/                    # 静态资源
├── src/
│   ├── components/            # 公共组件
│   ├── pages/                 # 页面组件
│   │   ├── dashboard/         # 仪表板
│   │   ├── devices/           # 设备管理
│   │   ├── maintenance/       # 维修管理
│   │   ├── training/          # 培训考试
│   │   ├── adverse-events/    # 不良事件
│   │   ├── disposal/          # 报废管理
│   │   ├── inventory/         # 库存管理
│   │   └── analytics/         # 统计分析
│   ├── services/              # API服务
│   ├── store/                 # 状态管理
│   ├── utils/                 # 工具函数
│   ├── hooks/                 # 自定义Hooks
│   ├── routes/                # 路由配置
│   ├── layouts/               # 布局组件
│   ├── assets/                # 静态资源
│   └── App.js                 # 根组件
├── package.json               # 依赖配置
└── README.md                  # 项目说明
```

### 2.3 后端项目结构 (NestJS/微服务)
```
service-name/
├── src/
│   ├── modules/               # 功能模块
│   │   ├── controller/        # 控制器
│   │   ├── service/           # 服务层
│   │   ├── repository/        # 数据访问层
│   │   ├── dto/               # 数据传输对象
│   │   ├── entity/            # 数据实体
│   │   └── module.ts          # 模块定义
│   ├── common/                # 公共模块
│   │   ├── filters/           # 异常过滤器
│   │   ├── guards/            # 守卫
│   │   ├── interceptors/      # 拦截器
│   │   ├── pipes/             # 管道
│   │   └── decorators/        # 装饰器
│   ├── config/                # 配置文件
│   └── main.ts                # 入口文件
├── test/                      # 测试文件
├── package.json               # 依赖配置
└── README.md                  # 项目说明
```

## 4. 开发工具和规则配置

### 4.1 项目规则配置
项目使用灵码(Lingma)作为AI开发助手，并配置了专门的规则以确保代码质量和一致性。

规则配置目录：`.lingma/rules/`

包含以下规则文件：
1. `project-rules.md` - 项目通用规则
2. `frontend-rules.md` - 前端开发规则
3. `backend-rules.md` - 后端开发规则
4. `database-rules.md` - 数据库设计规则

### 4.2 复用开源规则
项目已从 [steipete/agent-rules](https://github.com/steipete/agent-rules) 导入了一系列成熟的开发规则，包括：
1. 代码质量检查规则 (check.mdc)
2. 提交信息规范 (commit.mdc)
3. Bug修复流程 (bug-fix.mdc)
4. 文档生成规则 (create-docs.mdc)
5. PR审查清单 (pr-review.mdc)
6. 全局规则如GitHub Issue创建 (github-issue-creation.mdc)

这些规则位于 `.lingma/rules/project-rules/` 目录中，可以直接使用。

### 4.3 规则使用方法
当使用灵码进行代码生成或修改时，灵码会自动应用这些规则以确保：
1. 代码风格一致性
2. 技术栈规范遵循
3. 安全性要求满足
4. 医疗行业特殊规范遵循

## 3. 技术栈详解

### 3.1 前端技术栈

#### 3.1.1 React核心概念
```javascript
// 组件定义
import React, { useState, useEffect } from 'react';

const ExampleComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // 副作用处理
    return () => {
      // 清理函数
    };
  }, [deps]); // 依赖数组
  
  return (
    <div>
      {/* JSX内容 */}
    </div>
  );
};

export default ExampleComponent;
```

#### 3.1.2 状态管理 (Redux Toolkit)
```javascript
// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
```

#### 3.1.3 路由管理 (React Router)
```javascript
// routes/index.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/devices" element={<DeviceList />} />
        <Route path="/devices/:id" element={<DeviceDetail />} />
      </Routes>
    </BrowserRouter>
  );
};
```

#### 3.1.4 HTTP客户端 (Axios)
```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      // 处理未授权
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3.2 后端技术栈

#### 3.2.1 NestJS核心概念
```typescript
// user.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
```

#### 3.2.2 数据库访问 (TypeORM)
```typescript
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  fullName: string;
}
```

#### 3.2.3 数据传输对象 (DTO)
```typescript
// create-user.dto.ts
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
```

#### 3.2.4 服务层
```typescript
// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
```

### 3.3 数据库设计

#### 3.3.1 命名规范
- 表名使用复数形式，小写字母，单词间用下划线分隔 (users, device_categories)
- 字段名使用小写字母，单词间用下划线分隔 (user_id, created_at)
- 主键统一命名为 id
- 外键命名为关联表名_id (user_id, device_id)

#### 3.3.2 常用字段
```sql
-- 通用字段模板
CREATE TABLE example_table (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='示例表';
```

## 4. 开发流程

### 4.1 功能开发流程
1. **需求分析**
   - 阅读需求文档
   - 理解业务逻辑
   - 确定技术方案

2. **设计阶段**
   - 数据库设计
   - API接口设计
   - 组件设计

3. **编码实现**
   - 后端接口开发
   - 前端页面开发
   - 单元测试编写

4. **测试验证**
   - 功能测试
   - 性能测试
   - 安全测试

5. **代码审查**
   - 代码规范检查
   - 逻辑正确性验证
   - 性能优化建议

6. **部署上线**
   - 构建打包
   - 环境部署
   - 回归测试

### 4.2 Git工作流
```bash
# 1. 创建功能分支
git checkout -b feature/user-management

# 2. 开发过程中定期提交
git add .
git commit -m "feat(user): add user creation functionality"

# 3. 推送到远程仓库
git push origin feature/user-management

# 4. 创建Pull Request
# 通过Git平台创建PR并请求代码审查

# 5. 合并到主分支
git checkout develop
git merge feature/user-management
git push origin develop
```

### 4.3 代码审查要点
- 代码是否符合规范
- 逻辑是否正确完整
- 是否有潜在的性能问题
- 是否有安全漏洞
- 注释是否清晰完整
- 测试用例是否覆盖全面

## 5. 代码规范

### 5.1 前端代码规范

#### 5.1.1 JavaScript/React规范
```javascript
// 好的示例
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await userService.getUserById(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.fullName}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};
```

#### 5.1.2 CSS规范
```
/* BEM命名规范 */
.user-profile {
  padding: 20px;
  background-color: #f5f5f5;
}

.user-profile__header {
  margin-bottom: 16px;
}

.user-profile__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.user-profile__name {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
```

### 5.2 后端代码规范

#### 5.2.1 TypeScript规范
```
// 好的示例
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
```

#### 5.2.2 API设计规范
```
// 统一响应格式
{
  "code": 0,
  "message": "success",
  "data": {},
  "timestamp": "2023-01-01T00:00:00Z"
}

// 错误响应格式
{
  "code": 1001,
  "message": "参数错误",
  "errors": [
    {
      "field": "username",
      "message": "用户名不能为空"
    }
  ],
  "timestamp": "2023-01-01T00:00:00Z"
}
```

## 6. 测试策略

### 6.1 前端测试

#### 6.1.1 组件测试
```
// UserProfile.test.js
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

test('renders user profile with name and email', () => {
  const user = {
    fullName: 'John Doe',
    email: 'john@example.com'
  };

  render(<UserProfile user={user} />);

  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
});
```

#### 6.1.2 集成测试
```
// user.integration.test.js
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, waitFor } from '@testing-library/react';
import UserList from './UserList';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, fullName: 'John Doe', email: 'john@example.com' },
        { id: 2, fullName: 'Jane Smith', email: 'jane@example.com' }
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches and displays users', async () => {
  const { getByText } = render(<UserList />);

  await waitFor(() => {
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Jane Smith')).toBeInTheDocument();
  });
});
```

### 6.2 后端测试

#### 6.2.1 单元测试
```
// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn()
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      mockUserRepository.create.mockReturnValue(createUserDto);
      mockUserRepository.save.mockResolvedValue(createUserDto);

      const result = await service.create(createUserDto);

      expect(result).toEqual(createUserDto);
      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(createUserDto);
    });
  });
});
```

#### 6.2.2 接口测试
```
// user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', () => {
      const createUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      controller.create(createUserDto);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
```

## 7. 部署与运维

### 7.1 Docker配置

#### 7.1.1 Dockerfile示例
```
# backend/Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

#### 7.1.2 Docker Compose配置
```
# docker-compose.yml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: hospital_management
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

  redis:
    image: redis:6.2
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://root:${MYSQL_ROOT_PASSWORD}@mysql:3306/hospital_management
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mysql
      - redis

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mysql_data:
```

### 7.2 CI/CD配置

#### 7.2.1 GitHub Actions示例
```
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x]
        
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linting
      run: npm run lint
      
    - name: Run tests
      run: npm run test
      
  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker images
      run: |
        docker build -t hospital-backend ./backend
        docker build -t hospital-frontend ./frontend
        
    - name: Push to registry
      if: github.ref == 'refs/heads/main'
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push hospital-backend
        docker push hospital-frontend
```

## 8. 常见问题与解决方案

### 8.1 性能优化

#### 8.1.1 前端性能优化
- 代码分割和懒加载
- 图片压缩和CDN加速
- 缓存策略优化
- 减少重渲染

#### 8.1.2 后端性能优化
- 数据库索引优化
- 查询优化
- 缓存机制 (Redis)
- 异步处理 (消息队列)

### 8.2 安全防护

#### 8.2.1 前端安全
- XSS攻击防护
- CSRF攻击防护
- 输入验证和过滤

#### 8.2.2 后端安全
- SQL注入防护
- 身份认证和授权
- 敏感数据加密
- API访问控制

### 8.3 错误处理

#### 8.3.1 统一异常处理
```
// exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : 500;
      
    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error';

    response.status(status).json({
      code: status,
      message: typeof message === 'string' ? message : 'Error occurred',
      timestamp: new Date().toISOString()
    });
  }
}
```

## 9. 开发工具推荐

### 9.1 IDE/编辑器
- **Visual Studio Code**: 轻量级，插件丰富
- **WebStorm**: 功能强大，适合大型项目
- **IntelliJ IDEA**: Java开发首选

### 9.2 调试工具
- **React Developer Tools**: React组件调试
- **Redux DevTools**: Redux状态调试
- **Postman**: API测试工具
- **Chrome DevTools**: 浏览器调试

### 9.3 版本控制
- **Git**: 版本控制工具
- **GitHub/GitLab**: 代码托管平台
- **SourceTree**: Git图形化界面

### 9.4 协作工具
- **Slack/DingTalk**: 团队沟通
- **Jira/Trello**: 任务管理
- **Confluence**: 文档协作
- **Figma**: 设计协作

## 10. 学习资源

### 10.1 官方文档
- [React官方文档](https://reactjs.org/)
- [NestJS官方文档](https://docs.nestjs.com/)
- [TypeScript官方文档](https://www.typescriptlang.org/)
- [MySQL官方文档](https://dev.mysql.com/doc/)

### 10.2 在线教程
- MDN Web Docs
- freeCodeCamp
- Udemy课程
- 技术博客和社区

### 10.3 书籍推荐
- 《React学习手册》
- 《深入浅出Node.js》
- 《MySQL必知必会》
- 《Clean Code》

通过遵循本指南，AI开发人员可以更好地理解和参与综合医院管理系统的开发工作，提高开发效率和代码质量。