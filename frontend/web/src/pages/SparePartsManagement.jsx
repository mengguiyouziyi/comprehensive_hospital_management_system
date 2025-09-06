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
  UnderlineOutlined,
  InboxOutlined as SparePartsIcon,
  AppstoreOutlined,
  DatabaseOutlined as InventoryIcon,
  ShoppingCartOutlined,
  ExportOutlined as ExportIcon,
  ImportOutlined as ImportIcon,
  RiseOutlined,
  FallOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  StockOutlined,
  GiftOutlined,
  ThunderboltOutlined as BoltOutlined,
  FileDoneOutlined,
  AuditOutlined as AuditIcon,
  CalculatorOutlined as CalculatorIcon,
  FileSearchOutlined as FileSearchIcon
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

const SparePartsManagement = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [usageRecords, setUsageRecords] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [usageModalVisible, setUsageModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm();
  const [transactionForm] = Form.useForm();
  const [orderForm] = Form.useForm();
  const [usageForm] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('inventory');
  const [filterForm] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);

  // 备件类型选项
  const partTypes = [
    '电子元件', '机械零件', '光学部件', '耗材', '工具', '软件',
    '电缆', '传感器', '电源模块', '显示模块', '控制板', '其他'
  ];

  // 库存状态选项
  const inventoryStatuses = [
    { value: 'in_stock', label: '在库', color: 'green' },
    { value: 'low_stock', label: '库存不足', color: 'orange' },
    { value: 'out_of_stock', label: '缺货', color: 'red' },
    { value: 'reserved', label: '已预留', color: 'blue' },
    { value: 'obsolete', label: '废弃', color: 'gray' }
  ];

  // 交易类型选项
  const transactionTypes = [
    { value: 'in', label: '入库', color: 'green' },
    { value: 'out', label: '出库', color: 'red' },
    { value: 'transfer', label: '调拨', color: 'blue' },
    { value: 'adjustment', label: '调整', color: 'orange' }
  ];

  // 优先级选项
  const priorityLevels = [
    { value: 'critical', label: '关键', color: 'red' },
    { value: 'high', label: '高', color: 'orange' },
    { value: 'medium', label: '中', color: 'blue' },
    { value: 'low', label: '低', color: 'green' }
  ];

  // 初始化数据
  useEffect(() => {
    fetchSpareParts();
    fetchCategories();
    fetchSuppliers();
    fetchInventory();
    fetchTransactions();
    fetchPurchaseOrders();
    fetchUsageRecords();
    fetchAlerts();
    fetchStatistics();
  }, []);

  const fetchSpareParts = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          partNumber: 'SP-CT-001',
          partName: 'CT球管',
          category: '电子元件',
          specification: 'G-276',
          brand: 'GE',
          model: 'Optima CT660',
          unit: '个',
          critical: true,
          shelfLife: 24,
          storageCondition: '干燥环境',
          description: 'CT设备核心部件',
          image: 'sp1.jpg',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15'
        },
        {
          id: 2,
          partNumber: 'SP-US-002',
          partName: '超声探头',
          category: '光学部件',
          specification: 'C5-2',
          brand: 'Philips',
          model: 'HD11',
          unit: '个',
          critical: true,
          shelfLife: 36,
          storageCondition: '常温避光',
          description: '超声设备核心部件',
          image: 'sp2.jpg',
          createdAt: '2024-01-02',
          updatedAt: '2024-01-10'
        },
        {
          id: 3,
          partNumber: 'SP-MON-003',
          partName: '监护仪电池',
          category: '电子元件',
          specification: 'Li-ion 2200mAh',
          brand: 'Philips',
          model: 'IntelliVue MP50',
          unit: '块',
          critical: false,
          shelfLife: 12,
          storageCondition: '常温干燥',
          description: '监护仪备用电池',
          image: 'sp3.jpg',
          createdAt: '2024-01-03',
          updatedAt: '2024-01-08'
        }
      ];
      setSpareParts(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchCategories = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          categoryName: '电子元件',
          parentCategory: null,
          description: '各种电子元器件',
          partCount: 45,
          createdAt: '2024-01-01'
        },
        {
          id: 2,
          categoryName: '机械零件',
          parentCategory: null,
          description: '各种机械零部件',
          partCount: 32,
          createdAt: '2024-01-01'
        },
        {
          id: 3,
          categoryName: '光学部件',
          parentCategory: null,
          description: '各种光学元件',
          partCount: 18,
          createdAt: '2024-01-01'
        }
      ];
      setCategories(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchSuppliers = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          supplierName: 'GE备件中心',
          contactPerson: '张经理',
          phone: '13800138000',
          email: 'zhang@gespares.com',
          address: '北京市朝阳区',
          businessScope: 'GE原装备件',
          qualification: '一级代理商',
          rating: 4.8,
          cooperationCount: 25,
          totalAmount: 8500000,
          status: 'active'
        },
        {
          id: 2,
          supplierName: '飞利浦备件中心',
          contactPerson: '李经理',
          phone: '13900139000',
          email: 'li@philipsspares.com',
          address: '上海市浦东新区',
          businessScope: '飞利浦原装备件',
          qualification: '一级代理商',
          rating: 4.6,
          cooperationCount: 20,
          totalAmount: 6200000,
          status: 'active'
        }
      ];
      setSuppliers(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchInventory = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          partNumber: 'SP-CT-001',
          partName: 'CT球管',
          location: 'A-01-01',
          quantity: 5,
          minStock: 2,
          maxStock: 10,
          unitPrice: 85000,
          totalPrice: 425000,
          status: 'in_stock',
          lastInDate: '2024-01-10',
          lastOutDate: '2024-01-05',
          batchNumber: 'BN202401001',
          expiryDate: '2026-01-10',
          supplier: 'GE备件中心'
        },
        {
          id: 2,
          partNumber: 'SP-US-002',
          partName: '超声探头',
          location: 'B-02-03',
          quantity: 1,
          minStock: 3,
          maxStock: 8,
          unitPrice: 120000,
          totalPrice: 120000,
          status: 'low_stock',
          lastInDate: '2024-01-08',
          lastOutDate: '2024-01-12',
          batchNumber: 'BN202401002',
          expiryDate: '2027-01-08',
          supplier: '飞利浦备件中心'
        },
        {
          id: 3,
          partNumber: 'SP-MON-003',
          partName: '监护仪电池',
          location: 'C-03-05',
          quantity: 0,
          minStock: 5,
          maxStock: 20,
          unitPrice: 800,
          totalPrice: 0,
          status: 'out_of_stock',
          lastInDate: '2023-12-20',
          lastOutDate: '2024-01-15',
          batchNumber: 'BN202312001',
          expiryDate: '2024-12-20',
          supplier: '飞利浦备件中心'
        }
      ];
      setInventory(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchTransactions = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          transactionNo: 'TR202401001',
          partNumber: 'SP-CT-001',
          partName: 'CT球管',
          transactionType: 'in',
          quantity: 2,
          unitPrice: 85000,
          totalPrice: 170000,
          beforeQuantity: 3,
          afterQuantity: 5,
          operator: '张管理员',
          operationTime: '2024-01-10 10:30',
          reason: '采购入库',
          relatedOrder: 'PO202401001',
          notes: '常规备件补充'
        },
        {
          id: 2,
          transactionNo: 'TR202401002',
          partNumber: 'SP-US-002',
          partName: '超声探头',
          transactionType: 'out',
          quantity: 1,
          unitPrice: 120000,
          totalPrice: 120000,
          beforeQuantity: 2,
          afterQuantity: 1,
          operator: '李管理员',
          operationTime: '2024-01-12 14:20',
          reason: '维修领用',
          relatedOrder: 'RO202401001',
          notes: '超声设备维修使用'
        }
      ];
      setTransactions(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchPurchaseOrders = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          orderNo: 'PO202401001',
          supplier: 'GE备件中心',
          orderDate: '2024-01-08',
          expectedDate: '2024-01-15',
          status: 'completed',
          totalAmount: 170000,
          items: [
            { partNumber: 'SP-CT-001', partName: 'CT球管', quantity: 2, unitPrice: 85000 }
          ],
          responsiblePerson: '张管理员',
          notes: 'CT球管采购订单'
        },
        {
          id: 2,
          orderNo: 'PO202401002',
          supplier: '飞利浦备件中心',
          orderDate: '2024-01-15',
          expectedDate: '2024-01-25',
          status: 'in_transit',
          totalAmount: 240000,
          items: [
            { partNumber: 'SP-US-002', partName: '超声探头', quantity: 2, unitPrice: 120000 }
          ],
          responsiblePerson: '李管理员',
          notes: '超声探头采购订单'
        }
      ];
      setPurchaseOrders(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchUsageRecords = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          recordNo: 'UR202401001',
          partNumber: 'SP-US-002',
          partName: '超声探头',
          equipmentId: 'US001',
          equipmentName: 'Philips HD11',
          usageDate: '2024-01-12',
          quantity: 1,
          technician: '王工程师',
          department: '超声科',
          reason: '设备故障维修',
          result: '成功更换',
          notes: '设备恢复正常运行'
        },
        {
          id: 2,
          recordNo: 'UR202401002',
          partNumber: 'SP-MON-003',
          partName: '监护仪电池',
          equipmentId: 'MON001',
          equipmentName: 'Philips IntelliVue MP50',
          usageDate: '2024-01-15',
          quantity: 1,
          technician: '李工程师',
          department: 'ICU',
          reason: '电池老化更换',
          result: '成功更换',
          notes: '设备电池寿命到期'
        }
      ];
      setUsageRecords(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchAlerts = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          partNumber: 'SP-US-002',
          partName: '超声探头',
          alertType: 'low_stock',
          alertLevel: 'warning',
          currentQuantity: 1,
          minQuantity: 3,
          message: '库存不足，请及时采购',
          generatedTime: '2024-01-12 16:00',
          status: 'active',
          handler: null,
          handledTime: null
        },
        {
          id: 2,
          partNumber: 'SP-MON-003',
          partName: '监护仪电池',
          alertType: 'out_of_stock',
          alertLevel: 'critical',
          currentQuantity: 0,
          minQuantity: 5,
          message: '库存告急，立即采购',
          generatedTime: '2024-01-15 10:00',
          status: 'active',
          handler: null,
          handledTime: null
        }
      ];
      setAlerts(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchStatistics = () => {
    setTimeout(() => {
      const mockData = {
        totalParts: 156,
        inStockParts: 142,
        lowStockParts: 8,
        outOfStockParts: 6,
        totalValue: 8560000,
        criticalParts: 24,
        expiredParts: 2,
        monthlyUsage: 45,
        monthlyPurchase: 38,
        suppliers: 12,
        activeSuppliers: 10
      };
      setStatistics(mockData);
    }, 500);
  };

  const handleCreatePart = () => {
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleCreateCategory = () => {
    setCurrentRecord(null);
    categoryForm.resetFields();
    setCategoryModalVisible(true);
  };

  const handleCreateTransaction = () => {
    setCurrentRecord(null);
    transactionForm.resetFields();
    setTransactionModalVisible(true);
  };

  const handleCreateOrder = () => {
    setCurrentRecord(null);
    orderForm.resetFields();
    setOrderModalVisible(true);
  };

  const handleCreateUsage = () => {
    setCurrentRecord(null);
    usageForm.resetFields();
    setUsageModalVisible(true);
  };

  const handleViewDetail = (record) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      setLoading(true);
      const newPart = {
        id: currentRecord ? currentRecord.id : Date.now(),
        partNumber: values.partNumber || `SP-${Date.now()}`,
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setSpareParts(spareParts.map(item => 
          item.id === currentRecord.id ? newPart : item
        ));
        message.success('更新成功');
      } else {
        setSpareParts([...spareParts, newPart]);
        message.success('创建成功');
      }
      
      setModalVisible(false);
      setLoading(false);
    });
  };

  const handleCategoryModalOk = () => {
    categoryForm.validateFields().then(values => {
      setLoading(true);
      const newCategory = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setCategories(categories.map(item => 
          item.id === currentRecord.id ? newCategory : item
        ));
        message.success('更新成功');
      } else {
        setCategories([...categories, newCategory]);
        message.success('创建成功');
      }
      
      setCategoryModalVisible(false);
      setLoading(false);
    });
  };

  const handleTransactionModalOk = () => {
    transactionForm.validateFields().then(values => {
      setLoading(true);
      const newTransaction = {
        id: currentRecord ? currentRecord.id : Date.now(),
        transactionNo: currentRecord ? currentRecord.transactionNo : `TR${moment().format('YYYYMMDD')}${String(Date.now()).slice(-3)}`,
        ...values,
        operator: '当前用户',
        operationTime: moment().format('YYYY-MM-DD HH:mm'),
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setTransactions(transactions.map(item => 
          item.id === currentRecord.id ? newTransaction : item
        ));
        message.success('更新成功');
      } else {
        setTransactions([...transactions, newTransaction]);
        message.success('创建成功');
      }
      
      setTransactionModalVisible(false);
      setLoading(false);
    });
  };

  const inventoryColumns = [
    {
      title: '备件编号',
      dataIndex: 'partNumber',
      key: 'partNumber',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: '备件名称',
      dataIndex: 'partName',
      key: 'partName'
    },
    {
      title: '存储位置',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: '当前库存',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <div>
          <Text>{quantity} {record.unit}</Text>
          <div style={{ fontSize: '12px', color: '#666' }}>
            最小: {record.minStock} / 最大: {record.maxStock}
          </div>
        </div>
      )
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (value) => <Text type="success">¥{(value || 0).toLocaleString()}</Text>
    },
    {
      title: '总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (value) => <Text type="warning">¥{(value || 0).toLocaleString()}</Text>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const status = inventoryStatuses.find(s => s.value === text);
        return <Tag color={status ? status.color : 'default'}>{status ? status.label : text}</Tag>;
      }
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier'
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
              setTransactionModalVisible(true);
              transactionForm.setFieldsValue({
                partNumber: record.partNumber,
                partName: record.partName
              });
            }}
          >
            出入库
          </Button>
          {record.status === 'low_stock' && (
            <Button
              type="link"
              icon={<ShoppingCartOutlined />}
              onClick={() => {
                setCurrentRecord(record);
                orderForm.setFieldsValue({
                  partNumber: record.partNumber,
                  partName: record.partName
                });
                setOrderModalVisible(true);
              }}
            >
              采购
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
            <SparePartsIcon /> 医疗设备备件管理
          </Title>
          <Text type="secondary">
            管理医院医疗设备的备件库存、分类、采购和使用记录
          </Text>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="备件总数"
                value={statistics.totalParts || 0}
                prefix={<DatabaseOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="在库备件"
                value={statistics.inStockParts || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="库存不足"
                value={statistics.lowStockParts || 0}
                prefix={<WarningOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="缺货备件"
                value={statistics.outOfStockParts || 0}
                prefix={<ExclamationCircleOutlined />}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 关键指标 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={4}>
            <Card title="库存总值" size="small">
              <Statistic
                value={statistics.totalValue || 0}
                prefix="¥"
                valueStyle={{ fontSize: 20, color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="关键备件" size="small">
              <Statistic
                value={statistics.criticalParts || 0}
                valueStyle={{ fontSize: 20, color: '#f5222d' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="过期备件" size="small">
              <Statistic
                value={statistics.expiredParts || 0}
                valueStyle={{ fontSize: 20, color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="月使用量" size="small">
              <Statistic
                value={statistics.monthlyUsage || 0}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="月采购量" size="small">
              <Statistic
                value={statistics.monthlyPurchase || 0}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="供应商数" size="small">
              <Statistic
                value={statistics.suppliers || 0}
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
                <AppstoreOutlined />
                库存管理
              </span>
            }
            key="inventory"
          >
            <Card
              title="备件库存管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreatePart}
                  >
                    添加备件
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={inventoryColumns}
                dataSource={inventory}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: inventory.length,
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
                <StockOutlined />
                备件信息
              </span>
            }
            key="parts"
          >
            <Card
              title="备件信息管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreatePart}
                  >
                    添加备件
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
                    title: '备件编号',
                    dataIndex: 'partNumber',
                    key: 'partNumber',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '备件名称',
                    dataIndex: 'partName',
                    key: 'partName'
                  },
                  {
                    title: '类别',
                    dataIndex: 'category',
                    key: 'category',
                    render: (text) => <Tag color="blue">{text}</Tag>
                  },
                  {
                    title: '规格型号',
                    dataIndex: 'specification',
                    key: 'specification'
                  },
                  {
                    title: '品牌',
                    dataIndex: 'brand',
                    key: 'brand'
                  },
                  {
                    title: '适用设备',
                    dataIndex: 'model',
                    key: 'model'
                  },
                  {
                    title: '关键备件',
                    dataIndex: 'critical',
                    key: 'critical',
                    render: (critical) => (
                      <Tag color={critical ? 'red' : 'green'}>
                        {critical ? '是' : '否'}
                      </Tag>
                    )
                  },
                  {
                    title: '保质期',
                    dataIndex: 'shelfLife',
                    key: 'shelfLife',
                    render: (months) => <Text>{months} 个月</Text>
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
                      </Space>
                    )
                  }
                ]}
                dataSource={spareParts}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: spareParts.length,
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
                <DatabaseOutlined />
                分类管理
              </span>
            }
            key="categories"
          >
            <Card
              title="备件分类管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateCategory}
                  >
                    添加分类
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
                    title: '分类名称',
                    dataIndex: 'categoryName',
                    key: 'categoryName',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '父分类',
                    dataIndex: 'parentCategory',
                    key: 'parentCategory',
                    render: (text) => text || <Text type="secondary">无</Text>
                  },
                  {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                  },
                  {
                    title: '备件数量',
                    dataIndex: 'partCount',
                    key: 'partCount'
                  },
                  {
                    title: '创建时间',
                    dataIndex: 'createdAt',
                    key: 'createdAt'
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
                            categoryForm.setFieldsValue(record);
                            setCategoryModalVisible(true);
                          }}
                        >
                          编辑
                        </Button>
                      </Space>
                    )
                  }
                ]}
                dataSource={categories}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: categories.length,
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
                <ImportIcon />
                出入库记录
              </span>
            }
            key="transactions"
          >
            <Card
              title="出入库记录管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateTransaction}
                  >
                    添加记录
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
                    title: '交易编号',
                    dataIndex: 'transactionNo',
                    key: 'transactionNo',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '备件编号',
                    dataIndex: 'partNumber',
                    key: 'partNumber'
                  },
                  {
                    title: '备件名称',
                    dataIndex: 'partName',
                    key: 'partName'
                  },
                  {
                    title: '交易类型',
                    dataIndex: 'transactionType',
                    key: 'transactionType',
                    render: (text) => {
                      const type = transactionTypes.find(t => t.value === text);
                      return <Tag color={type ? type.color : 'default'}>{type ? type.label : text}</Tag>;
                    }
                  },
                  {
                    title: '数量',
                    dataIndex: 'quantity',
                    key: 'quantity'
                  },
                  {
                    title: '金额',
                    dataIndex: 'totalPrice',
                    key: 'totalPrice',
                    render: (value) => <Text type="success">¥{(value || 0).toLocaleString()}</Text>
                  },
                  {
                    title: '操作人',
                    dataIndex: 'operator',
                    key: 'operator'
                  },
                  {
                    title: '操作时间',
                    dataIndex: 'operationTime',
                    key: 'operationTime'
                  },
                  {
                    title: '原因',
                    dataIndex: 'reason',
                    key: 'reason'
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
                dataSource={transactions}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: transactions.length,
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
                <ShoppingCartOutlined />
                采购订单
              </span>
            }
            key="orders"
          >
            <Card
              title="采购订单管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateOrder}
                  >
                    创建订单
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
                    title: '订单编号',
                    dataIndex: 'orderNo',
                    key: 'orderNo',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '供应商',
                    dataIndex: 'supplier',
                    key: 'supplier'
                  },
                  {
                    title: '订单日期',
                    dataIndex: 'orderDate',
                    key: 'orderDate'
                  },
                  {
                    title: '预计到货',
                    dataIndex: 'expectedDate',
                    key: 'expectedDate'
                  },
                  {
                    title: '订单金额',
                    dataIndex: 'totalAmount',
                    key: 'totalAmount',
                    render: (value) => <Text type="success">¥{(value || 0).toLocaleString()}</Text>
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => {
                      const statusMap = {
                        pending: { color: 'orange', text: '待处理' },
                        confirmed: { color: 'blue', text: '已确认' },
                        in_transit: { color: 'purple', text: '运输中' },
                        completed: { color: 'green', text: '已完成' },
                        cancelled: { color: 'red', text: '已取消' }
                      };
                      const status = statusMap[text] || { color: 'default', text: text };
                      return <Tag color={status.color}>{status.text}</Tag>;
                    }
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
                            orderForm.setFieldsValue(record);
                            setOrderModalVisible(true);
                          }}
                        >
                          编辑
                        </Button>
                      </Space>
                    )
                  }
                ]}
                dataSource={purchaseOrders}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: purchaseOrders.length,
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
                <FileDoneOutlined />
                使用记录
              </span>
            }
            key="usage"
          >
            <Card
              title="备件使用记录管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateUsage}
                  >
                    添加记录
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
                    title: '记录编号',
                    dataIndex: 'recordNo',
                    key: 'recordNo',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '备件编号',
                    dataIndex: 'partNumber',
                    key: 'partNumber'
                  },
                  {
                    title: '备件名称',
                    dataIndex: 'partName',
                    key: 'partName'
                  },
                  {
                    title: '使用设备',
                    dataIndex: 'equipmentName',
                    key: 'equipmentName'
                  },
                  {
                    title: '使用日期',
                    dataIndex: 'usageDate',
                    key: 'usageDate'
                  },
                  {
                    title: '使用数量',
                    dataIndex: 'quantity',
                    key: 'quantity'
                  },
                  {
                    title: '技术员',
                    dataIndex: 'technician',
                    key: 'technician'
                  },
                  {
                    title: '科室',
                    dataIndex: 'department',
                    key: 'department',
                    render: (text) => <Tag color="green">{text}</Tag>
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
                dataSource={usageRecords}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: usageRecords.length,
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
                <AlertOutlined />
                库存预警
              </span>
            }
            key="alerts"
          >
            <Card title="库存预警管理">
              <Table
                columns={[
                  {
                    title: '备件编号',
                    dataIndex: 'partNumber',
                    key: 'partNumber'
                  },
                  {
                    title: '备件名称',
                    dataIndex: 'partName',
                    key: 'partName'
                  },
                  {
                    title: '预警类型',
                    dataIndex: 'alertType',
                    key: 'alertType',
                    render: (text) => {
                      const typeMap = {
                        low_stock: { color: 'orange', text: '库存不足' },
                        out_of_stock: { color: 'red', text: '库存告急' },
                        expiry_soon: { color: 'purple', text: '即将过期' },
                        expired: { color: 'gray', text: '已过期' }
                      };
                      const type = typeMap[text] || { color: 'default', text: text };
                      return <Tag color={type.color}>{type.text}</Tag>;
                    }
                  },
                  {
                    title: '预警级别',
                    dataIndex: 'alertLevel',
                    key: 'alertLevel',
                    render: (text) => {
                      const levelMap = {
                        info: { color: 'blue', text: '提示' },
                        warning: { color: 'orange', text: '警告' },
                        critical: { color: 'red', text: '严重' }
                      };
                      const level = levelMap[text] || { color: 'default', text: text };
                      return <Tag color={level.color}>{level.text}</Tag>;
                    }
                  },
                  {
                    title: '当前库存',
                    dataIndex: 'currentQuantity',
                    key: 'currentQuantity'
                  },
                  {
                    title: '最小库存',
                    dataIndex: 'minQuantity',
                    key: 'minQuantity'
                  },
                  {
                    title: '预警信息',
                    dataIndex: 'message',
                    key: 'message'
                  },
                  {
                    title: '生成时间',
                    dataIndex: 'generatedTime',
                    key: 'generatedTime'
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => (
                      <Tag color={text === 'active' ? 'red' : 'green'}>
                        {text === 'active' ? '未处理' : '已处理'}
                      </Tag>
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
                        {record.status === 'active' && (
                          <Button
                            type="link"
                            icon={<ToolOutlined />}
                            onClick={() => {
                              // 处理预警
                              message.info('预警处理功能正在开发中');
                            }}
                          >
                            处理
                          </Button>
                        )}
                      </Space>
                    )
                  }
                ]}
                dataSource={alerts}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: alerts.length,
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
            <Card title="备件统计分析">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="库存状态分布" size="small">
                    <List
                      dataSource={inventory}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar icon={<DatabaseOutlined />} />}
                            title={item.partName}
                            description={`位置：${item.location} | 供应商：${item.supplier}`}
                          />
                          <div>
                            <Tag color={inventoryStatuses.find(s => s.value === item.status)?.color || 'default'}>
                              {inventoryStatuses.find(s => s.value === item.status)?.label || item.status}
                            </Tag>
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="备件概况" size="small">
                    <div style={{ padding: '20px 0' }}>
                      <Alert
                        message="库存概况"
                        description={`总备件：${statistics.totalParts}种 | 在库：${statistics.inStockParts}种 | 库存不足：${statistics.lowStockParts}种 | 缺货：${statistics.outOfStockParts}种 | 总价值：¥${(statistics.totalValue || 0).toLocaleString()}`}
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

      {/* 添加备件模态框 */}
      <Modal
        title={currentRecord ? '编辑备件' : '添加备件'}
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
            critical: false,
            unit: '个'
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="备件编号"
                name="partNumber"
                rules={[{ required: true, message: '请输入备件编号' }]}
              >
                <Input placeholder="请输入备件编号" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="备件名称"
                name="partName"
                rules={[{ required: true, message: '请输入备件名称' }]}
              >
                <Input placeholder="请输入备件名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="类别"
                name="category"
                rules={[{ required: true, message: '请选择类别' }]}
              >
                <Select placeholder="请选择类别">
                  {partTypes.map(type => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="规格型号"
                name="specification"
              >
                <Input placeholder="请输入规格型号" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="品牌"
                name="brand"
              >
                <Input placeholder="请输入品牌" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="适用设备"
                name="model"
              >
                <Input placeholder="请输入适用设备型号" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="单位"
                name="unit"
                rules={[{ required: true, message: '请选择单位' }]}
              >
                <Select placeholder="请选择单位">
                  <Option value="个">个</Option>
                  <Option value="件">件</Option>
                  <Option value="套">套</Option>
                  <Option value="米">米</Option>
                  <Option value="千克">千克</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="保质期(月)"
                name="shelfLife"
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="存储条件"
                name="storageCondition"
              >
                <Input placeholder="请输入存储条件" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="关键备件"
                name="critical"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="描述"
            name="description"
          >
            <TextArea
              rows={4}
              placeholder="请输入备件描述"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SparePartsManagement;