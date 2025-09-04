const Equipment = require('../models/Equipment');
const Department = require('../models/Department');

class EquipmentService {
  /**
   * 创建新设备
   * @param {Object} equipmentData - 设备数据
   * @returns {Promise<Object>} 创建的设备对象
   */
  async createEquipment(equipmentData) {
    try {
      const equipment = new Equipment(equipmentData);
      await equipment.save();
      return equipment;
    } catch (error) {
      throw new Error(`创建设备失败: ${error.message}`);
    }
  }

  /**
   * 获取所有设备列表
   * @param {Object} filters - 过滤条件
   * @param {number} page - 页码
   * @param {number} limit - 每页数量
   * @returns {Promise<Object>} 设备列表和分页信息
   */
  async getAllEquipment(filters = {}, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      
      // 构建查询条件
      const query = {};
      if (filters.department) {
        query.department = filters.department;
      }
      if (filters.type) {
        query.type = new RegExp(filters.type, 'i');
      }
      if (filters.status) {
        query.status = filters.status;
      }
      if (filters.equipmentId) {
        query.equipmentId = new RegExp(filters.equipmentId, 'i');
      }

      const equipmentList = await Equipment.find(query)
        .populate('department', 'name')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await Equipment.countDocuments(query);

      return {
        equipmentList,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      };
    } catch (error) {
      throw new Error(`获取设备列表失败: ${error.message}`);
    }
  }

  /**
   * 根据ID获取设备详情
   * @param {string} id - 设备ID
   * @returns {Promise<Object>} 设备详情
   */
  async getEquipmentById(id) {
    try {
      const equipment = await Equipment.findById(id)
        .populate('department', 'name')
        .populate('usageRecords.user', 'name employeeId');
      
      if (!equipment) {
        throw new Error('设备不存在');
      }
      
      return equipment;
    } catch (error) {
      throw new Error(`获取设备详情失败: ${error.message}`);
    }
  }

  /**
   * 更新设备信息
   * @param {string} id - 设备ID
   * @param {Object} updateData - 更新数据
   * @returns {Promise<Object>} 更新后的设备对象
   */
  async updateEquipment(id, updateData) {
    try {
      const equipment = await Equipment.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).populate('department', 'name');
      
      if (!equipment) {
        throw new Error('设备不存在');
      }
      
      return equipment;
    } catch (error) {
      throw new Error(`更新设备失败: ${error.message}`);
    }
  }

  /**
   * 删除设备
   * @param {string} id - 设备ID
   * @returns {Promise<boolean>} 删除结果
   */
  async deleteEquipment(id) {
    try {
      const equipment = await Equipment.findByIdAndDelete(id);
      
      if (!equipment) {
        throw new Error('设备不存在');
      }
      
      return true;
    } catch (error) {
      throw new Error(`删除设备失败: ${error.message}`);
    }
  }

  /**
   * 添加维护记录
   * @param {string} id - 设备ID
   * @param {Object} maintenanceData - 维护记录数据
   * @returns {Promise<Object>} 更新后的设备对象
   */
  async addMaintenanceRecord(id, maintenanceData) {
    try {
      const equipment = await Equipment.findById(id);
      
      if (!equipment) {
        throw new Error('设备不存在');
      }
      
      equipment.maintenanceRecords.push(maintenanceData);
      await equipment.save();
      
      return equipment.populate('department', 'name');
    } catch (error) {
      throw new Error(`添加维护记录失败: ${error.message}`);
    }
  }

  /**
   * 添加使用记录
   * @param {string} id - 设备ID
   * @param {Object} usageData - 使用记录数据
   * @returns {Promise<Object>} 更新后的设备对象
   */
  async addUsageRecord(id, usageData) {
    try {
      const equipment = await Equipment.findById(id);
      
      if (!equipment) {
        throw new Error('设备不存在');
      }
      
      equipment.usageRecords.push(usageData);
      await equipment.save();
      
      return equipment.populate([
        { path: 'department', select: 'name' },
        { path: 'usageRecords.user', select: 'name employeeId' }
      ]);
    } catch (error) {
      throw new Error(`添加使用记录失败: ${error.message}`);
    }
  }

  /**
   * 按科室统计设备
   * @returns {Promise<Array>} 各科室设备统计
   */
  async getEquipmentStatsByDepartment() {
    try {
      const stats = await Equipment.aggregate([
        {
          $group: {
            _id: '$department',
            total: { $sum: 1 },
            available: {
              $sum: {
                $cond: [{ $eq: ['$status', 'available'] }, 1, 0]
              }
            },
            inRepair: {
              $sum: {
                $cond: [{ $eq: ['$status', 'in_repair'] }, 1, 0]
              }
            },
            scrapped: {
              $sum: {
                $cond: [{ $eq: ['$status', 'scrapped'] }, 1, 0]
              }
            }
          }
        },
        {
          $lookup: {
            from: 'departments',
            localField: '_id',
            foreignField: '_id',
            as: 'departmentInfo'
          }
        },
        {
          $unwind: '$departmentInfo'
        },
        {
          $project: {
            department: '$departmentInfo.name',
            total: 1,
            available: 1,
            inRepair: 1,
            scrapped: 1
          }
        }
      ]);
      
      return stats;
    } catch (error) {
      throw new Error(`获取设备统计失败: ${error.message}`);
    }
  }
}

module.exports = new EquipmentService();