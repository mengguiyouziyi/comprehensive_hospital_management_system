const patientService = require('../services/patientService');

class PatientController {
  // 创建患者
  async createPatient(req, res) {
    try {
      const result = await patientService.createPatient(req.body);
      if (result.success) {
        res.status(201).json({
          code: 201,
          message: '患者创建成功',
          data: result.data
        });
      } else {
        res.status(400).json({
          code: 400,
          message: result.message,
          data: null
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '服务器内部错误',
        data: null
      });
    }
  }

  // 获取患者列表
  async getPatients(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const result = await patientService.getAllPatients(
        parseInt(page),
        parseInt(limit),
        search
      );
      
      if (result.success) {
        res.status(200).json({
          code: 200,
          message: '获取患者列表成功',
          data: result.data,
          pagination: result.pagination
        });
      } else {
        res.status(400).json({
          code: 400,
          message: result.message,
          data: null
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '服务器内部错误',
        data: null
      });
    }
  }

  // 根据ID获取患者
  async getPatientById(req, res) {
    try {
      const { id } = req.params;
      const result = await patientService.getPatientById(id);
      
      if (result.success) {
        res.status(200).json({
          code: 200,
          message: '获取患者信息成功',
          data: result.data
        });
      } else {
        res.status(404).json({
          code: 404,
          message: result.message,
          data: null
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '服务器内部错误',
        data: null
      });
    }
  }

  // 更新患者信息
  async updatePatient(req, res) {
    try {
      const { id } = req.params;
      const result = await patientService.updatePatient(id, req.body);
      
      if (result.success) {
        res.status(200).json({
          code: 200,
          message: '患者信息更新成功',
          data: result.data
        });
      } else {
        res.status(400).json({
          code: 400,
          message: result.message,
          data: null
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '服务器内部错误',
        data: null
      });
    }
  }

  // 删除患者
  async deletePatient(req, res) {
    try {
      const { id } = req.params;
      const result = await patientService.deletePatient(id);
      
      if (result.success) {
        res.status(200).json({
          code: 200,
          message: result.message,
          data: null
        });
      } else {
        res.status(404).json({
          code: 404,
          message: result.message,
          data: null
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '服务器内部错误',
        data: null
      });
    }
  }
}

module.exports = new PatientController();