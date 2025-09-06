import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  message,
  Tabs,
  Statistic,
  Row,
  Col,
  Progress,
  Badge,
  Tooltip,
  Typography,
  Divider,
  Radio,
  Checkbox,
  Upload,
  Image,
  Rate,
  Timeline,
  Descriptions,
  Popconfirm,
  Alert,
  Steps,
  List,
  Avatar,
  Comment,
  QRCode,
  notification
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  BellOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  CameraOutlined,
  VideoCameraOutlined,
  AudioOutlined,
  QrcodeOutlined,
  MobileOutlined,
  WarningOutlined,
  SafetyOutlined,
  BarChartOutlined,
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  ReloadOutlined,
  FilterOutlined,
  ExportOutlined,
  ToolOutlined,
  UserSwitchOutlined,
  CarOutlined,
  DollarOutlined,
  MessageOutlined,
  HistoryOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
  StopOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ForwardOutlined,
  FastForwardOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Step } = Steps;

const RepairOrderManagement = () => {
  const [repairOrders, setRepairOrders] = useState([]);
  const [dispatchRecords, setDispatchRecords] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [acceptanceRecords, setAcceptanceRecords] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dispatchModalVisible, setDispatchModalVisible] = useState(false);
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  const [acceptanceModalVisible, setAcceptanceModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [form] = Form.useForm();
  const [dispatchForm] = Form.useForm();
  const [maintenanceForm] = Form.useForm();
  const [acceptanceForm] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [filterForm] = Form.useForm();

  // 设备类型选项
  const equipmentTypes = [
    'CT设备', 'DR设备', '超声设备', 'MRI设备', '监护仪', '麻醉机',
    '呼吸机', '心电图机', '内窥镜设备', '检验设备', '放射治疗设备', '其他'
  ];

  // 科室选项
  const departments = [
    '放射科', '检验科', '超声科', '内科', '外科', '妇产科', '儿科',
    '急诊科', 'ICU', '手术室', '眼科', '耳鼻喉科', '口腔科', '康复科'
  ];

  // 故障分类选项
  const faultCategories = [
    '电源故障', '机械故障', '软件故障', '图像质量问题', '操作问题',
    '配件损坏', '老化问题', '外部因素', '其他'
  ];

  // 维修类型选项
  const repairTypes = [
    '紧急维修', '常规维修', '预防性维修', '升级改造', '故障诊断'
  ];

  // 优先级选项
  const priorities = [
    { value: 'emergency', label: '紧急', color: 'red' },
    { value: 'high', label: '高', color: 'orange' },
    { value: 'medium', label: '中', color: 'blue' },
    { value: 'low', label: '低', color: 'green' }
  ];

  // 工单状态选项
  const orderStatuses = [
    { value: 'pending', label: '待处理', color: 'orange' },
    { value: 'dispatched', label: '已派工', color: 'blue' },
    { value: 'in_progress', label: '维修中', color: 'purple' },
    { value: 'completed', label: '已完成', color: 'green' },
    { value: 'cancelled', label: '已取消', color: 'gray' },
    { value: 'rejected', label: '已驳回', color: 'red' }
  ];

  // 工程师技能等级
  const skillLevels = [
    { value: 'junior', label: '初级工程师' },
    { value: 'intermediate', label: '中级工程师' },
    { value: 'senior', label: '高级工程师' },
    { value: 'expert', label: '专家工程师' }
  ];

  // 初始化数据
  useEffect(() => {
    fetchRepairOrders();
    fetchDispatchRecords();
    fetchMaintenanceRecords();
    fetchAcceptanceRecords();
    fetchEngineers();
    fetchSpareParts();
    fetchStatistics();
  }, []);

  const fetchRepairOrders = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          orderNumber: 'RX202401150001',
          equipmentType: 'CT设备',
          equipmentId: 'CT001',
          equipmentName: 'GE Optima CT660',
          department: '放射科',
          location: '放射科CT室',
          faultDescription: '设备无法正常启动，显示错误代码E101',
          faultCategory: '电源故障',
          repairType: '紧急维修',
          priority: 'emergency',
          status: 'in_progress',
          reporter: '张医生',
          reportTime: '2024-01-15 09:30',
          expectedRepairTime: '4小时',
          actualRepairTime: null,
          estimatedCost: 5000,
          actualCost: null,
          images: ['fault1.jpg', 'fault2.jpg'],
          videos: [],
          audioNotes: '',
          contactPerson: '张医生',
          contactPhone: '13800138001',
          description: '设备在正常使用过程中突然关机，无法重新启动',
          createdAt: '2024-01-15 09:30',
          updatedAt: '2024-01-15 10:00'
        },
        {
          id: 2,
          orderNumber: 'RX202401140002',
          equipmentType: '超声设备',
          equipmentId: 'US001',
          equipmentName: 'Philips HD11',
          department: '超声科',
          location: '超声科检查室1',
          faultDescription: '图像质量下降，出现干扰条纹',
          faultCategory: '图像质量问题',
          repairType: '常规维修',
          priority: 'medium',
          status: 'completed',
          reporter: '李医生',
          reportTime: '2024-01-14 14:20',
          expectedRepairTime: '2天',
          actualRepairTime: '1.5天',
          estimatedCost: 3000,
          actualCost: 2800,
          images: ['image1.jpg'],
          videos: [],
          audioNotes: '',
          contactPerson: '李医生',
          contactPhone: '13800138002',
          description: '设备使用一段时间后图像质量逐渐下降',
          createdAt: '2024-01-14 14:20',
          updatedAt: '2024-01-15 16:30'
        }
      ];
      setRepairOrders(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchDispatchRecords = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          orderId: 1,
          orderNumber: 'RX202401150001',
          engineerId: 1,
          engineerName: '王工程师',
          skillLevel: 'senior',
          dispatchTime: '2024-01-15 10:00',
          expectedArrivalTime: '2024-01-15 10:30',
          actualArrivalTime: '2024-01-15 10:25',
          dispatchMethod: '自动派工',
          dispatchReason: '技能匹配度最高',
          status: 'accepted',
          responseTime: 25,
          notes: '工程师已接受派工，正在赶往现场'
        },
        {
          id: 2,
          orderId: 2,
          orderNumber: 'RX202401140002',
          engineerId: 2,
          engineerName: '李工程师',
          skillLevel: 'intermediate',
          dispatchTime: '2024-01-14 15:00',
          expectedArrivalTime: '2024-01-14 15:30',
          actualArrivalTime: '2024-01-14 15:35',
          dispatchMethod: '手动派工',
          dispatchReason: '指定专业工程师',
          status: 'completed',
          responseTime: 35,
          notes: '维修已完成'
        }
      ];
      setDispatchRecords(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchMaintenanceRecords = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          orderId: 1,
          orderNumber: 'RX202401150001',
          engineerId: 1,
          engineerName: '王工程师',
          startTime: '2024-01-15 10:30',
          endTime: null,
          faultDiagnosis: '电源模块故障，需要更换电源板',
          repairProcess: '检查电源输入、测量电压、确认故障原因',
          usedParts: [
            { partId: 1, partName: '电源板', quantity: 1, unitCost: 2000 }
          ],
          repairResult: '正在维修中',
          customerSatisfaction: null,
          recommendations: '建议定期检查电源模块状态',
          images: ['repair1.jpg'],
          videos: [],
          audioNotes: 'repair1.mp3',
          status: 'in_progress',
          totalCost: 2000
        },
        {
          id: 2,
          orderId: 2,
          orderNumber: 'RX202401140002',
          engineerId: 2,
          engineerName: '李工程师',
          startTime: '2024-01-14 15:35',
          endTime: '2024-01-15 16:30',
          faultDiagnosis: '图像处理板故障',
          repairProcess: '更换图像处理板，校准设备',
          usedParts: [
            { partId: 2, partName: '图像处理板', quantity: 1, unitCost: 2500 }
          ],
          repairResult: '维修完成，设备正常运行',
          customerSatisfaction: 5,
          recommendations: '建议定期进行图像质量检查',
          images: ['repair2.jpg'],
          videos: [],
          audioNotes: '',
          status: 'completed',
          totalCost: 2500
        }
      ];
      setMaintenanceRecords(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchAcceptanceRecords = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          orderId: 2,
          orderNumber: 'RX202401140002',
          acceptor: '张医生',
          acceptorRole: '科室主任',
          acceptanceTime: '2024-01-15 17:00',
          acceptanceResult: 'passed',
          acceptanceScore: 95,
          comments: '维修质量良好，设备运行正常',
          suggestions: '无',
          testResults: [
            { testItem: '电源测试', result: '正常', standard: '电压稳定' },
            { testItem: '功能测试', result: '正常', standard: '各项功能正常' },
            { testItem: '图像质量', result: '良好', standard: '图像清晰' }
          ],
          images: ['acceptance1.jpg'],
          signature: 'signature.png'
        }
      ];
      setAcceptanceRecords(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchEngineers = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: '王工程师',
          skillLevel: 'senior',
          specialties: ['CT设备', 'DR设备'],
          experience: 8,
          contact: '13800138003',
          status: 'available',
          workload: 2,
          completedOrders: 156,
          satisfactionRate: 98.5,
          responseTime: 15
        },
        {
          id: 2,
          name: '李工程师',
          skillLevel: 'intermediate',
          specialties: ['超声设备', '监护仪'],
          experience: 5,
          contact: '13800138004',
          status: 'busy',
          workload: 3,
          completedOrders: 89,
          satisfactionRate: 96.2,
          responseTime: 20
        }
      ];
      setEngineers(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchSpareParts = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          partNumber: 'P001',
          partName: '电源板',
          equipmentType: 'CT设备',
          specification: '220V/50Hz',
          unitCost: 2000,
          stockQuantity: 5,
          minStock: 2,
          location: 'A区-1号架',
          supplier: 'GE医疗',
          lastUpdateTime: '2024-01-10'
        },
        {
          id: 2,
          partNumber: 'P002',
          partName: '图像处理板',
          equipmentType: '超声设备',
          specification: '高清处理板',
          unitCost: 2500,
          stockQuantity: 3,
          minStock: 1,
          location: 'B区-2号架',
          supplier: 'Philips医疗',
          lastUpdateTime: '2024-01-08'
        }
      ];
      setSpareParts(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchStatistics = () => {
    setTimeout(() => {
      const mockData = {
        totalOrders: 245,
        pendingOrders: 12,
        inProgressOrders: 8,
        completedOrders: 215,
        cancelledOrders: 10,
        totalEngineers: 15,
        availableEngineers: 8,
        busyEngineers: 7,
        averageResponseTime: 18.5,
        averageRepairTime: 4.2,
        completionRate: 92.5,
        satisfactionRate: 96.8,
        totalCost: 1250000,
        averageCost: 5120
      };
      setStatistics(mockData);
    }, 500);
  };

  const handleCreateOrder = () => {
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleDispatchOrder = (record) => {
    setCurrentRecord(record);
    dispatchForm.resetFields();
    setDispatchModalVisible(true);
  };

  const handleStartMaintenance = (record) => {
    setCurrentRecord(record);
    maintenanceForm.resetFields();
    setMaintenanceModalVisible(true);
  };

  const handleAcceptance = (record) => {
    setCurrentRecord(record);
    acceptanceForm.resetFields();
    setAcceptanceModalVisible(true);
  };

  const handleViewDetail = (record) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      setLoading(true);
      const newOrder = {
        id: currentRecord ? currentRecord.id : Date.now(),
        orderNumber: currentRecord ? currentRecord.orderNumber : `RX${moment().format('YYYYMMDDHHmmss')}`,
        ...values,
        status: 'pending',
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      };
      
      if (currentRecord) {
        setRepairOrders(repairOrders.map(item => 
          item.id === currentRecord.id ? newOrder : item
        ));
        message.success('更新成功');
      } else {
        setRepairOrders([...repairOrders, newOrder]);
        message.success('创建成功');
        
        // 发送通知
        notification.success({
          message: '维修工单创建成功',
          description: `工单号：${newOrder.orderNumber}`,
          duration: 3
        });
      }
      
      setModalVisible(false);
      setLoading(false);
    });
  };

  const handleDispatchModalOk = () => {
    dispatchForm.validateFields().then(values => {
      setLoading(true);
      const newDispatch = {
        id: Date.now(),
        orderId: currentRecord.id,
        orderNumber: currentRecord.orderNumber,
        ...values,
        dispatchTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        status: 'pending'
      };
      
      setDispatchRecords([...dispatchRecords, newDispatch]);
      
      // 更新工单状态
      setRepairOrders(repairOrders.map(item => 
        item.id === currentRecord.id ? { ...item, status: 'dispatched' } : item
      ));
      
      setDispatchModalVisible(false);
      setLoading(false);
      message.success('派工成功');
    });
  };

  const handleMaintenanceModalOk = () => {
    maintenanceForm.validateFields().then(values => {
      setLoading(true);
      const newMaintenance = {
        id: Date.now(),
        orderId: currentRecord.id,
        orderNumber: currentRecord.orderNumber,
        ...values,
        startTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        status: 'in_progress'
      };
      
      setMaintenanceRecords([...maintenanceRecords, newMaintenance]);
      
      // 更新工单状态
      setRepairOrders(repairOrders.map(item => 
        item.id === currentRecord.id ? { ...item, status: 'in_progress' } : item
      ));
      
      setMaintenanceModalVisible(false);
      setLoading(false);
      message.success('维修记录创建成功');
    });
  };

  const handleAcceptanceModalOk = () => {
    acceptanceForm.validateFields().then(values => {
      setLoading(true);
      const newAcceptance = {
        id: Date.now(),
        orderId: currentRecord.id,
        orderNumber: currentRecord.orderNumber,
        ...values,
        acceptanceTime: moment().format('YYYY-MM-DD HH:mm:ss')
      };
      
      setAcceptanceRecords([...acceptanceRecords, newAcceptance]);
      
      // 更新工单状态
      setRepairOrders(repairOrders.map(item => 
        item.id === currentRecord.id ? { ...item, status: 'completed' } : item
      ));
      
      setAcceptanceModalVisible(false);
      setLoading(false);
      message.success('验收完成');
    });
  };

  const orderColumns = [
    {
      title: '工单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (text) => <Text strong style={{ color: '#1890ff' }}>{text}</Text>
    },
    {
      title: '设备类型',
      dataIndex: 'equipmentType',
      key: 'equipmentType',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: '设备编号',
      dataIndex: 'equipmentId',
      key: 'equipmentId'
    },
    {
      title: '科室',
      dataIndex: 'department',
      key: 'department',
      render: (text) => <Tag color="green">{text}</Tag>
    },
    {
      title: '故障描述',
      dataIndex: 'faultDescription',
      key: 'faultDescription',
      ellipsis: true,
      width: 200
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (text) => {
        const priority = priorities.find(p => p.value === text);
        return <Tag color={priority ? priority.color : 'default'}>{priority ? priority.label : text}</Tag>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const status = orderStatuses.find(s => s.value === text);
        return <Tag color={status ? status.color : 'default'}>{status ? status.label : text}</Tag>;
      }
    },
    {
      title: '报修人',
      dataIndex: 'reporter',
      key: 'reporter'
    },
    {
      title: '报修时间',
      dataIndex: 'reportTime',
      key: 'reportTime'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            详情
          </Button>
          {record.status === 'pending' && (
            <Button
              type="link"
              icon={<UserSwitchOutlined />}
              onClick={() => handleDispatchOrder(record)}
            >
              派工
            </Button>
          )}
          {record.status === 'dispatched' && (
            <Button
              type="link"
              icon={<ToolOutlined />}
              onClick={() => handleStartMaintenance(record)}
            >
              维修
            </Button>
          )}
          {record.status === 'in_progress' && (
            <Button
              type="link"
              icon={<CheckSquareOutlined />}
              onClick={() => handleAcceptance(record)}
            >
              验收
            </Button>
          )}
        </Space>
      )
    }
  ];

  const engineerColumns = [
    {
      title: '工程师姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: '技能等级',
      dataIndex: 'skillLevel',
      key: 'skillLevel',
      render: (text) => {
        const level = skillLevels.find(l => l.value === text);
        return <Tag color={text === 'expert' ? 'red' : text === 'senior' ? 'orange' : 'blue'}>
          {level ? level.label : text}
        </Tag>;
      }
    },
    {
      title: '专业领域',
      dataIndex: 'specialties',
      key: 'specialties',
      render: (specialties) => (
        <div>
          {specialties.map((specialty, index) => (
            <Tag key={index} color="purple" size="small">
              {specialty}
            </Tag>
          ))}
        </div>
      )
    },
    {
      title: '工作经验',
      dataIndex: 'experience',
      key: 'experience',
      render: (years) => <Text>{years}年</Text>
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          available: { color: 'green', text: '空闲' },
          busy: { color: 'red', text: '忙碌' },
          offline: { color: 'gray', text: '离线' }
        };
        const statusInfo = statusMap[status] || { color: 'default', text: status };
        return <Badge status={statusInfo.color} text={statusInfo.text} />;
      }
    },
    {
      title: '当前工作量',
      dataIndex: 'workload',
      key: 'workload',
      render: (workload) => (
        <Progress
          percent={Math.min(workload * 20, 100)}
          size="small"
          status={workload > 3 ? 'exception' : 'normal'}
        />
      )
    },
    {
      title: '完成工单',
      dataIndex: 'completedOrders',
      key: 'completedOrders',
      render: (count) => <Text strong>{count}单</Text>
    },
    {
      title: '满意度',
      dataIndex: 'satisfactionRate',
      key: 'satisfactionRate',
      render: (rate) => (
        <Rate
          disabled
          count={5}
          value={Math.floor(rate / 20)}
          style={{ color: '#faad14' }}
        />
      )
    },
    {
      title: '响应时间',
      dataIndex: 'responseTime',
      key: 'responseTime',
      render: (time) => <Text>{time}分钟</Text>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setCurrentRecord(record);
              // 显示工程师详情
            }}
          >
            详情
          </Button>
          {record.status === 'available' && (
            <Button
              type="link"
              icon={<MessageOutlined />}
              onClick={() => {
                message.info(`联系${record.name}：${record.contact}`);
              }}
            >
              联系
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>
            <ToolOutlined /> 医疗设备维修工单管理
          </Title>
          <Text type="secondary">
            管理医疗设备维修工单的全生命周期，包括工单创建、派工、维修、验收等环节
          </Text>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="总工单数"
                value={statistics.totalOrders || 0}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="待处理工单"
                value={statistics.pendingOrders || 0}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="维修中工单"
                value={statistics.inProgressOrders || 0}
                prefix={<ToolOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="已完成工单"
                value={statistics.completedOrders || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 关键指标 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={4}>
            <Card title="完成率" size="small">
              <Progress
                type="circle"
                percent={statistics.completionRate || 0}
                width={80}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="满意度" size="small">
              <Progress
                type="circle"
                percent={statistics.satisfactionRate || 0}
                width={80}
                format={(percent) => `${percent}%`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="平均响应时间" size="small">
              <Statistic
                value={statistics.averageResponseTime || 0}
                suffix="分钟"
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="平均维修时间" size="small">
              <Statistic
                value={statistics.averageRepairTime || 0}
                suffix="小时"
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="可用工程师" size="small">
              <Statistic
                value={statistics.availableEngineers || 0}
                suffix={`/${statistics.totalEngineers || 0}`}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="总维修成本" size="small">
              <Statistic
                value={statistics.totalCost || 0}
                prefix="¥"
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
        </Row>

        {/* 主标签页 */}
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                <FileTextOutlined />
                维修工单
              </span>
            }
            key="orders"
          >
            <Card
              title="维修工单管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateOrder}
                  >
                    创建工单
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={orderColumns}
                dataSource={repairOrders}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: repairOrders.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                }}
              />
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <UserSwitchOutlined />
                工程师管理
              </span>
            }
            key="engineers"
          >
            <Card
              title="维修工程师管理"
              extra={
                <Space>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={engineerColumns}
                dataSource={engineers}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: engineers.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                }}
              />
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                统计分析
              </span>
            }
            key="statistics"
          >
            <Card title="维修统计分析">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="维修趋势" size="small">
                    <div style={{ padding: '20px 0' }}>
                      <Alert
                        message="本月维修情况"
                        description="完成工单：45单 | 进行中：8单 | 待处理：5单"
                        type="info"
                        showIcon
                      />
                    </div>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="故障类型分布" size="small">
                    <div style={{ padding: '20px 0' }}>
                      <Alert
                        message="常见故障类型"
                        description="电源故障：25% | 机械故障：20% | 软件故障：18% | 图像问题：15%"
                        type="info"
                        showIcon
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </Card>

      {/* 创建工单模态框 */}
      <Modal
        title="创建维修工单"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            priority: 'medium',
            repairType: '常规维修'
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备类型"
                name="equipmentType"
                rules={[{ required: true, message: '请选择设备类型' }]}
              >
                <Select placeholder="请选择设备类型">
                  {equipmentTypes.map(type => (
                    <Option key={type} value={type}>{type}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备编号"
                name="equipmentId"
                rules={[{ required: true, message: '请输入设备编号' }]}
              >
                <Input placeholder="请输入设备编号" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备名称"
                name="equipmentName"
                rules={[{ required: true, message: '请输入设备名称' }]}
              >
                <Input placeholder="请输入设备名称" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="科室"
                name="department"
                rules={[{ required: true, message: '请选择科室' }]}
              >
                <Select placeholder="请选择科室">
                  {departments.map(dept => (
                    <Option key={dept} value={dept}>{dept}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="故障分类"
                name="faultCategory"
                rules={[{ required: true, message: '请选择故障分类' }]}
              >
                <Select placeholder="请选择故障分类">
                  {faultCategories.map(category => (
                    <Option key={category} value={category}>{category}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="维修类型"
                name="repairType"
                rules={[{ required: true, message: '请选择维修类型' }]}
              >
                <Select placeholder="请选择维修类型">
                  {repairTypes.map(type => (
                    <Option key={type} value={type}>{type}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="优先级"
                name="priority"
                rules={[{ required: true, message: '请选择优先级' }]}
              >
                <Select placeholder="请选择优先级">
                  {priorities.map(priority => (
                    <Option key={priority.value} value={priority.value}>
                      {priority.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="报修人"
                name="reporter"
                rules={[{ required: true, message: '请输入报修人' }]}
              >
                <Input placeholder="请输入报修人姓名" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="联系电话"
                name="contactPhone"
                rules={[{ required: true, message: '请输入联系电话' }]}
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="预计维修时间"
                name="expectedRepairTime"
                rules={[{ required: true, message: '请输入预计维修时间' }]}
              >
                <Input placeholder="如：4小时、2天等" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="预计费用"
                name="estimatedCost"
                rules={[{ required: true, message: '请输入预计费用' }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="请输入预计费用"
                  addonBefore="¥"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备位置"
                name="location"
                rules={[{ required: true, message: '请输入设备位置' }]}
              >
                <Input placeholder="请输入设备详细位置" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="故障描述"
            name="faultDescription"
            rules={[{ required: true, message: '请输入故障描述' }]}
          >
            <TextArea
              rows={4}
              placeholder="请详细描述故障现象和情况"
            />
          </Form.Item>
          <Form.Item
            label="补充说明"
            name="description"
          >
            <TextArea
              rows={3}
              placeholder="请输入补充说明信息"
            />
          </Form.Item>
          <Form.Item
            label="故障照片"
            name="images"
          >
            <Upload
              listType="picture-card"
              multiple
              beforeUpload={() => false}
            >
              <div>
                <CameraOutlined />
                <div style={{ marginTop: 8 }}>上传照片</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* 派工模态框 */}
      <Modal
        title="派工"
        open={dispatchModalVisible}
        onOk={handleDispatchModalOk}
        onCancel={() => setDispatchModalVisible(false)}
        width={600}
        destroyOnClose
      >
        <Form
          form={dispatchForm}
          layout="vertical"
        >
          <Alert
            message={`工单号：${currentRecord?.orderNumber}`}
            description={`设备：${currentRecord?.equipmentName} (${currentRecord?.equipmentId})`}
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="选择工程师"
                name="engineerId"
                rules={[{ required: true, message: '请选择工程师' }]}
              >
                <Select placeholder="请选择工程师">
                  {engineers.filter(e => e.status === 'available').map(engineer => (
                    <Option key={engineer.id} value={engineer.id}>
                      {engineer.name} - {engineer.skillLevel}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="派工方式"
                name="dispatchMethod"
                rules={[{ required: true, message: '请选择派工方式' }]}
              >
                <Select placeholder="请选择派工方式">
                  <Option value="auto">自动派工</Option>
                  <Option value="manual">手动派工</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="预计到达时间"
                name="expectedArrivalTime"
                rules={[{ required: true, message: '请选择预计到达时间' }]}
              >
                <DatePicker.TimePicker
                  style={{ width: '100%' }}
                  placeholder="请选择预计到达时间"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="优先级调整"
                name="priorityAdjustment"
              >
                <Select placeholder="是否调整优先级" allowClear>
                  <Option value="upgrade">升级</Option>
                  <Option value="downgrade">降级</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="派工原因"
            name="dispatchReason"
          >
            <TextArea
              rows={3}
              placeholder="请输入派工原因"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 维修记录模态框 */}
      <Modal
        title="维修记录"
        open={maintenanceModalVisible}
        onOk={handleMaintenanceModalOk}
        onCancel={() => setMaintenanceModalVisible(false)}
        width={800}
        destroyOnClose
      >
        <Form
          form={maintenanceForm}
          layout="vertical"
        >
          <Alert
            message={`工单号：${currentRecord?.orderNumber}`}
            description={`设备：${currentRecord?.equipmentName} (${currentRecord?.equipmentId})`}
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Form.Item
            label="故障诊断"
            name="faultDiagnosis"
            rules={[{ required: true, message: '请输入故障诊断' }]}
          >
            <TextArea
              rows={3}
              placeholder="请输入故障诊断结果"
            />
          </Form.Item>
          <Form.Item
            label="维修过程"
            name="repairProcess"
            rules={[{ required: true, message: '请输入维修过程' }]}
          >
            <TextArea
              rows={4}
              placeholder="请详细描述维修过程"
            />
          </Form.Item>
          <Form.Item
            label="使用配件"
            name="usedParts"
          >
            <TextArea
              rows={3}
              placeholder="请输入使用的配件信息"
            />
          </Form.Item>
          <Form.Item
            label="维修结果"
            name="repairResult"
            rules={[{ required: true, message: '请输入维修结果' }]}
          >
            <TextArea
              rows={2}
              placeholder="请输入维修结果"
            />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="维修费用"
                name="totalCost"
                rules={[{ required: true, message: '请输入维修费用' }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="请输入维修费用"
                  addonBefore="¥"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="客户满意度"
                name="customerSatisfaction"
              >
                <Rate style={{ color: '#faad14' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="建议和备注"
            name="recommendations"
          >
            <TextArea
              rows={3}
              placeholder="请输入建议和备注"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 验收模态框 */}
      <Modal
        title="维修验收"
        open={acceptanceModalVisible}
        onOk={handleAcceptanceModalOk}
        onCancel={() => setAcceptanceModalVisible(false)}
        width={600}
        destroyOnClose
      >
        <Form
          form={acceptanceForm}
          layout="vertical"
          initialValues={{
            acceptanceResult: 'passed'
          }}
        >
          <Alert
            message={`工单号：${currentRecord?.orderNumber}`}
            description={`设备：${currentRecord?.equipmentName} (${currentRecord?.equipmentId})`}
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="验收人"
                name="acceptor"
                rules={[{ required: true, message: '请输入验收人' }]}
              >
                <Input placeholder="请输入验收人姓名" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="验收人角色"
                name="acceptorRole"
                rules={[{ required: true, message: '请输入验收人角色' }]}
              >
                <Input placeholder="如：科室主任、设备管理员等" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="验收结果"
            name="acceptanceResult"
            rules={[{ required: true, message: '请选择验收结果' }]}
          >
            <Radio.Group>
              <Radio value="passed">通过</Radio>
              <Radio value="failed">不通过</Radio>
              <Radio value="conditional">有条件通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="验收评分"
            name="acceptanceScore"
            rules={[{ required: true, message: '请输入验收评分' }]}
          >
            <InputNumber
              min={0}
              max={100}
              style={{ width: '100%' }}
              placeholder="请输入评分(0-100)"
            />
          </Form.Item>
          <Form.Item
            label="验收意见"
            name="comments"
            rules={[{ required: true, message: '请输入验收意见' }]}
          >
            <TextArea
              rows={3}
              placeholder="请输入验收意见"
            />
          </Form.Item>
          <Form.Item
            label="建议"
            name="suggestions"
          >
            <TextArea
              rows={2}
              placeholder="请输入建议"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 工单详情模态框 */}
      <Modal
        title="工单详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        width={1000}
        footer={[
          <Button key="close" onClick={() => setDetailVisible(false)}>
            关闭
          </Button>
        ]}
      >
        {currentRecord && (
          <div>
            <Card size="small" style={{ marginBottom: 16 }}>
              <Descriptions title="基本信息" column={3}>
                <Descriptions.Item label="工单号">
                  <Text strong style={{ color: '#1890ff' }}>
                    {currentRecord.orderNumber}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="设备类型">
                  <Tag color="blue">{currentRecord.equipmentType}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="设备编号">
                  {currentRecord.equipmentId}
                </Descriptions.Item>
                <Descriptions.Item label="设备名称">
                  {currentRecord.equipmentName}
                </Descriptions.Item>
                <Descriptions.Item label="科室">
                  <Tag color="green">{currentRecord.department}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="位置">
                  {currentRecord.location}
                </Descriptions.Item>
                <Descriptions.Item label="优先级">
                  <Tag color={priorities.find(p => p.value === currentRecord.priority)?.color || 'default'}>
                    {priorities.find(p => p.value === currentRecord.priority)?.label || currentRecord.priority}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="状态">
                  <Tag color={orderStatuses.find(s => s.value === currentRecord.status)?.color || 'default'}>
                    {orderStatuses.find(s => s.value === currentRecord.status)?.label || currentRecord.status}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="报修时间">
                  {currentRecord.reportTime}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card size="small" style={{ marginBottom: 16 }}>
              <Descriptions title="故障信息" column={2}>
                <Descriptions.Item label="故障分类">
                  {currentRecord.faultCategory}
                </Descriptions.Item>
                <Descriptions.Item label="维修类型">
                  {currentRecord.repairType}
                </Descriptions.Item>
                <Descriptions.Item label="故障描述" span={2}>
                  {currentRecord.faultDescription}
                </Descriptions.Item>
                <Descriptions.Item label="补充说明" span={2}>
                  {currentRecord.description}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card size="small" style={{ marginBottom: 16 }}>
              <Descriptions title="联系人信息" column={2}>
                <Descriptions.Item label="报修人">
                  {currentRecord.reporter}
                </Descriptions.Item>
                <Descriptions.Item label="联系电话">
                  {currentRecord.contactPhone}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card size="small" style={{ marginBottom: 16 }}>
              <Descriptions title="时间和费用" column={3}>
                <Descriptions.Item label="预计维修时间">
                  {currentRecord.expectedRepairTime}
                </Descriptions.Item>
                <Descriptions.Item label="实际维修时间">
                  {currentRecord.actualRepairTime || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="预计费用">
                  ¥{currentRecord.estimatedCost}
                </Descriptions.Item>
                <Descriptions.Item label="实际费用">
                  {currentRecord.actualCost ? `¥${currentRecord.actualCost}` : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="创建时间">
                  {currentRecord.createdAt}
                </Descriptions.Item>
                <Descriptions.Item label="更新时间">
                  {currentRecord.updatedAt}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* 维修进度 */}
            <Card size="small" title="维修进度">
              <Steps
                current={
                  currentRecord.status === 'pending' ? 0 :
                  currentRecord.status === 'dispatched' ? 1 :
                  currentRecord.status === 'in_progress' ? 2 :
                  currentRecord.status === 'completed' ? 3 : 0
                }
                size="small"
              >
                <Step title="工单创建" description={currentRecord.createdAt} />
                <Step title="派工处理" description="工程师已分配" />
                <Step title="维修进行" description="正在维修中" />
                <Step title="验收完成" description="维修完成" />
              </Steps>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RepairOrderManagement;