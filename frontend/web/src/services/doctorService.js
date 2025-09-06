import api from './api';

/**
 * 获取所有医生
 * @param {Object} params - 查询参数
 * @returns {Promise<Object>} 包含医生列表的响应
 */
export const getAllDoctors = (params = {}) => {
  return api.get('/doctors', { params });
};

/**
 * 根据ID获取医生
 * @param {string} id - 医生ID
 * @returns {Promise<Object>} 包含医生信息的响应
 */
export const getDoctorById = (id) => {
  return api.get(`/doctors/${id}`);
};

/**
 * 创建医生
 * @param {Object} doctorData - 医生数据
 * @returns {Promise<Object>} 包含创建的医生信息的响应
 */
export const createDoctor = (doctorData) => {
  return api.post('/doctors', doctorData);
};

/**
 * 更新医生信息
 * @param {string} id - 医生ID
 * @param {Object} doctorData - 更新的医生数据
 * @returns {Promise<Object>} 包含更新的医生信息的响应
 */
export const updateDoctor = (id, doctorData) => {
  return api.put(`/doctors/${id}`, doctorData);
};

/**
 * 删除医生
 * @param {string} id - 医生ID
 * @returns {Promise<Object>} 删除结果
 */
export const deleteDoctor = (id) => {
  return api.delete(`/doctors/${id}`);
};

export default {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
};