const mongoose = require('mongoose');

/**
 * 医生模型
 * 根据项目规则，遵循数据库设计规范和安全规范
 */
const doctorSchema = new mongoose.Schema({
  // 医生工号，唯一标识
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  
  // 姓名
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  // 性别
  gender: {
    type: String,
    required: true,
    enum: ['男', '女']
  },
  
  // 出生日期
  birthDate: {
    type: Date,
    required: true
  },
  
  // 联系电话
  phone: {
    type: String,
    required: true,
    trim: true
  },
  
  // 电子邮箱
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  
  // 所属科室
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  
  // 职称
  title: {
    type: String,
    required: true,
    enum: ['住院医师', '主治医师', '副主任医师', '主任医师']
  },
  
  // 专业领域
  specialty: {
    type: String,
    trim: true
  },
  
  // 入职日期
  hireDate: {
    type: Date,
    required: true
  },
  
  // 状态
  status: {
    type: String,
    required: true,
    enum: ['在职', '离职', '休假'],
    default: '在职'
  },
  
  // 创建时间
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // 更新时间
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 添加更新时间的中间件
doctorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// 添加索引
doctorSchema.index({ employeeId: 1 });
doctorSchema.index({ department: 1 });
doctorSchema.index({ name: 1 });

module.exports = mongoose.model('Doctor', doctorSchema);