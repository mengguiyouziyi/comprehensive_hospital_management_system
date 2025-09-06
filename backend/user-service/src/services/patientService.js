const Patient = require('../models/Patient');

class PatientService {
  // 创建患者
  async createPatient(patientData) {
    try {
      const patient = new Patient(patientData);
      await patient.save();
      return { success: true, data: patient };
    } catch (error) {
      if (error.code === 11000) {
        // 处理重复键错误
        const field = Object.keys(error.keyPattern)[0];
        return { success: false, message: `${field}已存在` };
      }
      return { success: false, message: error.message };
    }
  }

  // 获取所有患者
  async getAllPatients(page = 1, limit = 10, search = '') {
    try {
      const skip = (page - 1) * limit;
      let query = {};
      
      // 如果有搜索关键词，则在姓名、电话、身份证号中搜索
      if (search) {
        query = {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { idCard: { $regex: search, $options: 'i' } }
          ]
        };
      }
      
      const patients = await Patient.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await Patient.countDocuments(query);
      
      return {
        success: true,
        data: patients,
        pagination: {
          current: page,
          pageSize: limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // 根据ID获取患者
  async getPatientById(id) {
    try {
      const patient = await Patient.findById(id);
      if (!patient) {
        return { success: false, message: '患者不存在' };
      }
      return { success: true, data: patient };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // 更新患者信息
  async updatePatient(id, updateData) {
    try {
      const patient = await Patient.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      
      if (!patient) {
        return { success: false, message: '患者不存在' };
      }
      
      return { success: true, data: patient };
    } catch (error) {
      if (error.code === 11000) {
        // 处理重复键错误
        const field = Object.keys(error.keyPattern)[0];
        return { success: false, message: `${field}已存在` };
      }
      return { success: false, message: error.message };
    }
  }

  // 删除患者
  async deletePatient(id) {
    try {
      const patient = await Patient.findByIdAndDelete(id);
      if (!patient) {
        return { success: false, message: '患者不存在' };
      }
      return { success: true, message: '患者删除成功' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = new PatientService();