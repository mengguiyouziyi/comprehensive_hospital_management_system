const Role = require('../models/Role');

/**
 * 初始化系统角色
 */
const initRoles = async () => {
  try {
    // 定义默认角色
    const defaultRoles = [
      {
        name: 'admin',
        description: '系统管理员',
        permissions: ['all']
      },
      {
        name: 'doctor',
        description: '医生',
        permissions: ['view_patients', 'edit_patients', 'view_medical_records', 'edit_medical_records']
      },
      {
        name: 'nurse',
        description: '护士',
        permissions: ['view_patients', 'edit_patients', 'view_medical_records']
      },
      {
        name: 'user',
        description: '普通用户',
        permissions: ['view_profile']
      }
    ];

    // 检查并创建每个角色
    for (const roleData of defaultRoles) {
      const existingRole = await Role.findOne({ name: roleData.name });
      if (!existingRole) {
        const role = new Role(roleData);
        await role.save();
        console.log(`角色 "${roleData.name}" 创建成功`);
      } else {
        console.log(`角色 "${roleData.name}" 已存在`);
      }
    }

    console.log('角色初始化完成');
  } catch (error) {
    console.error('角色初始化失败:', error.message);
  }
};

module.exports = initRoles;