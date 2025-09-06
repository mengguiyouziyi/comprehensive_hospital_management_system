/**
 * 医院管理系统数据服务
 * 提供完整的模拟数据用于开发和测试
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
    status: '维修中',
    maintenanceCycle: 120,
    lastMaintenanceDate: '2023-11-10',
    nextMaintenanceDate: '2024-03-10',
    usageHours: 1800,
    qrCode: 'EQ002-QR',
    description: '1.5T核磁共振成像系统'
  }
];

// 患者数据
export const mockPatients = [
  {
    id: 'P001',
    name: '张三',
    gender: '男',
    age: 45,
    idCard: '110101197801010011',
    medicalRecordNumber: 'MR20230001',
    bloodType: 'A+',
    phone: '13800138001',
    department: '内科',
    doctor: '李医生',
    status: '住院',
    admissionDate: '2023-12-15',
    dischargeDate: null,
    address: '北京市朝阳区某某街道123号',
    diagnosis: '高血压',
    allergies: '青霉素',
    emergencyContact: '张夫人',
    emergencyPhone: '13900139001',
    creator: 'admin',
    createTime: '2023-12-15 10:00:00'
  },
  {
    id: 'P002',
    name: '李四',
    gender: '女',
    age: 32,
    idCard: '110101199102020022',
    medicalRecordNumber: 'MR20230002',
    bloodType: 'B+',
    phone: '13800138002',
    department: '妇产科',
    doctor: '王医生',
    status: '门诊',
    admissionDate: '2023-12-16',
    dischargeDate: null,
    address: '北京市海淀区某某路456号',
    diagnosis: '常规检查',
    allergies: null,
    emergencyContact: '李先生',
    emergencyPhone: '13900139002',
    creator: 'admin',
    createTime: '2023-12-16 09:30:00'
  }
];

// 医生数据
export const mockDoctors = [
  {
    id: 'D001',
    name: '李医生',
    gender: '男',
    age: 35,
    licenseNumber: 'DOC20230001',
    department: '内科',
    title: '主治医师',
    phone: '13700137001',
    email: 'li.doctor@hospital.com',
    experience: 8,
    consultationFee: 50,
    education: '硕士',
    status: '在职',
    specialty: '心血管疾病',
    consultationHours: '周一至周五 9:00-17:00',
    creator: 'admin',
    createTime: '2023-01-01 00:00:00'
  },
  {
    id: 'D002',
    name: '王医生',
    gender: '女',
    age: 42,
    licenseNumber: 'DOC20230002',
    department: '妇产科',
    title: '副主任医师',
    phone: '13700137002',
    email: 'wang.doctor@hospital.com',
    experience: 15,
    consultationFee: 80,
    education: '博士',
    status: '在职',
    specialty: '妇科疾病',
    consultationHours: '周一至周五 8:00-16:00',
    creator: 'admin',
    createTime: '2023-01-01 00:00:00'
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
    type: '门诊',
    status: '已确认',
    reason: '复查',
    notes: '血压控制情况复查',
    creator: 'admin',
    createTime: '2023-12-19 14:30:00'
  },
  {
    id: 'A002',
    patientId: 'P002',
    patientName: '李四',
    doctorId: 'D002',
    doctorName: '王医生',
    department: '妇产科',
    appointmentDate: '2023-12-21',
    appointmentTime: '10:30',
    type: '门诊',
    status: '待确认',
    reason: '常规检查',
    notes: '孕期常规检查',
    creator: 'admin',
    createTime: '2023-12-19 15:00:00'
  }
];

// 用户数据
export const mockUsers = [
  {
    id: 'U001',
    username: 'admin',
    name: '系统管理员',
    email: 'admin@hospital.com',
    phone: '13600136000',
    role: 'admin',
    department: '信息科',
    status: 'active',
    lastLogin: '2023-12-19 10:00:00',
    avatar: null,
    creator: 'admin',
    createTime: '2023-01-01 00:00:00'
  },
  {
    id: 'U002',
    username: 'doctor001',
    name: '李医生',
    email: 'li.doctor@hospital.com',
    phone: '13700137001',
    role: 'doctor',
    department: '内科',
    status: 'active',
    lastLogin: '2023-12-19 09:00:00',
    avatar: null,
    creator: 'admin',
    createTime: '2023-01-01 00:00:00'
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
    creator: 'admin',
    createTime: '2023-01-01 00:00:00'
  },
  {
    id: 'R002',
    name: '医生',
    code: 'doctor',
    description: '医生角色，可以查看患者信息和设备信息',
    permissions: ['patient:read', 'equipment:read', 'appointment:read', 'appointment:write'],
    status: 'active',
    creator: 'admin',
    createTime: '2023-01-01 00:00:00'
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
  
  // 统计相关
  getStatistics: () => Promise.resolve({ code: 0, data: mockStatistics })
};

export default mockApi;