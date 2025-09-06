#!/bin/bash

echo "启动医院管理系统开发环境..."

# 检查端口是否被占用
check_port() {
    local port=$1
    if lsof -ti:$port > /dev/null 2>&1; then
        echo "端口 $port 已被占用，正在停止相关进程..."
        lsof -ti:$port | xargs kill -9
        sleep 2
    fi
}

# 检查并清理端口
echo "检查端口占用情况..."
check_port 4000
check_port 3000

# 启动后端服务
echo "启动后端服务..."
cd backend/user-service
npm start > server.log 2>&1 &
BACKEND_PID=$!
cd ../..

# 启动前端服务
echo "启动前端服务..."
cd frontend/web
npm start > client.log 2>&1 &
FRONTEND_PID=$!
cd ../..

echo "后端服务PID: $BACKEND_PID"
echo "前端服务PID: $FRONTEND_PID"

echo "服务启动中，请稍候..."
echo "后端服务将运行在 http://localhost:4000"
echo "前端服务将运行在 http://localhost:3000"
echo "要停止服务，请运行: kill $BACKEND_PID $FRONTEND_PID"

# 添加一个清理函数
cleanup() {
    echo "正在停止所有服务..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    
    # 确保端口被释放
    check_port 4000
    check_port 3000
    
    echo "所有服务已停止"
    exit 0
}

# 捕获Ctrl+C信号
trap cleanup INT TERM

# 等待服务启动
echo "等待服务启动..."
sleep 5

# 检查服务状态
if ps -p $BACKEND_PID > /dev/null 2>&1; then
    echo "✅ 后端服务已启动 (PID: $BACKEND_PID)"
else
    echo "❌ 后端服务启动失败，请查看 server.log"
fi

if ps -p $FRONTEND_PID > /dev/null 2>&1; then
    echo "✅ 前端服务已启动 (PID: $FRONTEND_PID)"
else
    echo "❌ 前端服务启动失败，请查看 client.log"
fi

echo "按 Ctrl+C 停止所有服务"

# 等待用户按Ctrl+C
wait
