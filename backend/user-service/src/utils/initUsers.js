const User = require('../models/User');
const Role = require('../models/Role');

/**
 * 初始化系统默认用户
 */
const initUsers = async () => {
  try {
    // 查找管理员角色
    const adminRole = await Role.findOne({ name: 'admin' });
    if (!adminRole) {
      console.log('管理员角色不存在，请先初始化角色');
      return;
    }

    // 定义默认管理员用户
    const defaultAdmin = {
      username: 'admin',
      email: 'admin@hospital.com',
      password: 'admin123',
      fullName: '系统管理员',
      roleId: adminRole._id
    };

    // 检查并创建管理员用户
    const existingUser = await User.findOne({ username: defaultAdmin.username });
    if (!existingUser) {
      // 创建用户（密码将在模型中自动加密）
      const user = new User(defaultAdmin);
      await user.save();
      console.log(`默认管理员用户 "${defaultAdmin.username}" 创建成功`);
    } else {
      console.log(`默认管理员用户 "${defaultAdmin.username}" 已存在`);
    }

    console.log('用户初始化完成');
  } catch (error) {
    console.error('用户初始化失败:', error.message);
  }
};

module.exports = initUsers;