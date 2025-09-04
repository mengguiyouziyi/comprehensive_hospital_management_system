import api from './api';

class EquipmentService {
  /**
   * 获取设备列表
   * @param {Object} params - 查询参数
   * @returns {Promise<Object>}
   */
  async getEquipmentList(params = {}) {
    try {
      const response = await api.get('/equipment', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '获取设备列表失败');
    }
  }

  /**
   * 创建新设备
   * @param {Object} equipmentData - 设备数据
   * @returns {Promise<Object>}
   */
  async createEquipment(equipmentData) {
    try {
      const response = await api.post('/equipment', equipmentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '创建设备失败');
    }
  }

  /**
   * 更新设备信息
   * @param {string} id - 设备ID
   * @param {Object} equipmentData - 设备数据
   * @returns {Promise<Object>}
   */
  async updateEquipment(id, equipmentData) {
    try {
      const response = await api.put(`/equipment/${id}`, equipmentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '更新设备失败');
    }
  }

  /**
   * 删除设备
   * @param {string} id - 设备ID
   * @returns {Promise<Object>}
   */
  async deleteEquipment(id) {
    try {
      const response = await api.delete(`/equipment/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '删除设备失败');
    }
  }

  /**
   * 获取设备详情
   * @param {string} id - 设备ID
   * @returns {Promise<Object>}
   */
  async getEquipmentById(id) {
    try {
      const response = await api.get(`/equipment/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '获取设备详情失败');
    }
  }
}

export default new EquipmentService();