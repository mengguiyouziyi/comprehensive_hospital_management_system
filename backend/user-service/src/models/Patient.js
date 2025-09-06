const mongoose = require('mongoose');

// 患者Schema
const patientSchema = new mongoose.Schema({
  // 患者ID
  patientId: {
    type: String,
    required: true,
    unique: true
  },
  // 姓名
  name: {
    type: String,
    required: true
  },
  // 性别
  gender: {
    type: String,
    enum: ['男', '女'],
    required: true
  },
  // 出生日期
  dateOfBirth: {
    type: Date,
    required: true
  },
  // 联系电话
  phone: {
    type: String,
    required: true
  },
  // 身份证号
  idCard: {
    type: String,
    required: true,
    unique: true
  },
  // 地址
  address: {
    type: String,
    required: true
  },
  // 紧急联系人
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  // 过敏史
  allergies: [{
    type: String
  }],
  // 既往病史
  medicalHistory: [{
    type: String
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
patientSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Patient', patientSchema);