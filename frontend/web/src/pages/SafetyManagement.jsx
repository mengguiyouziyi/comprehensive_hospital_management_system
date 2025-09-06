import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  message, 
  Space, 
  Select, 
  Card, 
  Row, 
  Col, 
  Badge,
  Tag,
  Progress,
  Typography,
  DatePicker,
  Divider,
  Timeline,
  Alert,
  Statistic,
  List,
  Avatar,
  Descriptions,
  Tabs,
  Rate,
  Upload,
  Image,
  InputNumber,
  Tooltip,
  Checkbox,
  Radio,
  Steps,
  Result,
  Spin
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SafetyOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  WarningOutlined,
  UploadOutlined,
  PaperClipOutlined,
  MessageOutlined,
  TeamOutlined,
  AuditOutlined,
  HistoryOutlined,
  FlagOutlined,
  ScheduleOutlined,
  FileProtectOutlined,
  SecurityScanOutlined,
  ShieldOutlined,
  BugOutlined,
  FireOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  CloudServerOutlined,
  LockOutlined,
  UserSwitchOutlined,
  KeyOutlined,
  FingerprintOutlined,
  EyeInvisibleOutlined,
  AlertOutlined,
  InfoCircleOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;
const { Text, Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Step } = Steps;
const { TabPane } = Tabs;

const SafetyManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [assessmentModalVisible, setAssessmentModalVisible] = useState(false);
  const [auditModalVisible, setAuditModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [editingAudit, setEditingAudit] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [form] = Form.useForm();
  const [assessmentForm] = Form.useForm();
  const [auditForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('incidents');

  // 模拟数据
  useEffect(() => {
    const mockIncidents = [
      {
        id: 1,
        incidentNumber: 'SI202401001',
        incidentType: 'data_breach',
        title: '患者数据泄露事件',
        description: '发现患者个人信息在未授权情况下被访问，涉及患者病历和联系方式。',
        severityLevel: 4,
        impactLevel: 3,
        discoveryDate: '2024-01-15',
        occurrenceDate: '2024-01-14',
        reportedBy: '李医生',
        department: '信息科',
        status: 'investigating',
        assignedTo: '安全官',
        affectedSystems: ['电子病历系统', '患者管理系统'],
        affectedUsers: 150,
        rootCause: '系统权限配置错误',
        immediateActions: '立即关闭相关账户，重置密码，启动数据泄露应急响应',
        longTermActions: '加强权限管理，完善审计日志，进行安全培训',
        investigationProgress: 60,
        resolutionDate: null,
        verifiedBy: null,
        attachments: [
          {
            name: '事件报告.pdf',
            size: 2048576,
            type: 'application/pdf',
            url: '/uploads/si202401001_1.pdf'
          }
        ],
        timeline: [
          {
            time: '2024-01-14 15:30',
            action: '事件发生',
            user: '系统',
            description: '检测到异常访问行为'
          },
          {
            time: '2024-01-15 09:00',
            action: '事件发现',
            user: '李医生',
            description: '报告可疑数据访问'
          },
          {
            time: '2024-01-15 10:00',
            action: '开始调查',
            user: '安全官',
            description: '启动安全事件调查'
          }
        ],
        createdAt: '2024-01-15T10:30:00',
        updatedAt: '2024-01-15T16:00:00'
      },
      {
        id: 2,
        incidentNumber: 'SI202401002',
        incidentType: 'equipment_failure',
        title: '医疗设备故障',
        description: 'CT扫描仪在运行过程中出现异常停机，可能影响患者诊断。',
        severityLevel: 3,
        impactLevel: 2,
        discoveryDate: '2024-01-18',
        occurrenceDate: '2024-01-18',
        reportedBy: '张技师',
        department: '设备科',
        status: 'resolved',
        assignedTo: '设备工程师',
        affectedSystems: ['CT扫描仪'],
        affectedUsers: 5,
        rootCause: '设备过热保护触发',
        immediateActions: '立即停机检查，启用备用设备',
        longTermActions: '改进设备散热系统，增加温度监控',
        investigationProgress: 100,
        resolutionDate: '2024-01-18',
        verifiedBy: '设备科长',
        attachments: [],
        timeline: [
          {
            time: '2024-01-18 14:00',
            action: '设备故障',
            user: 'CT扫描仪',
            description: '设备自动停机'
          },
          {
            time: '2024-01-18 14:15',
            action: '故障报告',
            user: '张技师',
            description: '报告设备故障'
          },
          {
            time: '2024-01-18 16:00',
            action: '问题解决',
            user: '设备工程师',
            description: '设备修复完成'
          }
        ],
        createdAt: '2024-01-18T14:30:00',
        updatedAt: '2024-01-18T16:30:00'
      }
    ];

    const mockAssessments = [
      {
        id: 1,
        assessmentNumber: 'RA202401001',
        title: '2024年度信息安全风险评估',
        assessmentType: 'information_security',
        scope: '全院信息系统',
        assessor: '第三方安全公司',
        assessmentDate: '2024-01-10',
        status: 'completed',
        overallScore: 85,
        riskLevel: 'medium',
        findings: [
          {
            id: 1,
            category: '技术风险',
            description: '部分系统存在未修复的高危漏洞',
            severity: 'high',
            recommendation: '立即修复高危漏洞，建立漏洞管理流程'
          },
          {
            id: 2,
            category: '管理风险',
            description: '员工安全意识培训覆盖不足',
            severity: 'medium',
            recommendation: '加强员工安全培训，提高安全意识'
          }
        ],
        nextAssessmentDate: '2024-07-10',
        createdAt: '2024-01-01T09:00:00'
      }
    ];

    const mockAudits = [
      {
        id: 1,
        auditNumber: 'AD202401001',
        title: '质量管理体系内部审核',
        auditType: 'internal',
        scope: '全院各部门',
        auditor: '内部审核组',
        auditDate: '2024-01-05',
        status: 'completed',
        score: 92,
        findings: 3,
        majorFindings: 0,
        minorFindings: 3,
        recommendations: [
          '完善文档管理流程',
          '加强员工培训记录管理',
          '优化设备维护记录'
        ],
        nextAuditDate: '2024-07-05',
        createdAt: '2024-01-01T09:00:00'
      }
    ];

    setIncidents(mockIncidents);
    setAssessments(mockAssessments);
    setAudits(mockAudits);
  }, []);

  const showModal = (incident = null) => {
    setEditingIncident(incident);
    setModalVisible(true);
    if (incident) {
      form.setFieldsValue(incident);
    } else {
      form.resetFields();
    }
  };

  const showAssessmentModal = (assessment = null) => {
    setEditingAssessment(assessment);
    setAssessmentModalVisible(true);
    if (assessment) {
      assessmentForm.setFieldsValue(assessment);
    } else {
      assessmentForm.resetFields();
    }
  };

  const showAuditModal = (audit = null) => {
    setEditingAudit(audit);
    setAuditModalVisible(true);
    if (audit) {
      auditForm.setFieldsValue(audit);
    } else {
      auditForm.resetFields();
    }
  };

  const showDetail = (incident) => {
    setSelectedIncident(incident);
    setDetailVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingIncident(null);
    form.resetFields();
  };

  const handleAssessmentCancel = () => {
    setAssessmentModalVisible(false);
    setEditingAssessment(null);
    assessmentForm.resetFields();
  };

  const handleAuditCancel = () => {
    setAuditModalVisible(false);
    setEditingAudit(null);
    auditForm.resetFields();
  };

  const handleDetailCancel = () => {
    setDetailVisible(false);
    setSelectedIncident(null);
  };

  const onFinish = async (values) => {
    try {
      if (editingIncident) {
        message.success('安全事件更新成功');
      } else {
        message.success('安全事件报告成功');
      }
      handleCancel();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const onAssessmentFinish = async (values) => {
    try {
      if (editingAssessment) {
        message.success('风险评估更新成功');
      } else {
        message.success('风险评估创建成功');
      }
      handleAssessmentCancel();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const onAuditFinish = async (values) => {
    try {
      if (editingAudit) {
        message.success('审核记录更新成功');
      } else {
        message.success('审核记录创建成功');
      }
      handleAuditCancel();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const getIncidentTypeIcon = (type) => {
    const icons = {
      data_breach: <DatabaseOutlined style={{ color: '#ff4d4f' }} />,
      equipment_failure: <MedicineBoxOutlined style={{ color: '#fa8c16' }} />,
      physical_security: <SecurityScanOutlined style={{ color: '#52c41a' }} />,
      network_security: <GlobalOutlined style={{ color: '#1890ff' }} />,
      human_error: <UserOutlined style={{ color: '#722ed1' }} />,
      natural_disaster: <ThunderboltOutlined style={{ color: '#eb2f96' }} />
    };
    return icons[type] || <WarningOutlined style={{ color: '#ff4d4f' }} />;
  };

  const getSeverityBadge = (level) => {
    const levels = {
      1: { color: 'green', text: '低' },
      2: { color: 'blue', text: '中低' },
      3: { color: 'orange', text: '中等' },
      4: { color: 'red', text: '高' },
      5: { color: 'purple', text: '严重' }
    };
    const config = levels[level] || levels[1];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getStatusBadge = (status) => {
    const statuses = {
      open: { color: 'default', text: '待处理', icon: <ClockCircleOutlined /> },
      investigating: { color: 'processing', text: '调查中', icon: <SearchOutlined /> },
      resolved: { color: 'success', text: '已解决', icon: <CheckCircleOutlined /> },
      closed: { color: 'default', text: '已关闭', icon: <FileProtectOutlined /> }
    };
    const config = statuses[status] || statuses.open;
    return (
      <Badge status={config.color} text={config.text} />
    );
  };

  const getRiskLevelBadge = (level) => {
    const levels = {
      low: { color: 'green', text: '低风险' },
      medium: { color: 'orange', text: '中风险' },
      high: { color: 'red', text: '高风险' },
      critical: { color: 'purple', text: '极高风险' }
    };
    const config = levels[level] || levels.low;
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const incidentColumns = [
    {
      title: '事件编号',
      dataIndex: 'incidentNumber',
      key: 'incidentNumber',
      render: (text) => (
        <Text code style={{ fontWeight: 500 }}>{text}</Text>
      ),
      width: 140,
    },
    {
      title: '事件信息',
      key: 'incidentInfo',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            {getIncidentTypeIcon(record.incidentType)}
            {record.title}
          </div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.description.substring(0, 50)}...
          </Text>
        </div>
      ),
      width: 250,
    },
    {
      title: '严重程度',
      dataIndex: 'severityLevel',
      key: 'severityLevel',
      render: (severity) => getSeverityBadge(severity),
      width: 100,
    },
    {
      title: '影响程度',
      dataIndex: 'impactLevel',
      key: 'impactLevel',
      render: (impact) => getSeverityBadge(impact),
      width: 100,
    },
    {
      title: '发现日期',
      dataIndex: 'discoveryDate',
      key: 'discoveryDate',
      render: (date) => (
        <Text style={{ fontSize: 12 }}>
          {new Date(date).toLocaleDateString('zh-CN')}
        </Text>
      ),
      width: 120,
    },
    {
      title: '报告人',
      dataIndex: 'reportedBy',
      key: 'reportedBy',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.department}</Text>
        </div>
      ),
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusBadge(status),
      width: 100,
    },
    {
      title: '调查进度',
      key: 'progress',
      render: (_, record) => (
        <Progress 
          percent={record.investigationProgress || 0}
          size="small"
          status={record.status === 'resolved' ? 'success' : 'active'}
        />
      ),
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            onClick={() => showDetail(record)}
            size="small"
            ghost
          >
            详情
          </Button>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
            size="small"
          >
            编辑
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            ghost
          >
            删除
          </Button>
        </Space>
      ),
      width: 200,
    },
  ];

  const assessmentColumns = [
    {
      title: '评估编号',
      dataIndex: 'assessmentNumber',
      key: 'assessmentNumber',
      render: (text) => (
        <Text code style={{ fontWeight: 500 }}>{text}</Text>
      ),
      width: 140,
    },
    {
      title: '评估标题',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <Text strong>{text}</Text>
      ),
      width: 200,
    },
    {
      title: '评估类型',
      dataIndex: 'assessmentType',
      key: 'assessmentType',
      render: (type) => (
        <Tag color="blue">
          {type === 'information_security' ? '信息安全' : '其他'}
        </Tag>
      ),
      width: 120,
    },
    {
      title: '评估日期',
      dataIndex: 'assessmentDate',
      key: 'assessmentDate',
      render: (date) => (
        <Text style={{ fontSize: 12 }}>
          {new Date(date).toLocaleDateString('zh-CN')}
        </Text>
      ),
      width: 120,
    },
    {
      title: '评估机构',
      dataIndex: 'assessor',
      key: 'assessor',
      render: (text) => (
        <Text>{text}</Text>
      ),
      width: 120,
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (level) => getRiskLevelBadge(level),
      width: 100,
    },
    {
      title: '综合评分',
      dataIndex: 'overallScore',
      key: 'overallScore',
      render: (score) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Progress 
            percent={score} 
            size="small" 
            strokeColor={score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'}
          />
          <Text style={{ fontSize: 12 }}>{score}分</Text>
        </div>
      ),
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge status={status === 'completed' ? 'success' : 'processing'} text={status === 'completed' ? '已完成' : '进行中'} />
      ),
      width: 80,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showAssessmentModal(record)}
            size="small"
          >
            编辑
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            ghost
          >
            删除
          </Button>
        </Space>
      ),
      width: 140,
    },
  ];

  const auditColumns = [
    {
      title: '审核编号',
      dataIndex: 'auditNumber',
      key: 'auditNumber',
      render: (text) => (
        <Text code style={{ fontWeight: 500 }}>{text}</Text>
      ),
      width: 140,
    },
    {
      title: '审核标题',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <Text strong>{text}</Text>
      ),
      width: 200,
    },
    {
      title: '审核类型',
      dataIndex: 'auditType',
      key: 'auditType',
      render: (type) => (
        <Tag color="green">
          {type === 'internal' ? '内部审核' : '外部审核'}
        </Tag>
      ),
      width: 120,
    },
    {
      title: '审核日期',
      dataIndex: 'auditDate',
      key: 'auditDate',
      render: (date) => (
        <Text style={{ fontSize: 12 }}>
          {new Date(date).toLocaleDateString('zh-CN')}
        </Text>
      ),
      width: 120,
    },
    {
      title: '审核机构',
      dataIndex: 'auditor',
      key: 'auditor',
      render: (text) => (
        <Text>{text}</Text>
      ),
      width: 120,
    },
    {
      title: '审核得分',
      dataIndex: 'score',
      key: 'score',
      render: (score) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Progress 
            percent={score} 
            size="small" 
            strokeColor={score >= 90 ? '#52c41a' : score >= 70 ? '#fa8c16' : '#ff4d4f'}
          />
          <Text style={{ fontSize: 12 }}>{score}分</Text>
        </div>
      ),
      width: 120,
    },
    {
      title: '发现问题',
      dataIndex: 'findings',
      key: 'findings',
      render: (findings) => (
        <div>
          <div style={{ fontWeight: 500 }}>{findings}项</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            严重: {findings > 2 ? 1 : 0}, 一般: {findings > 2 ? findings - 1 : findings}
          </Text>
        </div>
      ),
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge status={status === 'completed' ? 'success' : 'processing'} text={status === 'completed' ? '已完成' : '进行中'} />
      ),
      width: 80,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showAuditModal(record)}
            size="small"
          >
            编辑
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            ghost
          >
            删除
          </Button>
        </Space>
      ),
      width: 140,
    },
  ];

  const stats = {
    totalIncidents: incidents.length,
    openIncidents: incidents.filter(i => i.status === 'open').length,
    investigatingIncidents: incidents.filter(i => i.status === 'investigating').length,
    resolvedIncidents: incidents.filter(i => i.status === 'resolved').length,
    highSeverityIncidents: incidents.filter(i => i.severityLevel >= 4).length,
    totalAssessments: assessments.length,
    totalAudits: audits.length,
    avgAssessmentScore: assessments.length > 0 ? 
      Math.round(assessments.reduce((sum, a) => sum + a.overallScore, 0) / assessments.length) : 0,
    avgAuditScore: audits.length > 0 ? 
      Math.round(audits.reduce((sum, a) => sum + a.score, 0) / audits.length) : 0
  };

  const uploadProps = {
    name: 'file',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  return (
    <div className="safety-management">
      {/* 页面标题区域 */}
      <div className="safety-header">
        <h1 className="page-title">
          <SafetyCertificateOutlined className="page-icon" />
          安全管理
        </h1>
        <Space>
          <Button 
            type="primary" 
            danger
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
            size="large"
          >
            报告安全事件
          </Button>
          <Button 
            icon={<SecurityScanOutlined />} 
            onClick={() => showAssessmentModal()}
            size="large"
          >
            风险评估
          </Button>
          <Button 
            icon={<AuditOutlined />} 
            onClick={() => showAuditModal()}
            size="large"
          >
            安全审核
          </Button>
        </Space>
      </div>

      {/* 统计卡片区域 */}
      <Row gutter={[16, 16]} className="safety-stats">
        <Col xs={24} sm={12} lg={3}>
          <Card className="stats-card">
            <Statistic
              title="安全事件"
              value={stats.totalIncidents}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card className="stats-card">
            <Statistic
              title="待处理"
              value={stats.openIncidents}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card className="stats-card">
            <Statistic
              title="调查中"
              value={stats.investigatingIncidents}
              prefix={<SearchOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card className="stats-card">
            <Statistic
              title="已解决"
              value={stats.resolvedIncidents}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card className="stats-card">
            <Statistic
              title="高风险事件"
              value={stats.highSeverityIncidents}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card className="stats-card">
            <Statistic
              title="风险评估"
              value={stats.totalAssessments}
              prefix={<SecurityScanOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card className="stats-card">
            <Statistic
              title="安全审核"
              value={stats.totalAudits}
              prefix={<AuditOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card className="stats-card">
            <Statistic
              title="平均评分"
              value={stats.avgAssessmentScore}
              suffix="分"
              prefix={<FileProtectOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 高风险事件提醒 */}
      {stats.highSeverityIncidents > 0 && (
        <Alert
          message={`当前有 ${stats.highSeverityIncidents} 个高风险安全事件需要立即处理`}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
          action={
            <Button size="small" type="primary" danger>
              立即处理
            </Button>
          }
        />
      )}

      {/* 主要内容区域 */}
      <Card className="safety-content">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane 
            tab={
              <span>
                <AlertOutlined />
                安全事件
              </span>
            } 
            key="incidents"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Search
                    placeholder="搜索事件编号或标题"
                    allowClear
                    enterButton={<SearchOutlined />}
                    style={{ width: 300 }}
                  />
                  <Select placeholder="事件类型" style={{ width: 120 }}>
                    <Option value="all">全部类型</Option>
                    <Option value="data_breach">数据泄露</Option>
                    <Option value="equipment_failure">设备故障</Option>
                    <Option value="physical_security">物理安全</Option>
                    <Option value="network_security">网络安全</Option>
                    <Option value="human_error">人为错误</Option>
                  </Select>
                  <Select placeholder="严重程度" style={{ width: 120 }}>
                    <Option value="all">全部等级</Option>
                    <Option value="1">低</Option>
                    <Option value="2">中低</Option>
                    <Option value="3">中等</Option>
                    <Option value="4">高</Option>
                    <Option value="5">严重</Option>
                  </Select>
                  <Select placeholder="状态" style={{ width: 120 }}>
                    <Option value="all">全部状态</Option>
                    <Option value="open">待处理</Option>
                    <Option value="investigating">调查中</Option>
                    <Option value="resolved">已解决</Option>
                    <Option value="closed">已关闭</Option>
                  </Select>
                </Space>
                <Button icon={<FilterOutlined />}>
                  高级筛选
                </Button>
              </div>
              
              <Table
                columns={incidentColumns}
                dataSource={Array.isArray(incidents) ? incidents : []}
                rowKey="id"
                pagination={{
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
                }}
                size="middle"
              />
            </div>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <SecurityScanOutlined />
                风险评估
              </span>
            } 
            key="assessments"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Search
                    placeholder="搜索评估编号或标题"
                    allowClear
                    enterButton={<SearchOutlined />}
                    style={{ width: 300 }}
                  />
                  <Select placeholder="评估类型" style={{ width: 120 }}>
                    <Option value="all">全部类型</Option>
                    <Option value="information_security">信息安全</Option>
                    <Option value="physical_security">物理安全</Option>
                    <Option value="operational_security">运营安全</Option>
                  </Select>
                  <Select placeholder="风险等级" style={{ width: 120 }}>
                    <Option value="all">全部等级</Option>
                    <Option value="low">低风险</Option>
                    <Option value="medium">中风险</Option>
                    <Option value="high">高风险</Option>
                    <Option value="critical">极高风险</Option>
                  </Select>
                </Space>
                <Button icon={<FilterOutlined />}>
                  高级筛选
                </Button>
              </div>
              
              <Table
                columns={assessmentColumns}
                dataSource={Array.isArray(assessments) ? assessments : []}
                rowKey="id"
                pagination={{
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
                }}
                size="middle"
              />
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <AuditOutlined />
                安全审核
              </span>
            } 
            key="audits"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Search
                    placeholder="搜索审核编号或标题"
                    allowClear
                    enterButton={<SearchOutlined />}
                    style={{ width: 300 }}
                  />
                  <Select placeholder="审核类型" style={{ width: 120 }}>
                    <Option value="all">全部类型</Option>
                    <Option value="internal">内部审核</Option>
                    <Option value="external">外部审核</Option>
                  </Select>
                  <Select placeholder="状态" style={{ width: 120 }}>
                    <Option value="all">全部状态</Option>
                    <Option value="completed">已完成</Option>
                    <Option value="in_progress">进行中</Option>
                  </Select>
                </Space>
                <Button icon={<FilterOutlined />}>
                  高级筛选
                </Button>
              </div>
              
              <Table
                columns={auditColumns}
                dataSource={Array.isArray(audits) ? audits : []}
                rowKey="id"
                pagination={{
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
                }}
                size="middle"
              />
            </div>
          </TabPane>
        </Tabs>
      </Card>

      {/* 安全事件弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertOutlined />
            {editingIncident ? "编辑安全事件" : "报告安全事件"}
          </div>
        }
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={900}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Tabs defaultActiveKey="basic" items={[
            {
              key: 'basic',
              label: '基本信息',
              children: (
                <>
                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="incidentType"
                        label="事件类型"
                        rules={[{ required: true, message: '请选择事件类型' }]}
                      >
                        <Select placeholder="请选择事件类型">
                          <Option value="data_breach">数据泄露</Option>
                          <Option value="equipment_failure">设备故障</Option>
                          <Option value="physical_security">物理安全</Option>
                          <Option value="network_security">网络安全</Option>
                          <Option value="human_error">人为错误</Option>
                          <Option value="natural_disaster">自然灾害</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="severityLevel"
                        label="严重程度"
                        rules={[{ required: true, message: '请选择严重程度' }]}
                      >
                        <Select placeholder="请选择严重程度">
                          <Option value={1}>低</Option>
                          <Option value={2}>中低</Option>
                          <Option value={3}>中等</Option>
                          <Option value={4}>高</Option>
                          <Option value={5}>严重</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="impactLevel"
                        label="影响程度"
                        rules={[{ required: true, message: '请选择影响程度' }]}
                      >
                        <Select placeholder="请选择影响程度">
                          <Option value={1}>轻微</Option>
                          <Option value={2}>一般</Option>
                          <Option value={3}>中等</Option>
                          <Option value={4}>严重</Option>
                          <Option value={5}>灾难性</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="discoveryDate"
                        label="发现日期"
                        rules={[{ required: true, message: '请选择发现日期' }]}
                      >
                        <DatePicker style={{ width: '100%' }} showTime />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="title"
                    label="事件标题"
                    rules={[{ required: true, message: '请输入事件标题' }]}
                  >
                    <Input placeholder="请输入事件标题" />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="事件描述"
                    rules={[{ required: true, message: '请输入事件描述' }]}
                  >
                    <TextArea rows={4} placeholder="请详细描述安全事件的情况" />
                  </Form.Item>

                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="reportedBy"
                        label="报告人"
                        rules={[{ required: true, message: '请输入报告人姓名' }]}
                      >
                        <Input placeholder="请输入报告人姓名" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="department"
                        label="所属部门"
                        rules={[{ required: true, message: '请输入所属部门' }]}
                      >
                        <Input placeholder="请输入所属部门" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="assignedTo"
                        label="处理人"
                        rules={[{ required: true, message: '请输入处理人' }]}
                      >
                        <Input placeholder="请输入处理人姓名" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="affectedUsers"
                        label="影响人数"
                        rules={[{ required: true, message: '请输入影响人数' }]}
                      >
                        <InputNumber 
                          placeholder="请输入影响人数" 
                          style={{ width: '100%' }}
                          min={0}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )
            },
            {
              key: 'details',
              label: '详细信息',
              children: (
                <>
                  <Form.Item
                    name="affectedSystems"
                    label="受影响系统"
                  >
                    <Select 
                      mode="tags" 
                      placeholder="请输入受影响系统，按回车添加"
                      style={{ width: '100%' }}
                    >
                      <Option value="电子病历系统">电子病历系统</Option>
                      <Option value="患者管理系统">患者管理系统</Option>
                      <Option value="设备管理系统">设备管理系统</Option>
                      <Option value="财务系统">财务系统</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="rootCause"
                    label="根本原因"
                    rules={[{ required: true, message: '请输入根本原因' }]}
                  >
                    <TextArea rows={3} placeholder="请分析事件根本原因" />
                  </Form.Item>

                  <Form.Item
                    name="immediateActions"
                    label="立即措施"
                    rules={[{ required: true, message: '请输入立即措施' }]}
                  >
                    <TextArea rows={3} placeholder="请描述已采取的立即措施" />
                  </Form.Item>

                  <Form.Item
                    name="longTermActions"
                    label="长期措施"
                    rules={[{ required: true, message: '请输入长期措施' }]}
                  >
                    <TextArea rows={3} placeholder="请描述长期改进措施" />
                  </Form.Item>
                </>
              )
            },
            {
              key: 'attachments',
              label: '附件上传',
              children: (
                <Form.Item name="attachments" label="相关附件">
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>点击上传</Button>
                  </Upload>
                  <div style={{ marginTop: 8, color: '#666' }}>
                    支持上传事件报告、证据材料、系统日志等
                  </div>
                </Form.Item>
              )
            }
          ]} />

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" danger htmlType="submit">
                {editingIncident ? "更新事件" : "提交报告"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 风险评估弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SecurityScanOutlined />
            {editingAssessment ? "编辑风险评估" : "创建风险评估"}
          </div>
        }
        open={assessmentModalVisible}
        onCancel={handleAssessmentCancel}
        footer={null}
        width={700}
        destroyOnClose
      >
        <Form
          form={assessmentForm}
          onFinish={onAssessmentFinish}
          layout="vertical"
        >
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="assessmentType"
                label="评估类型"
                rules={[{ required: true, message: '请选择评估类型' }]}
              >
                <Select placeholder="请选择评估类型">
                  <Option value="information_security">信息安全</Option>
                  <Option value="physical_security">物理安全</Option>
                  <Option value="operational_security">运营安全</Option>
                  <Option value="compliance">合规评估</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="assessmentDate"
                label="评估日期"
                rules={[{ required: true, message: '请选择评估日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="title"
            label="评估标题"
            rules={[{ required: true, message: '请输入评估标题' }]}
          >
            <Input placeholder="请输入评估标题" />
          </Form.Item>

          <Form.Item
            name="scope"
            label="评估范围"
            rules={[{ required: true, message: '请输入评估范围' }]}
          >
            <TextArea rows={2} placeholder="请描述评估范围" />
          </Form.Item>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="assessor"
                label="评估机构"
                rules={[{ required: true, message: '请输入评估机构' }]}
              >
                <Input placeholder="请输入评估机构" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="overallScore"
                label="综合评分"
                rules={[{ required: true, message: '请输入综合评分' }]}
              >
                <InputNumber 
                  placeholder="请输入综合评分" 
                  style={{ width: '100%' }}
                  min={0}
                  max={100}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="riskLevel"
                label="风险等级"
                rules={[{ required: true, message: '请选择风险等级' }]}
              >
                <Select placeholder="请选择风险等级">
                  <Option value="low">低风险</Option>
                  <Option value="medium">中风险</Option>
                  <Option value="high">高风险</Option>
                  <Option value="critical">极高风险</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nextAssessmentDate"
                label="下次评估日期"
                rules={[{ required: true, message: '请选择下次评估日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="findings"
            label="发现的问题"
          >
            <TextArea rows={4} placeholder="请描述评估中发现的问题和建议" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleAssessmentCancel}>取消</Button>
              <Button type="primary" htmlType="submit">
                {editingAssessment ? "更新评估" : "创建评估"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 安全审核弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AuditOutlined />
            {editingAudit ? "编辑安全审核" : "创建安全审核"}
          </div>
        }
        open={auditModalVisible}
        onCancel={handleAuditCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form
          form={auditForm}
          onFinish={onAuditFinish}
          layout="vertical"
        >
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="auditType"
                label="审核类型"
                rules={[{ required: true, message: '请选择审核类型' }]}
              >
                <Select placeholder="请选择审核类型">
                  <Option value="internal">内部审核</Option>
                  <Option value="external">外部审核</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="auditDate"
                label="审核日期"
                rules={[{ required: true, message: '请选择审核日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="title"
            label="审核标题"
            rules={[{ required: true, message: '请输入审核标题' }]}
          >
            <Input placeholder="请输入审核标题" />
          </Form.Item>

          <Form.Item
            name="scope"
            label="审核范围"
            rules={[{ required: true, message: '请输入审核范围' }]}
          >
            <TextArea rows={2} placeholder="请描述审核范围" />
          </Form.Item>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="auditor"
                label="审核机构"
                rules={[{ required: true, message: '请输入审核机构' }]}
              >
                <Input placeholder="请输入审核机构" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="score"
                label="审核得分"
                rules={[{ required: true, message: '请输入审核得分' }]}
              >
                <InputNumber 
                  placeholder="请输入审核得分" 
                  style={{ width: '100%' }}
                  min={0}
                  max={100}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={8}>
              <Form.Item
                name="findings"
                label="发现问题"
                rules={[{ required: true, message: '请输入发现问题数量' }]}
              >
                <InputNumber 
                  placeholder="发现问题" 
                  style={{ width: '100%' }}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="majorFindings"
                label="严重问题"
                rules={[{ required: true, message: '请输入严重问题数量' }]}
              >
                <InputNumber 
                  placeholder="严重问题" 
                  style={{ width: '100%' }}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="minorFindings"
                label="一般问题"
                rules={[{ required: true, message: '请输入一般问题数量' }]}
              >
                <InputNumber 
                  placeholder="一般问题" 
                  style={{ width: '100%' }}
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="recommendations"
            label="改进建议"
          >
            <TextArea rows={3} placeholder="请输入改进建议" />
          </Form.Item>

          <Form.Item
            name="nextAuditDate"
            label="下次审核日期"
            rules={[{ required: true, message: '请选择下次审核日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleAuditCancel}>取消</Button>
              <Button type="primary" htmlType="submit">
                {editingAudit ? "更新审核" : "创建审核"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 安全事件详情弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertOutlined />
            安全事件详情 - {selectedIncident?.incidentNumber}
          </div>
        }
        open={detailVisible}
        onCancel={handleDetailCancel}
        footer={null}
        width={1000}
        destroyOnClose
      >
        {selectedIncident && (
          <div className="incident-detail">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="事件编号" span={2}>
                <Text code>{selectedIncident.incidentNumber}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="事件标题" span={2}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {getIncidentTypeIcon(selectedIncident.incidentType)}
                  <Text strong>{selectedIncident.title}</Text>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="严重程度">
                {getSeverityBadge(selectedIncident.severityLevel)}
              </Descriptions.Item>
              <Descriptions.Item label="影响程度">
                {getSeverityBadge(selectedIncident.impactLevel)}
              </Descriptions.Item>
              <Descriptions.Item label="发现日期">
                {new Date(selectedIncident.discoveryDate).toLocaleString('zh-CN')}
              </Descriptions.Item>
              <Descriptions.Item label="发生日期">
                {new Date(selectedIncident.occurrenceDate).toLocaleString('zh-CN')}
              </Descriptions.Item>
              <Descriptions.Item label="报告人">
                <Avatar size="small" icon={<UserOutlined />} />
                <Text style={{ marginLeft: 8 }}>
                  {selectedIncident.reportedBy} - {selectedIncident.department}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="处理人">
                {selectedIncident.assignedTo}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusBadge(selectedIncident.status)}
              </Descriptions.Item>
              <Descriptions.Item label="调查进度">
                <Progress 
                  percent={selectedIncident.investigationProgress || 0}
                  size="small"
                  status={selectedIncident.status === 'resolved' ? 'success' : 'active'}
                />
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">事件描述</Divider>
            <Paragraph>{selectedIncident.description}</Paragraph>

            <Divider orientation="left">根本原因</Divider>
            <Alert
              message={selectedIncident.rootCause}
              type="error"
              showIcon
              icon={<BugOutlined />}
            />

            <Divider orientation="left">立即措施</Divider>
            <Alert
              message={selectedIncident.immediateActions}
              type="warning"
              showIcon
              icon={<SafetyOutlined />}
            />

            <Divider orientation="left">长期措施</Divider>
            <Alert
              message={selectedIncident.longTermActions}
              type="info"
              showIcon
              icon={<FileProtectOutlined />}
            />

            {selectedIncident.affectedSystems && selectedIncident.affectedSystems.length > 0 && (
              <>
                <Divider orientation="left">受影响系统</Divider>
                <div>
                  {selectedIncident.affectedSystems.map((system, index) => (
                    <Tag key={index} color="orange" style={{ marginRight: 8, marginBottom: 8 }}>
                      {system}
                    </Tag>
                  ))}
                </div>
              </>
            )}

            <Divider orientation="left">事件时间线</Divider>
            <Timeline>
              {selectedIncident.timeline.map((item, index) => (
                <Timeline.Item key={index} color={index === selectedIncident.timeline.length - 1 ? 'green' : 'blue'}>
                  <Text strong>{item.time}</Text> - {item.action}
                  <div style={{ marginTop: 4, color: '#666' }}>
                    {item.description} <Text type="secondary">by {item.user}</Text>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>

            {selectedIncident.attachments && selectedIncident.attachments.length > 0 && (
              <>
                <Divider orientation="left">相关附件</Divider>
                <List
                  dataSource={selectedIncident.attachments}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<PaperClipOutlined />}
                        title={item.name}
                        description={`${(item.size / 1024).toFixed(2)} KB`}
                      />
                      <Button type="link" icon={<EyeOutlined />}>
                        查看
                      </Button>
                    </List.Item>
                  )}
                />
              </>
            )}

            {selectedIncident.resolutionDate && (
              <>
                <Divider orientation="left">解决信息</Divider>
                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="解决日期">
                    {new Date(selectedIncident.resolutionDate).toLocaleString('zh-CN')}
                  </Descriptions.Item>
                  <Descriptions.Item label="验证人">
                    {selectedIncident.verifiedBy}
                  </Descriptions.Item>
                </Descriptions>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SafetyManagement;