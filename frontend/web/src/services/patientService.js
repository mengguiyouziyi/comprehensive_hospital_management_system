import api from './api';

class PatientService {
  // 获取患者列表
  async getPatients(page = 1, limit = 10) {
    try {
      const response = await api.get(`/patients?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '获取患者列表失败');
    }
  }

  // 创建患者
  async createPatient(patientData) {
    try {
      const response = await api.post('/patients', patientData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '创建患者失败');
    }
  }

  // 更新患者
  async updatePatient(id, patientData) {
    try {
      const response = await api.put(`/patients/${id}`, patientData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '更新患者信息失败');
    }
  }

  // 删除患者
  async deletePatient(id) {
    try {
      const response = await api.delete(`/patients/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '删除患者失败');
    }
  }
}

export default new PatientService();