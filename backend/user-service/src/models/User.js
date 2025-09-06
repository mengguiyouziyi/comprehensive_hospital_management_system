const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Role = require('./Role');

// 用户Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, '请输入有效的邮箱地址']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true // 自动添加createdAt和updatedAt字段
});

// 密码加密中间件
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 密码比较方法
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// 注册静态方法
userSchema.statics.register = async function(userData) {
  try {
    // 检查用户是否已存在
    const existingUser = await this.findOne({
      $or: [
        { username: userData.username },
        { email: userData.email }
      ]
    });

    if (existingUser) {
      throw new Error('用户名或邮箱已存在');
    }

    // 获取默认角色
    const role = await Role.findOne({ name: 'user' });
    if (!role) {
      throw new Error('用户角色不存在');
    }

    // 创建用户
    const user = new this({
      ...userData,
      roleId: role._id
    });

    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// JSON序列化时隐藏密码
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);