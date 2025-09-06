const Doctor = require('../models/Doctor');
const Department = require('../models/Department');

/**
 * 获取医生列表
 * @param {Object} params - 查询参数
 * @returns {Promise<Object>} 包含医生列表和分页信息的对象
 */
const getDoctors = async (params) => {
  try {
    const { page = 1, limit = 10, department, search } = params;
    const skip = (page - 1) * limit;
    
    // 构建查询条件
    const query = {};
    if (department) {
      query.department = department;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } }
      ];
    }
    
    // 查询医生列表
    const doctors = await Doctor.find(query)
      .populate('department', 'name')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    // 计算总数
    const total = await Doctor.countDocuments(query);
    
    return {
      doctors,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('获取医生列表失败:', error);
    throw error;
  }
};

/**
 * 根据ID获取医生详情
 * @param {string} id - 医生ID
 * @returns {Promise<Object>} 医生信息
 */
const getDoctorById = async (id) => {
  try {
    const doctor = await Doctor.findById(id).populate('department', 'name');
    return doctor;
  } catch (error) {
    console.error('获取医生详情失败:', error);
    throw error;
  }
};

/**
 * 创建医生
 * @param {Object} doctorData - 医生数据
 * @returns {Promise<Object>} 创建的医生信息
 */
const createDoctor = async (doctorData) => {
  try {
    console.log('开始创建医生:', doctorData);
    
    // 检查部门是否存在
    if (doctorData.department) {
      const department = await Department.findById(doctorData.department);
      if (!department) {
        throw new Error('指定的部门不存在');
      }
    }
    
    // 补充必要字段
    const doctorDataFull = {
      ...doctorData,
      gender: doctorData.gender || '男',
      birthDate: doctorData.birthDate || new Date('1980-01-01'),
      hireDate: doctorData.hireDate || new Date(),
      title: doctorData.title || '住院医师',
      status: doctorData.status || '在职'
    };
    
    const doctor = new Doctor(doctorDataFull);
    await doctor.save();
    console.log('医生创建成功:', doctor);
    
    // 填充部门信息
    await doctor.populate('department', 'name');
    
    return doctor;
  } catch (error) {
    console.error('创建医生失败:', error);
    throw error;
  }
};

/**
 * 更新医生信息
 * @param {string} id - 医生ID
 * @param {Object} doctorData - 医生数据
 * @returns {Promise<Object>} 更新后的医生信息
 */
const updateDoctor = async (id, doctorData) => {
  try {
    // 更新时间戳
    doctorData.updatedAt = Date.now();
    
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      doctorData,
      { new: true, runValidators: true }
    ).populate('department', 'name');
    
    return doctor;
  } catch (error) {
    console.error('更新医生信息失败:', error);
    throw error;
  }
};

/**
 * 删除医生
 * @param {string} id - 医生ID
 * @returns {Promise<Object>} 删除的医生信息
 */
const deleteDoctor = async (id) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(id);
    return doctor;
  } catch (error) {
    console.error('删除医生失败:', error);
    throw error;
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
};