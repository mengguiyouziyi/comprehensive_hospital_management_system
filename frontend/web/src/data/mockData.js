/**
 * 医院管理系统 Mock 数据服务
 * 提供完整的模拟数据用于测试和开发
 */

// 生成随机ID
const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`;

// 生成随机日期
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// 生成随机数
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// 设备数据
export const mockEquipment = [
  {
    id: 'EQ001',
    name: 'CT扫描仪',
    model: 'SOMATOM Definition Edge',
    serialNumber: 'CT2023001',
    category: '大型医疗设备',
    department: '放射科',
    location: 'CT检查室1',
    purchaseDate: '2023-01-15',
    warrantyExpiry: '2026-01-15',
    manufacturer: '西门子医疗',
    supplier: '西门子医疗系统有限公司',
    originalValue: 2800000,
    currentValue: 2240000,
    status: '正常',
    maintenanceCycle: 90,
    lastMaintenanceDate: '2023-10-15',
    nextMaintenanceDate: '2024-01-15',
    usageHours: 2400,
    qrCode: 'EQ001-QR',
    description: '64排螺旋CT扫描仪，用于全身各部位检查'
  },
  {
    id: 'EQ002',
    name: '核磁共振设备',
    model: 'MAGNETOM Aera',
    serialNumber: 'MR2023002',
    category: '大型医疗设备',
    department: '放射科',
    location: 'MRI检查室1',
    purchaseDate: '2023-03-20',
    warrantyExpiry: '2027-03-20',
    manufacturer: '西门子医疗',
    supplier: '西门子医疗系统有限公司',
    originalValue: 5800000,
    currentValue: 4640000,
    status: '正常',
    maintenanceCycle: 120,
    lastMaintenanceDate: '2023-11-10',
    nextMaintenanceDate: '2024-03-10',
    usageHours: 1800,
    qrCode: 'EQ002-QR',
    description: '1.5T核磁共振成像系统'
  },
  {
    id: 'EQ003',
    name: '彩色多普勒超声诊断仪',
    model: 'DC-80',
    serialNumber: 'US2023003',
    category: '超声设备',
    department: '超声科',
    location: '超声检查室1',
    purchaseDate: '2023-06-10',
    warrantyExpiry: '2026-06-10',
    manufacturer: '迈瑞医疗',
    supplier: '迈瑞医疗国际有限公司',
    originalValue: 850000,
    currentValue: 680000,
    status: '正常',
    maintenanceCycle: 60,
    lastMaintenanceDate: '2023-12-01',
    nextMaintenanceDate: '2024-02-01',
    usageHours: 1200,
    qrCode: 'EQ003-QR',
    description: '全数字彩色多普勒超声诊断系统'
  },
  {
    id: 'EQ004',
    name: '全自动生化分析仪',
    model: 'Cobas 8000',
    serialNumber: 'LA2023004',
    category: '检验设备',
    department: '检验科',
    location: '生化实验室',
    purchaseDate: '2023-04-05',
    warrantyExpiry: '2026-04-05',
    manufacturer: '罗氏诊断',
    supplier: '罗氏诊断产品有限公司',
    originalValue: 3200000,
    currentValue: 2560000,
    status: '维修中',
    maintenanceCycle: 90,
    lastMaintenanceDate: '2023-10-20',
    nextMaintenanceDate: '2024-01-20',
    usageHours: 2800,
    qrCode: 'EQ004-QR',
    description: '模块化全自动生化免疫分析系统'
  },
  {
    id: 'EQ005',
    name: '呼吸机',
    model: 'Servo-i',
    serialNumber: 'VE2023005',
    category: '急救设备',
    department: 'ICU',
    location: '重症监护室1',
    purchaseDate: '2023-02-28',
    warrantyExpiry: '2026-02-28',
    manufacturer: '迈柯唯',
    supplier: '迈柯唯（上海）医疗设备有限公司',
    originalValue: 380000,
    currentValue: 304000,
    status: '正常',
    maintenanceCycle: 30,
    lastMaintenanceDate: '2023-12-15',
    nextMaintenanceDate: '2024-01-15',
    usageHours: 4500,
    qrCode: 'EQ005-QR',
    description: '重症监护呼吸机'
  }
];

// 患者数据
export const mockPatients = [
  {
    id: 'P001',
    name: '张三',
    gender: '男',
    age: 45,
    idCard: '320123198001010011',
    phone: '13800138001',
    address: '北京市朝阳区建国路88号',
    medicalRecordNumber: 'MR20230001',
    department: '内科',
    doctor: '李医生',
    admissionDate: '2023-12-01',
    dischargeDate: null,
    status: '住院',
    diagnosis: '高血压',
    allergies: '青霉素',
    bloodType: 'A+',
    emergencyContact: '王女士',
    emergencyPhone: '13900139001'
  },
  {
    id: 'P002',
    name: '李四',
    gender: '女',
    age: 32,
    idCard: '320123199105150022',
    phone: '13800138002',
    address: '北京市海淀区中关村大街1号',
    medicalRecordNumber: 'MR20230002',
    department: '妇产科',
    doctor: '王医生',
    admissionDate: '2023-12-05',
    dischargeDate: '2023-12-10',
    status: '出院',
    diagnosis: '正常分娩',
    allergies: '无',
    bloodType: 'O+',
    emergencyContact: '张先生',
    emergencyPhone: '13900139002'
  },
  {
    id: 'P003',
    name: '王五',
    gender: '男',
    age: 67,
    idCard: '320123195612200033',
    phone: '13800138003',
    address: '北京市西城区西单北大街120号',
    medicalRecordNumber: 'MR20230003',
    department: '心内科',
    doctor: '赵医生',
    admissionDate: '2023-11-20',
    dischargeDate: null,
    status: '住院',
    diagnosis: '冠心病',
    allergies: '磺胺类药物',
    bloodType: 'B+',
    emergencyContact: '王小明',
    emergencyPhone: '13900139003'
  }
];

// 医生数据
export const mockDoctors = [
  {
    id: 'D001',
    name: '李医生',
    gender: '男',
    age: 38,
    department: '内科',
    title: '主治医师',
    specialty: '心血管疾病',
    phone: '13800138001',
    email: 'li.doctor@hospital.com',
    licenseNumber: 'DOC20230001',
    status: '在职',
    experience: 12,
    education: '医学博士',
    consultationHours: '周一至周五 9:00-17:00',
    consultationFee: 50
  },
  {
    id: 'D002',
    name: '王医生',
    gender: '女',
    age: 35,
    department: '妇产科',
    title: '副主任医师',
    specialty: '妇科肿瘤',
    phone: '13800138002',
    email: 'wang.doctor@hospital.com',
    licenseNumber: 'DOC20230002',
    status: '在职',
    experience: 10,
    education: '医学硕士',
    consultationHours: '周一至周六 8:00-16:00',
    consultationFee: 80
  },
  {
    id: 'D003',
    name: '赵医生',
    gender: '男',
    age: 45,
    department: '心内科',
    title: '主任医师',
    specialty: '介入心脏病学',
    phone: '13800138003',
    email: 'zhao.doctor@hospital.com',
    licenseNumber: 'DOC20230003',
    status: '在职',
    experience: 20,
    education: '医学博士',
    consultationHours: '周一至周五 8:00-12:00',
    consultationFee: 100
  }
];

// 预约数据
export const mockAppointments = [
  {
    id: 'A001',
    patientId: 'P001',
    patientName: '张三',
    doctorId: 'D001',
    doctorName: '李医生',
    department: '内科',
    appointmentDate: '2023-12-20',
    appointmentTime: '09:00',
    status: '已确认',
    type: '初诊',
    reason: '高血压复查',
    notes: '患者血压控制不稳定，需要调整用药',
    createTime: '2023-12-18 10:30:00',
    updateTime: '2023-12-18 14:20:00'
  },
  {
    id: 'A002',
    patientId: 'P003',
    patientName: '王五',
    doctorId: 'D003',
    doctorName: '赵医生',
    department: '心内科',
    appointmentDate: '2023-12-21',
    appointmentTime: '10:30',
    status: '待确认',
    type: '复诊',
    reason: '冠心病术后复查',
    notes: '术后3个月复查，需要做心电图和血液检查',
    createTime: '2023-12-19 09:15:00',
    updateTime: '2023-12-19 09:15:00'
  },
  {
    id: 'A003',
    patientId: 'P002',
    patientName: '李四',
    doctorId: 'D002',
    doctorName: '王医生',
    department: '妇产科',
    appointmentDate: '2023-12-22',
    appointmentTime: '14:00',
    status: '已完成',
    type: '复查',
    reason: '产后42天复查',
    notes: '产妇恢复良好，无异常',
    createTime: '2023-12-15 16:45:00',
    updateTime: '2023-12-22 15:30:00'
  }
];

// 用户数据
export const mockUsers = [
  {
    id: 'U001',
    username: 'admin',
    name: '系统管理员',
    email: 'admin@hospital.com',
    phone: '13800138000',
    department: '信息科',
    role: 'admin',
    status: 'active',
    lastLogin: '2023-12-19 10:30:00',
    createTime: '2023-01-01 00:00:00',
    avatar: null
  },
  {
    id: 'U002',
    username: 'li.doctor',
    name: '李医生',
    email: 'li.doctor@hospital.com',
    phone: '13800138001',
    department: '内科',
    role: 'doctor',
    status: 'active',
    lastLogin: '2023-12-19 09:15:00',
    createTime: '2023-01-15 00:00:00',
    avatar: null
  },
  {
    id: 'U003',
    username: 'wang.nurse',
    name: '王护士',
    email: 'wang.nurse@hospital.com',
    phone: '13800138002',
    department: '护理部',
    role: 'nurse',
    status: 'active',
    lastLogin: '2023-12-18 16:45:00',
    createTime: '2023-02-01 00:00:00',
    avatar: null
  }
];

// 角色数据
export const mockRoles = [
  {
    id: 'R001',
    name: '系统管理员',
    code: 'admin',
    description: '系统管理员，拥有所有权限',
    permissions: ['*'],
    status: 'active',
    createTime: '2023-01-01 00:00:00',
    userCount: 1
  },
  {
    id: 'R002',
    name: '医生',
    code: 'doctor',
    description: '医生角色，可以查看患者信息和开具处方',
    permissions: [
      'patient:view', 'patient:create', 'patient:update',
      'appointment:view', 'appointment:create', 'appointment:update',
      'equipment:view', 'equipment:maintenance',
      'reports:view'
    ],
    status: 'active',
    createTime: '2023-01-01 00:00:00',
    userCount: 15
  },
  {
    id: 'R003',
    name: '护士',
    code: 'nurse',
    description: '护士角色，可以执行医嘱和护理记录',
    permissions: [
      'patient:view', 'patient:update',
      'appointment:view',
      'equipment:view',
      'reports:view'
    ],
    status: 'active',
    createTime: '2023-01-01 00:00:00',
    userCount: 25
  }
];

// 维护记录数据
export const mockMaintenanceRecords = [
  {
    id: 'M001',
    equipmentId: 'EQ001',
    equipmentName: 'CT扫描仪',
    maintenanceType: '预防性维护',
    priority: '高',
    status: '进行中',
    description: '定期保养和校准',
    technician: '张工程师',
    startDate: '2023-12-15',
    expectedEndDate: '2023-12-16',
    actualEndDate: null,
    cost: 5000,
    partsUsed: ['滤网', '润滑油'],
    result: null,
    notes: '需要更换球管，但配件暂缺',
    creator: 'admin',
    createTime: '2023-12-10 09:00:00'
  },
  {
    id: 'M002',
    equipmentId: 'EQ002',
    equipmentName: '核磁共振设备',
    maintenanceType: '故障维修',
    priority: '中',
    status: '已完成',
    description: '冷却系统故障',
    technician: '李工程师',
    startDate: '2023-11-20',
    expectedEndDate: '2023-11-22',
    actualEndDate: '2023-11-21',
    cost: 15000,
    partsUsed: ['冷却泵', '传感器'],
    result: '成功修复',
    notes: '更换冷却泵后设备运行正常',
    creator: 'admin',
    createTime: '2023-11-19 14:30:00'
  }
];

// 质控检测数据
export const mockQualityControlPlans = [
  {
    id: 'QC001',
    name: 'CT设备日常质控',
    equipmentId: 'EQ001',
    equipmentName: 'CT扫描仪',
    type: '日常质控',
    frequency: '每日',
    status: '进行中',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    responsiblePerson: '张技师',
    description: 'CT设备每日质量控制测试',
    testItems: ['水模测试', 'CT值校准', '图像质量评估'],
    standard: '符合AAPM TG142标准',
    lastExecutionDate: '2023-12-19',
    nextExecutionDate: '2023-12-20',
    result: '合格',
    creator: 'admin',
    createTime: '2023-12-01 00:00:00'
  }
];

// 消毒记录数据
export const mockDisinfectionRecords = [
  {
    id: 'DS001',
    equipmentId: 'EQ001',
    equipmentName: 'CT扫描仪',
    disinfectionType: '日常消毒',
    method: '酒精擦拭',
    disinfectant: '75%医用酒精',
    concentration: '75%',
    operator: '张护士',
    operatorCertification: 'C001',
    startTime: '2023-12-19 08:00:00',
    endTime: '2023-12-19 08:30:00',
    result: '合格',
    validationMethod: '目视检查',
    nextDisinfectionDate: '2023-12-20',
    notes: '设备表面清洁，无残留物',
    creator: 'admin',
    createTime: '2023-12-19 08:35:00'
  }
];

// 使用记录数据
export const mockUsageRecords = [
  {
    id: 'UR001',
    equipmentId: 'EQ001',
    equipmentName: 'CT扫描仪',
    patientId: 'P001',
    patientName: '张三',
    procedure: '头部CT平扫',
    operator: '李医生',
    operatorCertification: 'D001',
    assistant: '张技师',
    startTime: '2023-12-19 09:00:00',
    endTime: '2023-12-19 09:30:00',
    duration: 30,
    usageCount: 150,
    status: '已完成',
    radiationDose: 2.5,
    contrastMedia: '碘海醇',
    contrastMediaVolume: 80,
    incidents: null,
    notes: '检查过程顺利，图像质量良好',
    creator: 'admin',
    createTime: '2023-12-19 10:00:00'
  }
];

// 统计数据
export const mockStatistics = {
  equipment: {
    total: 156,
    normal: 142,
    maintenance: 8,
    repair: 4,
    scrapped: 2,
    utilizationRate: 78.5
  },
  patients: {
    total: 1250,
    inpatient: 320,
    outpatient: 930,
    todayAdmissions: 15,
    todayDischarges: 12
  },
  appointments: {
    total: 450,
    confirmed: 380,
    pending: 45,
    completed: 410,
    cancelled: 25
  },
  maintenance: {
    total: 89,
    completed: 76,
    inProgress: 8,
    pending: 5,
    overdue: 3
  }
};

// API模拟函数
export const mockApi = {
  // 设备相关
  getEquipment: () => Promise.resolve({ code: 0, data: mockEquipment }),
  getEquipmentById: (id) => Promise.resolve({ 
    code: 0, 
    data: mockEquipment.find(eq => eq.id === id) 
  }),
  
  // 患者相关
  getPatients: () => Promise.resolve({ code: 0, data: mockPatients }),
  getPatientById: (id) => Promise.resolve({ 
    code: 0, 
    data: mockPatients.find(p => p.id === id) 
  }),
  
  // 医生相关
  getDoctors: () => Promise.resolve({ code: 0, data: mockDoctors }),
  getDoctorById: (id) => Promise.resolve({ 
    code: 0, 
    data: mockDoctors.find(d => d.id === id) 
  }),
  
  // 预约相关
  getAppointments: () => Promise.resolve({ code: 0, data: mockAppointments }),
  createAppointment: (data) => Promise.resolve({ 
    code: 0, 
    data: { id: generateId(), ...data } 
  }),
  
  // 用户相关
  getUsers: () => Promise.resolve({ code: 0, data: mockUsers }),
  getRoles: () => Promise.resolve({ code: 0, data: mockRoles }),
  
  // 维护相关
  getMaintenanceRecords: () => Promise.resolve({ code: 0, data: mockMaintenanceRecords }),
  
  // 统计相关
  getStatistics: () => Promise.resolve({ code: 0, data: mockStatistics })
};

export default mockApi;