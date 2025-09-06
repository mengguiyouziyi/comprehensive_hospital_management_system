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
  BorderOutlined as RulerOutlined,
  ScaleOutlined,
  TrophyOutlined,
  StarOutlined,
  LikeOutlined,
  DislikeOutlined,
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

const MedicalEquipmentMeasurementManagement = () => {
  const [measurementPlans, setMeasurementPlans] = useState([]);
  const [measurementRecords, setMeasurementRecords] = useState([]);
  const [calibrationRecords, setCalibrationRecords] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [standards, setStandards] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [recordModalVisible, setRecordModalVisible] = useState(false);
  const [calibrationModalVisible, setCalibrationModalVisible] = useState(false);
  const [certificateModalVisible, setCertificateModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [scanModalVisible, setScanModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [recordForm] = Form.useForm();
  const [calibrationForm] = Form.useForm();
  const [certificateForm] = Form.useForm();
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

  // 计量参数选项
  const measurementParameters = [
    '电压', '电流', '功率', '频率', '温度', '湿度', '压力', '流量',
    '辐射剂量', '图像质量', '精度', '稳定性', '线性度', '重复性'
  ];

  // 计量状态选项
  const measurementStatuses = [
    { value: 'pending', label: '待计量', color: 'orange' },
    { value: 'in_progress', label: '计量中', color: 'blue' },
    { value: 'completed', label: '已完成', color: 'green' },
    { value: 'failed', label: '不合格', color: 'red' },
    { value: 'overdue', label: '逾期', color: 'purple' }
  ];

  // 校准状态选项
  const calibrationStatuses = [
    { value: 'pending', label: '待校准', color: 'orange' },
    { value: 'in_progress', label: '校准中', color: 'blue' },
    { value: 'completed', label: '已完成', color: 'green' },
    { value: 'failed', label: '校准失败', color: 'red' }
  ];

  // 证书状态选项
  const certificateStatuses = [
    { value: 'active', label: '有效', color: 'green' },
    { value: 'expired', label: '已过期', color: 'red' },
    { value: 'revoked', label: '已撤销', color: 'orange' },
    { value: 'pending', label: '待审核', color: 'blue' }
  ];

  // 初始化数据
  useEffect(() => {
    fetchMeasurementPlans();
    fetchMeasurementRecords();
    fetchCalibrationRecords();
    fetchCertificates();
    fetchEquipment();
    fetchStandards();
    fetchPersonnel();
    fetchStatistics();
  }, []);

  const fetchMeasurementPlans = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          planName: '2024年度CT设备计量计划',
          equipmentType: 'CT设备',
          equipmentCount: 8,
          measurementFrequency: 'annual',
          nextMeasurementDate: '2024-06-15',
          responsiblePerson: '张工程师',
          status: 'pending',
          standard: 'GB/T 19001-2016',
          description: '年度CT设备强制计量计划',
          createdAt: '2024-01-05',
          updatedAt: '2024-01-05'
        },
        {
          id: 2,
          planName: '监护仪季度计量计划',
          equipmentType: '监护仪',
          equipmentCount: 45,
          measurementFrequency: 'quarterly',
          nextMeasurementDate: '2024-03-20',
          responsiblePerson: '李工程师',
          status: 'in_progress',
          standard: 'YY 0069-2016',
          description: '监护仪季度性能计量',
          createdAt: '2024-01-10',
          updatedAt: '2024-01-15'
        }
      ];
      setMeasurementPlans(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchMeasurementRecords = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          equipmentId: 'CT001',
          equipmentName: 'GE Optima CT660',
          equipmentType: 'CT设备',
          department: '放射科',
          measurementDate: '2024-01-15',
          parameter: '辐射剂量',
          standardValue: '≤ 2.5 mGy',
          measuredValue: '2.3 mGy',
          deviation: '0.2 mGy',
          result: 'qualified',
          operator: '张工程师',
          certificateNo: 'JL202401001',
          notes: '计量结果符合标准要求',
          images: ['measurement1.jpg']
        },
        {
          id: 2,
          equipmentId: 'MON001',
          equipmentName: 'Philips IntelliVue MP50',
          equipmentType: '监护仪',
          department: 'ICU',
          measurementDate: '2024-01-16',
          parameter: '心率精度',
          standardValue: '±2 bpm',
          measuredValue: '±3 bpm',
          deviation: '±1 bpm',
          result: 'unqualified',
          operator: '李工程师',
          certificateNo: null,
          notes: '心率精度超出标准范围，需要校准',
          images: ['measurement2.jpg']
        }
      ];
      setMeasurementRecords(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchCalibrationRecords = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          equipmentId: 'MON001',
          equipmentName: 'Philips IntelliVue MP50',
          equipmentType: '监护仪',
          department: 'ICU',
          calibrationDate: '2024-01-17',
          parameter: '心率精度',
          beforeCalibration: '±3 bpm',
          afterCalibration: '±1.5 bpm',
          method: '软件校准',
          operator: '王工程师',
          result: 'success',
          notes: '校准成功，精度恢复正常',
          images: ['calibration1.jpg']
        }
      ];
      setCalibrationRecords(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchCertificates = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          certificateNo: 'JL202401001',
          equipmentId: 'CT001',
          equipmentName: 'GE Optima CT660',
          equipmentType: 'CT设备',
          issueDate: '2024-01-15',
          expiryDate: '2025-01-15',
          issuingAuthority: '国家计量院',
          certificateType: '计量检定证书',
          status: 'active',
          fileUrl: '/certificates/JL202401001.pdf',
          verificationResult: '合格',
          verifier: '张工程师'
        },
        {
          id: 2,
          certificateNo: 'JL202301085',
          equipmentId: 'US001',
          equipmentName: 'Philips HD11',
          equipmentType: '超声设备',
          issueDate: '2023-06-20',
          expiryDate: '2024-06-20',
          issuingAuthority: '省计量院',
          certificateType: '计量检定证书',
          status: 'expired',
          fileUrl: '/certificates/JL202301085.pdf',
          verificationResult: '合格',
          verifier: '李工程师'
        }
      ];
      setCertificates(mockData);
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
          lastMeasurementDate: '2024-01-15',
          nextMeasurementDate: '2025-01-15',
          measurementStatus: 'qualified',
          certificateNo: 'JL202401001',
          certificateStatus: 'active'
        },
        {
          id: 2,
          equipmentId: 'MON001',
          equipmentName: 'Philips IntelliVue MP50',
          equipmentType: '监护仪',
          department: 'ICU',
          location: 'ICU病房1',
          lastMeasurementDate: '2024-01-16',
          nextMeasurementDate: '2024-04-16',
          measurementStatus: 'unqualified',
          certificateNo: null,
          certificateStatus: 'none'
        }
      ];
      setEquipment(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchStandards = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          standardCode: 'GB/T 19001-2016',
          standardName: '质量管理体系要求',
          category: '国家标准',
          applicableEquipment: '所有医疗设备',
          description: '医疗设备质量管理基本要求'
        },
        {
          id: 2,
          standardCode: 'YY 0069-2016',
          standardName: '医用电气设备',
          category: '行业标准',
          applicableEquipment: '监护仪、心电图机等',
          description: '医用电气设备安全要求'
        }
      ];
      setStandards(mockData);
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
          qualification: '计量师',
          certificateNo: 'JLS2023001',
          validUntil: '2025-12-31',
          measurementCount: 156,
          qualificationLevel: '高级'
        },
        {
          id: 2,
          name: '李工程师',
          department: '设备科',
          qualification: '计量员',
          certificateNo: 'JLY2023002',
          validUntil: '2024-12-31',
          measurementCount: 89,
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
        totalEquipment: 1200,
        measuredEquipment: 1156,
        measurementRate: 96.3,
        qualifiedEquipment: 1120,
        qualificationRate: 96.9,
        overdueEquipment: 24,
        upcomingMeasurement: 45,
        activeCertificates: 1080,
        expiredCertificates: 15,
        totalCertificates: 1095
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

  const handleCreateCalibration = () => {
    setCurrentRecord(null);
    calibrationForm.resetFields();
    setCalibrationModalVisible(true);
  };

  const handleCreateCertificate = () => {
    setCurrentRecord(null);
    certificateForm.resetFields();
    setCertificateModalVisible(true);
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
        lastMeasurementDate: '2024-01-15',
        nextMeasurementDate: '2025-01-15',
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
        setMeasurementPlans(measurementPlans.map(item => 
          item.id === currentRecord.id ? newPlan : item
        ));
        message.success('更新成功');
      } else {
        setMeasurementPlans([...measurementPlans, newPlan]);
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
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setMeasurementRecords(measurementRecords.map(item => 
          item.id === currentRecord.id ? newRecord : item
        ));
        message.success('更新成功');
      } else {
        setMeasurementRecords([...measurementRecords, newRecord]);
        message.success('创建成功');
      }
      
      setRecordModalVisible(false);
      setLoading(false);
    });
  };

  const handleCalibrationModalOk = () => {
    calibrationForm.validateFields().then(values => {
      setLoading(true);
      const newCalibration = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setCalibrationRecords(calibrationRecords.map(item => 
          item.id === currentRecord.id ? newCalibration : item
        ));
        message.success('更新成功');
      } else {
        setCalibrationRecords([...calibrationRecords, newCalibration]);
        message.success('创建成功');
      }
      
      setCalibrationModalVisible(false);
      setLoading(false);
    });
  };

  const handleCertificateModalOk = () => {
    certificateForm.validateFields().then(values => {
      setLoading(true);
      const newCertificate = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setCertificates(certificates.map(item => 
          item.id === currentRecord.id ? newCertificate : item
        ));
        message.success('更新成功');
      } else {
        setCertificates([...certificates, newCertificate]);
        message.success('创建成功');
      }
      
      setCertificateModalVisible(false);
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
      key: 'equipmentCount',
      render: (text) => <Badge count={text} showZero />
    },
    {
      title: '计量频率',
      dataIndex: 'measurementFrequency',
      key: 'measurementFrequency',
      render: (text) => {
        const frequencyMap = {
          monthly: '月度',
          quarterly: '季度',
          semiannual: '半年度',
          annual: '年度'
        };
        return <Tag color="green">{frequencyMap[text] || text}</Tag>;
      }
    },
    {
      title: '下次计量日期',
      dataIndex: 'nextMeasurementDate',
      key: 'nextMeasurementDate'
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
        const status = measurementStatuses.find(s => s.value === text);
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
              扫码计量
            </Button>
          )}
        </Space>
      )
    }
  ];

  const recordColumns = [
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
      title: '计量参数',
      dataIndex: 'parameter',
      key: 'parameter'
    },
    {
      title: '标准值',
      dataIndex: 'standardValue',
      key: 'standardValue'
    },
    {
      title: '实测值',
      dataIndex: 'measuredValue',
      key: 'measuredValue'
    },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      render: (text) => {
        const resultMap = {
          qualified: { color: 'green', text: '合格' },
          unqualified: { color: 'red', text: '不合格' },
          borderline: { color: 'orange', text: '临界' }
        };
        const result = resultMap[text] || { color: 'default', text: text };
        return <Tag color={result.color}>{result.text}</Tag>;
      }
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator'
    },
    {
      title: '计量日期',
      dataIndex: 'measurementDate',
      key: 'measurementDate'
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
          {record.result === 'unqualified' && (
            <Button
              type="link"
              icon={<ToolOutlined />}
              onClick={() => {
                setCurrentRecord(record);
                calibrationForm.setFieldsValue({
                  equipmentId: record.equipmentId,
                  equipmentName: record.equipmentName,
                  parameter: record.parameter
                });
                setCalibrationModalVisible(true);
              }}
            >
              校准
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
            <RulerOutlined /> 医疗设备计量管理
          </Title>
          <Text type="secondary">
            管理医院医疗设备的计量计划、执行记录、校准管理和证书管理
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
                title="已计量设备"
                value={statistics.measuredEquipment || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="计量覆盖率"
                value={statistics.measurementRate || 0}
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
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 关键指标 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={4}>
            <Card title="计量完成率" size="small">
              <Progress
                type="circle"
                percent={statistics.measurementRate || 0}
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
                value={statistics.upcomingMeasurement || 0}
                valueStyle={{ fontSize: 20, color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="有效证书" size="small">
              <Statistic
                value={statistics.activeCertificates || 0}
                valueStyle={{ fontSize: 20, color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="过期证书" size="small">
              <Statistic
                value={statistics.expiredCertificates || 0}
                valueStyle={{ fontSize: 20, color: '#f5222d' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="证书总数" size="small">
              <Statistic
                value={statistics.totalCertificates || 0}
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
                计量计划
              </span>
            }
            key="plans"
          >
            <Card
              title="计量计划管理"
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
                    扫码计量
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={planColumns}
                dataSource={measurementPlans}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: measurementPlans.length,
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
                <ExperimentOutlined />
                计量记录
              </span>
            }
            key="records"
          >
            <Card
              title="计量记录管理"
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
                columns={recordColumns}
                dataSource={measurementRecords}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: measurementRecords.length,
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
                校准记录
              </span>
            }
            key="calibration"
          >
            <Card
              title="校准记录管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateCalibration}
                  >
                    添加校准
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
                    title: '校准参数',
                    dataIndex: 'parameter',
                    key: 'parameter'
                  },
                  {
                    title: '校准前',
                    dataIndex: 'beforeCalibration',
                    key: 'beforeCalibration'
                  },
                  {
                    title: '校准后',
                    dataIndex: 'afterCalibration',
                    key: 'afterCalibration'
                  },
                  {
                    title: '校准方法',
                    dataIndex: 'method',
                    key: 'method'
                  },
                  {
                    title: '操作人',
                    dataIndex: 'operator',
                    key: 'operator'
                  },
                  {
                    title: '校准日期',
                    dataIndex: 'calibrationDate',
                    key: 'calibrationDate'
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
                dataSource={calibrationRecords}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: calibrationRecords.length,
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
                <FileProtectOutlined />
                证书管理
              </span>
            }
            key="certificates"
          >
            <Card
              title="计量证书管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateCertificate}
                  >
                    添加证书
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
                    title: '证书编号',
                    dataIndex: 'certificateNo',
                    key: 'certificateNo',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '设备编号',
                    dataIndex: 'equipmentId',
                    key: 'equipmentId'
                  },
                  {
                    title: '设备名称',
                    dataIndex: 'equipmentName',
                    key: 'equipmentName'
                  },
                  {
                    title: '发证日期',
                    dataIndex: 'issueDate',
                    key: 'issueDate'
                  },
                  {
                    title: '到期日期',
                    dataIndex: 'expiryDate',
                    key: 'expiryDate'
                  },
                  {
                    title: '发证机构',
                    dataIndex: 'issuingAuthority',
                    key: 'issuingAuthority'
                  },
                  {
                    title: '证书类型',
                    dataIndex: 'certificateType',
                    key: 'certificateType'
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => {
                      const status = certificateStatuses.find(s => s.value === text);
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
                            message.info('下载证书功能正在开发中');
                          }}
                        >
                          下载
                        </Button>
                      </Space>
                    )
                  }
                ]}
                dataSource={certificates}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: certificates.length,
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
            <Card title="计量统计分析">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="设备计量状态" size="small">
                    <List
                      dataSource={equipment}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar icon={<MedicineBoxOutlined />} />}
                            title={item.equipmentName}
                            description={`科室：${item.department} | 位置：${item.location}`}
                          />
                          <div>
                            <Tag color={item.measurementStatus === 'qualified' ? 'green' : 'red'}>
                              {item.measurementStatus === 'qualified' ? '合格' : '不合格'}
                            </Tag>
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="计量统计" size="small">
                    <div style={{ padding: '20px 0' }}>
                      <Alert
                        message="计量概况"
                        description={`总设备：${statistics.totalEquipment}台 | 已计量：${statistics.measuredEquipment}台 | 合格：${statistics.qualifiedEquipment}台 | 逾期：${statistics.overdueEquipment}台`}
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
        title={currentRecord ? '编辑计量计划' : '创建计量计划'}
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
            measurementFrequency: 'annual'
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
                label="计量频率"
                name="measurementFrequency"
                rules={[{ required: true, message: '请选择计量频率' }]}
              >
                <Select placeholder="请选择计量频率">
                  <Option value="monthly">月度</Option>
                  <Option value="quarterly">季度</Option>
                  <Option value="semiannual">半年度</Option>
                  <Option value="annual">年度</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="下次计量日期"
                name="nextMeasurementDate"
                rules={[{ required: true, message: '请选择下次计量日期' }]}
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
                label="执行标准"
                name="standard"
                rules={[{ required: true, message: '请输入执行标准' }]}
              >
                <Input placeholder="请输入执行标准" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="状态"
                name="status"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  <Option value="pending">待计量</Option>
                  <Option value="in_progress">计量中</Option>
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

      {/* 扫码计量模态框 */}
      <Modal
        title="扫码计量"
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
                <p>上次计量：{scanResult.lastMeasurementDate}</p>
                <p>下次计量：{scanResult.nextMeasurementDate}</p>
              </div>
              <Button type="primary" onClick={() => {
                setScanResult(null);
                setScanning(true);
                setTimeout(() => {
                  setScanning(false);
                  setScanResult({
                    equipmentId: 'MON001',
                    equipmentName: 'Philips IntelliVue MP50',
                    department: 'ICU',
                    location: 'ICU病房1',
                    lastMeasurementDate: '2024-01-16',
                    nextMeasurementDate: '2024-04-16',
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
                <Title level={4}>扫码计量</Title>
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

export default MedicalEquipmentMeasurementManagement;