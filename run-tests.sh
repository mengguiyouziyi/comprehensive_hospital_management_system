#!/bin/bash

# 综合测试脚本

echo "========================================"
echo "  综合医院管理系统 - 自动化测试"
echo "========================================"

# 创建测试报告目录
mkdir -p test-reports

# 运行后端测试
echo ""
echo "1. 运行后端测试..."
./run-backend-tests.sh

# 运行前端测试
echo ""
echo "2. 运行前端测试..."
cd frontend/web

# 检查node_modules是否存在
if [ ! -d "node_modules" ]; then
  echo "安装前端依赖..."
  npm install
fi

# 运行测试（非观察模式）
echo "运行前端测试..."
npm test -- --watchAll=false

# 生成测试报告
echo ""
echo "3. 生成综合测试报告..."
cd ../..
node generate-test-report.js

echo ""
echo "========================================"
echo "  所有测试已完成，请查看测试报告"
echo "  报告位置: test-reports/test-report.md"
echo "========================================"