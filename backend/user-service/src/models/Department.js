const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  level: {
    type: Number,
    default: 1
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Department', departmentSchema);