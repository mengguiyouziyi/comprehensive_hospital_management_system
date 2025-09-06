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
  PlayCircleOutlined as PlayIcon,
  PauseCircleOutlined as PauseIcon,
  StopOutlined as StopIcon,
  ClockCircleOutlined as HistoryIcon,
  FileTextOutlined as DocumentIcon,
  UserOutlined as UserIcon,
  TeamOutlined as TeamIcon,
  RiseOutlined,
  FallOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  LineChartOutlined as TrendIcon,
  PieChartOutlined as PieIcon,
  BarChartOutlined as BarIcon,
  DatabaseOutlined as DataIcon,
  MedicineBoxOutlined as MedicalIcon,
  ExperimentOutlined as LabIcon,
  FileSearchOutlined as SearchIcon,
  FileDoneOutlined as ReportIcon,
  CalendarOutlined as CalendarIcon,
  UsergroupAddOutlined as GroupIcon
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

const MedicalEquipmentUsageRecordManagement = () => {
  const [usageRecords, setUsageRecords] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [patients, setPatients] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [incidentModalVisible, setIncidentModalVisible] = useState(false);
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [scanModalVisible, setScanModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [incidentForm] = Form.useForm();
  const [maintenanceForm] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('records');
  const [filterForm] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // 设备类型选项
  const equipmentTypes = [
    'CT设备', 'DR设备', '超声设备', 'MRI设备', '监护仪', '麻醉机',
    '呼吸机', '心电图机', '内窥镜设备', '检验设备', '放射治疗设备', '其他'
  ];

  // 使用状态选项
  const usageStatuses = [
    { value: 'scheduled', label: '已预约', color: 'blue' },
    { value: 'in_progress', label: '使用中', color: 'green' },
    { value: 'completed', label: '已完成', color: 'gray' },
    { value: 'cancelled', label: '已取消', color: 'red' },
    { value: 'interrupted', label: '中断', color: 'orange' }
  ];

  // 事件类型选项
  const incidentTypes = [
    { value: 'malfunction', label: '设备故障', color: 'red' },
    { value: 'error', label: '操作错误', color: 'orange' },
    { value: 'safety', label: '安全事故', color: 'purple' },
    { value: 'quality', label: '质量问题', color: 'blue' },
    { value: 'other', label: '其他', color: 'gray' }
  ];

  // 事件严重程度选项
  const severityLevels = [
    { value: 'critical', label: '严重', color: 'red' },
    { value: 'major', label: '重要', color: 'orange' },
    { value: 'minor', label: '轻微', color: 'blue' },
    { value: 'info', label: '提示', color: 'green' }
  ];

  // 初始化数据
  useEffect(() => {
    fetchUsageRecords();
    fetchEquipment();
    fetchDepartments();
    fetchPersonnel();
    fetchPatients();
    fetchProcedures();
    fetchMaintenanceRecords();
    fetchIncidents();
    fetchStatistics();
  }, []);

  const fetchUsageRecords = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          recordNo: 'UR202401001',
          equipmentId: 'CT001',
          equipmentName: 'GE Optima CT660',
          equipmentType: 'CT设备',
          department: '放射科',
          operator: '张医生',
          patientId: 'P001',
          patientName: '王先生',
          procedure: '头部CT扫描',
          startTime: '2024-01-15 09:00',
          endTime: '2024-01-15 09:30',
          duration: 30,
          usageStatus: 'completed',
          parameters: {
            voltage: '120kV',
            current: '200mA',
            sliceThickness: '5mm'
          },
          results: {
            imageQuality: 'excellent',
            diagnosticValue: 'high',
            artifacts: 'none'
          },
          notes: '扫描过程正常，图像质量优秀',
          complications: null
        },
        {
          id: 2,
          recordNo: 'UR202401002',
          equipmentId: 'US001',
          equipmentName: 'Philips HD11',
          equipmentType: '超声设备',
          department: '超声科',
          operator: '李医生',
          patientId: 'P002',
          patientName: '李女士',
          procedure: '腹部超声检查',
          startTime: '2024-01-15 10:00',
          endTime: '2024-01-15 10:25',
          duration: 25,
          usageStatus: 'completed',
          parameters: {
            frequency: '3.5MHz',
            mode: 'B-mode',
            depth: '15cm'
          },
          results: {
            imageQuality: 'good',
            diagnosticValue: 'medium',
            artifacts: 'minimal'
          },
          notes: '检查过程顺利',
          complications: null
        },
        {
          id: 3,
          recordNo: 'UR202401003',
          equipmentId: 'MON001',
          equipmentName: 'Philips IntelliVue MP50',
          equipmentType: '监护仪',
          department: 'ICU',
          operator: '赵护士',
          patientId: 'P003',
          patientName: '陈先生',
          procedure: '持续监护',
          startTime: '2024-01-15 08:00',
          endTime: null,
          duration: null,
          usageStatus: 'in_progress',
          parameters: {
            ecg: 'lead II',
            spo2: 'continuous',
            nibp: '15min'
          },
          results: null,
          notes: '患者监护中，生命体征平稳',
          complications: null
        }
      ];
      setUsageRecords(mockData);
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
          totalUsage: 1250,
          monthlyUsage: 85,
          averageDailyUsage: 3.2,
          utilizationRate: 78.5,
          lastMaintenance: '2024-01-10',
          nextMaintenance: '2024-02-10',
          status: 'active'
        },
        {
          id: 2,
          equipmentId: 'US001',
          equipmentName: 'Philips HD11',
          equipmentType: '超声设备',
          department: '超声科',
          location: '超声检查室1',
          totalUsage: 2100,
          monthlyUsage: 120,
          averageDailyUsage: 5.8,
          utilizationRate: 85.2,
          lastMaintenance: '2024-01-08',
          nextMaintenance: '2024-02-08',
          status: 'active'
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
          equipmentCount: 12,
          monthlyUsage: 450,
          utilizationRate: 82.3,
          lastIncident: '2024-01-10'
        },
        {
          id: 2,
          name: '超声科',
          director: '李主任',
          equipmentCount: 8,
          monthlyUsage: 380,
          utilizationRate: 76.8,
          lastIncident: '2024-01-12'
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
          name: '张医生',
          department: '放射科',
          role: '主治医师',
          certification: 'CT操作证书',
          totalOperations: 850,
          experience: 5,
          efficiency: 92.5,
          status: 'active'
        },
        {
          id: 2,
          name: '李医生',
          department: '超声科',
          role: '副主任医师',
          certification: '超声诊断证书',
          totalOperations: 1200,
          experience: 8,
          efficiency: 88.3,
          status: 'active'
        }
      ];
      setPersonnel(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchPatients = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          patientId: 'P001',
          name: '王先生',
          age: 45,
          gender: '男',
          department: '放射科',
          admissionDate: '2024-01-14',
          diagnosis: '头痛待查',
          totalExaminations: 3
        },
        {
          id: 2,
          patientId: 'P002',
          name: '李女士',
          age: 32,
          gender: '女',
          department: '超声科',
          admissionDate: '2024-01-13',
          diagnosis: '腹痛待查',
          totalExaminations: 2
        }
      ];
      setPatients(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchProcedures = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: '头部CT扫描',
          equipmentType: 'CT设备',
          typicalDuration: 30,
          complexity: 'medium',
          frequency: 15,
          successRate: 98.5,
          description: '头部CT扫描检查'
        },
        {
          id: 2,
          name: '腹部超声检查',
          equipmentType: '超声设备',
          typicalDuration: 25,
          complexity: 'low',
          frequency: 28,
          successRate: 99.2,
          description: '腹部超声检查'
        }
      ];
      setProcedures(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchMaintenanceRecords = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          recordNo: 'MN202401001',
          equipmentId: 'CT001',
          equipmentName: 'GE Optima CT660',
          maintenanceType: 'preventive',
          maintenanceDate: '2024-01-10',
          technician: '王工程师',
          description: '常规预防性维护',
          result: 'normal',
          nextMaintenance: '2024-02-10'
        }
      ];
      setMaintenanceRecords(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchIncidents = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          incidentNo: 'IN202401001',
          recordNo: 'UR202401001',
          equipmentId: 'CT001',
          equipmentName: 'GE Optima CT660',
          incidentType: 'malfunction',
          severity: 'minor',
          description: '扫描过程中出现轻微噪音',
          occurredTime: '2024-01-15 09:15',
          resolvedTime: '2024-01-15 09:20',
          operator: '张医生',
          technician: '王工程师',
          resolution: '调整设备位置，噪音消失',
          impact: 'minimal',
          status: 'resolved'
        }
      ];
      setIncidents(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchStatistics = () => {
    setTimeout(() => {
      const mockData = {
        totalEquipment: 85,
        activeEquipment: 82,
        totalUsage: 12500,
        monthlyUsage: 2850,
        averageUtilization: 76.8,
        totalOperators: 45,
        certifiedOperators: 42,
        totalProcedures: 156,
        monthlyProcedures: 1250,
        totalIncidents: 12,
        resolvedIncidents: 11,
        averageResponseTime: 15.5
      };
      setStatistics(mockData);
    }, 500);
  };

  const handleCreateRecord = () => {
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleCreateIncident = () => {
    setCurrentRecord(null);
    incidentForm.resetFields();
    setIncidentModalVisible(true);
  };

  const handleCreateMaintenance = () => {
    setCurrentRecord(null);
    maintenanceForm.resetFields();
    setMaintenanceModalVisible(true);
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
        status: 'active',
        lastUsage: '2024-01-15 09:30',
        operator: '张医生'
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
      const newRecord = {
        id: currentRecord ? currentRecord.id : Date.now(),
        recordNo: currentRecord ? currentRecord.recordNo : `UR${moment().format('YYYYMMDD')}${String(Date.now()).slice(-3)}`,
        ...values,
        operator: '当前用户',
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setUsageRecords(usageRecords.map(item => 
          item.id === currentRecord.id ? newRecord : item
        ));
        message.success('更新成功');
      } else {
        setUsageRecords([...usageRecords, newRecord]);
        message.success('创建成功');
      }
      
      setModalVisible(false);
      setLoading(false);
    });
  };

  const handleIncidentModalOk = () => {
    incidentForm.validateFields().then(values => {
      setLoading(true);
      const newIncident = {
        id: currentRecord ? currentRecord.id : Date.now(),
        incidentNo: currentRecord ? currentRecord.incidentNo : `IN${moment().format('YYYYMMDD')}${String(Date.now()).slice(-3)}`,
        ...values,
        occurredTime: moment().format('YYYY-MM-DD HH:mm'),
        status: 'pending',
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setIncidents(incidents.map(item => 
          item.id === currentRecord.id ? newIncident : item
        ));
        message.success('更新成功');
      } else {
        setIncidents([...incidents, newIncident]);
        message.success('创建成功');
      }
      
      setIncidentModalVisible(false);
      setLoading(false);
    });
  };

  const recordColumns = [
    {
      title: '记录编号',
      dataIndex: 'recordNo',
      key: 'recordNo',
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
      title: '操作员',
      dataIndex: 'operator',
      key: 'operator'
    },
    {
      title: '患者',
      dataIndex: 'patientName',
      key: 'patientName'
    },
    {
      title: '检查项目',
      dataIndex: 'procedure',
      key: 'procedure'
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime'
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text) => text || <Text type="secondary">进行中</Text>
    },
    {
      title: '使用时长',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration) => duration ? `${duration} 分钟` : '-'
    },
    {
      title: '状态',
      dataIndex: 'usageStatus',
      key: 'usageStatus',
      render: (text) => {
        const status = usageStatuses.find(s => s.value === text);
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
          {record.usageStatus === 'in_progress' && (
            <Button
              type="link"
              icon={<StopIcon />}
              onClick={() => {
                // 结束使用
                message.info('结束使用功能正在开发中');
              }}
            >
              结束
            </Button>
          )}
          <Button
            type="link"
            icon={<AlertOutlined />}
            onClick={() => {
              setCurrentRecord(record);
              incidentForm.setFieldsValue({
                recordNo: record.recordNo,
                equipmentId: record.equipmentId,
                equipmentName: record.equipmentName
              });
              setIncidentModalVisible(true);
            }}
          >
            报告事件
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
            <HistoryIcon /> 医疗设备使用记录管理
          </Title>
          <Text type="secondary">
            管理医院医疗设备的使用记录、事件报告、维护跟踪和统计分析
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
                title="活跃设备"
                value={statistics.activeEquipment || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="月使用次数"
                value={statistics.monthlyUsage || 0}
                prefix={<CalendarIcon />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="平均利用率"
                value={statistics.averageUtilization || 0}
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
            <Card title="设备利用率" size="small">
              <Progress
                type="circle"
                percent={statistics.averageUtilization || 0}
                width={80}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="总操作员" size="small">
              <Statistic
                value={statistics.totalOperators || 0}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="持证人员" size="small">
              <Statistic
                value={statistics.certifiedOperators || 0}
                valueStyle={{ fontSize: 20, color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="检查项目" size="small">
              <Statistic
                value={statistics.totalProcedures || 0}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="事件总数" size="small">
              <Statistic
                value={statistics.totalIncidents || 0}
                valueStyle={{ fontSize: 20, color: '#f5222d' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card title="已解决事件" size="small">
              <Statistic
                value={statistics.resolvedIncidents || 0}
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
                <DocumentIcon />
                使用记录
              </span>
            }
            key="records"
          >
            <Card
              title="设备使用记录管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateRecord}
                  >
                    添加记录
                  </Button>
                  <Button icon={<ScanOutlined />} onClick={handleScanEquipment}>
                    扫码使用
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={recordColumns}
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
                <MedicalIcon />
                设备管理
              </span>
            }
            key="equipment"
          >
            <Card
              title="使用设备管理"
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
                    title: '总使用次数',
                    dataIndex: 'totalUsage',
                    key: 'totalUsage'
                  },
                  {
                    title: '月使用次数',
                    dataIndex: 'monthlyUsage',
                    key: 'monthlyUsage'
                  },
                  {
                    title: '平均日使用',
                    dataIndex: 'averageDailyUsage',
                    key: 'averageDailyUsage',
                    render: (value) => `${value} 次`
                  },
                  {
                    title: '利用率',
                    dataIndex: 'utilizationRate',
                    key: 'utilizationRate',
                    render: (rate) => (
                      <Progress
                        percent={rate}
                        size="small"
                        status={rate >= 80 ? 'success' : rate >= 60 ? 'normal' : 'exception'}
                      />
                    )
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => (
                      <Tag color={text === 'active' ? 'green' : 'red'}>
                        {text === 'active' ? '正常' : '停用'}
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
                          icon={<PlayIcon />}
                          onClick={() => {
                            setCurrentRecord(record);
                            form.setFieldsValue({
                              equipmentId: record.equipmentId,
                              equipmentName: record.equipmentName,
                              department: record.department
                            });
                            setModalVisible(true);
                          }}
                        >
                          开始使用
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
                <UserIcon />
                人员管理
              </span>
            }
            key="personnel"
          >
            <Card
              title="操作人员管理"
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
                    dataIndex: 'certification',
                    key: 'certification'
                  },
                  {
                    title: '操作次数',
                    dataIndex: 'totalOperations',
                    key: 'totalOperations'
                  },
                  {
                    title: '工作经验',
                    dataIndex: 'experience',
                    key: 'experience',
                    render: (years) => <Text>{years} 年</Text>
                  },
                  {
                    title: '操作效率',
                    dataIndex: 'efficiency',
                    key: 'efficiency',
                    render: (rate) => (
                      <Progress
                        percent={rate}
                        size="small"
                        status={rate >= 90 ? 'success' : rate >= 80 ? 'normal' : 'exception'}
                      />
                    )
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => (
                      <Tag color={text === 'active' ? 'green' : 'red'}>
                        {text === 'active' ? '在岗' : '离岗'}
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
                <AlertOutlined />
                事件管理
              </span>
            }
            key="incidents"
          >
            <Card
              title="使用事件管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateIncident}
                  >
                    报告事件
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
                    title: '事件编号',
                    dataIndex: 'incidentNo',
                    key: 'incidentNo',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: '记录编号',
                    dataIndex: 'recordNo',
                    key: 'recordNo'
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
                    title: '事件类型',
                    dataIndex: 'incidentType',
                    key: 'incidentType',
                    render: (text) => {
                      const type = incidentTypes.find(t => t.value === text);
                      return <Tag color={type ? type.color : 'default'}>{type ? type.label : text}</Tag>;
                    }
                  },
                  {
                    title: '严重程度',
                    dataIndex: 'severity',
                    key: 'severity',
                    render: (text) => {
                      const severity = severityLevels.find(s => s.value === text);
                      return <Tag color={severity ? severity.color : 'default'}>{severity ? severity.label : text}</Tag>;
                    }
                  },
                  {
                    title: '发生时间',
                    dataIndex: 'occurredTime',
                    key: 'occurredTime'
                  },
                  {
                    title: '操作员',
                    dataIndex: 'operator',
                    key: 'operator'
                  },
                  {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description'
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => {
                      const statusMap = {
                        pending: { color: 'orange', text: '待处理' },
                        investigating: { color: 'blue', text: '调查中' },
                        resolved: { color: 'green', text: '已解决' },
                        closed: { color: 'gray', text: '已关闭' }
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
                        {record.status === 'pending' && (
                          <Button
                            type="link"
                            icon={<ToolOutlined />}
                            onClick={() => {
                              // 处理事件
                              message.info('事件处理功能正在开发中');
                            }}
                          >
                            处理
                          </Button>
                        )}
                      </Space>
                    )
                  }
                ]}
                dataSource={incidents}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: incidents.length,
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
                <BarIcon />
                统计分析
              </span>
            }
            key="statistics"
          >
            <Card title="使用统计分析">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="设备使用统计" size="small">
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
                            <Progress
                              percent={item.utilizationRate}
                              size="small"
                              status={item.utilizationRate >= 80 ? 'success' : item.utilizationRate >= 60 ? 'normal' : 'exception'}
                            />
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="使用概况" size="small">
                    <div style={{ padding: '20px 0' }}>
                      <Alert
                        message="使用概况"
                        description={`总设备：${statistics.totalEquipment}台 | 活跃设备：${statistics.activeEquipment}台 | 月使用：${statistics.monthlyUsage}次 | 平均利用率：${statistics.averageUtilization}% | 总事件：${statistics.totalIncidents}起`}
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

      {/* 添加记录模态框 */}
      <Modal
        title={currentRecord ? '编辑使用记录' : '添加使用记录'}
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
            usageStatus: 'scheduled'
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备编号"
                name="equipmentId"
                rules={[{ required: true, message: '请选择设备' }]}
              >
                <Select placeholder="请选择设备">
                  {equipment.map(eq => (
                    <Option key={eq.equipmentId} value={eq.equipmentId}>
                      {eq.equipmentName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="患者"
                name="patientId"
                rules={[{ required: true, message: '请选择患者' }]}
              >
                <Select placeholder="请选择患者">
                  {patients.map(patient => (
                    <Option key={patient.patientId} value={patient.patientId}>
                      {patient.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="检查项目"
                name="procedure"
                rules={[{ required: true, message: '请输入检查项目' }]}
              >
                <Input placeholder="请输入检查项目" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="操作员"
                name="operator"
                rules={[{ required: true, message: '请输入操作员' }]}
              >
                <Input placeholder="请输入操作员" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="开始时间"
                name="startTime"
                rules={[{ required: true, message: '请选择开始时间' }]}
              >
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="结束时间"
                name="endTime"
              >
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="使用状态"
                name="usageStatus"
                rules={[{ required: true, message: '请选择使用状态' }]}
              >
                <Select placeholder="请选择使用状态">
                  <Option value="scheduled">已预约</Option>
                  <Option value="in_progress">使用中</Option>
                  <Option value="completed">已完成</Option>
                  <Option value="cancelled">已取消</Option>
                  <Option value="interrupted">中断</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="使用时长(分钟)"
                name="duration"
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="备注"
            name="notes"
          >
            <TextArea
              rows={4}
              placeholder="请输入使用备注"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 扫码使用模态框 */}
      <Modal
        title="扫码使用"
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
                <p>设备状态：{scanResult.status === 'active' ? '正常' : '异常'}</p>
                <p>上次使用：{scanResult.lastUsage}</p>
                <p>上次操作员：{scanResult.operator}</p>
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
                    location: '超声检查室1',
                    status: 'active',
                    lastUsage: '2024-01-15 10:25',
                    operator: '李医生'
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
                <Title level={4}>扫码使用</Title>
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

export default MedicalEquipmentUsageRecordManagement;