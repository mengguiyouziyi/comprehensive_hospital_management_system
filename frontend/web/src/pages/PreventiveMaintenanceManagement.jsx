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
  Calendar,
  Switch,
  Slider,
  Spin,
  Empty,
  Collapse,
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
  FastForwardOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  AlertOutlined,
  SyncOutlined,
  FileProtectOutlined,
  DatabaseOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  BugOutlined,
  BuildOutlined,
  ApiOutlined,
  BranchesOutlined,
  ClusterOutlined,
  DeploymentUnitOutlined,
  HddOutlined,
  CloudUploadOutlined,
  DownloadOutlined,
  InboxOutlined,
  MailOutlined,
  PhoneOutlined,
  WechatOutlined,
  AlertFilled,
  CheckCircleFilled,
  ClockCircleFilled
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Step } = Steps;
const { Panel } = Collapse;

const PreventiveMaintenanceManagement = () => {
  const [pmPlans, setPmPlans] = useState([]);
  const [pmReminders, setPmReminders] = useState([]);
  const [pmExecutions, setPmExecutions] = useState([]);
  const [pmTemplates, setPmTemplates] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
  const [executionModalVisible, setExecutionModalVisible] = useState(false);
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [form] = Form.useForm();
  const [reminderForm] = Form.useForm();
  const [executionForm] = Form.useForm();
  const [templateForm] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('plans');
  const [filterForm] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);

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

  // 维护频率选项
  const frequencies = [
    { value: 'daily', label: '每日', days: 1 },
    { value: 'weekly', label: '每周', days: 7 },
    { value: 'bi_weekly', label: '双周', days: 14 },
    { value: 'monthly', label: '每月', days: 30 },
    { value: 'quarterly', label: '每季度', days: 90 },
    { value: 'semi_annual', label: '每半年', days: 180 },
    { value: 'yearly', label: '每年', days: 365 }
  ];

  // 触发条件选项
  const triggers = [
    { value: 'time_based', label: '基于时间' },
    { value: 'usage_based', label: '基于使用时长' },
    { value: 'event_based', label: '基于事件' },
    { value: 'condition_based', label: '基于条件' }
  ];

  // 优先级选项
  const priorities = [
    { value: 'critical', label: '关键', color: 'red' },
    { value: 'high', label: '高', color: 'orange' },
    { value: 'medium', label: '中', color: 'blue' },
    { value: 'low', label: '低', color: 'green' }
  ];

  // 计划状态选项
  const planStatuses = [
    { value: 'active', label: '激活', color: 'green' },
    { value: 'inactive', label: '停用', color: 'red' },
    { value: 'paused', label: '暂停', color: 'orange' },
    { value: 'draft', label: '草稿', color: 'gray' }
  ];

  // 执行状态选项
  const executionStatuses = [
    { value: 'pending', label: '待执行', color: 'orange' },
    { value: 'in_progress', label: '执行中', color: 'blue' },
    { value: 'completed', label: '已完成', color: 'green' },
    { value: 'overdue', label: '已逾期', color: 'red' },
    { value: 'cancelled', label: '已取消', color: 'gray' }
  ];

  // 提醒方式选项
  const reminderMethods = [
    { value: 'email', label: '邮件', icon: <MailOutlined /> },
    { value: 'sms', label: '短信', icon: <PhoneOutlined /> },
    { value: 'wechat', label: '微信', icon: <WechatOutlined /> },
    { value: 'app', label: 'APP推送', icon: <MobileOutlined /> },
    { value: 'system', label: '系统通知', icon: <BellOutlined /> }
  ];

  // 初始化数据
  useEffect(() => {
    fetchPmPlans();
    fetchPmReminders();
    fetchPmExecutions();
    fetchPmTemplates();
    fetchEquipment();
    fetchWorkOrders();
    fetchStatistics();
  }, []);

  const fetchPmPlans = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          planName: 'CT设备定期维护',
          equipmentType: 'CT设备',
          equipmentId: 'CT001',
          equipmentName: 'GE Optima CT660',
          department: '放射科',
          frequency: 'monthly',
          trigger: 'time_based',
          priority: 'high',
          status: 'active',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          lastExecutionDate: '2024-01-01',
          nextExecutionDate: '2024-02-01',
          templateId: 1,
          responsiblePerson: '张工程师',
          estimatedDuration: 120,
          actualDuration: 115,
          cost: 1500,
          description: 'CT设备的月度预防性维护计划',
          createdby: '系统管理员',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        },
        {
          id: 2,
          planName: '超声设备季度维护',
          equipmentType: '超声设备',
          equipmentId: 'US001',
          equipmentName: 'Philips HD11',
          department: '超声科',
          frequency: 'quarterly',
          trigger: 'time_based',
          priority: 'medium',
          status: 'active',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          lastExecutionDate: '2023-12-15',
          nextExecutionDate: '2024-03-15',
          templateId: 2,
          responsiblePerson: '李工程师',
          estimatedDuration: 180,
          actualDuration: null,
          cost: 2000,
          description: '超声设备的季度预防性维护计划',
          createdby: '系统管理员',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        }
      ];
      setPmPlans(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchPmReminders = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          planId: 1,
          planName: 'CT设备定期维护',
          equipmentName: 'GE Optima CT660',
          reminderType: 'advance',
          advanceDays: 3,
          reminderMethod: ['email', 'sms'],
          recipients: ['张工程师', '放射科主任'],
          status: 'active',
          lastSentDate: '2024-01-28',
          nextSendDate: '2024-01-29',
          message: '提醒：CT设备月度维护将于3天后进行，请做好准备',
          createdAt: '2024-01-01'
        },
        {
          id: 2,
          planId: 2,
          planName: '超声设备季度维护',
          equipmentName: 'Philips HD11',
          reminderType: 'advance',
          advanceDays: 7,
          reminderMethod: ['email', 'wechat'],
          recipients: ['李工程师', '超声科主任'],
          status: 'active',
          lastSentDate: '2024-03-08',
          nextSendDate: '2024-03-09',
          message: '提醒：超声设备季度维护将于7天后进行，请做好准备',
          createdAt: '2024-01-01'
        }
      ];
      setPmReminders(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchPmExecutions = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          planId: 1,
          planName: 'CT设备定期维护',
          equipmentName: 'GE Optima CT660',
          executionDate: '2024-01-01',
          executor: '张工程师',
          status: 'completed',
          result: 'normal',
          score: 95,
          findings: '设备运行正常，各项指标符合标准',
          issues: [],
          usedParts: [],
          startTime: '2024-01-01 09:00',
          endTime: '2024-01-01 11:00',
          duration: 120,
          cost: 1500,
          notes: '维护完成，设备运行正常',
          images: ['maintenance1.jpg'],
          nextMaintenanceDate: '2024-02-01'
        },
        {
          id: 2,
          planId: 2,
          planName: '超声设备季度维护',
          equipmentName: 'Philips HD11',
          executionDate: '2023-12-15',
          executor: '李工程师',
          status: 'completed',
          result: 'normal',
          score: 92,
          findings: '设备运行正常，建议更换探头',
          issues: ['探头老化'],
          usedParts: [],
          startTime: '2023-12-15 14:00',
          endTime: '2023-12-15 16:30',
          duration: 150,
          cost: 1800,
          notes: '维护完成，建议在下个季度更换探头',
          images: ['maintenance2.jpg'],
          nextMaintenanceDate: '2024-03-15'
        }
      ];
      setPmExecutions(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchPmTemplates = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          templateName: 'CT设备维护模板',
          equipmentType: 'CT设备',
          version: '1.0',
          status: 'active',
          items: [
            { id: 1, name: '外观检查', type: 'visual', standard: '无破损、无变形', required: true },
            { id: 2, name: '电源检查', type: 'test', standard: '电压稳定', required: true },
            { id: 3, name: '冷却系统检查', type: 'test', standard: '冷却液充足', required: true },
            { id: 4, name: '图像质量测试', type: 'measurement', standard: '图像清晰', required: true },
            { id: 5, name: '安全检查', type: 'test', standard: '安全装置正常', required: true }
          ],
          estimatedDuration: 120,
          requiredSkills: ['CT设备维护', '电气安全'],
          description: 'CT设备标准预防性维护模板',
          createdBy: '系统管理员',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        },
        {
          id: 2,
          templateName: '超声设备维护模板',
          equipmentType: '超声设备',
          version: '1.0',
          status: 'active',
          items: [
            { id: 1, name: '探头检查', type: 'visual', standard: '无损伤', required: true },
            { id: 2, name: '图像质量测试', type: 'test', standard: '图像清晰', required: true },
            { id: 3, name: '功能测试', type: 'test', standard: '各项功能正常', required: true },
            { id: 4, name: '连接线检查', type: 'visual', standard: '连接牢固', required: true }
          ],
          estimatedDuration: 180,
          requiredSkills: ['超声设备维护', '图像处理'],
          description: '超声设备标准预防性维护模板',
          createdBy: '系统管理员',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        }
      ];
      setPmTemplates(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchEquipment = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          equipmentId: 'CT001',
          equipmentName: 'GE Optima CT660',
          equipmentType: 'CT设备',
          department: '放射科',
          location: '放射科CT室',
          purchaseDate: '2020-01-15',
          warrantyPeriod: 36,
          lastMaintenanceDate: '2024-01-01',
          nextMaintenanceDate: '2024-02-01',
          totalRuntime: 8760,
          runtimeSinceLastMaintenance: 720,
          status: 'normal',
          maintenancePlanId: 1
        },
        {
          id: 2,
          equipmentId: 'US001',
          equipmentName: 'Philips HD11',
          equipmentType: '超声设备',
          department: '超声科',
          location: '超声科检查室1',
          purchaseDate: '2019-06-20',
          warrantyPeriod: 24,
          lastMaintenanceDate: '2023-12-15',
          nextMaintenanceDate: '2024-03-15',
          totalRuntime: 6570,
          runtimeSinceLastMaintenance: 450,
          status: 'normal',
          maintenancePlanId: 2
        }
      ];
      setEquipment(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchWorkOrders = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          planId: 1,
          orderNumber: 'WO20240201001',
          equipmentName: 'GE Optima CT660',
          scheduledDate: '2024-02-01',
          assignedTo: '张工程师',
          status: 'pending',
          priority: 'high',
          estimatedDuration: 120,
          estimatedCost: 1500,
          description: 'CT设备月度预防性维护'
        },
        {
          id: 2,
          planId: 2,
          orderNumber: 'WO20240315001',
          equipmentName: 'Philips HD11',
          scheduledDate: '2024-03-15',
          assignedTo: '李工程师',
          status: 'pending',
          priority: 'medium',
          estimatedDuration: 180,
          estimatedCost: 2000,
          description: '超声设备季度预防性维护'
        }
      ];
      setWorkOrders(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchStatistics = () => {
    setTimeout(() => {
      const mockData = {
        totalPlans: 45,
        activePlans: 38,
        completedExecutions: 156,
        pendingExecutions: 12,
        overdueExecutions: 3,
        totalEquipment: 120,
        equipmentWithPm: 115,
        pmCoverage: 95.8,
        completionRate: 94.2,
        onTimeCompletionRate: 91.5,
        averageDuration: 135,
        totalCost: 234000,
        averageCost: 1500,
        nextWeekMaintenances: 8,
        nextMonthMaintenances: 25,
        urgentMaintenances: 2
      };
      setStatistics(mockData);
    }, 500);
  };

  const handleCreatePlan = () => {
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleCreateReminder = () => {
    setCurrentRecord(null);
    reminderForm.resetFields();
    setReminderModalVisible(true);
  };

  const handleCreateExecution = () => {
    setCurrentRecord(null);
    executionForm.resetFields();
    setExecutionModalVisible(true);
  };

  const handleCreateTemplate = () => {
    setCurrentRecord(null);
    templateForm.resetFields();
    setTemplateModalVisible(true);
  };

  const handleViewDetail = (record) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      setLoading(true);
      const newPlan = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setPmPlans(pmPlans.map(item => 
          item.id === currentRecord.id ? newPlan : item
        ));
        message.success('更新成功');
      } else {
        setPmPlans([...pmPlans, newPlan]);
        message.success('创建成功');
      }
      
      setModalVisible(false);
      setLoading(false);
    });
  };

  const handleReminderModalOk = () => {
    reminderForm.validateFields().then(values => {
      setLoading(true);
      const newReminder = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setPmReminders(pmReminders.map(item => 
          item.id === currentRecord.id ? newReminder : item
        ));
        message.success('更新成功');
      } else {
        setPmReminders([...pmReminders, newReminder]);
        message.success('创建成功');
      }
      
      setReminderModalVisible(false);
      setLoading(false);
    });
  };

  const handleExecutionModalOk = () => {
    executionForm.validateFields().then(values => {
      setLoading(true);
      const newExecution = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setPmExecutions(pmExecutions.map(item => 
          item.id === currentRecord.id ? newExecution : item
        ));
        message.success('更新成功');
      } else {
        setPmExecutions([...pmExecutions, newExecution]);
        message.success('创建成功');
      }
      
      setExecutionModalVisible(false);
      setLoading(false);
    });
  };

  const handleTemplateModalOk = () => {
    templateForm.validateFields().then(values => {
      setLoading(true);
      const newTemplate = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setPmTemplates(pmTemplates.map(item => 
          item.id === currentRecord.id ? newTemplate : item
        ));
        message.success('更新成功');
      } else {
        setPmTemplates([...pmTemplates, newTemplate]);
        message.success('创建成功');
      }
      
      setTemplateModalVisible(false);
      setLoading(false);
    });
  };

  const planColumns = [
    {
      title: '计划名称',
      dataIndex: 'planName',
      key: 'planName',
      render: (text) => <Text strong>{text}</Text>
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
      title: '维护频率',
      dataIndex: 'frequency',
      key: 'frequency',
      render: (text) => {
        const frequency = frequencies.find(f => f.value === text);
        return <Tag color="purple">{frequency ? frequency.label : text}</Tag>;
      }
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
        const status = planStatuses.find(s => s.value === text);
        return <Tag color={status ? status.color : 'default'}>{status ? status.label : text}</Tag>;
      }
    },
    {
      title: '下次维护',
      dataIndex: 'nextExecutionDate',
      key: 'nextExecutionDate',
      render: (date) => {
        const daysUntil = moment(date).diff(moment(), 'days');
        let color = 'default';
        if (daysUntil <= 3) color = 'red';
        else if (daysUntil <= 7) color = 'orange';
        else if (daysUntil <= 14) color = 'blue';
        
        return (
          <div>
            <Text>{date}</Text>
            <br />
            <Tag color={color}>{daysUntil >= 0 ? `${daysUntil}天后` : '已逾期'}</Tag>
          </div>
        );
      }
    },
    {
      title: '负责人',
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson'
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
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentRecord(record);
              form.setFieldsValue(record);
              setModalVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            icon={<CalendarOutlined />}
            onClick={() => {
              setCurrentRecord(record);
              setCalendarVisible(true);
            }}
          >
            日历
          </Button>
        </Space>
      )
    }
  ];

  const getListData = (value) => {
    const listData = [];
    const dateStr = value.format('YYYY-MM-DD');
    
    pmPlans.forEach(plan => {
      if (plan.nextExecutionDate === dateStr) {
        listData.push({
          type: 'warning',
          content: `${plan.planName} - ${plan.equipmentName}`
        });
      }
    });
    
    pmExecutions.forEach(execution => {
      if (execution.executionDate === dateStr) {
        listData.push({
          type: 'success',
          content: `${execution.planName} - 已完成`
        });
      }
    });
    
    return listData;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listData.map((item, index) => (
          <li key={index} style={{ marginBottom: 2 }}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>
            <ScheduleOutlined /> 预防性维护管理
          </Title>
          <Text type="secondary">
            管理医疗设备的预防性维护计划、提醒、执行和统计分析
          </Text>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="维护计划总数"
                value={statistics.totalPlans || 0}
                prefix={<FileProtectOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="本月待执行"
                value={statistics.nextMonthMaintenances || 0}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="完成率"
                value={statistics.completionRate || 0}
                suffix="%"
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="设备覆盖率"
                value={statistics.pmCoverage || 0}
                suffix="%"
                prefix={<DatabaseOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 关键指标 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={4}>
            <Card title="准时完成率" size="small">
              <Progress
                type="circle"
                percent={statistics.onTimeCompletionRate || 0}
                width={80}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="平均耗时" size="small">
              <Statistic
                value={statistics.averageDuration || 0}
                suffix="分钟"
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="平均成本" size="small">
              <Statistic
                value={statistics.averageCost || 0}
                prefix="¥"
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="紧急维护" size="small">
              <Statistic
                value={statistics.urgentMaintenances || 0}
                valueStyle={{ fontSize: 20, color: '#f5222d' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="下周维护" size="small">
              <Statistic
                value={statistics.nextWeekMaintenances || 0}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="逾期维护" size="small">
              <Statistic
                value={statistics.overdueExecutions || 0}
                valueStyle={{ fontSize: 20, color: '#faad14' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 主标签页 */}
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                <FileProtectOutlined />
                维护计划
              </span>
            }
            key="plans"
          >
            <Card
              title="预防性维护计划"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreatePlan}
                  >
                    创建计划
                  </Button>
                  <Button icon={<CalendarOutlined />} onClick={() => setCalendarVisible(true)}>
                    维护日历
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={planColumns}
                dataSource={pmPlans}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: pmPlans.length,
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
                <BellOutlined />
                维护提醒
              </span>
            }
            key="reminders"
          >
            <Card
              title="维护提醒管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateReminder}
                  >
                    创建提醒
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={[
                  {
                    title: '计划名称',
                    dataIndex: 'planName',
                    key: 'planName',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '设备名称',
                    dataIndex: 'equipmentName',
                    key: 'equipmentName'
                  },
                  {
                    title: '提醒类型',
                    dataIndex: 'reminderType',
                    key: 'reminderType',
                    render: (text) => <Tag color="blue">{text === 'advance' ? '提前提醒' : text}</Tag>
                  },
                  {
                    title: '提前天数',
                    dataIndex: 'advanceDays',
                    key: 'advanceDays',
                    render: (days) => <Text>{days}天</Text>
                  },
                  {
                    title: '提醒方式',
                    dataIndex: 'reminderMethod',
                    key: 'reminderMethod',
                    render: (methods) => (
                      <div>
                        {methods.map((method, index) => {
                          const reminderMethod = reminderMethods.find(m => m.value === method);
                          return (
                            <Tag key={index} color="purple" style={{ marginBottom: 2 }}>
                              {reminderMethod ? reminderMethod.label : method}
                            </Tag>
                          );
                        })}
                      </div>
                    )
                  },
                  {
                    title: '下次发送',
                    dataIndex: 'nextSendDate',
                    key: 'nextSendDate'
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => (
                      <Badge status={status === 'active' ? 'processing' : 'default'} text={status === 'active' ? '激活' : '停用'} />
                    )
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
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => {
                            setCurrentRecord(record);
                            reminderForm.setFieldsValue(record);
                            setReminderModalVisible(true);
                          }}
                        >
                          编辑
                        </Button>
                      </Space>
                    )
                  }
                ]}
                dataSource={pmReminders}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: pmReminders.length,
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
                <ToolOutlined />
                维护执行
              </span>
            }
            key="executions"
          >
            <Card
              title="维护执行记录"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateExecution}
                  >
                    执行维护
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={[
                  {
                    title: '计划名称',
                    dataIndex: 'planName',
                    key: 'planName',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '设备名称',
                    dataIndex: 'equipmentName',
                    key: 'equipmentName'
                  },
                  {
                    title: '执行日期',
                    dataIndex: 'executionDate',
                    key: 'executionDate'
                  },
                  {
                    title: '执行人',
                    dataIndex: 'executor',
                    key: 'executor'
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => {
                      const status = executionStatuses.find(s => s.value === text);
                      return <Tag color={status ? status.color : 'default'}>{status ? status.label : text}</Tag>;
                    }
                  },
                  {
                    title: '结果',
                    dataIndex: 'result',
                    key: 'result',
                    render: (text) => {
                      const resultMap = {
                        normal: { color: 'green', text: '正常' },
                        abnormal: { color: 'red', text: '异常' },
                        warning: { color: 'orange', text: '警告' }
                      };
                      const result = resultMap[text] || { color: 'default', text: text };
                      return <Tag color={result.color}>{result.text}</Tag>;
                    }
                  },
                  {
                    title: '评分',
                    dataIndex: 'score',
                    key: 'score',
                    render: (score) => (
                      <Rate
                        disabled
                        count={5}
                        value={Math.floor(score / 20)}
                        style={{ color: score >= 80 ? '#52c41a' : score >= 60 ? '#faad14' : '#f5222d' }}
                      />
                    )
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
                      </Space>
                    )
                  }
                ]}
                dataSource={pmExecutions}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: pmExecutions.length,
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
                <FileTextOutlined />
                维护模板
              </span>
            }
            key="templates"
          >
            <Card
              title="维护模板管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateTemplate}
                  >
                    创建模板
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={[
                  {
                    title: '模板名称',
                    dataIndex: 'templateName',
                    key: 'templateName',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '设备类型',
                    dataIndex: 'equipmentType',
                    key: 'equipmentType',
                    render: (text) => <Tag color="blue">{text}</Tag>
                  },
                  {
                    title: '版本',
                    dataIndex: 'version',
                    key: 'version'
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => {
                      const status = planStatuses.find(s => s.value === text);
                      return <Tag color={status ? status.color : 'default'}>{status ? status.label : text}</Tag>;
                    }
                  },
                  {
                    title: '检查项数量',
                    dataIndex: 'items',
                    key: 'items',
                    render: (items) => <Badge count={items.length} showZero color="blue" />
                  },
                  {
                    title: '预计耗时',
                    dataIndex: 'estimatedDuration',
                    key: 'estimatedDuration',
                    render: (minutes) => <Text>{minutes}分钟</Text>
                  },
                  {
                    title: '创建者',
                    dataIndex: 'createdBy',
                    key: 'createdBy'
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
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => {
                            setCurrentRecord(record);
                            templateForm.setFieldsValue(record);
                            setTemplateModalVisible(true);
                          }}
                        >
                          编辑
                        </Button>
                      </Space>
                    )
                  }
                ]}
                dataSource={pmTemplates}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: pmTemplates.length,
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
            <Card title="预防性维护统计分析">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="维护执行统计" size="small">
                    <Timeline>
                      <Timeline.Item color="green">
                        <Text strong>本月完成维护</Text>
                        <br />
                        <Text type="secondary">15台设备，平均评分92分</Text>
                      </Timeline.Item>
                      <Timeline.Item color="blue">
                        <Text strong>本月计划维护</Text>
                        <br />
                        <Text type="secondary">18台设备，完成率83.3%</Text>
                      </Timeline.Item>
                      <Timeline.Item color="orange">
                        <Text strong>待执行维护</Text>
                        <br />
                        <Text type="secondary">8台设备，其中2台已逾期</Text>
                      </Timeline.Item>
                    </Timeline>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="维护成本分析" size="small">
                    <div style={{ padding: '20px 0' }}>
                      <Alert
                        message="维护成本统计"
                        description="本月维护成本：¥22,500 | 平均成本：¥1,500 | 同比下降5%"
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

      {/* 创建计划模态框 */}
      <Modal
        title={currentRecord ? '编辑维护计划' : '创建维护计划'}
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
            status: 'active',
            priority: 'medium',
            frequency: 'monthly',
            trigger: 'time_based'
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="计划名称"
                name="planName"
                rules={[{ required: true, message: '请输入计划名称' }]}
              >
                <Input placeholder="请输入计划名称" />
              </Form.Item>
            </Col>
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
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备编号"
                name="equipmentId"
                rules={[{ required: true, message: '请输入设备编号' }]}
              >
                <Input placeholder="请输入设备编号" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备名称"
                name="equipmentName"
                rules={[{ required: true, message: '请输入设备名称' }]}
              >
                <Input placeholder="请输入设备名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                label="维护频率"
                name="frequency"
                rules={[{ required: true, message: '请选择维护频率' }]}
              >
                <Select placeholder="请选择维护频率">
                  {frequencies.map(freq => (
                    <Option key={freq.value} value={freq.value}>{freq.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="触发条件"
                name="trigger"
                rules={[{ required: true, message: '请选择触发条件' }]}
              >
                <Select placeholder="请选择触发条件">
                  {triggers.map(trigger => (
                    <Option key={trigger.value} value={trigger.value}>{trigger.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
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
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="开始日期"
                name="startDate"
                rules={[{ required: true, message: '请选择开始日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="结束日期"
                name="endDate"
                rules={[{ required: true, message: '请选择结束日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                label="预计耗时(分钟)"
                name="estimatedDuration"
                rules={[{ required: true, message: '请输入预计耗时' }]}
              >
                <InputNumber
                  min={1}
                  style={{ width: '100%' }}
                  placeholder="请输入预计耗时"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="预计费用"
                name="cost"
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
            <Col xs={24} md={8}>
              <Form.Item
                label="负责人"
                name="responsiblePerson"
                rules={[{ required: true, message: '请输入负责人' }]}
              >
                <Input placeholder="请输入负责人" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="维护模板"
            name="templateId"
          >
            <Select placeholder="请选择维护模板" allowClear>
              {pmTemplates.map(template => (
                <Option key={template.id} value={template.id}>
                  {template.templateName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
          >
            <TextArea
              rows={4}
              placeholder="请输入计划描述"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 创建提醒模态框 */}
      <Modal
        title={currentRecord ? '编辑维护提醒' : '创建维护提醒'}
        open={reminderModalVisible}
        onOk={handleReminderModalOk}
        onCancel={() => setReminderModalVisible(false)}
        width={600}
        destroyOnClose
      >
        <Form
          form={reminderForm}
          layout="vertical"
          initialValues={{
            status: 'active',
            reminderType: 'advance',
            advanceDays: 3
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="维护计划"
                name="planId"
                rules={[{ required: true, message: '请选择维护计划' }]}
              >
                <Select placeholder="请选择维护计划">
                  {pmPlans.map(plan => (
                    <Option key={plan.id} value={plan.id}>
                      {plan.planName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="提醒类型"
                name="reminderType"
                rules={[{ required: true, message: '请选择提醒类型' }]}
              >
                <Select placeholder="请选择提醒类型">
                  <Option value="advance">提前提醒</Option>
                  <Option value="overdue">逾期提醒</Option>
                  <Option value="completion">完成提醒</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="提前天数"
                name="advanceDays"
                rules={[{ required: true, message: '请输入提前天数' }]}
              >
                <InputNumber
                  min={1}
                  max={365}
                  style={{ width: '100%' }}
                  placeholder="请输入提前天数"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="状态"
                name="status"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  <Option value="active">激活</Option>
                  <Option value="inactive">停用</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="提醒方式"
            name="reminderMethod"
            rules={[{ required: true, message: '请选择提醒方式' }]}
          >
            <Checkbox.Group>
              <Row gutter={16}>
                {reminderMethods.map(method => (
                  <Col span={8} key={method.value}>
                    <Checkbox value={method.value}>
                      {method.icon} {method.label}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            label="接收人"
            name="recipients"
            rules={[{ required: true, message: '请输入接收人' }]}
          >
            <Select
              mode="tags"
              placeholder="请输入接收人"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="提醒消息"
            name="message"
            rules={[{ required: true, message: '请输入提醒消息' }]}
          >
            <TextArea
              rows={3}
              placeholder="请输入提醒消息内容"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 维护日历模态框 */}
      <Modal
        title="维护日历"
        open={calendarVisible}
        onCancel={() => setCalendarVisible(false)}
        width={1000}
        footer={[
          <Button key="close" onClick={() => setCalendarVisible(false)}>
            关闭
          </Button>
        ]}
      >
        <Calendar dateCellRender={dateCellRender} />
      </Modal>
    </div>
  );
};

export default PreventiveMaintenanceManagement;