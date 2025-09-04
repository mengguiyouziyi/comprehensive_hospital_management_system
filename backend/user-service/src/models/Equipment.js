const mongoose = require('mongoose');

// 设备模型
const equipmentSchema = new mongoose.Schema({
  // 设备名称
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  // 设备编号
  equipmentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  
  // 设备类型
  type: {
    type: String,
    required: true,
    trim: true
  },
  
  // 所属科室
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  
  // 购买日期
  purchaseDate: {
    type: Date,
    required: true
  },
  
  // 保修期（月）
  warrantyPeriod: {
    type: Number,
    required: true
  },
  
  // 状态（可用、维修中、报废等）
  status: {
    type: String,
    enum: ['available', 'in_repair', 'scrapped'],
    default: 'available'
  },
  
  // 维护记录
  maintenanceRecords: [{
    date: Date,
    description: String,
    cost: Number,
    performedBy: String
  }],
  
  // 使用记录
  usageRecords: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    startTime: Date,
    endTime: Date,
    purpose: String
  }],
  
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

// 在保存前更新updatedAt字段
equipmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Equipment', equipmentSchema);