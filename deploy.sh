#!/bin/bash

# 医院管理系统部署脚本
# 部署到服务器 192.168.1.241

set -e

# 配置变量
SERVER_IP="192.168.1.241"
SERVER_USER="sutai"
SSH_KEY="$HOME/.ssh/id_rsa"
PROJECT_DIR="/opt/hospital-management"
BACKUP_DIR="/opt/hospital-management-backup"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖
check_dependencies() {
    log_info "检查部署依赖..."
    
    if ! command -v ssh &> /dev/null; then
        log_error "SSH 未安装"
        exit 1
    fi
    
    if ! command -v scp &> /dev/null; then
        log_error "SCP 未安装"
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker 未安装"
        exit 1
    fi
    
    log_info "依赖检查完成"
}

# 测试SSH连接
test_ssh() {
    log_info "测试SSH连接到 $SERVER_IP..."
    if ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "echo 'SSH连接成功'"; then
        log_info "SSH连接测试成功"
    else
        log_error "SSH连接失败，请检查网络和认证信息"
        exit 1
    fi
}

# 准备服务器环境
prepare_server() {
    log_info "准备服务器环境..."
    
    ssh $SERVER_USER@$SERVER_IP << 'EOF'
        # 检查Docker是否安装
        if ! command -v docker &> /dev/null; then
            echo "安装Docker..."
            curl -fsSL https://get.docker.com -o get-docker.sh
            sudo sh get-docker.sh
            sudo usermod -aG docker $USER
        fi
        
        # 检查Docker Compose是否安装
        if ! command -v docker-compose &> /dev/null; then
            echo "安装Docker Compose..."
            sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
            sudo chmod +x /usr/local/bin/docker-compose
        fi
        
        # 创建项目目录
        sudo mkdir -p $PROJECT_DIR
        sudo mkdir -p $BACKUP_DIR
        sudo chown -R $USER:$USER $PROJECT_DIR
        sudo chown -R $USER:$USER $BACKUP_DIR
        
        # 创建日志目录
        mkdir -p $PROJECT_DIR/logs
        
        echo "服务器环境准备完成"
EOF
}

# 备份现有部署
backup_deployment() {
    log_info "备份现有部署..."
    
    ssh $SERVER_USER@$SERVER_IP << EOF
        if [ -d "$PROJECT_DIR" ]; then
            # 备份现有数据和配置
            cp -r $PROJECT_DIR $BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S)
            echo "备份完成"
        else
            echo "没有现有部署需要备份"
        fi
EOF
}

# 构建和部署应用
deploy_application() {
    log_info "构建和部署应用..."
    
    # 打包项目文件
    log_info "打包项目文件..."
    tar -czf hospital-management.tar.gz \
        --exclude=node_modules \
        --exclude=.git \
        --exclude=coverage \
        --exclude=build \
        --exclude=logs \
        --exclude=.DS_Store \
        .
    
    # 上传到服务器
    log_info "上传项目文件到服务器..."
    scp hospital-management.tar.gz $SERVER_USER@$SERVER_IP:/tmp/
    
    # 在服务器上解压和部署
    ssh $SERVER_USER@$SERVER_IP << EOF
        cd /tmp
        tar -xzf hospital-management.tar.gz
        cp -r * $PROJECT_DIR/
        rm hospital-management.tar.gz
        
        cd $PROJECT_DIR
        
        # 停止现有服务
        if [ -f "docker-compose.prod.yml" ]; then
            docker-compose -f docker-compose.prod.yml down
        fi
        
        # 构建并启动服务
        docker-compose -f docker-compose.prod.yml up -d --build
        
        echo "应用部署完成"
EOF
    
    # 清理本地打包文件
    rm hospital-management.tar.gz
    
    log_info "应用部署完成"
}

# 验证部署
verify_deployment() {
    log_info "验证部署..."
    
    # 等待服务启动
    sleep 30
    
    # 检查服务状态
    ssh $SERVER_USER@$SERVER_IP << 'EOF'
        cd /opt/hospital-management
        
        echo "检查Docker容器状态..."
        docker-compose -f docker-compose.prod.yml ps
        
        echo "检查服务健康状态..."
        sleep 10
        
        # 检查前端服务
        if curl -f http://localhost:8080 > /dev/null 2>&1; then
            echo "✅ 前端服务正常运行"
        else
            echo "❌ 前端服务异常"
        fi
        
        # 检查后端服务
        if curl -f http://localhost:3001/health > /dev/null 2>&1; then
            echo "✅ 后端服务正常运行"
        else
            echo "❌ 后端服务异常"
        fi
        
        # 检查数据库连接
        if docker exec hospital-mongodb mongosh --eval "db.stats()" > /dev/null 2>&1; then
            echo "✅ MongoDB 连接正常"
        else
            echo "❌ MongoDB 连接异常"
        fi
        
        echo "验证完成"
EOF
}

# 显示访问信息
show_access_info() {
    log_info "部署完成！访问信息："
    echo "================================"
    echo "前端应用: http://$SERVER_IP"
    echo "后端API: http://$SERVER_IP/api"
    echo "管理界面: http://$SERVER_IP/admin"
    echo ""
    echo "默认账号："
    echo "用户名: admin"
    echo "密码: admin123"
    echo ""
    echo "服务器信息："
    echo "IP: $SERVER_IP"
    echo "用户: $SERVER_USER"
    echo "项目目录: $PROJECT_DIR"
    echo "================================"
}

# 主函数
main() {
    log_info "开始部署医院管理系统..."
    
    check_dependencies
    test_ssh
    prepare_server
    backup_deployment
    deploy_application
    verify_deployment
    show_access_info
    
    log_info "部署完成！"
}

# 运行主函数
main "$@"