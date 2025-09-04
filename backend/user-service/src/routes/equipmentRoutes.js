const express = require('express');
const equipmentController = require('../controllers/equipmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// 创建新设备
router.post('/', authMiddleware, equipmentController.createEquipment);

// 获取设备列表
router.get('/', authMiddleware, equipmentController.getAllEquipment);

// 获取设备详情
router.get('/:id', authMiddleware, equipmentController.getEquipmentById);

// 更新设备信息
router.put('/:id', authMiddleware, equipmentController.updateEquipment);

// 删除设备
router.delete('/:id', authMiddleware, equipmentController.deleteEquipment);

// 添加维护记录
router.post('/:id/maintenance', authMiddleware, equipmentController.addMaintenanceRecord);

// 添加使用记录
router.post('/:id/usage', authMiddleware, equipmentController.addUsageRecord);

// 获取设备统计信息
router.get('/stats/department', authMiddleware, equipmentController.getEquipmentStats);

module.exports = router;