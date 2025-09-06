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
  Image
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  WarningOutlined,
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
  BugOutlined,
  HeartOutlined,
  UploadOutlined,
  PaperClipOutlined,
  MessageOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;
const { Text, Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const AdverseEventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('events');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // 模拟数据
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        eventNumber: 'AE202401001',
        eventTypeId: 1,
        eventName: '医疗设备故障',
        severityLevel: 3,
        discoveryDate: '2024-01-15',
        occurrenceDate: '2024-01-15',
        reporterId: 1,
        reporterName: '张医生',
        department: '急诊科',
        patientInfo: {
          name: '患者A',
          age: 45,
          gender: '男',
          bedNumber: 'A001'
        },
        deviceInfo: {
          name: '监护仪',
          model: 'PM-9000',
          serialNumber: 'SN2024001'
        },
        eventDescription: '监护仪在使用过程中突然黑屏，无法显示患者生命体征数据，存在安全隐患。',
        immediateAction: '立即停止使用该设备，更换备用监护仪，确保患者监护不间断。',
        status: 'investigating',
        assignedInvestigatorId: 2,
        investigatorName: '李工程师',
        createdAt: '2024-01-15T10:30:00',
        updatedAt: '2024-01-15T14:20:00',
        attachments: [
          {
            name: '故障现场照片.jpg',
            size: 2048576,
            type: 'image/jpeg',
            url: '/uploads/ae202401001_1.jpg'
          }
        ],
        timeline: [
          {
            time: '2024-01-15 10:30',
            action: '事件报告',
            user: '张医生',
            description: '发现并报告设备故障'
          },
          {
            time: '2024-01-15 11:00',
            action: '事件受理',
            user: '安全管理员',
            description: '受理事件并指派调查员'
          },
          {
            time: '2024-01-15 14:20',
            action: '开始调查',
            user: '李工程师',
            description: '开始现场调查和技术分析'
          }
        ]
      },
      {
        id: 2,
        eventNumber: 'AE202401002',
        eventTypeId: 2,
        eventName: '药物不良反应',
        severityLevel: 2,
        discoveryDate: '2024-01-18',
        occurrenceDate: '2024-01-18',
        reporterId: 3,
        reporterName: '王护士',
        department: '内科',
        patientInfo: {
          name: '患者B',
          age: 32,
          gender: '女',
          bedNumber: 'B205'
        },
        deviceInfo: null,
        eventDescription: '患者使用抗生素后出现皮疹和瘙痒症状，怀疑为药物过敏反应。',
        immediateAction: '立即停用该药物，给予抗过敏治疗，密切观察患者病情变化。',
        status: 'processing',
        assignedInvestigatorId: 4,
        investigatorName: '赵药师',
        createdAt: '2024-01-18T09:15:00',
        updatedAt: '2024-01-18T10:30:00',
        attachments: [],
        timeline: [
          {
            time: '2024-01-18 09:15',
            action: '事件报告',
            user: '王护士',
            description: '发现并报告药物不良反应'
          },
          {
            time: '2024-01-18 10:30',
            action: '药师介入',
            user: '赵药师',
            description: '药师开始评估和处理'
          }
        ]
      },
      {
        id: 3,
        eventNumber: 'AE202401003',
        eventTypeId: 3,
        eventName: '操作流程失误',
        severityLevel: 1,
        discoveryDate: '2024-01-20',
        occurrenceDate: '2024-01-20',
        reporterId: 5,
        reporterName: '刘技师',
        department: '检验科',
        patientInfo: null,
        deviceInfo: {
          name: '血液分析仪',
          model: 'BC-6800',
          serialNumber: 'SN2024003'
        },
        eventDescription: '操作人员在设备校准过程中未按标准流程操作，导致检验结果偏差。',
        immediateAction: '立即停止使用该设备，重新校准，对已发出的检验结果进行复核。',
        status: 'completed',
        assignedInvestigatorId: 6,
        investigatorName: '陈主任',
        createdAt: '2024-01-20T16:45:00',
        updatedAt: '2024-01-21T11:20:00',
        attachments: [
          {
            name: '操作规程.pdf',
            size: 1048576,
            type: 'application/pdf',
            url: '/uploads/ae202401003_1.pdf'
          }
        ],
        timeline: [
          {
            time: '2024-01-20 16:45',
            action: '事件报告',
            user: '刘技师',
            description: '报告操作流程失误'
          },
          {
            time: '2024-01-20 17:00',
            action: '开始处理',
            user: '陈主任',
            description: '开始事件处理和整改'
          },
          {
            time: '2024-01-21 11:20',
            action: '事件关闭',
            user: '陈主任',
            description: '完成整改，事件关闭'
          }
        ]
      }
    ];

    setEvents(mockEvents);
    setTotal(mockEvents.length);
  }, []);

  const showModal = (event = null) => {
    setEditingEvent(event);
    setModalVisible(true);
    if (event) {
      form.setFieldsValue(event);
    } else {
      form.resetFields();
    }
  };

  const showDetail = (event) => {
    setSelectedEvent(event);
    setDetailVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingEvent(null);
    form.resetFields();
  };

  const handleDetailCancel = () => {
    setDetailVisible(false);
    setSelectedEvent(null);
  };

  const onFinish = async (values) => {
    try {
      if (editingEvent) {
        message.success('不良事件更新成功');
      } else {
        message.success('不良事件报告成功');
      }
      handleCancel();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const getSeverityBadge = (level) => {
    const levels = {
      1: { color: 'green', text: '轻微', icon: <SafetyOutlined /> },
      2: { color: 'orange', text: '一般', icon: <ExclamationCircleOutlined /> },
      3: { color: 'red', text: '严重', icon: <WarningOutlined /> },
      4: { color: 'purple', text: '非常严重', icon: <BugOutlined /> }
    };
    const config = levels[level] || levels[1];
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getStatusBadge = (status) => {
    const statuses = {
      pending: { color: 'default', text: '待处理', icon: <ClockCircleOutlined /> },
      investigating: { color: 'processing', text: '调查中', icon: <SearchOutlined /> },
      processing: { color: 'warning', text: '处理中', icon: <TeamOutlined /> },
      completed: { color: 'success', text: '已完成', icon: <CheckCircleOutlined /> },
      closed: { color: 'default', text: '已关闭', icon: <CheckCircleOutlined /> }
    };
    const config = statuses[status] || statuses.pending;
    return (
      <Badge status={config.color} text={config.text} />
    );
  };

  const getEventTypeIcon = (eventTypeId) => {
    const icons = {
      1: <MedicineBoxOutlined style={{ color: '#1890ff' }} />,
      2: <HeartOutlined style={{ color: '#52c41a' }} />,
      3: <SafetyOutlined style={{ color: '#fa8c16' }} />
    };
    return icons[eventTypeId] || <WarningOutlined style={{ color: '#ff4d4f' }} />;
  };

  const columns = [
    {
      title: '事件编号',
      dataIndex: 'eventNumber',
      key: 'eventNumber',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {getEventTypeIcon(record.eventTypeId)}
          <Text code style={{ fontWeight: 500 }}>{text}</Text>
        </div>
      ),
      width: 140,
    },
    {
      title: '事件类型',
      dataIndex: 'eventName',
      key: 'eventName',
      render: (text) => (
        <Text strong>{text}</Text>
      ),
      width: 120,
    },
    {
      title: '严重程度',
      dataIndex: 'severityLevel',
      key: 'severityLevel',
      render: (severity) => getSeverityBadge(severity),
      width: 100,
    },
    {
      title: '发生时间',
      dataIndex: 'occurrenceDate',
      key: 'occurrenceDate',
      render: (date) => (
        <Text style={{ fontSize: 12 }}>
          {new Date(date).toLocaleDateString('zh-CN')}
        </Text>
      ),
      width: 120,
    },
    {
      title: '报告人',
      dataIndex: 'reporterName',
      key: 'reporterName',
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
      title: '处理人',
      dataIndex: 'investigatorName',
      key: 'investigatorName',
      render: (text) => text || '-',
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

  const stats = {
    totalEvents: events.length,
    pendingEvents: events.filter(e => e.status === 'pending').length,
    investigatingEvents: events.filter(e => e.status === 'investigating').length,
    completedEvents: events.filter(e => e.status === 'completed').length,
    severeEvents: events.filter(e => e.severityLevel >= 3).length
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
    <div className="adverse-events-management">
      {/* 页面标题区域 */}
      <div className="adverse-events-header">
        <h1 className="page-title">
          <WarningOutlined className="page-icon" />
          不良事件管理
        </h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
          size="large"
          danger
        >
          报告不良事件
        </Button>
      </div>

      {/* 统计卡片区域 */}
      <Row gutter={[16, 16]} className="adverse-events-stats">
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="事件总数"
              value={stats.totalEvents}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="待处理"
              value={stats.pendingEvents}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="调查中"
              value={stats.investigatingEvents}
              prefix={<SearchOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="已完成"
              value={stats.completedEvents}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 严重事件提醒 */}
      {stats.severeEvents > 0 && (
        <Alert
          message={`当前有 ${stats.severeEvents} 个严重不良事件需要紧急处理`}
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
      <Card className="adverse-events-content">
        <div className="table-header">
          <Space>
            <Search
              placeholder="搜索事件编号或描述"
              allowClear
              enterButton={<SearchOutlined />}
              style={{ width: 300 }}
            />
            <Select placeholder="事件类型" style={{ width: 120 }}>
              <Option value="all">全部类型</Option>
              <Option value="1">设备故障</Option>
              <Option value="2">药物反应</Option>
              <Option value="3">操作失误</Option>
            </Select>
            <Select placeholder="严重程度" style={{ width: 120 }}>
              <Option value="all">全部等级</Option>
              <Option value="1">轻微</Option>
              <Option value="2">一般</Option>
              <Option value="3">严重</Option>
              <Option value="4">非常严重</Option>
            </Select>
            <Select placeholder="状态" style={{ width: 120 }}>
              <Option value="all">全部状态</Option>
              <Option value="pending">待处理</Option>
              <Option value="investigating">调查中</Option>
              <Option value="processing">处理中</Option>
              <Option value="completed">已完成</Option>
              <Option value="closed">已关闭</Option>
            </Select>
          </Space>
          <Button icon={<FilterOutlined />}>
            高级筛选
          </Button>
        </div>
        
        <Table
          columns={columns}
          dataSource={Array.isArray(events) ? events : []}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
          }}
          size="middle"
        />
      </Card>

      {/* 事件报告弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <WarningOutlined />
            {editingEvent ? "编辑不良事件" : "报告不良事件"}
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
                        name="eventTypeId"
                        label="事件类型"
                        rules={[{ required: true, message: '请选择事件类型' }]}
                      >
                        <Select placeholder="请选择事件类型">
                          <Option value={1}>医疗设备故障</Option>
                          <Option value={2}>药物不良反应</Option>
                          <Option value={3}>操作流程失误</Option>
                          <Option value={4}>其他</Option>
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
                          <Option value={1}>轻微</Option>
                          <Option value={2}>一般</Option>
                          <Option value={3}>严重</Option>
                          <Option value={4}>非常严重</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="discoveryDate"
                        label="发现日期"
                        rules={[{ required: true, message: '请选择发现日期' }]}
                      >
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="occurrenceDate"
                        label="发生日期"
                        rules={[{ required: true, message: '请选择发生日期' }]}
                      >
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="eventDescription"
                    label="事件描述"
                    rules={[{ required: true, message: '请输入事件描述' }]}
                  >
                    <TextArea rows={4} placeholder="请详细描述事件发生的过程和情况" />
                  </Form.Item>

                  <Form.Item
                    name="immediateAction"
                    label="立即采取的措施"
                    rules={[{ required: true, message: '请输入立即采取的措施' }]}
                  >
                    <TextArea rows={3} placeholder="请描述立即采取的措施和效果" />
                  </Form.Item>
                </>
              )
            },
            {
              key: 'related',
              label: '相关信息',
              children: (
                <>
                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="reporterName"
                        label="报告人"
                        rules={[{ required: true, message: '请输入报告人姓名' }]}
                      >
                        <Input placeholder="请输入报告人姓名" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="department"
                        label="科室"
                        rules={[{ required: true, message: '请输入科室' }]}
                      >
                        <Input placeholder="请输入科室" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <div style={{ marginBottom: 16 }}>
                    <Text strong>患者信息（如涉及）</Text>
                  </div>
                  <Row gutter={[16, 0]}>
                    <Col span={8}>
                      <Form.Item name="patientName" label="患者姓名">
                        <Input placeholder="患者姓名" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="patientAge" label="年龄">
                        <Input placeholder="年龄" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="patientGender" label="性别">
                        <Select placeholder="性别">
                          <Option value="男">男</Option>
                          <Option value="女">女</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <div style={{ marginBottom: 16 }}>
                    <Text strong>设备信息（如涉及）</Text>
                  </div>
                  <Row gutter={[16, 0]}>
                    <Col span={8}>
                      <Form.Item name="deviceName" label="设备名称">
                        <Input placeholder="设备名称" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="deviceModel" label="型号">
                        <Input placeholder="型号" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="deviceSerialNumber" label="序列号">
                        <Input placeholder="序列号" />
                      </Form.Item>
                    </Col>
                  </Row>
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
                    支持上传现场照片、相关文件等证据材料
                  </div>
                </Form.Item>
              )
            }
          ]} />

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" htmlType="submit" danger>
                {editingEvent ? "更新事件" : "提交报告"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 事件详情弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <WarningOutlined />
            事件详情 - {selectedEvent?.eventNumber}
          </div>
        }
        open={detailVisible}
        onCancel={handleDetailCancel}
        footer={null}
        width={900}
        destroyOnClose
      >
        {selectedEvent && (
          <div className="event-detail">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="事件编号" span={2}>
                <Text code>{selectedEvent.eventNumber}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="事件类型">
                {getEventTypeIcon(selectedEvent.eventTypeId)}
                <Text style={{ marginLeft: 8 }}>{selectedEvent.eventName}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="严重程度">
                {getSeverityBadge(selectedEvent.severityLevel)}
              </Descriptions.Item>
              <Descriptions.Item label="发现日期">
                {new Date(selectedEvent.discoveryDate).toLocaleDateString('zh-CN')}
              </Descriptions.Item>
              <Descriptions.Item label="发生日期">
                {new Date(selectedEvent.occurrenceDate).toLocaleDateString('zh-CN')}
              </Descriptions.Item>
              <Descriptions.Item label="报告人">
                <Avatar size="small" icon={<UserOutlined />} />
                <Text style={{ marginLeft: 8 }}>
                  {selectedEvent.reporterName} - {selectedEvent.department}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusBadge(selectedEvent.status)}
              </Descriptions.Item>
              <Descriptions.Item label="处理人">
                {selectedEvent.investigatorName || '-'}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">事件描述</Divider>
            <Paragraph>{selectedEvent.eventDescription}</Paragraph>

            <Divider orientation="left">立即措施</Divider>
            <Alert
              message={selectedEvent.immediateAction}
              type="info"
              showIcon
              icon={<SafetyOutlined />}
            />

            {selectedEvent.patientInfo && (
              <>
                <Divider orientation="left">患者信息</Divider>
                <Descriptions bordered column={3} size="small">
                  <Descriptions.Item label="姓名">
                    {selectedEvent.patientInfo.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="年龄">
                    {selectedEvent.patientInfo.age}岁
                  </Descriptions.Item>
                  <Descriptions.Item label="性别">
                    {selectedEvent.patientInfo.gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="床位号">
                    {selectedEvent.patientInfo.bedNumber}
                  </Descriptions.Item>
                </Descriptions>
              </>
            )}

            {selectedEvent.deviceInfo && (
              <>
                <Divider orientation="left">设备信息</Divider>
                <Descriptions bordered column={3} size="small">
                  <Descriptions.Item label="设备名称">
                    {selectedEvent.deviceInfo.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="型号">
                    {selectedEvent.deviceInfo.model}
                  </Descriptions.Item>
                  <Descriptions.Item label="序列号">
                    {selectedEvent.deviceInfo.serialNumber}
                  </Descriptions.Item>
                </Descriptions>
              </>
            )}

            {selectedEvent.attachments && selectedEvent.attachments.length > 0 && (
              <>
                <Divider orientation="left">相关附件</Divider>
                <List
                  dataSource={selectedEvent.attachments}
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

            <Divider orientation="left">处理时间线</Divider>
            <Timeline>
              {selectedEvent.timeline.map((item, index) => (
                <Timeline.Item key={index}>
                  <Text strong>{item.time}</Text> - {item.action}
                  <div style={{ marginTop: 4, color: '#666' }}>
                    {item.description} <Text type="secondary">by {item.user}</Text>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdverseEventsManagement;