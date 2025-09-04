# 前端开发规则

## 技术栈
- React 18 + Hooks
- Ant Design 组件库
- Redux Toolkit 状态管理
- React Router 6 路由管理
- Axios HTTP客户端

## 组件开发规范

### 组件结构
```javascript
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // 副作用处理
    return () => {
      // 清理函数
    };
  }, [deps]); // 依赖数组
  
  return (
    <div className="component-name">
      {/* JSX内容 */}
    </div>
  );
};

export default ComponentName;
```

### 命名规范
1. 组件文件名使用PascalCase：`UserProfile.jsx`
2. 组件内部名称与文件名一致
3. CSS类名使用kebab-case：`.user-profile`

### 状态管理
1. 优先使用React Hooks管理组件状态
2. 复杂状态使用Redux Toolkit管理
3. 避免不必要的状态更新

### 样式规范
1. 使用CSS Modules或styled-components
2. 避免使用内联样式
3. 遵循BEM命名规范

## API集成规范

### 服务层封装
```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
});

// 请求拦截器
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
api.interceptors.response.use(response => response.data);

export default api;
```

### 数据获取
1. 使用useEffect处理数据获取
2. 实现加载状态和错误处理
3. 合理使用缓存避免重复请求

## 移动端开发规范
- 使用React Native开发
- 遵循平台设计指南
- 适配不同屏幕尺寸
- 优化性能避免卡顿