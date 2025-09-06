const doctorService = require('../services/doctorService');

/**
 * 获取医生列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
const getDoctors = async (req, res) => {
  try {
    const { page = 1, limit = 10, department, search } = req.query;
    const result = await doctorService.getDoctors({
      page: parseInt(page),
      limit: parseInt(limit),
      department,
      search
    });
    
    res.status(200).json({
      code: 0,
      message: '获取医生列表成功',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取医生列表失败: ' + error.message,
      data: null
    });
  }
};

/**
 * 根据ID获取医生
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await doctorService.getDoctorById(id);
    
    res.status(200).json({
      code: 0,
      message: '获取医生信息成功',
      data: doctor
    });
  } catch (error) {
    if (error.message === '医生不存在') {
      return res.status(404).json({
        code: 404,
        message: error.message,
        data: null
      });
    }
    
    res.status(500).json({
      code: 500,
      message: error.message,
      data: null
    });
  }
};

/**
 * 创建医生
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
const createDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.createDoctor(req.body);
    
    res.status(201).json({
      code: 0,
      message: '创建医生成功',
      data: doctor
    });
  } catch (error) {
    if (error.message.includes('不存在') || error.message.includes('已存在')) {
      return res.status(400).json({
        code: 400,
        message: error.message,
        data: null
      });
    }
    
    res.status(500).json({
      code: 500,
      message: error.message,
      data: null
    });
  }
};

/**
 * 更新医生信息
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorData = req.body;
    const doctor = await doctorService.updateDoctor(id, doctorData);
    
    if (!doctor) {
      return res.status(404).json({
        code: 404,
        message: '医生不存在',
        data: null
      });
    }
    
    res.status(200).json({
      code: 0,
      message: '更新医生信息成功',
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '更新医生信息失败: ' + error.message,
      data: null
    });
  }
};

/**
 * 删除医生
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await doctorService.deleteDoctor(id);
    
    if (!doctor) {
      return res.status(404).json({
        code: 404,
        message: '医生不存在',
        data: null
      });
    }
    
    res.status(200).json({
      code: 0,
      message: '删除医生成功',
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '删除医生失败: ' + error.message,
      data: null
    });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
};