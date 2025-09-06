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
  Result
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
  StarOutlined as ScoreOutlined,
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
  AuditOutlined as TroubleshootOutlined
} from '@ant-design/icons';
import './ComplianceManagement.css';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { TreeNode } = Tree;
const { RangePicker } = DatePicker;
const { Search } = Input;

const ComplianceManagement = () => {
  const [complianceChecks, setComplianceChecks] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkModalVisible, setCheckModalVisible] = useState(false);
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
    const mockComplianceChecks = [
      {
        id: 1,
        title: '医疗设备安全标准检查',
        type: 'equipment_safety',
        category: 'safety',
        status: 'passed',
        priority: 'high',
        scheduledDate: '2024-01-15',
        completedDate: '2024-01-15',
        auditor: '张检查员',
        department: '设备科',
        score: 95,
        maxScore: 100,
        findings: 2,
        recommendations: 3,
        nextCheckDate: '2024-07-15',
        description: '对所有医疗设备进行安全标准合规性检查',
        details: '检查设备安全标识、电气安全、机械安全等项目'
      },
      {
        id: 2,
        title: '患者隐私保护合规检查',
        type: 'privacy_protection',
        category: 'privacy',
        status: 'in_progress',
        priority: 'high',
        scheduledDate: '2024-01-20',
        completedDate: null,
        auditor: '李合规官',
        department: '信息科',
        score: null,
        maxScore: 100,
        findings: 0,
        recommendations: 0,
        nextCheckDate: '2024-07-20',
        description: '检查患者信息处理流程是否符合隐私保护法规',
        details: '检查数据加密、访问控制、员工培训等方面'
      },
      {
        id: 3,
        title: '药品管理规范检查',
        type: 'drug_management',
        category: 'pharmacy',
        status: 'failed',
        priority: 'medium',
        scheduledDate: '2024-01-10',
        completedDate: '2024-01-12',
        auditor: '王药师',
        department: '药剂科',
        score: 78,
        maxScore: 100,
        findings: 5,
        recommendations: 7,
        nextCheckDate: '2024-04-10',
        description: '检查药品采购、存储、使用流程是否符合规范',
        details: '发现药品存储温度记录不完整，需要改进'
      },
      {
        id: 4,
        title: '医疗废物处理合规检查',
        type: 'waste_disposal',
        category: 'environmental',
        status: 'pending',
        priority: 'medium',
        scheduledDate: '2024-01-25',
        completedDate: null,
        auditor: '赵环保员',
        department: '后勤科',
        score: null,
        maxScore: 100,
        findings: 0,
        recommendations: 0,
        nextCheckDate: '2024-07-25',
        description: '检查医疗废物分类、收集、处理流程',
        details: '确保医疗废物处理符合环保要求'
      },
      {
        id: 5,
        title: '消防安全检查',
        type: 'fire_safety',
        category: 'safety',
        status: 'passed',
        priority: 'high',
        scheduledDate: '2024-01-08',
        completedDate: '2024-01-08',
        auditor: '钱安全员',
        department: '保卫科',
        score: 98,
        maxScore: 100,
        findings: 1,
        recommendations: 2,
        nextCheckDate: '2024-04-08',
        description: '检查消防设施、疏散通道、应急预案',
        details: '消防设施完好，应急演练记录完整'
      },
      {
        id: 6,
        title: '感染控制合规检查',
        type: 'infection_control',
        category: 'clinical',
        status: 'warning',
        priority: 'high',
        scheduledDate: '2024-01-18',
        completedDate: '2024-01-19',
        auditor: '孙感染控制师',
        department: '院感科',
        score: 85,
        maxScore: 100,
        findings: 3,
        recommendations: 4,
        nextCheckDate: '2024-04-18',
        description: '检查医院感染控制措施执行情况',
        details: '手卫生依从性需要提高，环境消毒记录完整'
      }
    ];

    const mockStatistics = {
      totalChecks: 156,
      passedChecks: 89,
      failedChecks: 12,
      pendingChecks: 23,
      inProgressChecks: 32,
      averageScore: 87.5,
      highPriorityChecks: 45,
      mediumPriorityChecks: 78,
      lowPriorityChecks: 33,
      overdueChecks: 8,
      upcomingChecks: 15,
      categoryStats: [
        { category: 'safety', count: 45, passed: 38, failed: 2 },
        { category: 'privacy', count: 23, passed: 20, failed: 1 },
        { category: 'pharmacy', count: 34, passed: 28, failed: 4 },
        { category: 'environmental', count: 18, passed: 15, failed: 1 },
        { category: 'clinical', count: 36, passed: 31, failed: 4 }
      ]
    };

    setComplianceChecks(mockComplianceChecks);
    setStatistics(mockStatistics);
    setPagination(prev => ({ ...prev, total: mockComplianceChecks.length }));
  }, []);

  // 表格列定义
  const checkColumns = [
    {
      title: '检查项目',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (title, record) => (
        <div>
          <Text strong>{title}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.department}
          </Text>
        </div>
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type) => {
        const typeMap = {
          'equipment_safety': { color: 'blue', text: '设备安全' },
          'privacy_protection': { color: 'purple', text: '隐私保护' },
          'drug_management': { color: 'green', text: '药品管理' },
          'waste_disposal': { color: 'orange', text: '废物处理' },
          'fire_safety': { color: 'red', text: '消防安全' },
          'infection_control': { color: 'cyan', text: '感染控制' }
        };
        const config = typeMap[type] || { color: 'default', text: type };
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
          'passed': { status: 'success', color: 'green', text: '通过' },
          'failed': { status: 'error', color: 'red', text: '失败' },
          'pending': { status: 'default', color: 'default', text: '待检查' },
          'in_progress': { status: 'processing', color: 'blue', text: '进行中' },
          'warning': { status: 'warning', color: 'orange', text: '警告' }
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
      title: '计划日期',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      width: 100,
      render: (date) => (
        <Text>{date}</Text>
      )
    },
    {
      title: '检查员',
      dataIndex: 'auditor',
      key: 'auditor',
      width: 100,
      render: (auditor) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text>{auditor}</Text>
        </Space>
      )
    },
    {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
      width: 80,
      render: (score, record) => {
        if (score === null) {
          return <Text type="secondary">-</Text>;
        }
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
      title: '操作',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>
          {record.status === 'pending' && (
            <Tooltip title="开始检查">
              <Button 
                type="text" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleStartCheck(record)}
              />
            </Tooltip>
          )}
          {record.status === 'in_progress' && (
            <Tooltip title="完成检查">
              <Button 
                type="text" 
                icon={<AssignmentTurnedInOutlined />}
                onClick={() => handleCompleteCheck(record)}
              />
            </Tooltip>
          )}
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

  // 处理函数
  const handleViewDetail = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleStartCheck = (record) => {
    message.info('开始检查功能正在开发中');
  };

  const handleCompleteCheck = (record) => {
    message.info('完成检查功能正在开发中');
  };

  const handleExportReport = (record) => {
    message.success('报告导出功能正在开发中');
  };

  const handleExportAll = () => {
    message.success('全部报告导出功能正在开发中');
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

  const getTypeIcon = (type) => {
    const iconMap = {
      'equipment_safety': <MedicineBoxOutlined />,
      'privacy_protection': <PrivacyTipOutlined />,
      'drug_management': <LocalPharmacyOutlined />,
      'waste_disposal': <DeleteOutlined />,
      'fire_safety': <LocalFireDepartmentOutlined />,
      'infection_control': <HealthAndSafetyOutlined />
    };
    return iconMap[type] || <FileProtectOutlined />;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'passed': '#52c41a',
      'failed': '#ff4d4f',
      'pending': '#666',
      'in_progress': '#1890ff',
      'warning': '#fa8c16'
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

  // 渲染详情内容
  const renderDetailContent = () => {
    if (!selectedRecord) return null;

    return (
      <div>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="检查项目">{selectedRecord.title}</Descriptions.Item>
          <Descriptions.Item label="检查类型">
            <Tag color="blue">{selectedRecord.type}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="检查类别">{selectedRecord.category}</Descriptions.Item>
          <Descriptions.Item label="检查状态">
            <Badge 
              status={selectedRecord.status === 'passed' ? 'success' : 
                     selectedRecord.status === 'failed' ? 'error' :
                     selectedRecord.status === 'in_progress' ? 'processing' :
                     selectedRecord.status === 'warning' ? 'warning' : 'default'} 
              text={selectedRecord.status === 'passed' ? '通过' :
                    selectedRecord.status === 'failed' ? '失败' :
                    selectedRecord.status === 'in_progress' ? '进行中' :
                    selectedRecord.status === 'warning' ? '警告' : '待检查'}
            />
          </Descriptions.Item>
          <Descriptions.Item label="优先级">
            <Tag color={getPriorityColor(selectedRecord.priority)}>
              {selectedRecord.priority === 'high' ? '高' :
               selectedRecord.priority === 'medium' ? '中' : '低'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="负责部门">{selectedRecord.department}</Descriptions.Item>
          <Descriptions.Item label="检查员">{selectedRecord.auditor}</Descriptions.Item>
          <Descriptions.Item label="计划日期">{selectedRecord.scheduledDate}</Descriptions.Item>
          <Descriptions.Item label="完成日期">{selectedRecord.completedDate || '未完成'}</Descriptions.Item>
          <Descriptions.Item label="下次检查">{selectedRecord.nextCheckDate}</Descriptions.Item>
          <Descriptions.Item label="评分">
            {selectedRecord.score !== null ? (
              <div>
                <Text strong style={{ 
                  color: selectedRecord.score >= 80 ? '#52c41a' : 
                         selectedRecord.score >= 60 ? '#fa8c16' : '#ff4d4f' 
                }}>
                  {selectedRecord.score}
                </Text>
                <Text type="secondary">/{selectedRecord.maxScore}</Text>
              </div>
            ) : (
              <Text type="secondary">未评分</Text>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="发现问题">{selectedRecord.findings} 个</Descriptions.Item>
          <Descriptions.Item label="改进建议">{selectedRecord.recommendations} 条</Descriptions.Item>
          <Descriptions.Item label="检查描述" span={2}>
            <Text>{selectedRecord.description}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="详细说明" span={2}>
            <Text>{selectedRecord.details}</Text>
          </Descriptions.Item>
        </Descriptions>

        {selectedRecord.status === 'failed' && (
          <div style={{ marginTop: 16 }}>
            <Alert
              message="检查失败"
              description="该检查项目未通过合规性检查，需要立即采取纠正措施。"
              type="error"
              showIcon
            />
          </div>
        )}

        {selectedRecord.status === 'warning' && (
          <div style={{ marginTop: 16 }}>
            <Alert
              message="需要改进"
              description="该检查项目存在一些问题，建议在规定时间内完成改进。"
              type="warning"
              showIcon
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="compliance-management">
      {/* 页面标题 */}
      <div className="compliance-header">
        <Title level={2} className="page-title">
          <FileProtectOutlined className="page-icon" />
          合规检查
        </Title>
        <Space>
          <Button 
            icon={<ExportOutlined />}
            onClick={handleExportAll}
          >
            导出全部
          </Button>
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCheckModalVisible(true)}
          >
            新建检查
          </Button>
        </Space>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="compliance-stats">
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="总检查数"
              value={statistics.totalChecks || 0}
              prefix={<FileProtectOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="通过检查"
              value={statistics.passedChecks || 0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="失败检查"
              value={statistics.failedChecks || 0}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="待检查"
              value={statistics.pendingChecks || 0}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#666' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="进行中"
              value={statistics.inProgressChecks || 0}
              prefix={<LoadingOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="平均分数"
              value={statistics.averageScore || 0}
              suffix="分"
              prefix={<ScoreOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card className="compliance-content">
        <Tabs defaultActiveKey="checks" className="compliance-tabs">
          <TabPane 
            tab={
              <span>
                <FileProtectOutlined />
                检查列表
              </span>
            } 
            key="checks"
          >
            <div className="tab-content">
              {/* 搜索和筛选区域 */}
              <div className="filter-section">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={6}>
                    <Search
                      placeholder="搜索检查项目..."
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
                      <Option value="passed">通过</Option>
                      <Option value="failed">失败</Option>
                      <Option value="pending">待检查</Option>
                      <Option value="in_progress">进行中</Option>
                      <Option value="warning">警告</Option>
                    </Select>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Select
                      placeholder="选择类型"
                      style={{ width: '100%' }}
                      onChange={(value) => handleFilterChange('type', value)}
                    >
                      <Option value="all">全部类型</Option>
                      <Option value="equipment_safety">设备安全</Option>
                      <Option value="privacy_protection">隐私保护</Option>
                      <Option value="drug_management">药品管理</Option>
                      <Option value="waste_disposal">废物处理</Option>
                      <Option value="fire_safety">消防安全</Option>
                      <Option value="infection_control">感染控制</Option>
                    </Select>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Select
                      placeholder="选择优先级"
                      style={{ width: '100%' }}
                      onChange={(value) => handleFilterChange('priority', value)}
                    >
                      <Option value="all">全部优先级</Option>
                      <Option value="high">高</Option>
                      <Option value="medium">中</Option>
                      <Option value="low">低</Option>
                    </Select>
                  </Col>
                </Row>
              </div>

              {/* 检查表格 */}
              <Table
                columns={checkColumns}
                dataSource={complianceChecks}
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
                <BarChartOutlined />
                统计分析
              </span>
            } 
            key="statistics"
          >
            <div className="tab-content">
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Card title="分类统计" size="small">
                    <List
                      dataSource={statistics.categoryStats || []}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size="small" icon={<FileProtectOutlined />} />}
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
                                  通过: {item.passed} | 失败: {item.failed}
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
                  <Card title="优先级分布" size="small">
                    <List
                      dataSource={[
                        { priority: 'high', count: statistics.highPriorityChecks, color: '#ff4d4f', text: '高优先级' },
                        { priority: 'medium', count: statistics.mediumPriorityChecks, color: '#fa8c16', text: '中优先级' },
                        { priority: 'low', count: statistics.lowPriorityChecks, color: '#52c41a', text: '低优先级' }
                      ]}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size="small" style={{ backgroundColor: item.color }} />}
                            title={item.text}
                            description={
                              <div>
                                <Text strong>{item.count}</Text>
                                <Text type="secondary"> 项检查</Text>
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

          <TabPane 
            tab={
              <span>
                <AlertOutlined />
                预警提醒
              </span>
            } 
            key="alerts"
          >
            <div className="tab-content">
              <Alert
                message="合规预警"
                description="监控合规检查状态，及时发现和处理问题。"
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />
              
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Card title="逾期未检查" size="small">
                    <List
                      dataSource={complianceChecks.filter(check => 
                        new Date(check.scheduledDate) < new Date() && check.status === 'pending'
                      )}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size="small" icon={<WarningOutlined />} style={{ backgroundColor: '#ff4d4f' }} />}
                            title={item.title}
                            description={
                              <div>
                                <Text type="secondary">计划日期: {item.scheduledDate}</Text>
                                <br />
                                <Text type="secondary">负责人: {item.auditor}</Text>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} lg={12}>
                  <Card title="即将到期" size="small">
                    <List
                      dataSource={complianceChecks.filter(check => {
                        const daysDiff = Math.ceil((new Date(check.scheduledDate) - new Date()) / (1000 * 60 * 60 * 24));
                        return daysDiff <= 7 && daysDiff >= 0 && check.status === 'pending';
                      })}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size="small" icon={<ClockCircleOutlined />} style={{ backgroundColor: '#fa8c16' }} />}
                            title={item.title}
                            description={
                              <div>
                                <Text type="secondary">计划日期: {item.scheduledDate}</Text>
                                <br />
                                <Text type="secondary">负责人: {item.auditor}</Text>
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

      {/* 详情模态框 */}
      <Modal
        title="检查详情"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>,
          <Button key="export" type="primary" icon={<ExportOutlined />} onClick={handleExportReport}>
            导出报告
          </Button>
        ]}
        width={800}
      >
        {renderDetailContent()}
      </Modal>

      {/* 新建检查模态框 */}
      <Modal
        title="新建合规检查"
        visible={checkModalVisible}
        onCancel={() => setCheckModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setCheckModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => {
            message.success('检查创建成功');
            setCheckModalVisible(false);
          }}>
            创建
          </Button>
        ]}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="检查项目" rules={[{ required: true, message: '请输入检查项目' }]}>
            <Input placeholder="请输入检查项目名称" />
          </Form.Item>
          <Form.Item label="检查类型" rules={[{ required: true, message: '请选择检查类型' }]}>
            <Select placeholder="请选择检查类型">
              <Option value="equipment_safety">设备安全</Option>
              <Option value="privacy_protection">隐私保护</Option>
              <Option value="drug_management">药品管理</Option>
              <Option value="waste_disposal">废物处理</Option>
              <Option value="fire_safety">消防安全</Option>
              <Option value="infection_control">感染控制</Option>
            </Select>
          </Form.Item>
          <Form.Item label="优先级" rules={[{ required: true, message: '请选择优先级' }]}>
            <Select placeholder="请选择优先级">
              <Option value="high">高</Option>
              <Option value="medium">中</Option>
              <Option value="low">低</Option>
            </Select>
          </Form.Item>
          <Form.Item label="负责部门" rules={[{ required: true, message: '请输入负责部门' }]}>
            <Input placeholder="请输入负责部门" />
          </Form.Item>
          <Form.Item label="检查员" rules={[{ required: true, message: '请输入检查员' }]}>
            <Input placeholder="请输入检查员姓名" />
          </Form.Item>
          <Form.Item label="计划日期" rules={[{ required: true, message: '请选择计划日期' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="检查描述">
            <TextArea rows={4} placeholder="请输入检查描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ComplianceManagement;