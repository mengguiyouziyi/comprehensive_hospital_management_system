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
  Menu
} from 'antd';
import {
  FileTextOutlined,
  DatabaseOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
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
  BarChartOutlined,
  FireOutlined,
  FireFilled,
  AlertOutlined,
  AlertFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
  LoadingOutlined
} from '@ant-design/icons';
import './OperationLogs.css';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { TreeNode } = Tree;
const { RangePicker } = DatePicker;
const { Search } = Input;

const OperationLogs = () => {
  const [logs, setLogs] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
    const mockLogs = [
      {
        id: 1,
        timestamp: '2024-01-16 10:30:25',
        user: 'admin',
        userName: '系统管理员',
        action: '登录系统',
        category: 'authentication',
        resource: '系统登录',
        result: 'success',
        ip: '192.168.1.100',
        location: '北京市朝阳区',
        device: 'Chrome 120.0.0.0 / Windows 10',
        details: '用户登录成功，会话ID: session_123456',
        duration: 1200,
        impact: 'low'
      },
      {
        id: 2,
        timestamp: '2024-01-16 10:25:18',
        user: 'doctor01',
        userName: '张医生',
        action: '查看患者信息',
        category: 'data_access',
        resource: '患者档案 P001',
        result: 'success',
        ip: '192.168.1.101',
        location: '北京市海淀区',
        device: 'Chrome 120.0.0.0 / macOS 14.0',
        details: '查看了患者张三的详细信息',
        duration: 800,
        impact: 'low'
      },
      {
        id: 3,
        timestamp: '2024-01-16 10:20:45',
        user: 'nurse01',
        userName: '李护士',
        action: '更新护理记录',
        category: 'data_modification',
        resource: '护理记录 R005',
        result: 'success',
        ip: '192.168.1.102',
        location: '北京市西城区',
        device: 'Chrome 120.0.0.0 / Windows 11',
        details: '更新了患者王五的护理记录，新增生命体征数据',
        duration: 1500,
        impact: 'medium'
      },
      {
        id: 4,
        timestamp: '2024-01-16 10:15:32',
        user: 'pharmacy01',
        userName: '王药师',
        action: '审核处方',
        category: 'business_operation',
        resource: '处方 PRE001',
        result: 'success',
        ip: '192.168.1.103',
        location: '北京市东城区',
        device: 'Chrome 120.0.0.0 / Windows 10',
        details: '审核通过张医生的处方，药物配伍无禁忌',
        duration: 600,
        impact: 'medium'
      },
      {
        id: 5,
        timestamp: '2024-01-16 10:10:15',
        user: 'lab01',
        userName: '赵技师',
        action: '上传检验报告',
        category: 'data_modification',
        resource: '检验报告 LAB003',
        result: 'success',
        ip: '192.168.1.104',
        location: '北京市丰台区',
        device: 'Chrome 120.0.0.0 / Ubuntu 22.04',
        details: '上传了患者李四的血常规检验报告',
        duration: 2200,
        impact: 'medium'
      },
      {
        id: 6,
        timestamp: '2024-01-16 10:05:48',
        user: 'unknown',
        userName: '未知用户',
        action: '登录失败',
        category: 'authentication',
        resource: '系统登录',
        result: 'failed',
        ip: '192.168.1.200',
        location: '上海市浦东新区',
        device: 'Firefox 121.0.0.0 / Windows 10',
        details: '用户名或密码错误，尝试次数: 3/5',
        duration: 500,
        impact: 'low'
      },
      {
        id: 7,
        timestamp: '2024-01-16 10:00:30',
        user: 'admin',
        userName: '系统管理员',
        action: '修改系统设置',
        category: 'system_operation',
        resource: '系统配置',
        result: 'success',
        ip: '192.168.1.100',
        location: '北京市朝阳区',
        device: 'Chrome 120.0.0.0 / Windows 10',
        details: '修改了密码策略设置，最小长度改为8位',
        duration: 1800,
        impact: 'high'
      },
      {
        id: 8,
        timestamp: '2024-01-16 09:55:22',
        user: 'doctor02',
        userName: '刘医生',
        action: '删除患者记录',
        category: 'data_modification',
        resource: '患者档案 P999',
        result: 'failed',
        ip: '192.168.1.105',
        location: '北京市石景山区',
        device: 'Chrome 120.0.0.0 / Windows 10',
        details: '权限不足，无法删除患者记录',
        duration: 300,
        impact: 'medium'
      },
      {
        id: 9,
        timestamp: '2024-01-16 09:50:15',
        user: 'system',
        userName: '系统',
        action: '数据备份',
        category: 'system_operation',
        resource: '数据库备份',
        result: 'success',
        ip: '127.0.0.1',
        location: '本地服务器',
        device: 'System Service',
        details: '自动数据备份完成，备份文件: backup_20240116_095015.sql',
        duration: 45000,
        impact: 'low'
      },
      {
        id: 10,
        timestamp: '2024-01-16 09:45:30',
        user: 'security',
        userName: '安全系统',
        action: '检测异常登录',
        category: 'security_alert',
        resource: '登录安全',
        result: 'warning',
        ip: '192.168.1.201',
        location: '广东省广州市',
        device: 'Unknown Device',
        details: '检测到异常登录尝试，IP地址在黑名单中',
        duration: 100,
        impact: 'high'
      }
    ];

    const mockStatistics = {
      totalLogs: 156789,
      todayLogs: 1234,
      successRate: 98.5,
      warningRate: 1.2,
      errorRate: 0.3,
      activeUsers: 156,
      topUsers: [
        { user: 'admin', count: 456, name: '系统管理员' },
        { user: 'doctor01', count: 234, name: '张医生' },
        { user: 'nurse01', count: 189, name: '李护士' },
        { user: 'lab01', count: 167, name: '赵技师' },
        { user: 'pharmacy01', count: 145, name: '王药师' }
      ],
      topActions: [
        { action: '查看患者信息', count: 2345, category: 'data_access' },
        { action: '登录系统', count: 1890, category: 'authentication' },
        { action: '更新护理记录', count: 1234, category: 'data_modification' },
        { action: '审核处方', count: 987, category: 'business_operation' },
        { action: '上传检验报告', count: 876, category: 'data_modification' }
      ],
      topIPs: [
        { ip: '192.168.1.100', count: 456, location: '北京市朝阳区' },
        { ip: '192.168.1.101', count: 234, location: '北京市海淀区' },
        { ip: '192.168.1.102', count: 189, location: '北京市西城区' },
        { ip: '192.168.1.103', count: 167, location: '北京市东城区' },
        { ip: '192.168.1.104', count: 145, location: '北京市丰台区' }
      ]
    };

    setLogs(mockLogs);
    setStatistics(mockStatistics);
    setPagination(prev => ({ ...prev, total: mockLogs.length }));
  }, []);

  // 表格列定义
  const logColumns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
      render: (timestamp) => (
        <div>
          <Text>{timestamp.split(' ')[0]}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {timestamp.split(' ')[1]}
          </Text>
        </div>
      )
    },
    {
      title: '用户',
      key: 'user',
      render: (_, record) => (
        <div>
          <Space>
            <Avatar size="small" icon={<UserOutlined />} />
            <div>
              <Text strong>{record.userName}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {record.user}
              </Text>
            </div>
          </Space>
        </div>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div>
          <Text strong>{record.action}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.resource}
          </Text>
        </div>
      )
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const categoryMap = {
          'authentication': { color: 'blue', text: '身份认证' },
          'data_access': { color: 'green', text: '数据访问' },
          'data_modification': { color: 'orange', text: '数据修改' },
          'business_operation': { color: 'purple', text: '业务操作' },
          'system_operation': { color: 'red', text: '系统操作' },
          'security_alert': { color: 'red', text: '安全警报' }
        };
        const config = categoryMap[category] || { color: 'default', text: category };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      render: (result) => {
        const resultMap = {
          'success': { status: 'success', color: 'green', text: '成功' },
          'failed': { status: 'error', color: 'red', text: '失败' },
          'warning': { status: 'warning', color: 'orange', text: '警告' }
        };
        const config = resultMap[result] || { status: 'default', color: 'default', text: result };
        return <Badge status={config.status} text={config.text} />;
      }
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      render: (ip, record) => (
        <div>
          <Text>{ip}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.location}
          </Text>
        </div>
      )
    },
    {
      title: '影响等级',
      dataIndex: 'impact',
      key: 'impact',
      render: (impact) => {
        const impactMap = {
          'low': { color: 'green', text: '低' },
          'medium': { color: 'orange', text: '中' },
          'high': { color: 'red', text: '高' }
        };
        const config = impactMap[impact] || { color: 'default', text: impact };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>
          <Tooltip title="导出详情">
            <Button 
              type="text" 
              icon={<ExportOutlined />}
              onClick={() => handleExportLog(record)}
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

  const handleExportLog = (record) => {
    message.success('日志导出功能正在开发中');
  };

  const handleExportAll = () => {
    message.success('全部日志导出功能正在开发中');
  };

  const handleClearLogs = () => {
    Modal.confirm({
      title: '确认清空',
      content: '确定要清空所有操作日志吗？此操作不可撤销。',
      onOk: () => {
        setLogs([]);
        message.success('日志已清空');
      }
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    setFilters(filters);
    // 这里应该重新加载数据
  };

  const handleSearch = (value) => {
    // 这里应该执行搜索逻辑
    message.info(`搜索功能正在开发中: ${value}`);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // 这里应该重新加载数据
  };

  const getActionIcon = (action) => {
    const iconMap = {
      '登录系统': <LoginOutlined />,
      '登录失败': <LoginOutlined />,
      '查看患者信息': <FileSearchOutlined />,
      '更新护理记录': <EditFilled />,
      '审核处方': <CheckCircleFilled />,
      '上传检验报告': <FileAddOutlined />,
      '修改系统设置': <SettingOutlined />,
      '删除患者记录': <DeleteFilled />,
      '数据备份': <DatabaseFilled />,
      '检测异常登录': <SecurityScanFilled />
    };
    return iconMap[action] || <FileTextOutlined />;
  };

  const getResultColor = (result) => {
    const colorMap = {
      'success': '#52c41a',
      'failed': '#ff4d4f',
      'warning': '#fa8c16'
    };
    return colorMap[result] || '#666';
  };

  const getImpactColor = (impact) => {
    const colorMap = {
      'low': '#52c41a',
      'medium': '#fa8c16',
      'high': '#ff4d4f'
    };
    return colorMap[impact] || '#666';
  };

  // 渲染详情内容
  const renderDetailContent = () => {
    if (!selectedRecord) return null;

    return (
      <Descriptions bordered column={2}>
        <Descriptions.Item label="操作时间">{selectedRecord.timestamp}</Descriptions.Item>
        <Descriptions.Item label="操作用户">
          <Space>
            <Avatar size="small" icon={<UserOutlined />} />
            <Text>{selectedRecord.userName} ({selectedRecord.user})</Text>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="操作类型">
          <Space>
            {getActionIcon(selectedRecord.action)}
            <Text>{selectedRecord.action}</Text>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="操作资源">{selectedRecord.resource}</Descriptions.Item>
        <Descriptions.Item label="操作分类">
          <Tag color="blue">{selectedRecord.category}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="操作结果">
          <Badge 
            status={selectedRecord.result === 'success' ? 'success' : selectedRecord.result === 'failed' ? 'error' : 'warning'} 
            text={selectedRecord.result === 'success' ? '成功' : selectedRecord.result === 'failed' ? '失败' : '警告'}
          />
        </Descriptions.Item>
        <Descriptions.Item label="IP地址">{selectedRecord.ip}</Descriptions.Item>
        <Descriptions.Item label="地理位置">{selectedRecord.location}</Descriptions.Item>
        <Descriptions.Item label="设备信息">{selectedRecord.device}</Descriptions.Item>
        <Descriptions.Item label="操作时长">{selectedRecord.duration}ms</Descriptions.Item>
        <Descriptions.Item label="影响等级">
          <Tag color={getImpactColor(selectedRecord.impact)}>
            {selectedRecord.impact === 'low' ? '低' : selectedRecord.impact === 'medium' ? '中' : '高'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="详细描述" span={2}>
          <Text>{selectedRecord.details}</Text>
        </Descriptions.Item>
      </Descriptions>
    );
  };

  return (
    <div className="operation-logs">
      {/* 页面标题 */}
      <div className="logs-header">
        <Title level={2} className="page-title">
          <FileTextOutlined className="page-icon" />
          操作日志
        </Title>
        <Space>
          <Button 
            icon={<ExportOutlined />}
            onClick={handleExportAll}
          >
            导出全部
          </Button>
          <Button 
            icon={<ClearOutlined />}
            onClick={handleClearLogs}
            danger
          >
            清空日志
          </Button>
        </Space>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="logs-stats">
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="总日志数"
              value={statistics.totalLogs || 0}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="今日日志"
              value={statistics.todayLogs || 0}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="成功率"
              value={statistics.successRate || 0}
              suffix="%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="警告率"
              value={statistics.warningRate || 0}
              suffix="%"
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="错误率"
              value={statistics.errorRate || 0}
              suffix="%"
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="活跃用户"
              value={statistics.activeUsers || 0}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card className="logs-content">
        <Tabs defaultActiveKey="logs" className="logs-tabs">
          <TabPane 
            tab={
              <span>
                <FileTextOutlined />
                日志列表
              </span>
            } 
            key="logs"
          >
            <div className="tab-content">
              {/* 搜索和筛选区域 */}
              <div className="filter-section">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={6}>
                    <Search
                      placeholder="搜索日志..."
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
                      <Option value="success">成功</Option>
                      <Option value="failed">失败</Option>
                      <Option value="warning">警告</Option>
                    </Select>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Select
                      placeholder="选择分类"
                      style={{ width: '100%' }}
                      onChange={(value) => handleFilterChange('category', value)}
                    >
                      <Option value="all">全部分类</Option>
                      <Option value="authentication">身份认证</Option>
                      <Option value="data_access">数据访问</Option>
                      <Option value="data_modification">数据修改</Option>
                      <Option value="business_operation">业务操作</Option>
                      <Option value="system_operation">系统操作</Option>
                      <Option value="security_alert">安全警报</Option>
                    </Select>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <RangePicker
                      style={{ width: '100%' }}
                      onChange={(dates) => handleFilterChange('dateRange', dates)}
                    />
                  </Col>
                </Row>
              </div>

              {/* 日志表格 */}
              <Table
                columns={logColumns}
                dataSource={logs}
                rowKey="id"
                pagination={pagination}
                onChange={handleTableChange}
                loading={loading}
                rowClassName={(record) => 
                  record.result === 'failed' ? 'error-row' : 
                  record.result === 'warning' ? 'warning-row' : ''
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
                <Col xs={24} lg={8}>
                  <Card title="活跃用户TOP5" size="small">
                    <List
                      dataSource={statistics.topUsers || []}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size="small" icon={<UserOutlined />} />}
                            title={`${item.name} (${item.user})`}
                            description={
                              <div>
                                <Text strong>{item.count}</Text>
                                <Text type="secondary"> 次操作</Text>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} lg={8}>
                  <Card title="热门操作TOP5" size="small">
                    <List
                      dataSource={statistics.topActions || []}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={getActionIcon(item.action)}
                            title={item.action}
                            description={
                              <div>
                                <Text strong>{item.count}</Text>
                                <Text type="secondary"> 次操作</Text>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} lg={8}>
                  <Card title="IP地址TOP5" size="small">
                    <List
                      dataSource={statistics.topIPs || []}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size="small" icon={<GlobalOutlined />} />}
                            title={item.ip}
                            description={
                              <div>
                                <Text strong>{item.count}</Text>
                                <Text type="secondary"> 次访问</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  {item.location}
                                </Text>
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
                <SecurityScanOutlined />
                安全监控
              </span>
            } 
            key="security"
          >
            <div className="tab-content">
              <Alert
                message="安全监控"
                description="实时监控系统安全状态，检测异常登录和潜在威胁。"
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />
              
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Card title="今日安全事件" size="small">
                    <List
                      dataSource={logs.filter(log => log.category === 'security_alert' || log.result === 'failed')}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size="small" icon={<AlertOutlined />} style={{ backgroundColor: '#ff4d4f' }} />}
                            title={item.action}
                            description={
                              <div>
                                <Text type="secondary">{item.timestamp}</Text>
                                <br />
                                <Text type="secondary">{item.details}</Text>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} lg={12}>
                  <Card title="异常登录检测" size="small">
                    <List
                      dataSource={logs.filter(log => log.result === 'failed' && log.action.includes('登录'))}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size="small" icon={<WarningOutlined />} style={{ backgroundColor: '#fa8c16' }} />}
                            title={`${item.userName} - ${item.ip}`}
                            description={
                              <div>
                                <Text type="secondary">{item.timestamp}</Text>
                                <br />
                                <Text type="secondary">{item.details}</Text>
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
        title="日志详情"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>,
          <Button key="export" type="primary" icon={<ExportOutlined />} onClick={handleExportLog}>
            导出详情
          </Button>
        ]}
        width={800}
      >
        {renderDetailContent()}
      </Modal>
    </div>
  );
};

export default OperationLogs;