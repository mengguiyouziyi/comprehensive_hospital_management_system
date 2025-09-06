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
  ThunderboltOutlined as BoltOutlined,
  SafetyCertificateOutlined as SafetyIcon,
  ExperimentOutlined as LabIcon,
  CheckCircleOutlined as CheckIcon,
  ClockCircleOutlined as ClockIcon,
  FileProtectOutlined as CertificateIcon,
  TeamOutlined as TeamIcon,
  RiseOutlined,
  FallOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  HeatMapOutlined,
  MedicineBoxOutlined as MedicalIcon,
  BugOutlined as BugIcon,
  FireOutlined,
  WaterOutlined,
  CloudOutlined,
  GlobalOutlined,
  EnvironmentOutlined
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

const EquipmentDisinfectionManagement = () => {
  const [disinfectionPlans, setDisinfectionPlans] = useState([]);
  const [disinfectionRecords, setDisinfectionRecords] = useState([]);
  const [validationRecords, setValidationRecords] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [disinfectants, setDisinfectants] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [recordModalVisible, setRecordModalVisible] = useState(false);
  const [validationModalVisible, setValidationModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [scanModalVisible, setScanModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [recordForm] = Form.useForm();
  const [validationForm] = Form.useForm();
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

  // 消毒级别选项
  const disinfectionLevels = [
    { value: 'routine', label: '常规消毒', color: 'green' },
    { value: 'enhanced', label: '加强消毒', color: 'blue' },
    { value: 'terminal', label: '终末消毒', color: 'orange' },
    { value: 'emergency', label: '紧急消毒', color: 'red' }
  ];

  // 消毒方式选项
  const disinfectionMethods = [
    { value: 'chemical', label: '化学消毒' },
    { value: 'physical', label: '物理消毒' },
    { value: 'radiation', label: '辐射消毒' },
    { value: 'filtration', label: '过滤消毒' },
    { value: 'combined', label: '综合消毒' }
  ];

  // 验证状态选项
  const validationStatuses = [
    { value: 'passed', label: '合格', color: 'green' },
    { value: 'failed', label: '不合格', color: 'red' },
    { value: 'retest', label: '复检中', color: 'orange' },
    { value: 'pending', label: '待检测', color: 'blue' }
  ];

  // 消毒状态选项
  const disinfectionStatuses = [
    { value: 'pending', label: '待消毒', color: 'orange' },
    { value: 'in_progress', label: '消毒中', color: 'blue' },
    { value: 'completed', label: '已完成', color: 'green' },
    { value: 'failed', label: '消毒失败', color: 'red' },
    { value: 'overdue', label: '逾期', color: 'purple' }
  ];

  // 初始化数据
  useEffect(() => {
    fetchDisinfectionPlans();
    fetchDisinfectionRecords();
    fetchValidationRecords();
    fetchEquipment();
    fetchDisinfectants();
    fetchPersonnel();
    fetchStatistics();
  }, []);

  const fetchDisinfectionPlans = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          planName: '2024年度内窥镜设备消毒计划',
          equipmentType: '内窥镜设备',
          equipmentCount: 12,
          disinfectionFrequency: 'daily',
          nextDisinfectionDate: '2024-01-16',
          responsiblePerson: '张护士',
          approver: '李护士长',
          approvalDate: '2024-01-10',
          status: 'in_progress',
          description: '内窥镜设备日常消毒计划',
          createdAt: '2024-01-05',
          updatedAt: '2024-01-15'
        },
        {
          id: 2,
          planName: '手术室设备终末消毒计划',
          equipmentType: '麻醉机',
          equipmentCount: 8,
          disinfectionFrequency: 'per_use',
          nextDisinfectionDate: '2024-01-16',
          responsiblePerson: '王护士',
          approver: '赵护士长',
          approvalDate: '2024-01-12',
          status: 'pending',
          description: '手术室设备使用后终末消毒',
          createdAt: '2024-01-08',
          updatedAt: '2024-01-08'
        }
      ];
      setDisinfectionPlans(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchDisinfectionRecords = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          equipmentId: 'END001',
          equipmentName: '奥林巴斯内窥镜',
          equipmentType: '内窥镜设备',
          department: '内镜中心',
          disinfectionDate: '2024-01-15',
          disinfectionLevel: 'routine',
          disinfectionMethod: 'chemical',
          disinfectant: '戊二醛',
          concentration: '2%',
          duration: 45,
          operator: '张护士',
          validator: '李护士',
          result: 'qualified',
          notes: '常规消毒，结果合格',
          images: ['disinfection1.jpg']
        },
        {
          id: 2,
          equipmentId: 'ANES001',
          equipmentName: 'Drager麻醉机',
          equipmentType: '麻醉机',
          department: '手术室',
          disinfectionDate: '2024-01-15',
          disinfectionLevel: 'terminal',
          disinfectionMethod: 'chemical',
          disinfectant: '含氯消毒剂',
          concentration: '1000mg/L',
          duration: 30,
          operator: '王护士',
          validator: '赵护士',
          result: 'qualified',
          notes: '手术后终末消毒，结果合格',
          images: ['disinfection2.jpg']
        }
      ];
      setDisinfectionRecords(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchValidationRecords = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          recordId: 1,
          equipmentId: 'END001',
          equipmentName: '奥林巴斯内窥镜',
          validationDate: '2024-01-15',
          validator: '李护士',
          validationMethod: '生物指示剂',
          testResult: 'negative',
          atpValue: 15,
          standardValue: '< 30',
          result: 'passed',
          notes: '生物监测阴性，ATP值合格',
          images: ['validation1.jpg']
        },
        {
          id: 2,
          recordId: 2,
          equipmentId: 'ANES001',
          equipmentName: 'Drager麻醉机',
          validationDate: '2024-01-15',
          validator: '赵护士',
          validationMethod: 'ATP检测',
          testResult: null,
          atpValue: 8,
          standardValue: '< 30',
          result: 'passed',
          notes: 'ATP检测合格',
          images: ['validation2.jpg']
        }
      ];
      setValidationRecords(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchEquipment = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          equipmentId: 'END001',
          equipmentName: '奥林巴斯内窥镜',
          equipmentType: '内窥镜设备',
          department: '内镜中心',
          location: '内镜检查室1',
          lastDisinfectionDate: '2024-01-15',
          nextDisinfectionDate: '2024-01-16',
          disinfectionStatus: 'completed',
          disinfectionFrequency: 'daily',
          riskLevel: 'high'
        },
        {
          id: 2,
          equipmentId: 'ANES001',
          equipmentName: 'Drager麻醉机',
          equipmentType: '麻醉机',
          department: '手术室',
          location: '手术室1',
          lastDisinfectionDate: '2024-01-15',
          nextDisinfectionDate: '2024-01-16',
          disinfectionStatus: 'completed',
          disinfectionFrequency: 'per_use',
          riskLevel: 'medium'
        }
      ];
      setEquipment(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchDisinfectants = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: '戊二醛',
          type: '化学消毒剂',
          concentration: '2%',
          effectiveTime: 45,
          shelfLife: 24,
          supplier: '华康医疗',
          standard: 'GB 27954-2020',
          description: '高效消毒剂，适用于内窥镜消毒'
        },
        {
          id: 2,
          name: '含氯消毒剂',
          type: '化学消毒剂',
          concentration: '1000mg/L',
          effectiveTime: 30,
          shelfLife: 12,
          supplier: '消毒剂厂',
          standard: 'GB/T 36758-2018',
          description: '广谱消毒剂，适用于环境表面消毒'
        }
      ];
      setDisinfectants(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchPersonnel = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: '张护士',
          department: '内镜中心',
          role: '消毒专员',
          certificate: '消毒技术证书',
          validUntil: '2025-12-31',
          disinfectionCount: 156,
          qualificationLevel: '高级'
        },
        {
          id: 2,
          name: '李护士',
          department: '内镜中心',
          role: '消毒验证员',
          certificate: '微生物检测证书',
          validUntil: '2024-12-31',
          validationCount: 89,
          qualificationLevel: '中级'
        }
      ];
      setPersonnel(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchStatistics = () => {
    setTimeout(() => {
      const mockData = {
        totalEquipment: 450,
        disinfectedEquipment: 438,
        disinfectionRate: 97.3,
        qualifiedEquipment: 435,
        qualificationRate: 99.3,
        overdueEquipment: 8,
        upcomingDisinfection: 25,
        totalDisinfectants: 15,
        activeDisinfectants: 12,
        monthlyDisinfection: 2850,
        personnelCount: 18
      };
      setStatistics(mockData);
    }, 500);
  };

  const handleCreatePlan = () => {
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleCreateRecord = () => {
    setCurrentRecord(null);
    recordForm.resetFields();
    setRecordModalVisible(true);
  };

  const handleCreateValidation = () => {
    setCurrentRecord(null);
    validationForm.resetFields();
    setValidationModalVisible(true);
  };

  const handleScanEquipment = () => {
    setScanning(true);
    setScanModalVisible(true);
    
    // 模拟扫码过程
    setTimeout(() => {
      setScanning(false);
      setScanResult({
        equipmentId: 'END001',
        equipmentName: '奥林巴斯内窥镜',
        department: '内镜中心',
        location: '内镜检查室1',
        lastDisinfectionDate: '2024-01-15',
        nextDisinfectionDate: '2024-01-16',
        status: 'found'
      });
      message.success('扫码成功！');
    }, 2000);
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
        setDisinfectionPlans(disinfectionPlans.map(item => 
          item.id === currentRecord.id ? newPlan : item
        ));
        message.success('更新成功');
      } else {
        setDisinfectionPlans([...disinfectionPlans, newPlan]);
        message.success('创建成功');
      }
      
      setModalVisible(false);
      setLoading(false);
    });
  };

  const handleRecordModalOk = () => {
    recordForm.validateFields().then(values => {
      setLoading(true);
      const newRecord = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        operator: '当前用户',
        operationTime: moment().format('YYYY-MM-DD HH:mm'),
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setDisinfectionRecords(disinfectionRecords.map(item => 
          item.id === currentRecord.id ? newRecord : item
        ));
        message.success('更新成功');
      } else {
        setDisinfectionRecords([...disinfectionRecords, newRecord]);
        message.success('创建成功');
      }
      
      setRecordModalVisible(false);
      setLoading(false);
    });
  };

  const handleValidationModalOk = () => {
    validationForm.validateFields().then(values => {
      setLoading(true);
      const newValidation = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        validator: '当前用户',
        validationDate: moment().format('YYYY-MM-DD'),
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setValidationRecords(validationRecords.map(item => 
          item.id === currentRecord.id ? newValidation : item
        ));
        message.success('更新成功');
      } else {
        setValidationRecords([...validationRecords, newValidation]);
        message.success('创建成功');
      }
      
      setValidationModalVisible(false);
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
      title: '设备数量',
      dataIndex: 'equipmentCount',
      key: 'equipmentCount'
    },
    {
      title: '消毒频率',
      dataIndex: 'disinfectionFrequency',
      key: 'disinfectionFrequency',
      render: (text) => {
        const frequencyMap = {
          hourly: '每小时',
          daily: '每日',
          weekly: '每周',
          monthly: '每月',
          quarterly: '每季度',
          per_use: '每次使用后'
        };
        return <Tag color="green">{frequencyMap[text] || text}</Tag>;
      }
    },
    {
      title: '下次消毒日期',
      dataIndex: 'nextDisinfectionDate',
      key: 'nextDisinfectionDate'
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
        const status = disinfectionStatuses.find(s => s.value === text);
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
          {record.status === 'pending' && (
            <Button
              type="link"
              icon={<ScanOutlined />}
              onClick={handleScanEquipment}
            >
              扫码消毒
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
            <SafetyIcon /> 医疗设备消毒管理
          </Title>
          <Text type="secondary">
            管理医院医疗设备的消毒计划、执行记录、验证和质量控制
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
                title="已消毒设备"
                value={statistics.disinfectedEquipment || 0}
                prefix={<CheckIcon />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="消毒覆盖率"
                value={statistics.disinfectionRate || 0}
                suffix="%"
                prefix={<PercentageOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="合格率"
                value={statistics.qualificationRate || 0}
                suffix="%"
                prefix={<CertificateIcon />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 关键指标 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={4}>
            <Card title="消毒完成率" size="small">
              <Progress
                type="circle"
                percent={statistics.disinfectionRate || 0}
                width={80}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="逾期设备" size="small">
              <Statistic
                value={statistics.overdueEquipment || 0}
                valueStyle={{ fontSize: 20, color: '#f5222d' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="即将到期" size="small">
              <Statistic
                value={statistics.upcomingDisinfection || 0}
                valueStyle={{ fontSize: 20, color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="月消毒次数" size="small">
              <Statistic
                value={statistics.monthlyDisinfection || 0}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="消毒剂种类" size="small">
              <Statistic
                value={statistics.totalDisinfectants || 0}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="消毒人员" size="small">
              <Statistic
                value={statistics.personnelCount || 0}
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
                消毒计划
              </span>
            }
            key="plans"
          >
            <Card
              title="消毒计划管理"
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
                    扫码消毒
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={planColumns}
                dataSource={disinfectionPlans}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: disinfectionPlans.length,
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
                <BoltOutlined />
                消毒记录
              </span>
            }
            key="records"
          >
            <Card
              title="消毒记录管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateRecord}
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
                    title: '消毒日期',
                    dataIndex: 'disinfectionDate',
                    key: 'disinfectionDate'
                  },
                  {
                    title: '消毒级别',
                    dataIndex: 'disinfectionLevel',
                    key: 'disinfectionLevel',
                    render: (text) => {
                      const level = disinfectionLevels.find(l => l.value === text);
                      return <Tag color={level ? level.color : 'default'}>{level ? level.label : text}</Tag>;
                    }
                  },
                  {
                    title: '消毒方式',
                    dataIndex: 'disinfectionMethod',
                    key: 'disinfectionMethod',
                    render: (text) => {
                      const method = disinfectionMethods.find(m => m.value === text);
                      return <Tag color="purple">{method ? method.label : text}</Tag>;
                    }
                  },
                  {
                    title: '消毒剂',
                    dataIndex: 'disinfectant',
                    key: 'disinfectant'
                  },
                  {
                    title: '操作人',
                    dataIndex: 'operator',
                    key: 'operator'
                  },
                  {
                    title: '结果',
                    dataIndex: 'result',
                    key: 'result',
                    render: (text) => {
                      const resultMap = {
                        qualified: { color: 'green', text: '合格' },
                        unqualified: { color: 'red', text: '不合格' },
                        retest: { color: 'orange', text: '复检' }
                      };
                      const result = resultMap[text] || { color: 'default', text: text };
                      return <Tag color={result.color}>{result.text}</Tag>;
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
                          icon={<LabIcon />}
                          onClick={() => {
                            setCurrentRecord(record);
                            validationForm.setFieldsValue({
                              recordId: record.id,
                              equipmentId: record.equipmentId,
                              equipmentName: record.equipmentName
                            });
                            setValidationModalVisible(true);
                          }}
                        >
                          验证
                        </Button>
                      </Space>
                    )
                  }
                ]}
                dataSource={disinfectionRecords}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: disinfectionRecords.length,
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
                <LabIcon />
                验证记录
              </span>
            }
            key="validation"
          >
            <Card
              title="消毒验证记录管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateValidation}
                  >
                    添加验证
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
                    title: '验证日期',
                    dataIndex: 'validationDate',
                    key: 'validationDate'
                  },
                  {
                    title: '验证人',
                    dataIndex: 'validator',
                    key: 'validator'
                  },
                  {
                    title: '验证方法',
                    dataIndex: 'validationMethod',
                    key: 'validationMethod',
                    render: (text) => {
                      const methodMap = {
                        biological: '生物指示剂',
                        chemical: '化学指示剂',
                        atp: 'ATP检测',
                        visual: '目视检查',
                        microbial: '微生物培养'
                      };
                      return <Tag color="blue">{methodMap[text] || text}</Tag>;
                    }
                  },
                  {
                    title: 'ATP值',
                    dataIndex: 'atpValue',
                    key: 'atpValue'
                  },
                  {
                    title: '标准值',
                    dataIndex: 'standardValue',
                    key: 'standardValue'
                  },
                  {
                    title: '结果',
                    dataIndex: 'result',
                    key: 'result',
                    render: (text) => {
                      const status = validationStatuses.find(s => s.value === text);
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
                      </Space>
                    )
                  }
                ]}
                dataSource={validationRecords}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: validationRecords.length,
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
                <MedicalIcon />
                设备管理
              </span>
            }
            key="equipment"
          >
            <Card
              title="消毒设备管理"
              extra={
                <Space>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={[
                  {
                    title: '设备编号',
                    dataIndex: 'equipmentId',
                    key: 'equipmentId',
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
                    title: '科室',
                    dataIndex: 'department',
                    key: 'department',
                    render: (text) => <Tag color="green">{text}</Tag>
                  },
                  {
                    title: '位置',
                    dataIndex: 'location',
                    key: 'location'
                  },
                  {
                    title: '消毒频率',
                    dataIndex: 'disinfectionFrequency',
                    key: 'disinfectionFrequency',
                    render: (text) => {
                      const frequencyMap = {
                        hourly: '每小时',
                        daily: '每日',
                        weekly: '每周',
                        monthly: '每月',
                        quarterly: '每季度',
                        per_use: '每次使用后'
                      };
                      return <Tag color="orange">{frequencyMap[text] || text}</Tag>;
                    }
                  },
                  {
                    title: '上次消毒',
                    dataIndex: 'lastDisinfectionDate',
                    key: 'lastDisinfectionDate'
                  },
                  {
                    title: '下次消毒',
                    dataIndex: 'nextDisinfectionDate',
                    key: 'nextDisinfectionDate'
                  },
                  {
                    title: '状态',
                    dataIndex: 'disinfectionStatus',
                    key: 'disinfectionStatus',
                    render: (text) => {
                      const status = disinfectionStatuses.find(s => s.value === text);
                      return <Tag color={status ? status.color : 'default'}>{status ? status.label : text}</Tag>;
                    }
                  },
                  {
                    title: '风险等级',
                    dataIndex: 'riskLevel',
                    key: 'riskLevel',
                    render: (text) => {
                      const riskMap = {
                        high: { color: 'red', text: '高风险' },
                        medium: { color: 'orange', text: '中风险' },
                        low: { color: 'green', text: '低风险' }
                      };
                      const risk = riskMap[text] || { color: 'default', text: text };
                      return <Tag color={risk.color}>{risk.text}</Tag>;
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
                          icon={<BoltOutlined />}
                          onClick={() => {
                            setCurrentRecord(record);
                            recordForm.setFieldsValue({
                              equipmentId: record.equipmentId,
                              equipmentName: record.equipmentName,
                              department: record.department
                            });
                            setRecordModalVisible(true);
                          }}
                        >
                          消毒
                        </Button>
                      </Space>
                    )
                  }
                ]}
                dataSource={equipment}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: equipment.length,
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
                <EnvironmentOutlined />
                消毒剂管理
              </span>
            }
            key="disinfectants"
          >
            <Card
              title="消毒剂管理"
              extra={
                <Space>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={[
                  {
                    title: '消毒剂名称',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '类型',
                    dataIndex: 'type',
                    key: 'type',
                    render: (text) => <Tag color="blue">{text}</Tag>
                  },
                  {
                    title: '浓度',
                    dataIndex: 'concentration',
                    key: 'concentration'
                  },
                  {
                    title: '作用时间',
                    dataIndex: 'effectiveTime',
                    key: 'effectiveTime',
                    render: (time) => <Text>{time} 分钟</Text>
                  },
                  {
                    title: '保质期',
                    dataIndex: 'shelfLife',
                    key: 'shelfLife',
                    render: (months) => <Text>{months} 个月</Text>
                  },
                  {
                    title: '供应商',
                    dataIndex: 'supplier',
                    key: 'supplier'
                  },
                  {
                    title: '执行标准',
                    dataIndex: 'standard',
                    key: 'standard'
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
                dataSource={disinfectants}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: disinfectants.length,
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
                <TeamIcon />
                人员管理
              </span>
            }
            key="personnel"
          >
            <Card
              title="消毒人员管理"
              extra={
                <Space>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={[
                  {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '科室',
                    dataIndex: 'department',
                    key: 'department',
                    render: (text) => <Tag color="green">{text}</Tag>
                  },
                  {
                    title: '角色',
                    dataIndex: 'role',
                    key: 'role'
                  },
                  {
                    title: '资质证书',
                    dataIndex: 'certificate',
                    key: 'certificate'
                  },
                  {
                    title: '有效期至',
                    dataIndex: 'validUntil',
                    key: 'validUntil'
                  },
                  {
                    title: '消毒次数',
                    dataIndex: 'disinfectionCount',
                    key: 'disinfectionCount'
                  },
                  {
                    title: '资质等级',
                    dataIndex: 'qualificationLevel',
                    key: 'qualificationLevel',
                    render: (level) => {
                      const levelMap = {
                        senior: '高级',
                        intermediate: '中级',
                        junior: '初级'
                      };
                      return <Tag color="purple">{levelMap[level] || level}</Tag>;
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
                      </Space>
                    )
                  }
                ]}
                dataSource={personnel}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: personnel.length,
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
            <Card title="消毒统计分析">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="设备消毒状态" size="small">
                    <List
                      dataSource={equipment}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar icon={<MedicalIcon />} />}
                            title={item.equipmentName}
                            description={`科室：${item.department} | 位置：${item.location}`}
                          />
                          <div>
                            <Tag color={disinfectionStatuses.find(s => s.value === item.disinfectionStatus)?.color || 'default'}>
                              {disinfectionStatuses.find(s => s.value === item.disinfectionStatus)?.label || item.disinfectionStatus}
                            </Tag>
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="消毒概况" size="small">
                    <div style={{ padding: '20px 0' }}>
                      <Alert
                        message="消毒概况"
                        description={`总设备：${statistics.totalEquipment}台 | 已消毒：${statistics.disinfectedEquipment}台 | 合格：${statistics.qualifiedEquipment}台 | 逾期：${statistics.overdueEquipment}台 | 消毒率：${statistics.disinfectionRate}%`}
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
        title={currentRecord ? '编辑消毒计划' : '创建消毒计划'}
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
            status: 'pending',
            disinfectionFrequency: 'daily'
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
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备数量"
                name="equipmentCount"
                rules={[{ required: true, message: '请输入设备数量' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="消毒频率"
                name="disinfectionFrequency"
                rules={[{ required: true, message: '请选择消毒频率' }]}
              >
                <Select placeholder="请选择消毒频率">
                  <Option value="hourly">每小时</Option>
                  <Option value="daily">每日</Option>
                  <Option value="weekly">每周</Option>
                  <Option value="monthly">每月</Option>
                  <Option value="quarterly">每季度</Option>
                  <Option value="per_use">每次使用后</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="下次消毒日期"
                name="nextDisinfectionDate"
                rules={[{ required: true, message: '请选择下次消毒日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
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
                  <Option value="pending">待消毒</Option>
                  <Option value="in_progress">消毒中</Option>
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

      {/* 扫码消毒模态框 */}
      <Modal
        title="扫码消毒"
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
                <p>上次消毒：{scanResult.lastDisinfectionDate}</p>
                <p>下次消毒：{scanResult.nextDisinfectionDate}</p>
              </div>
              <Button type="primary" onClick={() => {
                setScanResult(null);
                setScanning(true);
                setTimeout(() => {
                  setScanning(false);
                  setScanResult({
                    equipmentId: 'ANES001',
                    equipmentName: 'Drager麻醉机',
                    department: '手术室',
                    location: '手术室1',
                    lastDisinfectionDate: '2024-01-15',
                    nextDisinfectionDate: '2024-01-16',
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
                <Title level={4}>扫码消毒</Title>
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

export default EquipmentDisinfectionManagement;