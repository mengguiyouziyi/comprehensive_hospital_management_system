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

  // 设备分类
  category: {
    type: String,
    required: true,
    enum: ['诊断设备', '治疗设备', '监护设备', '实验室设备', '手术设备', '康复设备', '其他'],
    default: '其他'
  },
  
  // 型号
  model: {
    type: String,
    trim: true
  },

  // 制造商
  manufacturer: {
    type: String,
    trim: true
  },

  // 序列号
  serialNumber: {
    type: String,
    trim: true
  },
  
  // 所属科室
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },

  // 当前位置
  currentLocation: {
    room: {
      type: String,
      trim: true
    },
    building: {
      type: String,
      trim: true
    },
    floor: {
      type: String,
      trim: true
    }
  },
  
  // 购买日期
  purchaseDate: {
    type: Date,
    required: true
  },

  // 购买价格
  purchasePrice: {
    type: Number,
    min: 0
  },

  // 预计使用寿命（月）
  expectedLifespan: {
    type: Number,
    min: 0
  },

  // 保修期（月）
  warrantyPeriod: {
    type: Number,
    required: true
  },

  // 保修到期日期
  warrantyExpiry: {
    type: Date
  },
  
  // 状态（可用、维修中、报废等）
  status: {
    type: String,
    enum: ['正常使用', '维修中', '待维修', '待报废', '已报废', '闲置'],
    default: '正常使用'
  },

  // 使用状态
  usageStatus: {
    type: String,
    enum: ['空闲', '使用中', '预约中'],
    default: '空闲'
  },

  // 质控状态
  qualityStatus: {
    type: String,
    enum: ['合格', '不合格', '待检'],
    default: '合格'
  },

  // 校准日期
  calibrationDate: {
    type: Date
  },

  // 下次校准日期
  nextCalibrationDate: {
    type: Date
  },

  // 使用小时数
  usageHours: {
    type: Number,
    default: 0,
    min: 0
  },

  // 负责人
  responsiblePerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // 技术规格
  specifications: {
    power: String,
    dimensions: String,
    weight: String,
    voltage: String,
    frequency: String,
    accuracy: String
  },

  // 附件清单
  accessories: [{
    name: String,
    quantity: Number,
    status: String
  }],

  // 维护记录
  maintenanceRecords: [{
    date: Date,
    type: {
      type: String,
      enum: ['预防性维护', '故障维修', '校准', '保养']
    },
    description: String,
    cost: Number,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    result: String,
    nextMaintenanceDate: Date
  }],
  
  // 使用记录
  usageRecords: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    startTime: Date,
    endTime: Date,
    purpose: String,
    patientId: String,
    result: String
  }],

  // 维修记录
  repairRecords: [{
    startDate: Date,
    endDate: Date,
    problemDescription: String,
    solution: String,
    cost: Number,
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    partsUsed: [{
      partName: String,
      partNumber: String,
      quantity: Number,
      cost: Number
    }]
  }],

  // 检查记录
  inspectionRecords: [{
    inspectionDate: Date,
    inspector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    type: {
      type: String,
      enum: ['日常检查', '定期检查', '专项检查']
    },
    result: {
      type: String,
      enum: ['合格', '不合格', '待整改']
    },
    findings: String,
    recommendations: String
  }],

  // 二维码
  qrCode: {
    type: String,
    trim: true
  },

  // 条形码
  barcode: {
    type: String,
    trim: true
  },

  // 图片
  images: [{
    url: String,
    description: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],

  // 文档
  documents: [{
    name: String,
    url: String,
    type: {
      type: String,
      enum: ['说明书', '维修手册', '校准证书', '合格证', '其他']
    },
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],

  // 备注
  notes: {
    type: String,
    trim: true
  },

  // 是否启用
  isActive: {
    type: Boolean,
    default: true
  },

  // 创建人
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // 更新人
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// 创建索引
equipmentSchema.index({ equipmentId: 1 });
equipmentSchema.index({ name: 1 });
equipmentSchema.index({ type: 1 });
equipmentSchema.index({ category: 1 });
equipmentSchema.index({ status: 1 });
equipmentSchema.index({ department: 1 });
equipmentSchema.index({ 'currentLocation.room': 1 });
equipmentSchema.index({ purchaseDate: 1 });
equipmentSchema.index({ warrantyExpiry: 1 });
equipmentSchema.index({ nextCalibrationDate: 1 });

// 虚拟字段：设备年龄（月）
equipmentSchema.virtual('ageInMonths').get(function() {
  return Math.floor((Date.now() - this.purchaseDate) / (1000 * 60 * 60 * 24 * 30));
});

// 虚拟字段：剩余保修期（月）
equipmentSchema.virtual('remainingWarrantyMonths').get(function() {
  if (!this.warrantyExpiry) return 0;
  return Math.floor((this.warrantyExpiry - Date.now()) / (1000 * 60 * 60 * 24 * 30));
});

// 虚拟字段：是否在保修期内
equipmentSchema.virtual('isUnderWarranty').get(function() {
  if (!this.warrantyExpiry) return false;
  return this.warrantyExpiry > Date.now();
});

// 虚拟字段：是否需要维护
equipmentSchema.virtual('needsMaintenance').get(function() {
  if (!this.nextCalibrationDate) return false;
  return this.nextCalibrationDate <= Date.now();
});

// 中间件：保存前更新相关字段
equipmentSchema.pre('save', function(next) {
  // 计算保修到期日期
  if (this.purchaseDate && this.warrantyPeriod && !this.warrantyExpiry) {
    this.warrantyExpiry = new Date(
      this.purchaseDate.getTime() + (this.warrantyPeriod * 30 * 24 * 60 * 60 * 1000)
    );
  }
  
  next();
});

module.exports = mongoose.model('Equipment', equipmentSchema);