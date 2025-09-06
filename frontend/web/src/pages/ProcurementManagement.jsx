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
  ShoppingOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  BankOutlined,
  AccountBookOutlined as ProcurementIcon,
  FileAddOutlined,
  FileDoneOutlined,
  FileSearchOutlined as FileSearchIcon,
  UsergroupAddOutlined,
  SolutionOutlined,
  AuditOutlined as AuditIcon,
  CalculatorOutlined as CalculatorIcon,
  RiseOutlined,
  FallOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  LeftCircleOutlined,
  RightCircleOutlined
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

const ProcurementManagement = () => {
  const [procurementPlans, setProcurementPlans] = useState([]);
  const [procurementRequests, setProcurementRequests] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestModalVisible, setRequestModalVisible] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [contractModalVisible, setContractModalVisible] = useState(false);
  const [supplierModalVisible, setSupplierModalVisible] = useState(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [form] = Form.useForm();
  const [requestForm] = Form.useForm();
  const [orderForm] = Form.useForm();
  const [contractForm] = Form.useForm();
  const [supplierForm] = Form.useForm();
  const [budgetForm] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('plans');
  const [filterForm] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);

  // 设备类型选项
  const equipmentTypes = [
    'CT设备', 'DR设备', '超声设备', 'MRI设备', '监护仪', '麻醉机',
    '呼吸机', '心电图机', '内窥镜设备', '检验设备', '放射治疗设备', '其他'
  ];

  // 采购状态选项
  const procurementStatuses = [
    { value: 'draft', label: '草稿', color: 'gray' },
    { value: 'pending', label: '待审批', color: 'orange' },
    { value: 'approved', label: '已批准', color: 'blue' },
    { value: 'in_procurement', label: '采购中', color: 'purple' },
    { value: 'completed', label: '已完成', color: 'green' },
    { value: 'cancelled', label: '已取消', color: 'red' }
  ];

  // 采购方式选项
  const procurementMethods = [
    { value: 'public_bidding', label: '公开招标' },
    { value: 'competitive_negotiation', label: '竞争性谈判' },
    { value: 'single_source', label: '单一来源' },
    { value: 'inquiry', label: '询价采购' },
    { value: 'competitive_consultation', label: '竞争性磋商' },
    { value: 'direct_purchase', label: '直接采购' }
  ];

  // 优先级选项
  const priorityLevels = [
    { value: 'high', label: '高', color: 'red' },
    { value: 'medium', label: '中', color: 'orange' },
    { value: 'low', label: '低', color: 'green' }
  ];

  // 合同状态选项
  const contractStatuses = [
    { value: 'draft', label: '草稿', color: 'gray' },
    { value: 'pending_signature', label: '待签署', color: 'orange' },
    { value: 'active', label: '有效', color: 'green' },
    { value: 'completed', label: '已完成', color: 'blue' },
    { value: 'terminated', label: '已终止', color: 'red' },
    { value: 'disputed', label: '争议中', color: 'purple' }
  ];

  // 初始化数据
  useEffect(() => {
    fetchProcurementPlans();
    fetchProcurementRequests();
    fetchPurchaseOrders();
    fetchContracts();
    fetchSuppliers();
    fetchBudgets();
    fetchApprovals();
    fetchStatistics();
  }, []);

  const fetchProcurementPlans = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          planName: '2024年度医疗设备采购计划',
          planType: 'annual',
          totalBudget: 5000000,
          usedBudget: 3200000,
          remainingBudget: 1800000,
          status: 'in_procurement',
          responsiblePerson: '张主任',
          approver: '李院长',
          approvalDate: '2024-01-10',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          description: '年度医疗设备采购计划',
          createdAt: '2023-12-15',
          updatedAt: '2024-01-20'
        },
        {
          id: 2,
          planName: '放射科设备更新计划',
          planType: 'department',
          totalBudget: 1200000,
          usedBudget: 800000,
          remainingBudget: 400000,
          status: 'approved',
          responsiblePerson: '王科长',
          approver: '张主任',
          approvalDate: '2024-02-01',
          startDate: '2024-02-01',
          endDate: '2024-06-30',
          description: '放射科设备更新采购计划',
          createdAt: '2024-01-25',
          updatedAt: '2024-02-05'
        }
      ];
      setProcurementPlans(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchProcurementRequests = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          requestNo: 'PR202401001',
          equipmentName: 'GE Revolution CT',
          equipmentType: 'CT设备',
          department: '放射科',
          requestDate: '2024-01-15',
          requester: '王医生',
          quantity: 1,
          estimatedPrice: 2800000,
          priority: 'high',
          purpose: '替换老旧设备，提高诊断精度',
          status: 'approved',
          approver: '张主任',
          approvalDate: '2024-01-18',
          notes: '急需设备，建议尽快采购'
        },
        {
          id: 2,
          requestNo: 'PR202401002',
          equipmentName: 'Philips超声诊断仪',
          equipmentType: '超声设备',
          department: '超声科',
          requestDate: '2024-01-20',
          requester: '李医生',
          quantity: 2,
          estimatedPrice: 1500000,
          priority: 'medium',
          purpose: '增加超声设备，提高检查效率',
          status: 'pending',
          approver: null,
          approvalDate: null,
          notes: '常规设备更新需求'
        }
      ];
      setProcurementRequests(mockData);
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
          requestNo: 'PR202401001',
          equipmentName: 'GE Revolution CT',
          supplier: 'GE医疗',
          contractNo: 'CON202401001',
          orderDate: '2024-02-01',
          deliveryDate: '2024-03-15',
          totalAmount: 2650000,
          paymentTerms: '30%预付款，70%验收后付款',
          status: 'in_procurement',
          orderType: 'public_bidding',
          responsiblePerson: '张主任',
          supplierContact: '13800138000',
          notes: '设备采购订单'
        },
        {
          id: 2,
          orderNo: 'PO202401002',
          requestNo: 'PR202401002',
          equipmentName: 'Philips超声诊断仪',
          supplier: '飞利浦医疗',
          contractNo: 'CON202401002',
          orderDate: '2024-02-10',
          deliveryDate: '2024-03-30',
          totalAmount: 1450000,
          paymentTerms: '40%预付款，60%验收后付款',
          status: 'pending',
          orderType: 'competitive_negotiation',
          responsiblePerson: '王科长',
          supplierContact: '13900139000',
          notes: '超声设备采购订单'
        }
      ];
      setPurchaseOrders(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchContracts = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          contractNo: 'CON202401001',
          contractName: 'GE医疗设备采购合同',
          supplier: 'GE医疗',
          contractType: 'purchase',
          totalAmount: 2650000,
          signDate: '2024-02-01',
          startDate: '2024-02-01',
          endDate: '2024-12-31',
          status: 'active',
          responsiblePerson: '张主任',
          paymentTerms: '30%预付款，70%验收后付款',
          warrantyPeriod: '12个月',
          fileUrl: '/contracts/CON202401001.pdf'
        },
        {
          id: 2,
          contractNo: 'CON202401002',
          contractName: '飞利浦医疗设备采购合同',
          supplier: '飞利浦医疗',
          contractType: 'purchase',
          totalAmount: 1450000,
          signDate: '2024-02-10',
          startDate: '2024-02-10',
          endDate: '2024-12-31',
          status: 'pending_signature',
          responsiblePerson: '王科长',
          paymentTerms: '40%预付款，60%验收后付款',
          warrantyPeriod: '24个月',
          fileUrl: '/contracts/CON202401002.pdf'
        }
      ];
      setContracts(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchSuppliers = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          supplierName: 'GE医疗',
          contactPerson: '张经理',
          phone: '13800138000',
          email: 'zhang@gemedical.com',
          address: '北京市朝阳区',
          businessScope: '医疗设备销售',
          qualification: 'A级供应商',
          rating: 4.8,
          cooperationCount: 15,
          totalAmount: 35000000,
          status: 'active'
        },
        {
          id: 2,
          supplierName: '飞利浦医疗',
          contactPerson: '李经理',
          phone: '13900139000',
          email: 'li@philips.com',
          address: '上海市浦东新区',
          businessScope: '医疗设备销售',
          qualification: 'A级供应商',
          rating: 4.6,
          cooperationCount: 12,
          totalAmount: 28000000,
          status: 'active'
        }
      ];
      setSuppliers(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchBudgets = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          budgetName: '2024年度设备采购预算',
          budgetType: 'annual',
          totalBudget: 10000000,
          usedBudget: 5200000,
          remainingBudget: 4800000,
          department: '全院',
          fiscalYear: '2024',
          status: 'active',
          responsiblePerson: '财务科',
          approvalDate: '2024-01-01',
          description: '年度医疗设备采购预算'
        },
        {
          id: 2,
          budgetName: '放射科专项预算',
          budgetType: 'department',
          totalBudget: 2000000,
          usedBudget: 1200000,
          remainingBudget: 800000,
          department: '放射科',
          fiscalYear: '2024',
          status: 'active',
          responsiblePerson: '王科长',
          approvalDate: '2024-02-01',
          description: '放射科设备专项预算'
        }
      ];
      setBudgets(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchApprovals = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          requestNo: 'PR202401001',
          requestType: 'procurement',
          requester: '王医生',
          amount: 2800000,
          submitDate: '2024-01-15',
          approver: '张主任',
          approvalDate: '2024-01-18',
          status: 'approved',
          approvalLevel: 2,
          notes: '设备急需，同意采购'
        },
        {
          id: 2,
          requestNo: 'PR202401002',
          requestType: 'procurement',
          requester: '李医生',
          amount: 1500000,
          submitDate: '2024-01-20',
          approver: null,
          approvalDate: null,
          status: 'pending',
          approvalLevel: 1,
          notes: '待审批'
        }
      ];
      setApprovals(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchStatistics = () => {
    setTimeout(() => {
      const mockData = {
        totalBudget: 10000000,
        usedBudget: 5200000,
        remainingBudget: 4800000,
        budgetUtilization: 52.0,
        totalRequests: 45,
        approvedRequests: 38,
        pendingRequests: 5,
        rejectedRequests: 2,
        approvalRate: 84.4,
        totalOrders: 32,
        completedOrders: 28,
        inProgressOrders: 4,
        totalSuppliers: 25,
        activeSuppliers: 22,
        totalContracts: 30,
        activeContracts: 25
      };
      setStatistics(mockData);
    }, 500);
  };

  const handleCreatePlan = () => {
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleCreateRequest = () => {
    setCurrentRecord(null);
    requestForm.resetFields();
    setRequestModalVisible(true);
  };

  const handleCreateOrder = () => {
    setCurrentRecord(null);
    orderForm.resetFields();
    setOrderModalVisible(true);
  };

  const handleCreateContract = () => {
    setCurrentRecord(null);
    contractForm.resetFields();
    setContractModalVisible(true);
  };

  const handleCreateSupplier = () => {
    setCurrentRecord(null);
    supplierForm.resetFields();
    setSupplierModalVisible(true);
  };

  const handleCreateBudget = () => {
    setCurrentRecord(null);
    budgetForm.resetFields();
    setBudgetModalVisible(true);
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
        setProcurementPlans(procurementPlans.map(item => 
          item.id === currentRecord.id ? newPlan : item
        ));
        message.success('更新成功');
      } else {
        setProcurementPlans([...procurementPlans, newPlan]);
        message.success('创建成功');
      }
      
      setModalVisible(false);
      setLoading(false);
    });
  };

  const handleRequestModalOk = () => {
    requestForm.validateFields().then(values => {
      setLoading(true);
      const newRequest = {
        id: currentRecord ? currentRecord.id : Date.now(),
        requestNo: currentRecord ? currentRecord.requestNo : `PR${moment().format('YYYYMMDD')}${String(Date.now()).slice(-3)}`,
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setProcurementRequests(procurementRequests.map(item => 
          item.id === currentRecord.id ? newRequest : item
        ));
        message.success('更新成功');
      } else {
        setProcurementRequests([...procurementRequests, newRequest]);
        message.success('创建成功');
      }
      
      setRequestModalVisible(false);
      setLoading(false);
    });
  };

  const handleOrderModalOk = () => {
    orderForm.validateFields().then(values => {
      setLoading(true);
      const newOrder = {
        id: currentRecord ? currentRecord.id : Date.now(),
        orderNo: currentRecord ? currentRecord.orderNo : `PO${moment().format('YYYYMMDD')}${String(Date.now()).slice(-3)}`,
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setPurchaseOrders(purchaseOrders.map(item => 
          item.id === currentRecord.id ? newOrder : item
        ));
        message.success('更新成功');
      } else {
        setPurchaseOrders([...purchaseOrders, newOrder]);
        message.success('创建成功');
      }
      
      setOrderModalVisible(false);
      setLoading(false);
    });
  };

  const handleContractModalOk = () => {
    contractForm.validateFields().then(values => {
      setLoading(true);
      const newContract = {
        id: currentRecord ? currentRecord.id : Date.now(),
        contractNo: currentRecord ? currentRecord.contractNo : `CON${moment().format('YYYYMMDD')}${String(Date.now()).slice(-3)}`,
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setContracts(contracts.map(item => 
          item.id === currentRecord.id ? newContract : item
        ));
        message.success('更新成功');
      } else {
        setContracts([...contracts, newContract]);
        message.success('创建成功');
      }
      
      setContractModalVisible(false);
      setLoading(false);
    });
  };

  const handleSupplierModalOk = () => {
    supplierForm.validateFields().then(values => {
      setLoading(true);
      const newSupplier = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setSuppliers(suppliers.map(item => 
          item.id === currentRecord.id ? newSupplier : item
        ));
        message.success('更新成功');
      } else {
        setSuppliers([...suppliers, newSupplier]);
        message.success('创建成功');
      }
      
      setSupplierModalVisible(false);
      setLoading(false);
    });
  };

  const handleBudgetModalOk = () => {
    budgetForm.validateFields().then(values => {
      setLoading(true);
      const newBudget = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setBudgets(budgets.map(item => 
          item.id === currentRecord.id ? newBudget : item
        ));
        message.success('更新成功');
      } else {
        setBudgets([...budgets, newBudget]);
        message.success('创建成功');
      }
      
      setBudgetModalVisible(false);
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
      title: '计划类型',
      dataIndex: 'planType',
      key: 'planType',
      render: (text) => {
        const typeMap = {
          annual: '年度计划',
          quarterly: '季度计划',
          department: '部门计划',
          emergency: '紧急计划'
        };
        return <Tag color="blue">{typeMap[text] || text}</Tag>;
      }
    },
    {
      title: '总预算',
      dataIndex: 'totalBudget',
      key: 'totalBudget',
      render: (value) => <Text type="success">¥{(value || 0).toLocaleString()}</Text>
    },
    {
      title: '已使用',
      dataIndex: 'usedBudget',
      key: 'usedBudget',
      render: (value) => <Text>¥{(value || 0).toLocaleString()}</Text>
    },
    {
      title: '剩余预算',
      dataIndex: 'remainingBudget',
      key: 'remainingBudget',
      render: (value) => <Text type="warning">¥{(value || 0).toLocaleString()}</Text>
    },
    {
      title: '使用率',
      key: 'usageRate',
      render: (_, record) => (
        <Progress
          percent={record.totalBudget > 0 ? (record.usedBudget / record.totalBudget) * 100 : 0}
          size="small"
          status={record.usedBudget / record.totalBudget > 0.8 ? 'exception' : 'normal'}
        />
      )
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
        const status = procurementStatuses.find(s => s.value === text);
        return <Tag color={status ? status.color : 'default'}>{status ? status.label : text}</Tag>;
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
              form.setFieldsValue(record);
              setModalVisible(true);
            }}
          >
            编辑
          </Button>
        </Space>
      )
    }
  ];

  const requestColumns = [
    {
      title: '申请编号',
      dataIndex: 'requestNo',
      key: 'requestNo',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: '设备名称',
      dataIndex: 'equipmentName',
      key: 'equipmentName'
    },
    {
      title: '设备类型',
      dataIndex: 'equipmentType',
      key: 'equipmentType',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: '申请科室',
      dataIndex: 'department',
      key: 'department',
      render: (text) => <Tag color="green">{text}</Tag>
    },
    {
      title: '申请人',
      dataIndex: 'requester',
      key: 'requester'
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: '预估价格',
      dataIndex: 'estimatedPrice',
      key: 'estimatedPrice',
      render: (value) => <Text type="success">¥{(value || 0).toLocaleString()}</Text>
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (text) => {
        const priority = priorityLevels.find(p => p.value === text);
        return <Tag color={priority ? priority.color : 'default'}>{priority ? priority.label : text}</Tag>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const status = procurementStatuses.find(s => s.value === text);
        return <Tag color={status ? status.color : 'default'}>{status ? status.label : text}</Tag>;
      }
    },
    {
      title: '申请日期',
      dataIndex: 'requestDate',
      key: 'requestDate'
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
              requestForm.setFieldsValue(record);
              setRequestModalVisible(true);
            }}
          >
            编辑
          </Button>
          {record.status === 'approved' && (
            <Button
              type="link"
              icon={<ShoppingCartOutlined />}
              onClick={() => {
                setCurrentRecord(record);
                orderForm.setFieldsValue({
                  requestNo: record.requestNo,
                  equipmentName: record.equipmentName,
                  estimatedPrice: record.estimatedPrice
                });
                setOrderModalVisible(true);
              }}
            >
              生成订单
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
            <ShoppingOutlined /> 医疗设备采购管理
          </Title>
          <Text type="secondary">
            管理医院医疗设备的采购计划、申请、订单、合同和供应商管理
          </Text>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="总预算"
                value={statistics.totalBudget || 0}
                prefix={<AccountBookOutlined />}
                suffix="元"
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="已使用"
                value={statistics.usedBudget || 0}
                prefix={<DollarOutlined />}
                suffix="元"
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="剩余预算"
                value={statistics.remainingBudget || 0}
                prefix={<FundOutlined />}
                suffix="元"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="预算使用率"
                value={statistics.budgetUtilization || 0}
                suffix="%"
                prefix={<PercentageOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 关键指标 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={4}>
            <Card title="申请审批率" size="small">
              <Progress
                type="circle"
                percent={statistics.approvalRate || 0}
                width={80}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="总申请数" size="small">
              <Statistic
                value={statistics.totalRequests || 0}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="已批准" size="small">
              <Statistic
                value={statistics.approvedRequests || 0}
                valueStyle={{ fontSize: 20, color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="待审批" size="small">
              <Statistic
                value={statistics.pendingRequests || 0}
                valueStyle={{ fontSize: 20, color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="总订单数" size="small">
              <Statistic
                value={statistics.totalOrders || 0}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="已完成订单" size="small">
              <Statistic
                value={statistics.completedOrders || 0}
                valueStyle={{ fontSize: 20, color: '#52c41a' }}
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
                采购计划
              </span>
            }
            key="plans"
          >
            <Card
              title="采购计划管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreatePlan}
                  >
                    创建计划
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={planColumns}
                dataSource={procurementPlans}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: procurementPlans.length,
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
                <FileAddOutlined />
                采购申请
              </span>
            }
            key="requests"
          >
            <Card
              title="采购申请管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateRequest}
                  >
                    创建申请
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={requestColumns}
                dataSource={procurementRequests}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: procurementRequests.length,
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
                    title: '申请编号',
                    dataIndex: 'requestNo',
                    key: 'requestNo'
                  },
                  {
                    title: '设备名称',
                    dataIndex: 'equipmentName',
                    key: 'equipmentName'
                  },
                  {
                    title: '供应商',
                    dataIndex: 'supplier',
                    key: 'supplier'
                  },
                  {
                    title: '订单金额',
                    dataIndex: 'totalAmount',
                    key: 'totalAmount',
                    render: (value) => <Text type="success">¥{(value || 0).toLocaleString()}</Text>
                  },
                  {
                    title: '订单日期',
                    dataIndex: 'orderDate',
                    key: 'orderDate'
                  },
                  {
                    title: '交付日期',
                    dataIndex: 'deliveryDate',
                    key: 'deliveryDate'
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => {
                      const status = procurementStatuses.find(s => s.value === text);
                      return <Tag color={status ? status.color : 'default'}>{status ? status.label : text}</Tag>;
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
                <SolutionOutlined />
                合同管理
              </span>
            }
            key="contracts"
          >
            <Card
              title="合同管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateContract}
                  >
                    创建合同
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
                    title: '合同编号',
                    dataIndex: 'contractNo',
                    key: 'contractNo',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '合同名称',
                    dataIndex: 'contractName',
                    key: 'contractName'
                  },
                  {
                    title: '供应商',
                    dataIndex: 'supplier',
                    key: 'supplier'
                  },
                  {
                    title: '合同金额',
                    dataIndex: 'totalAmount',
                    key: 'totalAmount',
                    render: (value) => <Text type="success">¥{(value || 0).toLocaleString()}</Text>
                  },
                  {
                    title: '签署日期',
                    dataIndex: 'signDate',
                    key: 'signDate'
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => {
                      const status = contractStatuses.find(s => s.value === text);
                      return <Tag color={status ? status.color : 'default'}>{status ? status.label : text}</Tag>;
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
                          icon={<DownloadOutlined />}
                          onClick={() => {
                            message.info('下载合同功能正在开发中');
                          }}
                        >
                          下载
                        </Button>
                      </Space>
                    )
                  }
                ]}
                dataSource={contracts}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: contracts.length,
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
                <UsergroupAddOutlined />
                供应商管理
              </span>
            }
            key="suppliers"
          >
            <Card
              title="供应商管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateSupplier}
                  >
                    添加供应商
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
                    title: '供应商名称',
                    dataIndex: 'supplierName',
                    key: 'supplierName',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '联系人',
                    dataIndex: 'contactPerson',
                    key: 'contactPerson'
                  },
                  {
                    title: '联系电话',
                    dataIndex: 'phone',
                    key: 'phone'
                  },
                  {
                    title: '合作次数',
                    dataIndex: 'cooperationCount',
                    key: 'cooperationCount'
                  },
                  {
                    title: '合作金额',
                    dataIndex: 'totalAmount',
                    key: 'totalAmount',
                    render: (value) => <Text type="success">¥{(value || 0).toLocaleString()}</Text>
                  },
                  {
                    title: '评级',
                    dataIndex: 'rating',
                    key: 'rating',
                    render: (rating) => (
                      <Rate disabled defaultValue={rating} style={{ fontSize: 14 }} />
                    )
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => (
                      <Tag color={text === 'active' ? 'green' : 'red'}>
                        {text === 'active' ? '活跃' : '停用'}
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
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => {
                            setCurrentRecord(record);
                            supplierForm.setFieldsValue(record);
                            setSupplierModalVisible(true);
                          }}
                        >
                          编辑
                        </Button>
                      </Space>
                    )
                  }
                ]}
                dataSource={suppliers}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: suppliers.length,
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
                <CalculatorIcon />
                预算管理
              </span>
            }
            key="budgets"
          >
            <Card
              title="预算管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateBudget}
                  >
                    创建预算
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
                    title: '预算名称',
                    dataIndex: 'budgetName',
                    key: 'budgetName',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '预算类型',
                    dataIndex: 'budgetType',
                    key: 'budgetType',
                    render: (text) => {
                      const typeMap = {
                        annual: '年度预算',
                        quarterly: '季度预算',
                        department: '部门预算',
                        project: '项目预算'
                      };
                      return <Tag color="blue">{typeMap[text] || text}</Tag>;
                    }
                  },
                  {
                    title: '总预算',
                    dataIndex: 'totalBudget',
                    key: 'totalBudget',
                    render: (value) => <Text type="success">¥{(value || 0).toLocaleString()}</Text>
                  },
                  {
                    title: '已使用',
                    dataIndex: 'usedBudget',
                    key: 'usedBudget',
                    render: (value) => <Text>¥{(value || 0).toLocaleString()}</Text>
                  },
                  {
                    title: '剩余预算',
                    dataIndex: 'remainingBudget',
                    key: 'remainingBudget',
                    render: (value) => <Text type="warning">¥{(value || 0).toLocaleString()}</Text>
                  },
                  {
                    title: '使用率',
                    key: 'usageRate',
                    render: (_, record) => (
                      <Progress
                        percent={record.totalBudget > 0 ? (record.usedBudget / record.totalBudget) * 100 : 0}
                        size="small"
                        status={record.usedBudget / record.totalBudget > 0.8 ? 'exception' : 'normal'}
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
                            budgetForm.setFieldsValue(record);
                            setBudgetModalVisible(true);
                          }}
                        >
                          编辑
                        </Button>
                      </Space>
                    )
                  }
                ]}
                dataSource={budgets}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: budgets.length,
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
            <Card title="采购统计分析">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="供应商统计" size="small">
                    <List
                      dataSource={suppliers}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar icon={<UsergroupAddOutlined />} />}
                            title={item.supplierName}
                            description={`联系人：${item.contactPerson} | 合作次数：${item.cooperationCount}次`}
                          />
                          <div>
                            <Rate disabled defaultValue={item.rating} style={{ fontSize: 14 }} />
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="预算使用情况" size="small">
                    <div style={{ padding: '20px 0' }}>
                      <Alert
                        message="预算概况"
                        description={`总预算：¥${(statistics.totalBudget || 0).toLocaleString()} | 已使用：¥${(statistics.usedBudget || 0).toLocaleString()} | 剩余：¥${(statistics.remainingBudget || 0).toLocaleString()} | 使用率：${statistics.budgetUtilization}%`}
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
        title={currentRecord ? '编辑采购计划' : '创建采购计划'}
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
            planType: 'annual'
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
                label="计划类型"
                name="planType"
                rules={[{ required: true, message: '请选择计划类型' }]}
              >
                <Select placeholder="请选择计划类型">
                  <Option value="annual">年度计划</Option>
                  <Option value="quarterly">季度计划</Option>
                  <Option value="department">部门计划</Option>
                  <Option value="emergency">紧急计划</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="总预算"
                name="totalBudget"
                rules={[{ required: true, message: '请输入总预算' }]}
              >
                <InputNumber
                  min={0}
                  step={1000}
                  style={{ width: '100%' }}
                  formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                />
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
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="审批人"
                name="approver"
              >
                <Input placeholder="请输入审批人" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="状态"
                name="status"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  <Option value="draft">草稿</Option>
                  <Option value="pending">待审批</Option>
                  <Option value="approved">已批准</Option>
                  <Option value="in_procurement">采购中</Option>
                  <Option value="completed">已完成</Option>
                </Select>
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
    </div>
  );
};

export default ProcurementManagement;