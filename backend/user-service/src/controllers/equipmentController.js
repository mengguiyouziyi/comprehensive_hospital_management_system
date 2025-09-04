const equipmentService = require('../services/equipmentService');

class EquipmentController {
  /**
   * 创建新设备
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async createEquipment(req, res) {
    try {
      const equipment = await equipmentService.createEquipment(req.body);
      res.status(201).json({
        success: true,
        message: '设备创建成功',
        data: equipment
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * 获取设备列表
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async getAllEquipment(req, res) {
    try {
      const { page = 1, limit = 10, ...filters } = req.query;
      const result = await equipmentService.getAllEquipment(filters, parseInt(page), parseInt(limit));
      
      res.json({
        success: true,
        message: '获取设备列表成功',
        data: result.equipmentList,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * 获取设备详情
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async getEquipmentById(req, res) {
    try {
      const equipment = await equipmentService.getEquipmentById(req.params.id);
      
      res.json({
        success: true,
        message: '获取设备详情成功',
        data: equipment
      });
    } catch (error) {
      if (error.message === '设备不存在') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * 更新设备信息
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async updateEquipment(req, res) {
    try {
      const equipment = await equipmentService.updateEquipment(req.params.id, req.body);
      
      res.json({
        success: true,
        message: '设备更新成功',
        data: equipment
      });
    } catch (error) {
      if (error.message === '设备不存在') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * 删除设备
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async deleteEquipment(req, res) {
    try {
      await equipmentService.deleteEquipment(req.params.id);
      
      res.json({
        success: true,
        message: '设备删除成功'
      });
    } catch (error) {
      if (error.message === '设备不存在') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * 添加维护记录
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async addMaintenanceRecord(req, res) {
    try {
      const equipment = await equipmentService.addMaintenanceRecord(req.params.id, req.body);
      
      res.json({
        success: true,
        message: '维护记录添加成功',
        data: equipment
      });
    } catch (error) {
      if (error.message === '设备不存在') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * 添加使用记录
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async addUsageRecord(req, res) {
    try {
      const equipment = await equipmentService.addUsageRecord(req.params.id, req.body);
      
      res.json({
        success: true,
        message: '使用记录添加成功',
        data: equipment
      });
    } catch (error) {
      if (error.message === '设备不存在') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * 获取设备统计信息
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  async getEquipmentStats(req, res) {
    try {
      const stats = await equipmentService.getEquipmentStatsByDepartment();
      
      res.json({
        success: true,
        message: '获取设备统计成功',
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new EquipmentController();