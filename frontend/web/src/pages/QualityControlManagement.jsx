import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Badge,
  Tabs,
  Descriptions,
  List,
  Avatar,
  Typography,
  Space,
  Tooltip,
  message,
  Progress,
  Divider,
  Alert,
  Popconfirm,
  Switch,
  Radio,
  DatePicker,
  InputNumber,
  Cascader,
  Tree,
  Checkbox,
  Transfer,
  Slider,
  Rate,
  TimePicker,
  Upload,
  notification,
  Dropdown,
  Menu,
  Timeline,
  Result,
  Spin
} from 'antd';
import {
  FileProtectOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  BellOutlined,
  FileTextOutlined as FileIcon,
  MedicineBoxOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  UserOutlined,
  ToolOutlined,
  RiseOutlined,
  FallOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  UnlockOutlined,
  ApiOutlined,
  BranchesOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  ReloadOutlined,
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
  SecurityScanOutlined,
  MonitorOutlined,
  GlobalOutlined,
  MailOutlined,
  MessageOutlined,
  WechatOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  FilterOutlined,
  ExportOutlined,
  ImportOutlined,
  ClearOutlined,
  SettingOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserSwitchOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  EditFilled,
  DeleteFilled,
  LoginOutlined,
  LogoutOutlined,
  WarningFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  FileSearchOutlined,
  FileAddOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileUnknownOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  FolderAddOutlined,
  FolderDeleteOutlined,
  DatabaseFilled,
  SecurityScanFilled,
  ShieldFilled,
  BugOutlined,
  BugFilled,
  ExceptionOutlined,
  ExceptionFilled,
  FireOutlined,
  FireFilled,
  AlertOutlined,
  AlertFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
  LoadingOutlined,
  AuditOutlined,
  VerifiedUserOutlined,
  GavelOutlined,
  PolicyOutlined,
  FileTextOutlined as AssignmentOutlined,
  CheckCircleOutlined as AssignmentTurnedInOutlined,
  AssignmentLateOutlined,
  FolderSpecialOutlined,
  LibraryBooksOutlined,
  SafetyOutlined,
  SecurityOutlined,
  FileProtectOutlined as PrivacyTipOutlined,
  DeleteOutlined as LocalPharmacyOutlined,
  FireOutlined as LocalFireDepartmentOutlined,
  SafetyCertificateOutlined as HealthAndSafetyOutlined,
  BarChartOutlined,
  AuditOutlined as TroubleshootOutlined,
  HeartOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
  ZapOutlined,
  BugReportOutlined,
  SafetyCertificateOutlined as QcOutlined,
  ExperimentOutlined as ScienceOutlined,
  BiotechOutlined,
  MedicalServicesOutlined,
  MonitorHeartOutlined,
  PrecisionManufacturingOutlined
} from '@ant-design/icons';
import './QualityControlManagement.css';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { TreeNode } = Tree;
const { RangePicker } = DatePicker;
const { Search } = Input;

const QualityControlManagement = () => {
  const [qcPlans, setQcPlans] = useState([]);
  const [qcExecutions, setQcExecutions] = useState([]);
  const [qcTemplates, setQcTemplates] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [executionModalVisible, setExecutionModalVisible] = useState(false);
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
  });

  // 模拟数据
  useEffect(() => {
    const mockQcPlans = [
      {
        id: 1,
        title: 'CT设备年度质控检测',
        equipmentType: 'CT',
        equipmentName: 'GE Lightspeed VCT',
        department: '影像科',
        frequency: 'yearly',
        status: 'active',
        priority: 'high',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        nextCheckDate: '2024-06-15',
        responsiblePerson: '张质控员',
        template: 'CT设备质控标准模板',
        description: '按照国家规范对CT设备进行全面的质控检测',
        standard: 'GB/T 19001-2016'
      },
      {
        id: 2,
        title: 'DR设备季度质控检测',
        equipmentType: 'DR',
        equipmentName: 'Philips DigitalDiagnost',
        department: '放射科',
        frequency: 'quarterly',
        status: 'pending',
        priority: 'medium',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        nextCheckDate: '2024-03-20',
        responsiblePerson: '李技术员',
        template: 'DR设备质控标准模板',
        description: '对DR设备进行图像质量和辐射剂量检测',
        standard: 'YY/T 0001-2018'
      },
      {
        id: 3,
        title: '超声设备月度质控检测',
        equipmentType: '超声',
        equipmentName: 'Philips EPIQ 7',
        department: '超声科',
        frequency: 'monthly',
        status: 'overdue',
        priority: 'high',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        nextCheckDate: '2024-02-10',
        responsiblePerson: '王工程师',
        template: '超声设备质控标准模板',
        description: '对超声设备进行图像质量和功能检测',
        standard: 'YY/T 0002-2018'
      },
      {
        id: 4,
        title: '核磁共振设备半年质控检测',
        equipmentType: 'MRI',
        equipmentName: 'Siemens Magnetom',
        department: '影像科',
        frequency: 'semi_annual',
        status: 'completed',
        priority: 'high',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        nextCheckDate: '2024-06-01',
        responsiblePerson: '赵专家',
        template: 'MRI设备质控标准模板',
        description: '对核磁共振设备进行全面的质控检测',
        standard: 'GB/T 19001-2016'
      },
      {
        id: 5,
        title: '监护仪设备季度质控检测',
        equipmentType: '监护仪',
        equipmentName: 'Philips IntelliVue MP50',
        department: 'ICU',
        frequency: 'quarterly',
        status: 'active',
        priority: 'medium',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        nextCheckDate: '2024-04-15',
        responsiblePerson: '孙护士长',
        template: '监护仪质控标准模板',
        description: '对监护仪设备进行参数和功能检测',
        standard: 'YY/T 0003-2018'
      },
      {
        id: 6,
        title: '麻醉机设备月度质控检测',
        equipmentType: '麻醉机',
        equipmentName: 'Dräger Fabius GS',
        department: '麻醉科',
        frequency: 'monthly',
        status: 'in_progress',
        priority: 'high',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        nextCheckDate: '2024-02-25',
        responsiblePerson: '周麻醉师',
        template: '麻醉机质控标准模板',
        description: '对麻醉机设备进行安全性和功能检测',
        standard: 'YY/T 0004-2018'
      }
    ];

    const mockQcExecutions = [
      {
        id: 1,
        planId: 1,
        executionDate: '2024-01-15',
        executor: '张质控员',
        status: 'passed',
        result: '合格',
        score: 95,
        maxScore: 100,
        findings: 2,
        recommendations: 3,
        executionTime: 120,
        remarks: '设备运行正常，各项指标符合标准',
        images: ['image1.jpg', 'image2.jpg']
      },
      {
        id: 2,
        planId: 2,
        executionDate: '2024-01-20',
        executor: '李技术员',
        status: 'failed',
        result: '不合格',
        score: 72,
        maxScore: 100,
        findings: 5,
        recommendations: 7,
        executionTime: 90,
        remarks: '图像质量需要调整，建议重新校准',
        images: ['image3.jpg']
      },
      {
        id: 3,
        planId: 3,
        executionDate: '2024-01-25',
        executor: '王工程师',
        status: 'warning',
        result: '基本合格',
        score: 82,
        maxScore: 100,
        findings: 3,
        recommendations: 4,
        executionTime: 110,
        remarks: '部分功能需要优化，整体可用',
        images: ['image4.jpg', 'image5.jpg']
      }
    ];

    const mockQcTemplates = [
      {
        id: 1,
        name: 'CT设备质控标准模板',
        category: 'CT',
        version: 'v2.0',
        items: 25,
        status: 'active',
        description: 'CT设备质控检测标准模板，包含图像质量、辐射剂量等检测项目',
        standard: 'GB/T 19001-2016',
        createdBy: '张专家',
        createdAt: '2024-01-01'
      },
      {
        id: 2,
        name: 'DR设备质控标准模板',
        category: 'DR',
        version: 'v1.5',
        items: 20,
        status: 'active',
        description: 'DR设备质控检测标准模板，包含图像质量、空间分辨率等检测项目',
        standard: 'YY/T 0001-2018',
        createdBy: '李工程师',
        createdAt: '2024-01-05'
      },
      {
        id: 3,
        name: '超声设备质控标准模板',
        category: '超声',
        version: 'v1.8',
        items: 18,
        status: 'active',
        description: '超声设备质控检测标准模板，包含图像质量、多普勒功能等检测项目',
        standard: 'YY/T 0002-2018',
        createdBy: '王技术员',
        createdAt: '2024-01-10'
      }
    ];

    const mockStatistics = {
      totalPlans: 156,
      activePlans: 89,
      completedPlans: 45,
      overduePlans: 12,
      pendingPlans: 10,
      averageScore: 87.5,
      highPriorityPlans: 45,
      mediumPriorityPlans: 78,
      lowPriorityPlans: 33,
      monthlyExecutions: 23,
      quarterlyExecutions: 67,
      yearlyExecutions: 66,
      categoryStats: [
        { category: 'CT', count: 35, passed: 30, failed: 2 },
        { category: 'DR', count: 28, passed: 25, failed: 1 },
        { category: '超声', count: 32, passed: 28, failed: 2 },
        { category: 'MRI', count: 18, passed: 16, failed: 1 },
        { category: '监护仪', count: 25, passed: 23, failed: 1 },
        { category: '麻醉机', count: 18, passed: 15, failed: 2 }
      ]
    };

    setQcPlans(mockQcPlans);
    setQcExecutions(mockQcExecutions);
    setQcTemplates(mockQcTemplates);
    setStatistics(mockStatistics);
    setPagination(prev => ({ ...prev, total: mockQcPlans.length }));
  }, []);

  // 表格列定义
  const planColumns = [
    {
      title: '质控计划',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (title, record) => (
        <div>
          <Text strong>{title}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.equipmentName}
          </Text>
        </div>
      )
    },
    {
      title: '设备类型',
      dataIndex: 'equipmentType',
      key: 'equipmentType',
      width: 100,
      render: (type) => {
        const typeMap = {
          'CT': { color: 'blue', text: 'CT' },
          'DR': { color: 'green', text: 'DR' },
          '超声': { color: 'orange', text: '超声' },
          'MRI': { color: 'purple', text: 'MRI' },
          '监护仪': { color: 'cyan', text: '监护仪' },
          '麻醉机': { color: 'red', text: '麻醉机' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '负责科室',
      dataIndex: 'department',
      key: 'department',
      width: 100,
      render: (department) => (
        <Tag color="blue">{department}</Tag>
      )
    },
    {
      title: '检测频率',
      dataIndex: 'frequency',
      key: 'frequency',
      width: 100,
      render: (frequency) => {
        const frequencyMap = {
          'monthly': { color: 'red', text: '月度' },
          'quarterly': { color: 'orange', text: '季度' },
          'semi_annual': { color: 'blue', text: '半年' },
          'yearly': { color: 'green', text: '年度' }
        };
        const config = frequencyMap[frequency] || { color: 'default', text: frequency };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const statusMap = {
          'active': { status: 'processing', color: 'blue', text: '进行中' },
          'pending': { status: 'default', color: 'default', text: '待开始' },
          'overdue': { status: 'error', color: 'red', text: '逾期' },
          'completed': { status: 'success', color: 'green', text: '已完成' },
          'in_progress': { status: 'warning', color: 'orange', text: '检测中' }
        };
        const config = statusMap[status] || { status: 'default', color: 'default', text: status };
        return <Badge status={config.status} text={config.text} />;
      }
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 80,
      render: (priority) => {
        const priorityMap = {
          'high': { color: 'red', text: '高' },
          'medium': { color: 'orange', text: '中' },
          'low': { color: 'green', text: '低' }
        };
        const config = priorityMap[priority] || { color: 'default', text: priority };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '下次检测',
      dataIndex: 'nextCheckDate',
      key: 'nextCheckDate',
      width: 100,
      render: (date) => (
        <Text>{date}</Text>
      )
    },
    {
      title: '负责人',
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson',
      width: 100,
      render: (person) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text>{person}</Text>
        </Space>
      )
    },
    {
      title: '操作',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              onClick={() => handleViewPlanDetail(record)}
            />
          </Tooltip>
          {record.status === 'pending' && (
            <Tooltip title="开始检测">
              <Button 
                type="text" 
                icon={<ExperimentOutlined />}
                onClick={() => handleStartExecution(record)}
              />
            </Tooltip>
          )}
          {record.status === 'active' && (
            <Tooltip title="执行检测">
              <Button 
                type="text" 
                icon={<ScienceOutlined />}
                onClick={() => handleContinueExecution(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="编辑计划">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEditPlan(record)}
            />
          </Tooltip>
          <Tooltip title="导出报告">
            <Button 
              type="text" 
              icon={<ExportOutlined />}
              onClick={() => handleExportReport(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const executionColumns = [
    {
      title: '检测日期',
      dataIndex: 'executionDate',
      key: 'executionDate',
      width: 100,
      render: (date) => (
        <Text>{date}</Text>
      )
    },
    {
      title: '执行人',
      dataIndex: 'executor',
      key: 'executor',
      width: 100,
      render: (executor) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text>{executor}</Text>
        </Space>
      )
    },
    {
      title: '检测结果',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const statusMap = {
          'passed': { status: 'success', color: 'green', text: '合格' },
          'failed': { status: 'error', color: 'red', text: '不合格' },
          'warning': { status: 'warning', color: 'orange', text: '基本合格' }
        };
        const config = statusMap[status] || { status: 'default', color: 'default', text: status };
        return <Badge status={config.status} text={config.text} />;
      }
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      width: 80,
      render: (score, record) => {
        const percentage = (score / record.maxScore) * 100;
        let color = '#52c41a';
        if (percentage < 60) color = '#ff4d4f';
        else if (percentage < 80) color = '#fa8c16';
        
        return (
          <div>
            <Text strong style={{ color }}>{score}</Text>
            <Text type="secondary">/{record.maxScore}</Text>
          </div>
        );
      }
    },
    {
      title: '发现问题',
      dataIndex: 'findings',
      key: 'findings',
      width: 80,
      render: (findings) => (
        <Badge count={findings} style={{ backgroundColor: '#ff4d4f' }} />
      )
    },
    {
      title: '执行时间',
      dataIndex: 'executionTime',
      key: 'executionTime',
      width: 80,
      render: (time) => (
        <Text>{time}分钟</Text>
      )
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              onClick={() => handleViewExecutionDetail(record)}
            />
          </Tooltip>
          <Tooltip title="导出报告">
            <Button 
              type="text" 
              icon={<ExportOutlined />}
              onClick={() => handleExportExecutionReport(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const templateColumns = [
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (name, record) => (
        <div>
          <Text strong>{name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            版本: {record.version}
          </Text>
        </div>
      )
    },
    {
      title: '设备类型',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      )
    },
    {
      title: '检测项目',
      dataIndex: 'items',
      key: 'items',
      width: 80,
      render: (items) => (
        <Badge count={items} style={{ backgroundColor: '#1890ff' }} />
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status) => {
        const statusMap = {
          'active': { status: 'success', color: 'green', text: '启用' },
          'inactive': { status: 'default', color: 'default', text: '停用' }
        };
        const config = statusMap[status] || { status: 'default', color: 'default', text: status };
        return <Badge status={config.status} text={config.text} />;
      }
    },
    {
      title: '创建者',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 100,
      render: (createdBy) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text>{createdBy}</Text>
        </Space>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      render: (date) => (
        <Text>{date}</Text>
      )
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              onClick={() => handleViewTemplateDetail(record)}
            />
          </Tooltip>
          <Tooltip title="编辑模板">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEditTemplate(record)}
            />
          </Tooltip>
          <Tooltip title="使用模板">
            <Button 
              type="text" 
              icon={<AssignmentTurnedInOutlined />}
              onClick={() => handleUseTemplate(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  // 处理函数
  const handleViewPlanDetail = (record) => {
    setSelectedRecord(record);
    setPlanModalVisible(true);
  };

  const handleStartExecution = (record) => {
    message.info('开始质控检测功能正在开发中');
  };

  const handleContinueExecution = (record) => {
    message.info('继续质控检测功能正在开发中');
  };

  const handleEditPlan = (record) => {
    message.info('编辑质控计划功能正在开发中');
  };

  const handleExportReport = (record) => {
    message.success('报告导出功能正在开发中');
  };

  const handleViewExecutionDetail = (record) => {
    setSelectedRecord(record);
    setExecutionModalVisible(true);
  };

  const handleExportExecutionReport = (record) => {
    message.success('执行报告导出功能正在开发中');
  };

  const handleViewTemplateDetail = (record) => {
    setSelectedRecord(record);
    setTemplateModalVisible(true);
  };

  const handleEditTemplate = (record) => {
    message.info('编辑模板功能正在开发中');
  };

  const handleUseTemplate = (record) => {
    message.info('使用模板功能正在开发中');
  };

  const handleCreatePlan = () => {
    message.info('创建质控计划功能正在开发中');
  };

  const handleCreateTemplate = () => {
    message.info('创建模板功能正在开发中');
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    setFilters(filters);
  };

  const handleSearch = (value) => {
    message.info(`搜索功能正在开发中: ${value}`);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'active': '#1890ff',
      'pending': '#666',
      'overdue': '#ff4d4f',
      'completed': '#52c41a',
      'in_progress': '#fa8c16'
    };
    return colorMap[status] || '#666';
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      'high': '#ff4d4f',
      'medium': '#fa8c16',
      'low': '#52c41a'
    };
    return colorMap[priority] || '#666';
  };

  // 渲染质控计划详情
  const renderPlanDetailContent = () => {
    if (!selectedRecord) return null;

    return (
      <div>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="质控计划">{selectedRecord.title}</Descriptions.Item>
          <Descriptions.Item label="设备类型">
            <Tag color="blue">{selectedRecord.equipmentType}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="设备名称">{selectedRecord.equipmentName}</Descriptions.Item>
          <Descriptions.Item label="负责科室">{selectedRecord.department}</Descriptions.Item>
          <Descriptions.Item label="检测频率">
            <Tag color="orange">{selectedRecord.frequency === 'monthly' ? '月度' : 
                              selectedRecord.frequency === 'quarterly' ? '季度' :
                              selectedRecord.frequency === 'semi_annual' ? '半年' : '年度'}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="计划状态">
            <Badge 
              status={selectedRecord.status === 'active' ? 'processing' :
                     selectedRecord.status === 'pending' ? 'default' :
                     selectedRecord.status === 'overdue' ? 'error' :
                     selectedRecord.status === 'completed' ? 'success' : 'warning'} 
              text={selectedRecord.status === 'active' ? '进行中' :
                    selectedRecord.status === 'pending' ? '待开始' :
                    selectedRecord.status === 'overdue' ? '逾期' :
                    selectedRecord.status === 'completed' ? '已完成' : '检测中'}
            />
          </Descriptions.Item>
          <Descriptions.Item label="优先级">
            <Tag color={getPriorityColor(selectedRecord.priority)}>
              {selectedRecord.priority === 'high' ? '高' :
               selectedRecord.priority === 'medium' ? '中' : '低'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="负责人">{selectedRecord.responsiblePerson}</Descriptions.Item>
          <Descriptions.Item label="下次检测">{selectedRecord.nextCheckDate}</Descriptions.Item>
          <Descriptions.Item label="计划开始">{selectedRecord.startDate}</Descriptions.Item>
          <Descriptions.Item label="计划结束">{selectedRecord.endDate}</Descriptions.Item>
          <Descriptions.Item label="检测模板">{selectedRecord.template}</Descriptions.Item>
          <Descriptions.Item label="执行标准">{selectedRecord.standard}</Descriptions.Item>
          <Descriptions.Item label="计划描述" span={2}>
            <Text>{selectedRecord.description}</Text>
          </Descriptions.Item>
        </Descriptions>

        {selectedRecord.status === 'overdue' && (
          <div style={{ marginTop: 16 }}>
            <Alert
              message="计划逾期"
              description="该质控检测计划已逾期，请立即安排检测。"
              type="error"
              showIcon
            />
          </div>
        )}

        {selectedRecord.status === 'pending' && (
          <div style={{ marginTop: 16 }}>
            <Alert
              message="待开始检测"
              description="该质控检测计划即将开始，请做好准备工作。"
              type="warning"
              showIcon
            />
          </div>
        )}
      </div>
    );
  };

  // 渲染执行记录详情
  const renderExecutionDetailContent = () => {
    if (!selectedRecord) return null;

    return (
      <div>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="检测日期">{selectedRecord.executionDate}</Descriptions.Item>
          <Descriptions.Item label="执行人">{selectedRecord.executor}</Descriptions.Item>
          <Descriptions.Item label="检测结果">
            <Badge 
              status={selectedRecord.status === 'passed' ? 'success' :
                     selectedRecord.status === 'failed' ? 'error' : 'warning'} 
              text={selectedRecord.status === 'passed' ? '合格' :
                    selectedRecord.status === 'failed' ? '不合格' : '基本合格'}
            />
          </Descriptions.Item>
          <Descriptions.Item label="检测得分">
            <div>
              <Text strong style={{ 
                color: selectedRecord.score >= 80 ? '#52c41a' : 
                       selectedRecord.score >= 60 ? '#fa8c16' : '#ff4d4f' 
              }}>
                {selectedRecord.score}
              </Text>
              <Text type="secondary">/{selectedRecord.maxScore}</Text>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="发现问题">{selectedRecord.findings} 个</Descriptions.Item>
          <Descriptions.Item label="改进建议">{selectedRecord.recommendations} 条</Descriptions.Item>
          <Descriptions.Item label="执行时间">{selectedRecord.executionTime} 分钟</Descriptions.Item>
          <Descriptions.Item label="检测结果">{selectedRecord.result}</Descriptions.Item>
          <Descriptions.Item label="检测备注" span={2}>
            <Text>{selectedRecord.remarks}</Text>
          </Descriptions.Item>
        </Descriptions>

        {selectedRecord.status === 'failed' && (
          <div style={{ marginTop: 16 }}>
            <Alert
              message="检测不合格"
              description="该设备质控检测结果不合格，需要立即采取纠正措施。"
              type="error"
              showIcon
            />
          </div>
        )}

        {selectedRecord.status === 'warning' && (
          <div style={{ marginTop: 16 }}>
            <Alert
              message="基本合格"
              description="该设备质控检测结果基本合格，但存在一些问题需要改进。"
              type="warning"
              showIcon
            />
          </div>
        )}
      </div>
    );
  };

  // 渲染模板详情
  const renderTemplateDetailContent = () => {
    if (!selectedRecord) return null;

    return (
      <div>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="模板名称">{selectedRecord.name}</Descriptions.Item>
          <Descriptions.Item label="模板版本">{selectedRecord.version}</Descriptions.Item>
          <Descriptions.Item label="设备类型">
            <Tag color="blue">{selectedRecord.category}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="检测项目">{selectedRecord.items} 个</Descriptions.Item>
          <Descriptions.Item label="模板状态">
            <Badge 
              status={selectedRecord.status === 'active' ? 'success' : 'default'} 
              text={selectedRecord.status === 'active' ? '启用' : '停用'}
            />
          </Descriptions.Item>
          <Descriptions.Item label="执行标准">{selectedRecord.standard}</Descriptions.Item>
          <Descriptions.Item label="创建者">{selectedRecord.createdBy}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{selectedRecord.createdAt}</Descriptions.Item>
          <Descriptions.Item label="模板描述" span={2}>
            <Text>{selectedRecord.description}</Text>
          </Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: 16 }}>
          <Title level={5}>检测项目列表</Title>
          <List
            dataSource={[
              { id: 1, name: '图像质量检测', standard: '≥90分', required: true },
              { id: 2, name: '辐射剂量检测', standard: '≤标准值', required: true },
              { id: 3, name: '机械性能检测', standard: '正常', required: true },
              { id: 4, name: '电气安全检测', standard: '合格', required: true },
              { id: 5, name: '软件功能检测', standard: '正常', required: false }
            ]}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size="small" icon={<QcOutlined />} />}
                  title={
                    <div>
                      <Text strong>{item.name}</Text>
                      {item.required && <Tag color="red" size="small">必检</Tag>}
                    </div>
                  }
                  description={`标准要求: ${item.standard}`}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="quality-control-management">
      {/* 页面标题 */}
      <div className="qc-header">
        <Title level={2} className="page-title">
          <QcOutlined className="page-icon" />
          质控检测管理
        </Title>
        <Space>
          <Button 
            icon={<ExportOutlined />}
            onClick={() => message.success('数据导出功能正在开发中')}
          >
            数据导出
          </Button>
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreatePlan}
          >
            创建质控计划
          </Button>
        </Space>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="qc-stats">
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="总计划数"
              value={statistics.totalPlans || 0}
              prefix={<FileProtectOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="进行中"
              value={statistics.activePlans || 0}
              prefix={<LoadingOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="已完成"
              value={statistics.completedPlans || 0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="逾期计划"
              value={statistics.overduePlans || 0}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="待开始"
              value={statistics.pendingPlans || 0}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#666' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="平均得分"
              value={statistics.averageScore || 0}
              suffix="分"
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card className="qc-content">
        <Tabs defaultActiveKey="plans" className="qc-tabs">
          <TabPane 
            tab={
              <span>
                <FileProtectOutlined />
                质控计划
              </span>
            } 
            key="plans"
          >
            <div className="tab-content">
              {/* 搜索和筛选区域 */}
              <div className="filter-section">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={6}>
                    <Search
                      placeholder="搜索质控计划..."
                      onSearch={handleSearch}
                      style={{ width: '100%' }}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Select
                      placeholder="选择状态"
                      style={{ width: '100%' }}
                      onChange={(value) => handleFilterChange('status', value)}
                    >
                      <Option value="all">全部状态</Option>
                      <Option value="active">进行中</Option>
                      <Option value="pending">待开始</Option>
                      <Option value="overdue">逾期</Option>
                      <Option value="completed">已完成</Option>
                      <Option value="in_progress">检测中</Option>
                    </Select>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Select
                      placeholder="设备类型"
                      style={{ width: '100%' }}
                      onChange={(value) => handleFilterChange('equipmentType', value)}
                    >
                      <Option value="all">全部类型</Option>
                      <Option value="CT">CT</Option>
                      <Option value="DR">DR</Option>
                      <Option value="超声">超声</Option>
                      <Option value="MRI">MRI</Option>
                      <Option value="监护仪">监护仪</Option>
                      <Option value="麻醉机">麻醉机</Option>
                    </Select>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Select
                      placeholder="检测频率"
                      style={{ width: '100%' }}
                      onChange={(value) => handleFilterChange('frequency', value)}
                    >
                      <Option value="all">全部频率</Option>
                      <Option value="monthly">月度</Option>
                      <Option value="quarterly">季度</Option>
                      <Option value="semi_annual">半年</Option>
                      <Option value="yearly">年度</Option>
                    </Select>
                  </Col>
                </Row>
              </div>

              {/* 质控计划表格 */}
              <Table
                columns={planColumns}
                dataSource={qcPlans}
                rowKey="id"
                pagination={pagination}
                onChange={handleTableChange}
                loading={loading}
                rowClassName={(record) => 
                  record.status === 'overdue' ? 'error-row' : 
                  record.status === 'pending' ? 'warning-row' : ''
                }
              />
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <ScienceOutlined />
                检测记录
              </span>
            } 
            key="executions"
          >
            <div className="tab-content">
              {/* 搜索和筛选区域 */}
              <div className="filter-section">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={6}>
                    <Search
                      placeholder="搜索检测记录..."
                      onSearch={handleSearch}
                      style={{ width: '100%' }}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Select
                      placeholder="选择结果"
                      style={{ width: '100%' }}
                      onChange={(value) => handleFilterChange('result', value)}
                    >
                      <Option value="all">全部结果</Option>
                      <Option value="passed">合格</Option>
                      <Option value="failed">不合格</Option>
                      <Option value="warning">基本合格</Option>
                    </Select>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <DatePicker
                      placeholder="选择日期"
                      style={{ width: '100%' }}
                      onChange={(value) => handleFilterChange('date', value)}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Select
                      placeholder="执行人"
                      style={{ width: '100%' }}
                      onChange={(value) => handleFilterChange('executor', value)}
                    >
                      <Option value="all">全部人员</Option>
                      <Option value="张质控员">张质控员</Option>
                      <Option value="李技术员">李技术员</Option>
                      <Option value="王工程师">王工程师</Option>
                    </Select>
                  </Col>
                </Row>
              </div>

              {/* 检测记录表格 */}
              <Table
                columns={executionColumns}
                dataSource={qcExecutions}
                rowKey="id"
                pagination={pagination}
                onChange={handleTableChange}
                loading={loading}
                rowClassName={(record) => 
                  record.status === 'failed' ? 'error-row' : 
                  record.status === 'warning' ? 'warning-row' : ''
                }
              />
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <AssignmentOutlined />
                检测模板
              </span>
            } 
            key="templates"
          >
            <div className="tab-content">
              {/* 搜索和筛选区域 */}
              <div className="filter-section">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={6}>
                    <Search
                      placeholder="搜索检测模板..."
                      onSearch={handleSearch}
                      style={{ width: '100%' }}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Select
                      placeholder="设备类型"
                      style={{ width: '100%' }}
                      onChange={(value) => handleFilterChange('templateCategory', value)}
                    >
                      <Option value="all">全部类型</Option>
                      <Option value="CT">CT</Option>
                      <Option value="DR">DR</Option>
                      <Option value="超声">超声</Option>
                      <Option value="MRI">MRI</Option>
                    </Select>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Select
                      placeholder="模板状态"
                      style={{ width: '100%' }}
                      onChange={(value) => handleFilterChange('templateStatus', value)}
                    >
                      <Option value="all">全部状态</Option>
                      <Option value="active">启用</Option>
                      <Option value="inactive">停用</Option>
                    </Select>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Button 
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={handleCreateTemplate}
                      style={{ width: '100%' }}
                    >
                      创建模板
                    </Button>
                  </Col>
                </Row>
              </div>

              {/* 检测模板表格 */}
              <Table
                columns={templateColumns}
                dataSource={qcTemplates}
                rowKey="id"
                pagination={pagination}
                onChange={handleTableChange}
                loading={loading}
              />
            </div>
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
            <div className="tab-content">
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Card title="设备类型统计" size="small">
                    <List
                      dataSource={statistics.categoryStats || []}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size="small" icon={<MedicineBoxOutlined />} />}
                            title={
                              <div>
                                <Text strong>{item.category}</Text>
                                <Text type="secondary"> ({item.count}项)</Text>
                              </div>
                            }
                            description={
                              <div>
                                <Progress 
                                  percent={Math.round((item.passed / item.count) * 100)}
                                  size="small"
                                  status={item.failed > 0 ? 'exception' : 'success'}
                                />
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  合格: {item.passed} | 不合格: {item.failed}
                                </Text>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} lg={12}>
                  <Card title="检测频率分布" size="small">
                    <List
                      dataSource={[
                        { frequency: 'monthly', count: statistics.monthlyExecutions, color: '#ff4d4f', text: '月度检测' },
                        { frequency: 'quarterly', count: statistics.quarterlyExecutions, color: '#fa8c16', text: '季度检测' },
                        { frequency: 'yearly', count: statistics.yearlyExecutions, color: '#52c41a', text: '年度检测' }
                      ]}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size="small" style={{ backgroundColor: item.color }} />}
                            title={item.text}
                            description={
                              <div>
                                <Text strong>{item.count}</Text>
                                <Text type="secondary"> 项计划</Text>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
      </Card>

      {/* 质控计划详情模态框 */}
      <Modal
        title="质控计划详情"
        visible={planModalVisible}
        onCancel={() => setPlanModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setPlanModalVisible(false)}>
            关闭
          </Button>,
          <Button key="edit" type="primary" icon={<EditOutlined />} onClick={handleEditPlan}>
            编辑计划
          </Button>,
          <Button key="export" type="default" icon={<ExportOutlined />} onClick={handleExportReport}>
            导出报告
          </Button>
        ]}
        width={800}
      >
        {renderPlanDetailContent()}
      </Modal>

      {/* 检测记录详情模态框 */}
      <Modal
        title="检测记录详情"
        visible={executionModalVisible}
        onCancel={() => setExecutionModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setExecutionModalVisible(false)}>
            关闭
          </Button>,
          <Button key="export" type="primary" icon={<ExportOutlined />} onClick={handleExportExecutionReport}>
            导出报告
          </Button>
        ]}
        width={800}
      >
        {renderExecutionDetailContent()}
      </Modal>

      {/* 检测模板详情模态框 */}
      <Modal
        title="检测模板详情"
        visible={templateModalVisible}
        onCancel={() => setTemplateModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setTemplateModalVisible(false)}>
            关闭
          </Button>,
          <Button key="edit" type="primary" icon={<EditOutlined />} onClick={handleEditTemplate}>
            编辑模板
          </Button>,
          <Button key="use" type="default" icon={<AssignmentTurnedInOutlined />} onClick={handleUseTemplate}>
            使用模板
          </Button>
        ]}
        width={800}
      >
        {renderTemplateDetailContent()}
      </Modal>
    </div>
  );
};

export default QualityControlManagement;