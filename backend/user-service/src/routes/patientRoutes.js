const express = require('express');
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// 创建患者 - 需要认证
router.post('/', authMiddleware, patientController.createPatient);

// 获取患者列表 - 需要认证
router.get('/', authMiddleware, patientController.getPatients);

// 根据ID获取患者 - 需要认证
router.get('/:id', authMiddleware, patientController.getPatientById);

// 更新患者信息 - 需要认证
router.put('/:id', authMiddleware, patientController.updatePatient);

// 删除患者 - 需要认证
router.delete('/:id', authMiddleware, patientController.deletePatient);

module.exports = router;