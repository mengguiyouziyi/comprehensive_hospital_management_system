#!/bin/bash

# 后端测试脚本

echo "开始运行后端测试..."

# 进入后端服务目录
cd backend/user-service

# 检查node_modules是否存在
if [ ! -d "node_modules" ]; then
  echo "安装依赖..."
  npm install
fi

# 运行测试
echo "运行单元测试和集成测试..."
npm test

# 生成测试覆盖率报告
echo "生成测试覆盖率报告..."
npm run test:coverage

echo "后端测试完成!"