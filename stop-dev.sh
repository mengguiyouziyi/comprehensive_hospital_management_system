#!/bin/bash

echo "停止医院管理系统开发环境..."

# 停止后端服务
echo "停止后端服务..."
lsof -ti:4000 | xargs kill -9 2>/dev/null

# 停止前端服务
echo "停止前端服务..."
lsof -ti:3000 | xargs kill -9 2>/dev/null

# 等待进程完全停止
sleep 2

# 检查端口是否还被占用
if lsof -ti:4000 > /dev/null 2>&1; then
    echo "⚠️  端口4000仍有进程占用，强制停止..."
    lsof -ti:4000 | xargs kill -9
fi

if lsof -ti:3000 > /dev/null 2>&1; then
    echo "⚠️  端口3000仍有进程占用，强制停止..."
    lsof -ti:3000 | xargs kill -9
fi

echo "✅ 所有服务已停止"