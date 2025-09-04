# 综合医院管理系统项目规则

## 项目概述
这是一个综合医院管理系统，整合了设备资产管理、培训考试、不良事件管理、设备报废管理等多个子系统。

## 技术栈
- 前端：React 18 + Ant Design + Redux Toolkit
- 后端：Node.js (NestJS) / Java (Spring Boot)
- 数据库：MySQL + Redis + MongoDB
- 移动端：React Native

## 通用规则

### 代码规范
1. 遵循项目现有代码风格
2. 所有代码必须通过ESLint检查
3. 使用Prettier格式化代码
4. 变量命名使用camelCase
5. 组件命名使用PascalCase
6. 常量命名使用UPPER_SNAKE_CASE

### 提交信息规范
1. 使用 conventional commits 格式
2. 以emoji开头标识变更类型：
   - 🎉 新功能：`:sparkles:`
   - 🐛 修复：`:bug:`
   - 📝 文档：`:memo:`
   - 🎨 样式：`:art:`
   - ♻️ 重构：`:recycle:`
   - ✅ 测试：`:white_check_mark:`
   - 🚀 部署：`:rocket:`
   - 📦 依赖：`:package:`
   - 🔧 配置：`:wrench:`

### API设计规范
1. RESTful API 设计
2. 使用标准HTTP状态码
3. 统一的响应格式：
   ```json
   {
     "code": 0,
     "message": "success",
     "data": {}
   }
   ```

### 安全规范
1. 所有密码必须加密存储
2. 敏感信息不能在日志中明文输出
3. API接口必须进行身份验证和权限检查
4. SQL查询使用参数化查询防止注入攻击