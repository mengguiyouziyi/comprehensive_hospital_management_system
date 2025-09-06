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
  Steps,
  Upload,
  Image,
  InputNumber,
  Tooltip
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  DeleteFilled,
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
  DollarOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
  PaperClipOutlined,
  MessageOutlined,
  TeamOutlined,
  AuditOutlined,
  ToolOutlined,
  BankOutlined,
  CarOutlined,
  FileDoneOutlined,
  WarningOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;
const { Text, Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Step } = Steps;

const DisposalManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [approvalVisible, setApprovalVisible] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [form] = Form.useForm();
  const [approvalForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('applications');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // 模拟数据
  useEffect(() => {
    const mockApplications = [
      {
        id: 1,
        applicationNumber: 'DS202401001',
        deviceId: 1,
        deviceName: 'CT扫描仪',
        deviceModel: 'SOMATOM Definition AS',
        deviceSerialNumber: 'SN2018001',
        applicantId: 1,
        applicantName: '张主任',
        applicantDepartment: '设备科',
        applicationDate: '2024-01-15',
        reason: '设备使用超过8年，故障频发，维修成本过高，已达到报废年限。主要问题包括：扫描精度下降、图像质量模糊、维护成本年均超过10万元。',
        estimatedValue: 50000,
        originalValue: 2000000,
        depreciationYears: 8,
        status: 'pending',
        workflow: {
          currentLevel: 1,
          totalLevels: 3,
          currentApproverId: 2,
          currentApproverName: '李院长',
          status: 'pending'
        },
        approvalHistory: [
          {
            level: 1,
            approverName: '李院长',
            approvalDate: null,
            status: 'pending',
            comment: null
          },
          {
            level: 2,
            approverName: '王财务',
            approvalDate: null,
            status: 'pending',
            comment: null
          },
          {
            level: 3,
            approverName: '赵院长',
            approvalDate: null,
            status: 'pending',
            comment: null
          }
        ],
        technicalAssessment: {
          assessorName: '技术评估组',
          assessmentDate: '2024-01-10',
          result: '设备老化严重，主要部件磨损，维修价值低，建议报废。',
          remainingLife: 0,
          maintenanceCost: 120000,
          replacementCost: 2500000
        },
        attachments: [
          {
            name: '技术评估报告.pdf',
            size: 2048576,
            type: 'application/pdf',
            url: '/uploads/ds202401001_1.pdf'
          },
          {
            name: '设备照片.jpg',
            size: 1048576,
            type: 'image/jpeg',
            url: '/uploads/ds202401001_2.jpg'
          }
        ],
        disposalMethod: 'recycling',
        disposalCompany: null,
        disposalDate: null,
        actualValue: null,
        createdAt: '2024-01-15T09:30:00',
        updatedAt: '2024-01-15T09:30:00'
      },
      {
        id: 2,
        applicationNumber: 'DS202401002',
        deviceId: 2,
        deviceName: '呼吸机',
        deviceModel: 'Servo-i',
        deviceSerialNumber: 'SN2019002',
        applicantId: 3,
        applicantName: '王护士长',
        applicantDepartment: 'ICU',
        applicationDate: '2024-01-18',
        reason: '设备频繁出现故障，影响临床使用。主要问题包括：压力控制不稳定、报警系统失灵、维护困难。',
        estimatedValue: 30000,
        originalValue: 800000,
        depreciationYears: 6,
        status: 'approved',
        workflow: {
          currentLevel: 3,
          totalLevels: 3,
          currentApproverId: null,
          currentApproverName: null,
          status: 'approved'
        },
        approvalHistory: [
          {
            level: 1,
            approverName: '李院长',
            approvalDate: '2024-01-18',
            status: 'approved',
            comment: '同意报废申请，请按规定流程处理'
          },
          {
            level: 2,
            approverName: '王财务',
            approvalDate: '2024-01-19',
            status: 'approved',
            comment: '财务审核通过，资产处置手续完备'
          },
          {
            level: 3,
            approverName: '赵院长',
            approvalDate: '2024-01-20',
            status: 'approved',
            comment: '最终批准，请设备科安排处置'
          }
        ],
        technicalAssessment: {
          assessorName: '设备维修组',
          assessmentDate: '2024-01-15',
          result: '设备核心部件损坏，维修成本过高，建议报废处理。',
          remainingLife: 0,
          maintenanceCost: 80000,
          replacementCost: 1200000
        },
        attachments: [
          {
            name: '维修记录.pdf',
            size: 1024000,
            type: 'application/pdf',
            url: '/uploads/ds202401002_1.pdf'
          }
        ],
        disposalMethod: 'destruction',
        disposalCompany: '环保处理公司',
        disposalDate: '2024-01-25',
        actualValue: 5000,
        createdAt: '2024-01-18T14:20:00',
        updatedAt: '2024-01-25T16:30:00'
      },
      {
        id: 3,
        applicationNumber: 'DS202401003',
        deviceId: 3,
        deviceName: '监护仪',
        deviceModel: 'PM-9000',
        deviceSerialNumber: 'SN2020003',
        applicantId: 5,
        applicantName: '刘技师',
        applicantDepartment: '急诊科',
        applicationDate: '2024-01-20',
        reason: '设备老化，显示屏故障，电池无法充电。维修成本接近新设备价格。',
        estimatedValue: 8000,
        originalValue: 50000,
        depreciationYears: 4,
        status: 'processing',
        workflow: {
          currentLevel: 2,
          totalLevels: 3,
          currentApproverId: 4,
          currentApproverName: '王财务',
          status: 'processing'
        },
        approvalHistory: [
          {
            level: 1,
            approverName: '李院长',
            approvalDate: '2024-01-21',
            status: 'approved',
            comment: '同意报废，请财务审核'
          },
          {
            level: 2,
            approverName: '王财务',
            approvalDate: null,
            status: 'pending',
            comment: null
          },
          {
            level: 3,
            approverName: '赵院长',
            approvalDate: null,
            status: 'pending',
            comment: null
          }
        ],
        technicalAssessment: {
          assessorName: '设备科',
          assessmentDate: '2024-01-18',
          result: '设备使用频繁，老化严重，建议报废。',
          remainingLife: 0,
          maintenanceCost: 15000,
          replacementCost: 60000
        },
        attachments: [],
        disposalMethod: 'recycling',
        disposalCompany: null,
        disposalDate: null,
        actualValue: null,
        createdAt: '2024-01-20T11:45:00',
        updatedAt: '2024-01-21T09:30:00'
      }
    ];

    setApplications(mockApplications);
    setTotal(mockApplications.length);
  }, []);

  const showModal = (application = null) => {
    setEditingApplication(application);
    setModalVisible(true);
    if (application) {
      form.setFieldsValue(application);
    } else {
      form.resetFields();
    }
  };

  const showDetail = (application) => {
    setSelectedApplication(application);
    setDetailVisible(true);
  };

  const showApproval = (application) => {
    setSelectedApplication(application);
    setApprovalVisible(true);
    approvalForm.resetFields();
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingApplication(null);
    form.resetFields();
  };

  const handleDetailCancel = () => {
    setDetailVisible(false);
    setSelectedApplication(null);
  };

  const handleApprovalCancel = () => {
    setApprovalVisible(false);
    setSelectedApplication(null);
    approvalForm.resetFields();
  };

  const onFinish = async (values) => {
    try {
      if (editingApplication) {
        message.success('报废申请更新成功');
      } else {
        message.success('报废申请提交成功');
      }
      handleCancel();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const onApprovalFinish = async (values) => {
    try {
      message.success('审批处理完成');
      handleApprovalCancel();
    } catch (error) {
      message.error('审批处理失败');
    }
  };

  const getStatusBadge = (status) => {
    const statuses = {
      draft: { color: 'default', text: '草稿', icon: <FileTextOutlined /> },
      pending: { color: 'processing', text: '待审批', icon: <ClockCircleOutlined /> },
      processing: { color: 'warning', text: '审批中', icon: <AuditOutlined /> },
      approved: { color: 'success', text: '已批准', icon: <CheckCircleOutlined /> },
      rejected: { color: 'error', text: '已拒绝', icon: <ExclamationCircleOutlined /> },
      disposing: { color: 'warning', text: '处置中', icon: <ToolOutlined /> },
      completed: { color: 'success', text: '已完成', icon: <FileDoneOutlined /> }
    };
    const config = statuses[status] || statuses.draft;
    return (
      <Badge status={config.color} text={config.text} />
    );
  };

  const getWorkflowProgress = (workflow) => {
    const progress = (workflow.currentLevel / workflow.totalLevels) * 100;
    return workflow.status === 'approved' ? 100 : progress;
  };

  const getDisposalMethodBadge = (method) => {
    const methods = {
      recycling: { color: 'green', text: '回收利用', icon: <CarOutlined /> },
      destruction: { color: 'red', text: '销毁处理', icon: <DeleteFilled /> },
      donation: { color: 'blue', text: '捐赠处理', icon: <TeamOutlined /> },
      sale: { color: 'orange', text: '变卖处理', icon: <BankOutlined /> }
    };
    const config = methods[method] || methods.recycling;
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const columns = [
    {
      title: '申请编号',
      dataIndex: 'applicationNumber',
      key: 'applicationNumber',
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
            {record.deviceModel} · {record.deviceSerialNumber}
          </Text>
        </div>
      ),
      width: 200,
    },
    {
      title: '申请人',
      dataIndex: 'applicantName',
      key: 'applicantName',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.applicantDepartment}</Text>
        </div>
      ),
      width: 120,
    },
    {
      title: '申请日期',
      dataIndex: 'applicationDate',
      key: 'applicationDate',
      render: (date) => (
        <Text style={{ fontSize: 12 }}>
          {new Date(date).toLocaleDateString('zh-CN')}
        </Text>
      ),
      width: 120,
    },
    {
      title: '预估价值',
      dataIndex: 'estimatedValue',
      key: 'estimatedValue',
      render: (value, record) => (
        <div>
          <div style={{ fontWeight: 500, color: '#52c41a' }}>
            ¥{value?.toLocaleString()}
          </div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            原值: ¥{record.originalValue?.toLocaleString()}
          </Text>
        </div>
      ),
      width: 120,
    },
    {
      title: '审批进度',
      key: 'workflow',
      render: (_, record) => (
        <div>
          <Progress 
            percent={getWorkflowProgress(record.workflow)}
            size="small"
            strokeColor={{
              '0%': '#1890ff',
              '100%': '#52c41a'
            }}
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
            {record.workflow.currentLevel}/{record.workflow.totalLevels} 级审批
          </div>
        </div>
      ),
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusBadge(status),
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
          {record.status === 'pending' && (
            <Button 
              icon={<AuditOutlined />} 
              onClick={() => showApproval(record)}
              size="small"
              color="processing"
            >
              审批
            </Button>
          )}
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
      width: 240,
    },
  ];

  const stats = {
    totalApplications: applications.length,
    pendingApplications: applications.filter(a => a.status === 'pending').length,
    approvedApplications: applications.filter(a => a.status === 'approved').length,
    processingApplications: applications.filter(a => a.status === 'processing').length,
    totalEstimatedValue: applications.reduce((sum, a) => sum + a.estimatedValue, 0)
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
    <div className="disposal-management">
      {/* 页面标题区域 */}
      <div className="disposal-header">
        <h1 className="page-title">
          <DeleteFilled className="page-icon" />
          设备报废管理
        </h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
          size="large"
        >
          申请报废
        </Button>
      </div>

      {/* 统计卡片区域 */}
      <Row gutter={[16, 16]} className="disposal-stats">
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="申请总数"
              value={stats.totalApplications}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="待审批"
              value={stats.pendingApplications}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="审批中"
              value={stats.processingApplications}
              prefix={<AuditOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="已批准"
              value={stats.approvedApplications}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 价值统计 */}
      <Card className="value-stats" style={{ marginBottom: 24 }}>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic
              title="预估总价值"
              value={stats.totalEstimatedValue}
              prefix={<DollarOutlined />}
              suffix="元"
              valueStyle={{ color: '#52c41a' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="平均预估价值"
              value={stats.totalApplications > 0 ? Math.round(stats.totalEstimatedValue / stats.totalApplications) : 0}
              prefix={<DollarOutlined />}
              suffix="元"
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="本月申请"
              value={applications.filter(a => new Date(a.applicationDate).getMonth() === new Date().getMonth()).length}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="本月批准"
              value={applications.filter(a => a.status === 'approved' && new Date(a.updatedAt).getMonth() === new Date().getMonth()).length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Col>
        </Row>
      </Card>

      {/* 主要内容区域 */}
      <Card className="disposal-content">
        <div className="table-header">
          <Space>
            <Search
              placeholder="搜索申请编号或设备名称"
              allowClear
              enterButton={<SearchOutlined />}
              style={{ width: 300 }}
            />
            <Select placeholder="申请状态" style={{ width: 120 }}>
              <Option value="all">全部状态</Option>
              <Option value="draft">草稿</Option>
              <Option value="pending">待审批</Option>
              <Option value="processing">审批中</Option>
              <Option value="approved">已批准</Option>
              <Option value="rejected">已拒绝</Option>
              <Option value="disposing">处置中</Option>
              <Option value="completed">已完成</Option>
            </Select>
            <Select placeholder="处置方式" style={{ width: 120 }}>
              <Option value="all">全部方式</Option>
              <Option value="recycling">回收利用</Option>
              <Option value="destruction">销毁处理</Option>
              <Option value="donation">捐赠处理</Option>
              <Option value="sale">变卖处理</Option>
            </Select>
          </Space>
          <Button icon={<FilterOutlined />}>
            高级筛选
          </Button>
        </div>
        
        <Table
          columns={columns}
          dataSource={Array.isArray(applications) ? applications : []}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
          }}
          size="middle"
        />
      </Card>

      {/* 报废申请弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <DeleteFilled />
            {editingApplication ? "编辑报废申请" : "申请设备报废"}
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
                        name="deviceSerialNumber"
                        label="序列号"
                        rules={[{ required: true, message: '请输入序列号' }]}
                      >
                        <Input placeholder="请输入序列号" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="originalValue"
                        label="原值"
                        rules={[{ required: true, message: '请输入原值' }]}
                      >
                        <InputNumber 
                          placeholder="请输入原值" 
                          style={{ width: '100%' }}
                          formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="estimatedValue"
                        label="预估价值"
                        rules={[{ required: true, message: '请输入预估价值' }]}
                      >
                        <InputNumber 
                          placeholder="请输入预估价值" 
                          style={{ width: '100%' }}
                          formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="depreciationYears"
                        label="已使用年限"
                        rules={[{ required: true, message: '请输入已使用年限' }]}
                      >
                        <InputNumber 
                          placeholder="请输入已使用年限" 
                          style={{ width: '100%' }}
                          min={0}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="reason"
                    label="报废原因"
                    rules={[{ required: true, message: '请输入报废原因' }]}
                  >
                    <TextArea rows={4} placeholder="请详细说明设备报废的具体原因" />
                  </Form.Item>
                </>
              )
            },
            {
              key: 'applicant',
              label: '申请人信息',
              children: (
                <>
                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="applicantName"
                        label="申请人姓名"
                        rules={[{ required: true, message: '请输入申请人姓名' }]}
                      >
                        <Input placeholder="请输入申请人姓名" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="applicantDepartment"
                        label="所属科室"
                        rules={[{ required: true, message: '请输入所属科室' }]}
                      >
                        <Input placeholder="请输入所属科室" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item
                        name="applicationDate"
                        label="申请日期"
                        rules={[{ required: true, message: '请选择申请日期' }]}
                      >
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="disposalMethod"
                        label="建议处置方式"
                        rules={[{ required: true, message: '请选择处置方式' }]}
                      >
                        <Select placeholder="请选择处置方式">
                          <Option value="recycling">回收利用</Option>
                          <Option value="destruction">销毁处理</Option>
                          <Option value="donation">捐赠处理</Option>
                          <Option value="sale">变卖处理</Option>
                        </Select>
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
                    支持上传技术评估报告、设备照片、维修记录等
                  </div>
                </Form.Item>
              )
            }
          ]} />

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" htmlType="submit">
                {editingApplication ? "更新申请" : "提交申请"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 申请详情弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <DeleteFilled />
            申请详情 - {selectedApplication?.applicationNumber}
          </div>
        }
        open={detailVisible}
        onCancel={handleDetailCancel}
        footer={null}
        width={1000}
        destroyOnClose
      >
        {selectedApplication && (
          <div className="application-detail">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="申请编号" span={2}>
                <Text code>{selectedApplication.applicationNumber}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="设备名称">
                {selectedApplication.deviceName}
              </Descriptions.Item>
              <Descriptions.Item label="设备型号">
                {selectedApplication.deviceModel}
              </Descriptions.Item>
              <Descriptions.Item label="序列号">
                {selectedApplication.deviceSerialNumber}
              </Descriptions.Item>
              <Descriptions.Item label="申请人">
                <Avatar size="small" icon={<UserOutlined />} />
                <Text style={{ marginLeft: 8 }}>
                  {selectedApplication.applicantName} - {selectedApplication.applicantDepartment}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="申请日期">
                {new Date(selectedApplication.applicationDate).toLocaleDateString('zh-CN')}
              </Descriptions.Item>
              <Descriptions.Item label="原值">
                <Text style={{ color: '#1890ff' }}>
                  ¥{selectedApplication.originalValue?.toLocaleString()}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="预估价值">
                <Text style={{ color: '#52c41a' }}>
                  ¥{selectedApplication.estimatedValue?.toLocaleString()}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="已使用年限">
                {selectedApplication.depreciationYears} 年
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusBadge(selectedApplication.status)}
              </Descriptions.Item>
              <Descriptions.Item label="处置方式">
                {selectedApplication.disposalMethod ? getDisposalMethodBadge(selectedApplication.disposalMethod) : '-'}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">报废原因</Divider>
            <Paragraph>{selectedApplication.reason}</Paragraph>

            <Divider orientation="left">审批流程</Divider>
            <Steps 
              current={selectedApplication.workflow.status === 'approved' ? selectedApplication.workflow.totalLevels : selectedApplication.workflow.currentLevel - 1}
              status={selectedApplication.workflow.status === 'approved' ? 'finish' : selectedApplication.workflow.status === 'rejected' ? 'error' : 'process'}
            >
              {selectedApplication.approvalHistory.map((item, index) => (
                <Step 
                  key={index}
                  title={`第${item.level}级审批`}
                  description={item.approverName}
                  status={item.status === 'approved' ? 'finish' : item.status === 'rejected' ? 'error' : 'wait'}
                />
              ))}
            </Steps>

            <Divider orientation="left">审批历史</Divider>
            <Timeline>
              {selectedApplication.approvalHistory.map((item, index) => (
                <Timeline.Item key={index} color={item.status === 'approved' ? 'green' : item.status === 'rejected' ? 'red' : 'gray'}>
                  <Text strong>第{item.level}级审批</Text> - {item.approverName}
                  <div style={{ marginTop: 4, color: '#666' }}>
                    {item.approvalDate ? (
                      <span>审批时间: {new Date(item.approvalDate).toLocaleString('zh-CN')}</span>
                    ) : (
                      <span>待审批</span>
                    )}
                    {item.comment && (
                      <div style={{ marginTop: 4 }}>
                        <Text strong>审批意见:</Text> {item.comment}
                      </div>
                    )}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>

            {selectedApplication.technicalAssessment && (
              <>
                <Divider orientation="left">技术评估</Divider>
                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="评估机构">
                    {selectedApplication.technicalAssessment.assessorName}
                  </Descriptions.Item>
                  <Descriptions.Item label="评估日期">
                    {new Date(selectedApplication.technicalAssessment.assessmentDate).toLocaleDateString('zh-CN')}
                  </Descriptions.Item>
                  <Descriptions.Item label="剩余寿命">
                    {selectedApplication.technicalAssessment.remainingLife} 年
                  </Descriptions.Item>
                  <Descriptions.Item label="维护成本">
                    ¥{selectedApplication.technicalAssessment.maintenanceCost?.toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="更换成本">
                    ¥{selectedApplication.technicalAssessment.replacementCost?.toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="评估结果" span={2}>
                    {selectedApplication.technicalAssessment.result}
                  </Descriptions.Item>
                </Descriptions>
              </>
            )}

            {selectedApplication.attachments && selectedApplication.attachments.length > 0 && (
              <>
                <Divider orientation="left">相关附件</Divider>
                <List
                  dataSource={selectedApplication.attachments}
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

            {selectedApplication.disposalDate && (
              <>
                <Divider orientation="left">处置信息</Divider>
                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="处置日期">
                    {new Date(selectedApplication.disposalDate).toLocaleDateString('zh-CN')}
                  </Descriptions.Item>
                  <Descriptions.Item label="处置方式">
                    {getDisposalMethodBadge(selectedApplication.disposalMethod)}
                  </Descriptions.Item>
                  <Descriptions.Item label="处置公司">
                    {selectedApplication.disposalCompany || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="实际价值">
                    <Text style={{ color: '#52c41a' }}>
                      ¥{selectedApplication.actualValue?.toLocaleString()}
                    </Text>
                  </Descriptions.Item>
                </Descriptions>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* 审批弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AuditOutlined />
            审批处理 - {selectedApplication?.applicationNumber}
          </div>
        }
        open={approvalVisible}
        onCancel={handleApprovalCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        {selectedApplication && (
          <div className="approval-content">
            <Alert
              message={`您是第${selectedApplication.workflow.currentLevel}级审批人`}
              description="请仔细审核申请材料后做出审批决定"
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <Descriptions bordered column={1} size="small" style={{ marginBottom: 24 }}>
              <Descriptions.Item label="申请编号">
                {selectedApplication.applicationNumber}
              </Descriptions.Item>
              <Descriptions.Item label="设备名称">
                {selectedApplication.deviceName}
              </Descriptions.Item>
              <Descriptions.Item label="申请人">
                {selectedApplication.applicantName} - {selectedApplication.applicantDepartment}
              </Descriptions.Item>
              <Descriptions.Item label="预估价值">
                ¥{selectedApplication.estimatedValue?.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="报废原因">
                {selectedApplication.reason}
              </Descriptions.Item>
            </Descriptions>

            <Form
              form={approvalForm}
              onFinish={onApprovalFinish}
              layout="vertical"
            >
              <Form.Item
                name="decision"
                label="审批决定"
                rules={[{ required: true, message: '请选择审批决定' }]}
              >
                <Select placeholder="请选择审批决定">
                  <Option value="approved">同意</Option>
                  <Option value="rejected">拒绝</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="comment"
                label="审批意见"
                rules={[{ required: true, message: '请输入审批意见' }]}
              >
                <TextArea rows={4} placeholder="请输入您的审批意见" />
              </Form.Item>

              <Form.Item>
                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                  <Button onClick={handleApprovalCancel}>取消</Button>
                  <Button type="primary" htmlType="submit">
                    提交审批
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DisposalManagement;