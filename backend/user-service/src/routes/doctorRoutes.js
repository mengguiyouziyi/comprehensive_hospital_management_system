const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

// 公开接口 - 获取医生列表和详情
router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorById);

// 受保护的接口 - 需要认证
router.post('/', doctorController.createDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;