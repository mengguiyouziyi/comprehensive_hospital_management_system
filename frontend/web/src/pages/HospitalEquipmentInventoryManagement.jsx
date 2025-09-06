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
  QRCode,
  notification,
  TreeSelect,
  Cascader,
  Transfer,
  Collapse,
  AutoComplete,
  Mentions
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
  ClockCircleFilled,
  UploadOutlined,
  ImportOutlined,
  ScanOutlined,
  DiffOutlined,
  AuditOutlined,
  AccountBookOutlined,
  PercentageOutlined,
  LineChartOutlined,
  PieChartOutlined,
  RadarChartOutlined,
  AreaChartOutlined,
  FundOutlined,
  CalculatorOutlined,
  FileSearchOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileTextOutlined as FileTextIcon,
  UnorderedListOutlined,
  OrderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Step } = Steps;
const { Panel } = Collapse;
const { SHOW_PARENT } = TreeSelect;

const HospitalEquipmentInventoryManagement = () => {
  const [inventoryPlans, setInventoryPlans] = useState([]);
  const [inventoryExecutions, setInventoryExecutions] = useState([]);
  const [inventoryResults, setInventoryResults] = useState([]);
  const [differences, setDifferences] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [executionModalVisible, setExecutionModalVisible] = useState(false);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [differenceModalVisible, setDifferenceModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [scanModalVisible, setScanModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [executionForm] = Form.useForm();
  const [resultForm] = Form.useForm();
  const [differenceForm] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('plans');
  const [filterForm] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // 设备类型选项
  const equipmentTypes = [
    'CT设备', 'DR设备', '超声设备', 'MRI设备', '监护仪', '麻醉机',
    '呼吸机', '心电图机', '内窥镜设备', '检验设备', '放射治疗设备', '其他'
  ];

  // 科室选项
  const departmentOptions = [
    '放射科', '检验科', '超声科', '内科', '外科', '妇产科', '儿科',
    '急诊科', 'ICU', '手术室', '眼科', '耳鼻喉科', '口腔科', '康复科'
  ];

  // 盘点状态选项
  const planStatuses = [
    { value: 'draft', label: '草稿', color: 'gray' },
    { value: 'pending', label: '待审批', color: 'orange' },
    { value: 'approved', label: '已批准', color: 'blue' },
    { value: 'in_progress', label: '盘点中', color: 'purple' },
    { value: 'completed', label: '已完成', color: 'green' },
    { value: 'cancelled', label: '已取消', color: 'red' }
  ];

  // 执行状态选项
  const executionStatuses = [
    { value: 'pending', label: '待执行', color: 'orange' },
    { value: 'in_progress', label: '盘点中', color: 'blue' },
    { value: 'completed', label: '已完成', color: 'green' },
    { value: 'paused', label: '暂停', color: 'gray' }
  ];

  // 差异状态选项
  const differenceStatuses = [
    { value: 'pending', label: '待处理', color: 'orange' },
    { value: 'investigating', label: '调查中', color: 'blue' },
    { value: 'resolved', label: '已解决', color: 'green' },
    { value: 'closed', label: '已关闭', color: 'gray' }
  ];

  // 盘点方式选项
  const inventoryMethods = [
    { value: 'full', label: '全面盘点' },
    { value: 'sampling', label: '抽样盘点' },
    { value: 'category', label: '分类盘点' },
    { value: 'department', label: '科室盘点' }
  ];

  // 初始化数据
  useEffect(() => {
    fetchInventoryPlans();
    fetchInventoryExecutions();
    fetchInventoryResults();
    fetchDifferences();
    fetchEquipment();
    fetchDepartments();
    fetchPersonnel();
    fetchStatistics();
  }, []);

  const fetchInventoryPlans = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          planName: '2024年第一季度全面盘点',
          planType: 'full',
          scope: '全院设备',
          startDate: '2024-01-15',
          endDate: '2024-01-31',
          status: 'in_progress',
          responsiblePerson: '张主任',
          approver: '李院长',
          approvalDate: '2024-01-10',
          totalEquipment: 1200,
          inventoriedEquipment: 856,
          completionRate: 71.3,
          description: '全院医疗设备第一季度全面盘点工作',
          createdAt: '2024-01-05',
          updatedAt: '2024-01-20'
        },
        {
          id: 2,
          planName: '放射科设备专项盘点',
          planType: 'department',
          scope: '放射科',
          startDate: '2024-02-01',
          endDate: '2024-02-15',
          status: 'pending',
          responsiblePerson: '王科长',
          approver: null,
          approvalDate: null,
          totalEquipment: 156,
          inventoriedEquipment: 0,
          completionRate: 0,
          description: '放射科设备专项盘点工作',
          createdAt: '2024-01-25',
          updatedAt: '2024-01-25'
        }
      ];
      setInventoryPlans(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchInventoryExecutions = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          planId: 1,
          planName: '2024年第一季度全面盘点',
          executor: '张工程师',
          department: '放射科',
          executionDate: '2024-01-15',
          status: 'completed',
          totalEquipment: 45,
          inventoriedEquipment: 45,
          differences: 2,
          startTime: '2024-01-15 09:00',
          endTime: '2024-01-15 16:30',
          duration: 450,
          notes: '盘点完成，发现2台设备账实不符',
          images: ['inventory1.jpg']
        },
        {
          id: 2,
          planId: 1,
          planName: '2024年第一季度全面盘点',
          executor: '李工程师',
          department: '检验科',
          executionDate: '2024-01-16',
          status: 'in_progress',
          totalEquipment: 38,
          inventoriedEquipment: 32,
          differences: 0,
          startTime: '2024-01-16 09:00',
          endTime: null,
          duration: 240,
          notes: '正在进行中，已盘点32台设备',
          images: []
        }
      ];
      setInventoryExecutions(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchInventoryResults = () => {
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
          bookQuantity: 1,
          actualQuantity: 1,
          status: 'normal',
          executor: '张工程师',
          executionDate: '2024-01-15',
          condition: 'good',
          notes: '设备正常，账实相符',
          images: ['result1.jpg']
        },
        {
          id: 2,
          equipmentId: 'US001',
          equipmentName: 'Philips HD11',
          equipmentType: '超声设备',
          department: '超声科',
          location: '超声科检查室1',
          bookQuantity: 1,
          actualQuantity: 0,
          status: 'missing',
          executor: '李工程师',
          executionDate: '2024-01-16',
          condition: null,
          notes: '设备缺失，需要进一步调查',
          images: []
        }
      ];
      setInventoryResults(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchDifferences = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          resultId: 2,
          equipmentId: 'US001',
          equipmentName: 'Philips HD11',
          equipmentType: '超声设备',
          department: '超声科',
          bookQuantity: 1,
          actualQuantity: 0,
          differenceType: 'missing',
          differenceAmount: 1,
          estimatedValue: 850000,
          status: 'investigating',
          discoverer: '李工程师',
          discoveryDate: '2024-01-16',
          investigator: '张主任',
          investigationResult: '设备可能被移动到其他科室',
          resolution: '正在调查中',
          resolvedDate: null,
          notes: '需要检查其他科室是否有该设备'
        },
        {
          id: 2,
          resultId: null,
          equipmentId: 'DR002',
          equipmentName: 'Siemens DR',
          equipmentType: 'DR设备',
          department: '放射科',
          bookQuantity: 1,
          actualQuantity: 2,
          differenceType: 'extra',
          differenceAmount: 1,
          estimatedValue: 650000,
          status: 'pending',
          discoverer: '张工程师',
          discoveryDate: '2024-01-15',
          investigator: null,
          investigationResult: null,
          resolution: null,
          resolvedDate: null,
          notes: '发现额外设备，需要核实来源'
        }
      ];
      setDifferences(mockData);
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
          bookQuantity: 1,
          lastInventoryDate: '2024-01-15',
          inventoryStatus: 'normal',
          purchaseDate: '2020-01-15',
          originalValue: 2500000,
          currentValue: 1800000
        },
        {
          id: 2,
          equipmentId: 'US001',
          equipmentName: 'Philips HD11',
          equipmentType: '超声设备',
          department: '超声科',
          location: '超声科检查室1',
          bookQuantity: 1,
          lastInventoryDate: '2024-01-16',
          inventoryStatus: 'missing',
          purchaseDate: '2019-06-20',
          originalValue: 1200000,
          currentValue: 850000
        }
      ];
      setEquipment(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchDepartments = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: '放射科',
          director: '张主任',
          equipmentCount: 156,
          inventoryProgress: 100,
          lastInventoryDate: '2024-01-15'
        },
        {
          id: 2,
          name: '检验科',
          director: '李主任',
          equipmentCount: 89,
          inventoryProgress: 84.2,
          lastInventoryDate: '2024-01-16'
        }
      ];
      setDepartments(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchPersonnel = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: '张工程师',
          department: '设备科',
          role: '高级工程师',
          inventoryCount: 156,
          accuracyRate: 99.2,
          status: 'available'
        },
        {
          id: 2,
          name: '李工程师',
          department: '设备科',
          role: '工程师',
          inventoryCount: 89,
          accuracyRate: 98.5,
          status: 'busy'
        }
      ];
      setPersonnel(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchStatistics = () => {
    setTimeout(() => {
      const mockData = {
        totalPlans: 12,
        activePlans: 3,
        completedPlans: 8,
        totalEquipment: 1200,
        inventoriedEquipment: 856,
        inventoryProgress: 71.3,
        differences: 15,
        resolvedDifferences: 12,
        totalValue: 125000000,
        differenceValue: 2500000,
        completionRate: 71.3,
        accuracyRate: 98.8,
        averageInventoryTime: 180
      };
      setStatistics(mockData);
    }, 500);
  };

  const handleCreatePlan = () => {
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleCreateExecution = () => {
    setCurrentRecord(null);
    executionForm.resetFields();
    setExecutionModalVisible(true);
  };

  const handleScanEquipment = () => {
    setScanning(true);
    setScanModalVisible(true);
    
    // 模拟扫码过程
    setTimeout(() => {
      setScanning(false);
      setScanResult({
        equipmentId: 'CT001',
        equipmentName: 'GE Optima CT660',
        department: '放射科',
        location: '放射科CT室',
        status: 'found'
      });
      message.success('扫码成功！');
    }, 2000);
  };

  const handleCreateDifference = () => {
    setCurrentRecord(null);
    differenceForm.resetFields();
    setDifferenceModalVisible(true);
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
        setInventoryPlans(inventoryPlans.map(item => 
          item.id === currentRecord.id ? newPlan : item
        ));
        message.success('更新成功');
      } else {
        setInventoryPlans([...inventoryPlans, newPlan]);
        message.success('创建成功');
      }
      
      setModalVisible(false);
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
        setInventoryExecutions(inventoryExecutions.map(item => 
          item.id === currentRecord.id ? newExecution : item
        ));
        message.success('更新成功');
      } else {
        setInventoryExecutions([...inventoryExecutions, newExecution]);
        message.success('创建成功');
      }
      
      setExecutionModalVisible(false);
      setLoading(false);
    });
  };

  const handleDifferenceModalOk = () => {
    differenceForm.validateFields().then(values => {
      setLoading(true);
      const newDifference = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setDifferences(differences.map(item => 
          item.id === currentRecord.id ? newDifference : item
        ));
        message.success('更新成功');
      } else {
        setDifferences([...differences, newDifference]);
        message.success('创建成功');
      }
      
      setDifferenceModalVisible(false);
      setLoading(false);
    });
  };

  const planColumns = [
    {
      title: '盘点计划',
      dataIndex: 'planName',
      key: 'planName',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: '盘点类型',
      dataIndex: 'planType',
      key: 'planType',
      render: (text) => {
        const method = inventoryMethods.find(m => m.value === text);
        return <Tag color="blue">{method ? method.label : text}</Tag>;
      }
    },
    {
      title: '盘点范围',
      dataIndex: 'scope',
      key: 'scope',
      render: (text) => <Tag color="green">{text}</Tag>
    },
    {
      title: '计划时间',
      key: 'planPeriod',
      render: (_, record) => `${record.startDate} ~ ${record.endDate}`
    },
    {
      title: '负责人',
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson'
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
      title: '进度',
      dataIndex: 'completionRate',
      key: 'completionRate',
      render: (rate) => (
        <Progress
          percent={rate}
          size="small"
          status={rate >= 90 ? 'success' : rate >= 70 ? 'normal' : 'exception'}
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
          {record.status === 'approved' && (
            <Button
              type="link"
              icon={<ScanOutlined />}
              onClick={handleScanEquipment}
            >
              扫码盘点
            </Button>
          )}
        </Space>
      )
    }
  ];

  const differenceColumns = [
    {
      title: '设备编号',
      dataIndex: 'equipmentId',
      key: 'equipmentId'
    },
    {
      title: '设备名称',
      dataIndex: 'equipmentName',
      key: 'equipmentName',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: '设备类型',
      dataIndex: 'equipmentType',
      key: 'equipmentType',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: '科室',
      dataIndex: 'department',
      key: 'department',
      render: (text) => <Tag color="green">{text}</Tag>
    },
    {
      title: '差异类型',
      dataIndex: 'differenceType',
      key: 'differenceType',
      render: (text) => {
        const typeMap = {
          missing: { color: 'red', text: '盘亏' },
          extra: { color: 'orange', text: '盘盈' },
          damaged: { color: 'purple', text: '损坏' },
          relocated: { color: 'blue', text: '移位' }
        };
        const type = typeMap[text] || { color: 'default', text: text };
        return <Tag color={type.color}>{type.text}</Tag>;
      }
    },
    {
      title: '账面数量',
      dataIndex: 'bookQuantity',
      key: 'bookQuantity'
    },
    {
      title: '实际数量',
      dataIndex: 'actualQuantity',
      key: 'actualQuantity'
    },
    {
      title: '差异金额',
      dataIndex: 'estimatedValue',
      key: 'estimatedValue',
      render: (value) => <Text type="danger">¥{value.toLocaleString()}</Text>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const status = differenceStatuses.find(s => s.value === text);
        return <Tag color={status ? status.color : 'default'}>{status ? status.label : text}</Tag>;
      }
    },
    {
      title: '发现人',
      dataIndex: 'discoverer',
      key: 'discoverer'
    },
    {
      title: '发现日期',
      dataIndex: 'discoveryDate',
      key: 'discoveryDate'
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
              differenceForm.setFieldsValue(record);
              setDifferenceModalVisible(true);
            }}
          >
            处理
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>
            <AccountBookOutlined /> 医院设备盘点管理
          </Title>
          <Text type="secondary">
            管理医院医疗设备的盘点计划、执行、结果分析和差异处理
          </Text>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="设备总数"
                value={statistics.totalEquipment || 0}
                prefix={<DatabaseOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="已盘点设备"
                value={statistics.inventoriedEquipment || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="盘点进度"
                value={statistics.inventoryProgress || 0}
                suffix="%"
                prefix={<PercentageOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="盘点准确率"
                value={statistics.accuracyRate || 0}
                suffix="%"
                prefix={<FileProtectOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 关键指标 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={4}>
            <Card title="盘点完成率" size="small">
              <Progress
                type="circle"
                percent={statistics.completionRate || 0}
                width={80}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="差异设备数" size="small">
              <Statistic
                value={statistics.differences || 0}
                valueStyle={{ fontSize: 20, color: '#f5222d' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="已解决差异" size="small">
              <Statistic
                value={statistics.resolvedDifferences || 0}
                valueStyle={{ fontSize: 20, color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="差异金额" size="small">
              <Statistic
                value={statistics.differenceValue || 0}
                prefix="¥"
                valueStyle={{ fontSize: 20, color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="平均耗时" size="small">
              <Statistic
                value={statistics.averageInventoryTime || 0}
                suffix="分钟/台"
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="活跃计划" size="small">
              <Statistic
                value={statistics.activePlans || 0}
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
                盘点计划
              </span>
            }
            key="plans"
          >
            <Card
              title="盘点计划管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreatePlan}
                  >
                    创建计划
                  </Button>
                  <Button icon={<ScanOutlined />} onClick={handleScanEquipment}>
                    扫码盘点
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={planColumns}
                dataSource={inventoryPlans}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: inventoryPlans.length,
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
                <ScanOutlined />
                盘点执行
              </span>
            }
            key="executions"
          >
            <Card
              title="盘点执行管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateExecution}
                  >
                    开始盘点
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
                    title: '盘点计划',
                    dataIndex: 'planName',
                    key: 'planName',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '执行人',
                    dataIndex: 'executor',
                    key: 'executor'
                  },
                  {
                    title: '科室',
                    dataIndex: 'department',
                    key: 'department',
                    render: (text) => <Tag color="green">{text}</Tag>
                  },
                  {
                    title: '执行日期',
                    dataIndex: 'executionDate',
                    key: 'executionDate'
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
                    title: '进度',
                    key: 'progress',
                    render: (_, record) => (
                      <Progress
                        percent={record.totalEquipment > 0 ? (record.inventoriedEquipment / record.totalEquipment) * 100 : 0}
                        size="small"
                        status={record.status === 'completed' ? 'success' : 'normal'}
                      />
                    )
                  },
                  {
                    title: '差异',
                    dataIndex: 'differences',
                    key: 'differences',
                    render: (count) => (
                      <Badge
                        count={count}
                        showZero
                        style={{ backgroundColor: count > 0 ? '#f5222d' : '#52c41a' }}
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
                        {record.status === 'in_progress' && (
                          <Button
                            type="link"
                            icon={<PauseCircleOutlined />}
                            onClick={() => {
                              // 暂停盘点
                              message.info('盘点已暂停');
                            }}
                          >
                            暂停
                          </Button>
                        )}
                      </Space>
                    )
                  }
                ]}
                dataSource={inventoryExecutions}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: inventoryExecutions.length,
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
                <DiffOutlined />
                差异处理
              </span>
            }
            key="differences"
          >
            <Card
              title="盘点差异处理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateDifference}
                  >
                    上报差异
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={differenceColumns}
                dataSource={differences}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: differences.length,
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
            <Card title="盘点统计分析">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="科室盘点进度" size="small">
                    <List
                      dataSource={departments}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar icon={<TeamOutlined />} />}
                            title={item.name}
                            description={`负责人：${item.director} | 设备数：${item.equipmentCount}`}
                          />
                          <div style={{ width: 200 }}>
                            <Progress
                              percent={item.inventoryProgress}
                              size="small"
                              status={item.inventoryProgress === 100 ? 'success' : 'normal'}
                            />
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="差异分析" size="small">
                    <div style={{ padding: '20px 0' }}>
                      <Alert
                        message="差异统计"
                        description={`总差异：${statistics.differences}项 | 已处理：${statistics.resolvedDifferences}项 | 处理率：${statistics.differences > 0 ? ((statistics.resolvedDifferences / statistics.differences) * 100).toFixed(1) : 0}%`}
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
        title={currentRecord ? '编辑盘点计划' : '创建盘点计划'}
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
            status: 'draft',
            planType: 'full'
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
                label="盘点类型"
                name="planType"
                rules={[{ required: true, message: '请选择盘点类型' }]}
              >
                <Select placeholder="请选择盘点类型">
                  {inventoryMethods.map(method => (
                    <Option key={method.value} value={method.value}>
                      {method.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="盘点范围"
                name="scope"
                rules={[{ required: true, message: '请输入盘点范围' }]}
              >
                <Input placeholder="请输入盘点范围" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="负责人"
                name="responsiblePerson"
                rules={[{ required: true, message: '请输入负责人' }]}
              >
                <Input placeholder="请输入负责人" />
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

      {/* 扫码盘点模态框 */}
      <Modal
        title="扫码盘点"
        open={scanModalVisible}
        onCancel={() => setScanModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setScanModalVisible(false)}>
            关闭
          </Button>
        ]}
      >
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          {scanning ? (
            <div>
              <Spin size="large" />
              <div style={{ marginTop: 20 }}>
                <Text>正在扫描设备二维码...</Text>
              </div>
            </div>
          ) : scanResult ? (
            <div>
              <CheckCircleFilled style={{ fontSize: 64, color: '#52c41a' }} />
              <div style={{ marginTop: 20 }}>
                <Title level={4}>扫码成功</Title>
                <p>设备编号：{scanResult.equipmentId}</p>
                <p>设备名称：{scanResult.equipmentName}</p>
                <p>所在科室：{scanResult.department}</p>
                <p>设备位置：{scanResult.location}</p>
              </div>
              <Button type="primary" onClick={() => {
                setScanResult(null);
                setScanning(true);
                setTimeout(() => {
                  setScanning(false);
                  setScanResult({
                    equipmentId: 'US001',
                    equipmentName: 'Philips HD11',
                    department: '超声科',
                    location: '超声科检查室1',
                    status: 'found'
                  });
                  message.success('扫码成功！');
                }, 2000);
              }}>
                继续扫码
              </Button>
            </div>
          ) : (
            <div>
              <QrcodeOutlined style={{ fontSize: 64, color: '#1890ff' }} />
              <div style={{ marginTop: 20 }}>
                <Title level={4}>扫码盘点</Title>
                <Text>请将设备二维码对准扫描区域</Text>
              </div>
              <Button type="primary" onClick={() => setScanning(true)}>
                开始扫描
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default HospitalEquipmentInventoryManagement;