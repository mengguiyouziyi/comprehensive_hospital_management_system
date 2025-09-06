const app = require('./src/app');
const initRoles = require('./src/utils/initRoles');
const initUsers = require('./src/utils/initUsers');
const config = require('./src/config');

const PORT = config.port || 4000;

// 启动服务器
const server = app.listen(PORT, async () => {
  console.log(`医院管理系统用户服务运行在端口 ${PORT}`);
  
  // 初始化角色和用户
  await initRoles();
  await initUsers();
});

// 处理未捕获的异常
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
  process.exit(1);
});

// 处理未处理的Promise拒绝
process.on('unhandledRejection', (err) => {
  console.error('未处理的Promise拒绝:', err);
  server.close(() => {
    process.exit(1);
  });
});