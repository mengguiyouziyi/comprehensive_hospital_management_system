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
  Radio
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ToolOutlined,
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
  SafetyOutlined,
  WarningOutlined,
  UploadOutlined,
  PaperClipOutlined,
  MessageOutlined,
  TeamOutlined,
  AuditOutlined,
  HistoryOutlined,
  FlagOutlined,
  ScheduleOutlined,
  FileProtectOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;
const { Text, Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { TabPane } = Tabs;

const MaintenanceManagement = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const [scheduleForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('records');

  // 模拟数据
  useEffect(() => {
    const mockRecords = [
      {
        id: 1,
        recordNumber: 'MT202401001',
        deviceId: 1,
        deviceName: 'CT扫描仪',
        deviceModel: 'SOMATOM Definition AS',
        serialNumber: 'SN2018001',
        maintenanceType: 'preventive',
        maintenanceLevel: 2,
        technicianId: 1,
        technicianName: '张工程师',
        department: '设备科',
        scheduledDate: '2024-01-15',
        actualStartDate: '2024-01-15T09:00:00',
        actualEndDate: '2024-01-15T11:30:00',
        duration: 150,
        status: 'completed',
        cost: 500,
        partsUsed: [
          { name: '滤光片', quantity: 2, cost: 100 },
          { name: '冷却液', quantity: 1, cost: 200 }
        ],
        findings: '设备运行正常，清洁了滤光片，更换了冷却液，各项参数均在正常范围内。',
        recommendations: '建议继续按计划进行日常维护，下次维护时间为3个月后。',
        nextMaintenanceDate: '2024-04-15',
        attachments: [
          {
            name: '维护报告.pdf',
            size: 1024000,
            type: 'application/pdf',
            url: '/uploads/mt202401001_1.pdf'
          }
        ],
        verifiedBy: '李主任',
        verifiedAt: '2024-01-15T14:00:00',
        createdAt: '2024-01-15T08:30:00',
        updatedAt: '2024-01-15T14:00:00'
      },
      {
        id: 2,
        recordNumber: 'MT202401002',
        deviceId: 2,
        deviceName: '呼吸机',
        deviceModel: 'Servo-i',
        serialNumber: 'SN2019002',
        maintenanceType: 'corrective',
        maintenanceLevel: 3,
        technicianId: 2,
        technicianName: '王技师',
        department: '设备科',
        scheduledDate: '2024-01-18',
        actualStartDate: '2024-01-18T10:00:00',
        actualEndDate: '2024-01-18T16:00:00',
        duration: 360,
        status: 'completed',
        cost: 1200,
        partsUsed: [
          { name: '传感器', quantity: 1, cost: 800 },
          { name: '密封圈', quantity: 5, cost: 200 }
        ],
        findings: '设备压力控制不稳定，更换了损坏的传感器，重新校准了压力控制系统。',
        recommendations: '已恢复正常运行，建议加强日常检查频率。',
        nextMaintenanceDate: '2024-04-18',
        attachments: [
          {
            name: '维修记录.pdf',
            size: 1536000,
            type: 'application/pdf',
            url: '/uploads/mt202401002_1.pdf'
          },
          {
            name: '故障照片.jpg',
            size: 512000,
            type: 'image/jpeg',
            url: '/uploads/mt202401002_2.jpg'
          }
        ],
        verifiedBy: '李主任',
        verifiedAt: '2024-01-18T17:00:00',
        createdAt: '2024-01-18T09:00:00',
        updatedAt: '2024-01-18T17:00:00'
      },
      {
        id: 3,
        recordNumber: 'MT202401003',
        deviceId: 3,
        deviceName: '监护仪',
        deviceModel: 'PM-9000',
        serialNumber: 'SN2020003',
        maintenanceType: 'preventive',
        maintenanceLevel: 1,
        technicianId: 3,
        technicianName: '刘技术员',
        department: '设备科',
        scheduledDate: '2024-01-20',
        actualStartDate: null,
        actualEndDate: null,
        duration: 60,
        status: 'pending',
        cost: 0,
        partsUsed: [],
        findings: '',
        recommendations: '',
        nextMaintenanceDate: '2024-04-20',
        attachments: [],
        verifiedBy: null,
        verifiedAt: null,
        createdAt: '2024-01-15T10:00:00',
        updatedAt: '2024-01-15T10:00:00'
      }
    ];

    const mockSchedules = [
      {
        id: 1,
        scheduleNumber: 'MS202401001',
        deviceId: 1,
        deviceName: 'CT扫描仪',
        deviceModel: 'SOMATOM Definition AS',
        serialNumber: 'SN2018001',
        maintenanceType: 'preventive',
        frequency: 'quarterly',
        maintenanceLevel: 2,
        estimatedDuration: 120,
        estimatedCost: 600,
        responsiblePerson: '张工程师',
        department: '设备科',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        nextMaintenanceDate: '2024-04-15',
        status: 'active',
        description: '季度预防性维护，包括设备清洁、参数校准、功能测试等。',
        requirements: [
          '设备清洁',
          '参数校准',
          '功能测试',
          '安全检查'
        ],
        createdAt: '2024-01-01T09:00:00',
        updatedAt: '2024-01-15T14:00:00'
      },
      {
        id: 2,
        scheduleNumber: 'MS202401002',
        deviceId: 2,
        deviceName: '呼吸机',
        deviceModel: 'Servo-i',
        serialNumber: 'SN2019002',
        maintenanceType: 'preventive',
        frequency: 'monthly',
        maintenanceLevel: 2,
        estimatedDuration: 90,
        estimatedCost: 400,
        responsiblePerson: '王技师',
        department: '设备科',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        nextMaintenanceDate: '2024-02-18',
        status: 'active',
        description: '月度预防性维护，检查管路系统、校准参数、测试报警功能等。',
        requirements: [
          '管路检查',
          '参数校准',
          '报警测试',
          '电池检查'
        ],
        createdAt: '2024-01-01T09:00:00',
        updatedAt: '2024-01-18T17:00:00'
      }
    ];

    setMaintenanceRecords(mockRecords);
    setSchedules(mockSchedules);
  }, []);

  const showModal = (record = null) => {
    setEditingRecord(record);
    setModalVisible(true);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  const showScheduleModal = (schedule = null) => {
    setEditingSchedule(schedule);
    setScheduleModalVisible(true);
    if (schedule) {
      scheduleForm.setFieldsValue(schedule);
    } else {
      scheduleForm.resetFields();
    }
  };

  const showDetail = (record) => {
    setSelectedRecord(record);
    setDetailVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleScheduleCancel = () => {
    setScheduleModalVisible(false);
    setEditingSchedule(null);
    scheduleForm.resetFields();
  };

  const handleDetailCancel = () => {
    setDetailVisible(false);
    setSelectedRecord(null);
  };

  const onFinish = async (values) => {
    try {
      if (editingRecord) {
        message.success('维护记录更新成功');
      } else {
        message.success('维护记录创建成功');
      }
      handleCancel();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const onScheduleFinish = async (values) => {
    try {
      if (editingSchedule) {
        message.success('维护计划更新成功');
      } else {
        message.success('维护计划创建成功');
      }
      handleScheduleCancel();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const getMaintenanceTypeBadge = (type) => {
    const types = {
      preventive: { color: 'green', text: '预防性维护', icon: <ScheduleOutlined /> },
      corrective: { color: 'red', text: '纠正性维护', icon: <ToolOutlined /> },
      predictive: { color: 'blue', text: '预测性维护', icon: <HistoryOutlined /> },
      emergency: { color: 'orange', text: '紧急维护', icon: <WarningOutlined /> }
    };
    const config = types[type] || types.preventive;
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getMaintenanceLevelBadge = (level) => {
    const levels = {
      1: { color: 'green', text: '一级' },
      2: { color: 'blue', text: '二级' },
      3: { color: 'orange', text: '三级' },
      4: { color: 'red', text: '四级' }
    };
    const config = levels[level] || levels[1];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getStatusBadge = (status) => {
    const statuses = {
      pending: { color: 'default', text: '待执行', icon: <ClockCircleOutlined /> },
      in_progress: { color: 'processing', text: '进行中', icon: <ToolOutlined /> },
      completed: { color: 'success', text: '已完成', icon: <CheckCircleOutlined /> },
      cancelled: { color: 'error', text: '已取消', icon: <ExclamationCircleOutlined /> }
    };
    const config = statuses[status] || statuses.pending;
    return (
      <Badge status={config.color} text={config.text} />
    );
  };

  const getFrequencyBadge = (frequency) => {
    const frequencies = {
      daily: { color: 'red', text: '每日' },
      weekly: { color: 'orange', text: '每周' },
      monthly: { color: 'blue', text: '每月' },
      quarterly: { color: 'green', text: '每季' },
      yearly: { color: 'purple', text: '每年' }
    };
    const config = frequencies[frequency] || frequencies.monthly;
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const recordColumns = [
    {
      title: '记录编号',
      dataIndex: 'recordNumber',
      key: 'recordNumber',
      render: (text) => (
        <Text code style={{ fontWeight: 500 }}>{text}</Text>
      ),
      width: 140,
    },
    {
      title: '设备信息',
      key: 'deviceInfo',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>
            <MedicineBoxOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            {record.deviceName}
          </div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.deviceModel} · {record.serialNumber}
          </Text>
        </div>
      ),
      width: 200,
    },
    {
      title: '维护类型',
      dataIndex: 'maintenanceType',
      key: 'maintenanceType',
      render: (type) => getMaintenanceTypeBadge(type),
      width: 120,
    },
    {
      title: '维护级别',
      dataIndex: 'maintenanceLevel',
      key: 'maintenanceLevel',
      render: (level) => getMaintenanceLevelBadge(level),
      width: 80,
    },
    {
      title: '维护日期',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      render: (date) => (
        <Text style={{ fontSize: 12 }}>
          {new Date(date).toLocaleDateString('zh-CN')}
        </Text>
      ),
      width: 120,
    },
    {
      title: '技术人员',
      dataIndex: 'technicianName',
      key: 'technicianName',
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
      title: '费用',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost) => (
        <Text style={{ fontWeight: 500, color: '#52c41a' }}>
          ¥{cost?.toLocaleString()}
        </Text>
      ),
      width: 100,
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

  const scheduleColumns = [
    {
      title: '计划编号',
      dataIndex: 'scheduleNumber',
      key: 'scheduleNumber',
      render: (text) => (
        <Text code style={{ fontWeight: 500 }}>{text}</Text>
      ),
      width: 140,
    },
    {
      title: '设备信息',
      key: 'deviceInfo',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>
            <MedicineBoxOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            {record.deviceName}
          </div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.deviceModel} · {record.serialNumber}
          </Text>
        </div>
      ),
      width: 200,
    },
    {
      title: '维护频率',
      dataIndex: 'frequency',
      key: 'frequency',
      render: (frequency) => getFrequencyBadge(frequency),
      width: 100,
    },
    {
      title: '下次维护',
      dataIndex: 'nextMaintenanceDate',
      key: 'nextMaintenanceDate',
      render: (date) => (
        <Text style={{ fontSize: 12 }}>
          {new Date(date).toLocaleDateString('zh-CN')}
        </Text>
      ),
      width: 120,
    },
    {
      title: '负责人',
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.department}</Text>
        </div>
      ),
      width: 120,
    },
    {
      title: '预计费用',
      dataIndex: 'estimatedCost',
      key: 'estimatedCost',
      render: (cost) => (
        <Text style={{ fontWeight: 500, color: '#1890ff' }}>
          ¥{cost?.toLocaleString()}
        </Text>
      ),
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge status={status === 'active' ? 'success' : 'default'} text={status === 'active' ? '激活' : '停用'} />
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
            onClick={() => showScheduleModal(record)}
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
    totalRecords: maintenanceRecords.length,
    completedRecords: maintenanceRecords.filter(r => r.status === 'completed').length,
    pendingRecords: maintenanceRecords.filter(r => r.status === 'pending').length,
    totalCost: maintenanceRecords.reduce((sum, r) => sum + r.cost, 0),
    activeSchedules: schedules.filter(s => s.status === 'active').length,
    overdueRecords: maintenanceRecords.filter(r => 
      r.status === 'pending' && new Date(r.scheduledDate) < new Date()
    ).length
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
    <div className="maintenance-management">
      {/* 页面标题区域 */}
      <div className="maintenance-header">
        <h1 className="page-title">
          <ToolOutlined className="page-icon" />
          维护保养管理
        </h1>
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
            size="large"
          >
            创建维护记录
          </Button>
          <Button 
            icon={<ScheduleOutlined />} 
            onClick={() => showScheduleModal()}
            size="large"
          >
            创建维护计划
          </Button>
        </Space>
      </div>

      {/* 统计卡片区域 */}
      <Row gutter={[16, 16]} className="maintenance-stats">
        <Col xs={24} sm={12} lg={4}>
          <Card className="stats-card">
            <Statistic
              title="维护记录"
              value={stats.totalRecords}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card className="stats-card">
            <Statistic
              title="已完成"
              value={stats.completedRecords}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card className="stats-card">
            <Statistic
              title="待执行"
              value={stats.pendingRecords}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card className="stats-card">
            <Statistic
              title="维护计划"
              value={stats.activeSchedules}
              prefix={<ScheduleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card className="stats-card">
            <Statistic
              title="逾期记录"
              value={stats.overdueRecords}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card className="stats-card">
            <Statistic
              title="总费用"
              value={stats.totalCost}
              prefix={<FileProtectOutlined />}
              suffix="元"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 逾期提醒 */}
      {stats.overdueRecords > 0 && (
        <Alert
          message={`当前有 ${stats.overdueRecords} 个维护记录已逾期，请及时处理`}
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
      <Card className="maintenance-content">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane 
            tab={
              <span>
                <FileTextOutlined />
                维护记录
              </span>
            } 
            key="records"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Search
                    placeholder="搜索记录编号或设备名称"
                    allowClear
                    enterButton={<SearchOutlined />}
                    style={{ width: 300 }}
                  />
                  <Select placeholder="维护类型" style={{ width: 120 }}>
                    <Option value="all">全部类型</Option>
                    <Option value="preventive">预防性维护</Option>
                    <Option value="corrective">纠正性维护</Option>
                    <Option value="predictive">预测性维护</Option>
                    <Option value="emergency">紧急维护</Option>
                  </Select>
                  <Select placeholder="状态" style={{ width: 120 }}>
                    <Option value="all">全部状态</Option>
                    <Option value="pending">待执行</Option>
                    <Option value="in_progress">进行中</Option>
                    <Option value="completed">已完成</Option>
                    <Option value="cancelled">已取消</Option>
                  </Select>
                </Space>
                <Button icon={<FilterOutlined />}>
                  高级筛选
                </Button>
              </div>
              
              <Table
                columns={recordColumns}
                dataSource={Array.isArray(maintenanceRecords) ? maintenanceRecords : []}
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
                <ScheduleOutlined />
                维护计划
              </span>
            } 
            key="schedules"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Search
                    placeholder="搜索计划编号或设备名称"
                    allowClear
                    enterButton={<SearchOutlined />}
                    style={{ width: 300 }}
                  />
                  <Select placeholder="维护频率" style={{ width: 120 }}>
                    <Option value="all">全部频率</Option>
                    <Option value="daily">每日</Option>
                    <Option value="weekly">每周</Option>
                    <Option value="monthly">每月</Option>
                    <Option value="quarterly">每季</Option>
                    <Option value="yearly">每年</Option>
                  </Select>
                  <Select placeholder="状态" style={{ width: 120 }}>
                    <Option value="all">全部状态</Option>
                    <Option value="active">激活</Option>
                    <Option value="inactive">停用</Option>
                  </Select>
                </Space>
                <Button icon={<FilterOutlined />}>
                  高级筛选
                </Button>
              </div>
              
              <Table
                columns={scheduleColumns}
                dataSource={Array.isArray(schedules) ? schedules : []}
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

      {/* 维护记录弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ToolOutlined />
            {editingRecord ? "编辑维护记录" : "创建维护记录"}
          </div>
        }
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
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
                        name="deviceName"
                        label="设备名称"
                        rules={[{ required: true, message: '请输入设备名称' }]}
                      >
                        <Input placeholder="请输入设备名称" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="deviceModel"
                        label="设备型号"
                        rules={[{ required: true, message: '请输入设备型号' }]}
                      >
                        <Input placeholder="请输入设备型号" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="serialNumber"
                        label="序列号"
                        rules={[{ required: true, message: '请输入序列号' }]}
                      >
                        <Input placeholder="请输入序列号" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="maintenanceType"
                        label="维护类型"
                        rules={[{ required: true, message: '请选择维护类型' }]}
                      >
                        <Select placeholder="请选择维护类型">
                          <Option value="preventive">预防性维护</Option>
                          <Option value="corrective">纠正性维护</Option>
                          <Option value="predictive">预测性维护</Option>
                          <Option value="emergency">紧急维护</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="maintenanceLevel"
                        label="维护级别"
                        rules={[{ required: true, message: '请选择维护级别' }]}
                      >
                        <Select placeholder="请选择维护级别">
                          <Option value={1}>一级</Option>
                          <Option value={2}>二级</Option>
                          <Option value={3}>三级</Option>
                          <Option value={4}>四级</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="scheduledDate"
                        label="计划日期"
                        rules={[{ required: true, message: '请选择计划日期' }]}
                      >
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="technicianName"
                        label="技术人员"
                        rules={[{ required: true, message: '请输入技术人员姓名' }]}
                      >
                        <Input placeholder="请输入技术人员姓名" />
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
                        name="duration"
                        label="预计时长(分钟)"
                        rules={[{ required: true, message: '请输入预计时长' }]}
                      >
                        <InputNumber 
                          placeholder="请输入预计时长" 
                          style={{ width: '100%' }}
                          min={1}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="cost"
                        label="维护费用"
                        rules={[{ required: true, message: '请输入维护费用' }]}
                      >
                        <InputNumber 
                          placeholder="请输入维护费用" 
                          style={{ width: '100%' }}
                          formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )
            },
            {
              key: 'details',
              label: '维护详情',
              children: (
                <>
                  <Form.Item
                    name="findings"
                    label="发现问题"
                    rules={[{ required: true, message: '请输入发现问题' }]}
                  >
                    <TextArea rows={4} placeholder="请详细描述维护过程中发现的问题" />
                  </Form.Item>

                  <Form.Item
                    name="recommendations"
                    label="建议措施"
                    rules={[{ required: true, message: '请输入建议措施' }]}
                  >
                    <TextArea rows={3} placeholder="请输入维护建议和后续措施" />
                  </Form.Item>

                  <Form.Item
                    name="nextMaintenanceDate"
                    label="下次维护日期"
                    rules={[{ required: true, message: '请选择下次维护日期' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
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
                    支持上传维护报告、检测记录、照片等
                  </div>
                </Form.Item>
              )
            }
          ]} />

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" htmlType="submit">
                {editingRecord ? "更新记录" : "创建记录"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 维护计划弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ScheduleOutlined />
            {editingSchedule ? "编辑维护计划" : "创建维护计划"}
          </div>
        }
        open={scheduleModalVisible}
        onCancel={handleScheduleCancel}
        footer={null}
        width={700}
        destroyOnClose
      >
        <Form
          form={scheduleForm}
          onFinish={onScheduleFinish}
          layout="vertical"
        >
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="deviceName"
                label="设备名称"
                rules={[{ required: true, message: '请输入设备名称' }]}
              >
                <Input placeholder="请输入设备名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="deviceModel"
                label="设备型号"
                rules={[{ required: true, message: '请输入设备型号' }]}
              >
                <Input placeholder="请输入设备型号" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="serialNumber"
                label="序列号"
                rules={[{ required: true, message: '请输入序列号' }]}
              >
                <Input placeholder="请输入序列号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maintenanceType"
                label="维护类型"
                rules={[{ required: true, message: '请选择维护类型' }]}
              >
                <Select placeholder="请选择维护类型">
                  <Option value="preventive">预防性维护</Option>
                  <Option value="corrective">纠正性维护</Option>
                  <Option value="predictive">预测性维护</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={8}>
              <Form.Item
                name="frequency"
                label="维护频率"
                rules={[{ required: true, message: '请选择维护频率' }]}
              >
                <Select placeholder="请选择维护频率">
                  <Option value="daily">每日</Option>
                  <Option value="weekly">每周</Option>
                  <Option value="monthly">每月</Option>
                  <Option value="quarterly">每季</Option>
                  <Option value="yearly">每年</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="maintenanceLevel"
                label="维护级别"
                rules={[{ required: true, message: '请选择维护级别' }]}
              >
                <Select placeholder="请选择维护级别">
                  <Option value={1}>一级</Option>
                  <Option value={2}>二级</Option>
                  <Option value={3}>三级</Option>
                  <Option value={4}>四级</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="estimatedDuration"
                label="预计时长(分钟)"
                rules={[{ required: true, message: '请输入预计时长' }]}
              >
                <InputNumber 
                  placeholder="请输入预计时长" 
                  style={{ width: '100%' }}
                  min={1}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="estimatedCost"
                label="预计费用"
                rules={[{ required: true, message: '请输入预计费用' }]}
              >
                <InputNumber 
                  placeholder="请输入预计费用" 
                  style={{ width: '100%' }}
                  formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="responsiblePerson"
                label="负责人"
                rules={[{ required: true, message: '请输入负责人' }]}
              >
                <Input placeholder="请输入负责人" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="开始日期"
                rules={[{ required: true, message: '请选择开始日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="结束日期"
                rules={[{ required: true, message: '请选择结束日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="计划描述"
            rules={[{ required: true, message: '请输入计划描述' }]}
          >
            <TextArea rows={3} placeholder="请描述维护计划的具体内容和要求" />
          </Form.Item>

          <Form.Item
            name="requirements"
            label="维护要求"
          >
            <Select 
              mode="tags" 
              placeholder="请输入维护要求，按回车添加"
              style={{ width: '100%' }}
            >
              <Option value="设备清洁">设备清洁</Option>
              <Option value="参数校准">参数校准</Option>
              <Option value="功能测试">功能测试</Option>
              <Option value="安全检查">安全检查</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleScheduleCancel}>取消</Button>
              <Button type="primary" htmlType="submit">
                {editingSchedule ? "更新计划" : "创建计划"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 维护记录详情弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ToolOutlined />
            维护记录详情 - {selectedRecord?.recordNumber}
          </div>
        }
        open={detailVisible}
        onCancel={handleDetailCancel}
        footer={null}
        width={900}
        destroyOnClose
      >
        {selectedRecord && (
          <div className="record-detail">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="记录编号" span={2}>
                <Text code>{selectedRecord.recordNumber}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="设备名称">
                {selectedRecord.deviceName}
              </Descriptions.Item>
              <Descriptions.Item label="设备型号">
                {selectedRecord.deviceModel}
              </Descriptions.Item>
              <Descriptions.Item label="序列号">
                {selectedRecord.serialNumber}
              </Descriptions.Item>
              <Descriptions.Item label="维护类型">
                {getMaintenanceTypeBadge(selectedRecord.maintenanceType)}
              </Descriptions.Item>
              <Descriptions.Item label="维护级别">
                {getMaintenanceLevelBadge(selectedRecord.maintenanceLevel)}
              </Descriptions.Item>
              <Descriptions.Item label="技术人员">
                <Avatar size="small" icon={<UserOutlined />} />
                <Text style={{ marginLeft: 8 }}>
                  {selectedRecord.technicianName} - {selectedRecord.department}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusBadge(selectedRecord.status)}
              </Descriptions.Item>
              <Descriptions.Item label="计划日期">
                {new Date(selectedRecord.scheduledDate).toLocaleDateString('zh-CN')}
              </Descriptions.Item>
              <Descriptions.Item label="实际开始时间">
                {selectedRecord.actualStartDate ? 
                  new Date(selectedRecord.actualStartDate).toLocaleString('zh-CN') : 
                  '-'
                }
              </Descriptions.Item>
              <Descriptions.Item label="实际结束时间">
                {selectedRecord.actualEndDate ? 
                  new Date(selectedRecord.actualEndDate).toLocaleString('zh-CN') : 
                  '-'
                }
              </Descriptions.Item>
              <Descriptions.Item label="维护费用">
                <Text style={{ color: '#52c41a' }}>
                  ¥{selectedRecord.cost?.toLocaleString()}
                </Text>
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">发现问题</Divider>
            <Paragraph>{selectedRecord.findings || '暂无记录'}</Paragraph>

            <Divider orientation="left">建议措施</Divider>
            <Alert
              message={selectedRecord.recommendations || '暂无建议'}
              type="info"
              showIcon
              icon={<SafetyOutlined />}
            />

            {selectedRecord.partsUsed && selectedRecord.partsUsed.length > 0 && (
              <>
                <Divider orientation="left">使用配件</Divider>
                <Table
                  dataSource={selectedRecord.partsUsed}
                  pagination={false}
                  size="small"
                  columns={[
                    {
                      title: '配件名称',
                      dataIndex: 'name',
                      key: 'name',
                    },
                    {
                      title: '数量',
                      dataIndex: 'quantity',
                      key: 'quantity',
                      align: 'center',
                    },
                    {
                      title: '单价',
                      dataIndex: 'cost',
                      key: 'cost',
                      render: (cost) => `¥${cost}`,
                      align: 'right',
                    },
                    {
                      title: '总价',
                      key: 'total',
                      render: (_, record) => `¥${record.quantity * record.cost}`,
                      align: 'right',
                    },
                  ]}
                />
              </>
            )}

            {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
              <>
                <Divider orientation="left">相关附件</Divider>
                <List
                  dataSource={selectedRecord.attachments}
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

            <Divider orientation="left">审核信息</Divider>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="审核人">
                {selectedRecord.verifiedBy || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="审核时间">
                {selectedRecord.verifiedAt ? 
                  new Date(selectedRecord.verifiedAt).toLocaleString('zh-CN') : 
                  '-'
                }
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MaintenanceManagement;