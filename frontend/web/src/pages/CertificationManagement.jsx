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
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
  RiseOutlined,
  FallOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  TrophyOutlined,
  StarOutlined,
  MedicineBoxOutlined,
  SafetySafetyCertificateOutlined,
  TeamOutlined,
  CalendarOutlined,
  BankOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  DashboardOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  RadarChartOutlined,
  AreaChartOutlined,
  FundOutlined,
  CalculatorOutlined,
  FileSearchOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  DownloadOutlined,
  UploadOutlined,
  ImportOutlined,
  ExportOutlined,
  SettingOutlined,
  ToolOutlined,
  ExperimentOutlined,
  BugOutlined,
  ApiOutlined,
  BranchesOutlined,
  ClusterOutlined,
  DeploymentUnitOutlined,
  HddOutlined,
  CloudUploadOutlined,
  InboxOutlined,
  WechatOutlined,
  AlertFilled,
  ClockCircleFilled,
  FileTextIcon,
  ClockIcon,
  BugIcon,
  FireOutlined,
  WaterOutlined,
  CloudOutlined,
  AuditOutlined,
  AccountBookOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  FileProtectOutlined,
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
  FileAddOutlined,
  FileUnknownOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  FolderAddOutlined,
  FolderDeleteOutlined,
  DatabaseFilled,
  SecurityScanFilled,
  ShieldFilled,
  BugFilled,
  ExceptionFilled,
  ExceptionOutlined,
  FireFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
  VerifiedUserOutlined,
  GavelOutlined,
  PolicyOutlined,
  AssignmentOutlined,
  AssignmentLateOutlined,
  FolderSpecialOutlined,
  LibraryBooksOutlined,
  SafetyOutlined,
  SecurityOutlined,
  TroubleshootOutlined,
  HeatMapOutlined,
  ThunderboltOutlined,
  AlertOutlined,
  SyncOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
  StopOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ForwardOutlined,
  FastForwardOutlined,
  ScheduleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const CertificationManagement = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [certifications, setCertifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [activeTab, setActiveTab] = useState('list');

  // Mock data
  const mockCertifications = [
    {
      id: 'CERT001',
      name: 'ISO 9001质量管理体系认证',
      type: '质量管理体系',
      issuedBy: '中国质量认证中心',
      issueDate: '2023-01-15',
      expiryDate: '2026-01-14',
      status: '有效',
      certificateNumber: 'CN2023QMS001',
      scope: '医疗器械设计、开发、生产、销售和服务',
      level: 'A级',
      score: 95,
      documents: ['质量手册', '程序文件', '作业指导书'],
      remarks: '年度监督审核已通过'
    },
    {
      id: 'CERT002',
      name: 'ISO 13485医疗器械质量管理体系认证',
      type: '医疗器械质量管理体系',
      issuedBy: '国家药品监督管理局',
      issueDate: '2023-03-20',
      expiryDate: '2026-03-19',
      status: '有效',
      certificateNumber: 'MDCE2023002',
      scope: '医用电子设备的生产和质量控制',
      level: 'AA级',
      score: 98,
      documents: ['质量手册', '风险管理文件', '验证文件'],
      remarks: '符合欧盟MDR要求'
    },
    {
      id: 'CERT003',
      name: 'CE认证',
      type: '产品认证',
      issuedBy: 'TÜV SÜD',
      issueDate: '2023-06-10',
      expiryDate: '2028-06-09',
      status: '有效',
      certificateNumber: 'CE123456789',
      scope: '医用监护设备',
      level: 'Class IIa',
      score: 92,
      documents: ['技术文件', '风险评估报告', '临床评价报告'],
      remarks: '符合欧盟医疗器械指令'
    },
    {
      id: 'CERT004',
      name: 'FDA 510(k)认证',
      type: '产品认证',
      issuedBy: '美国FDA',
      issueDate: '2023-08-05',
      expiryDate: '2028-08-04',
      status: '有效',
      certificateNumber: 'K234567',
      scope: '医用超声设备',
      level: 'Class II',
      score: 96,
      documents: ['510(k)摘要', '技术对比', '性能测试报告'],
      remarks: '实质性等效产品'
    },
    {
      id: 'CERT005',
      name: '职业健康安全管理体系认证',
      type: '安全管理体系',
      issuedBy: '中国安全生产协会',
      issueDate: '2023-10-15',
      expiryDate: '2026-10-14',
      status: '有效',
      certificateNumber: 'OHSMS2023005',
      scope: '医疗器械生产安全',
      level: 'A级',
      score: 88,
      documents: ['安全手册', '应急预案', '培训记录'],
      remarks: '安全生产标准化二级企业'
    }
  ];

  useEffect(() => {
    loadCertifications();
  }, [currentPage, pageSize, searchText, filteredInfo, sortedInfo]);

  const loadCertifications = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredData = mockCertifications;
      
      // 搜索过滤
      if (searchText) {
        filteredData = filteredData.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.certificateNumber.toLowerCase().includes(searchText.toLowerCase()) ||
          item.issuedBy.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      
      setCertifications(filteredData);
      setTotal(filteredData.length);
    } catch (error) {
      console.error('Failed to load certifications:', error);
      message.error('加载认证信息失败');
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (editingCertification) {
        // 编辑现有认证
        const updatedCertifications = certifications.map(item =>
          item.id === editingCertification.id ? { ...item, ...values, updatedAt: new Date().toISOString() } : item
        );
        setCertifications(updatedCertifications);
        message.success('更新成功');
      } else {
        // 添加新认证
        const newCertification = {
          id: `CERT${String(certifications.length + 1).padStart(3, '0')}`,
          ...values,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const newCertifications = [...certifications, newCertification];
        setCertifications(newCertifications);
        setTotal(newCertifications.length);
        message.success('添加成功');
      }
      
      setModalVisible(false);
      form.resetFields();
      setLoading(false);
    } catch (error) {
      console.error('Validation failed:', error);
      if (error.message) {
        message.error(error.message);
      }
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (id) => {
    const newCertifications = certifications.filter(item => item.id !== id);
    setCertifications(newCertifications);
    setTotal(newCertifications.length);
    message.success('删除成功');
  };

  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的认证');
      return;
    }
    
    Modal.confirm({
      title: '批量删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 个认证吗？此操作不可恢复。`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk() {
        const newCertifications = certifications.filter(item => !selectedRowKeys.includes(item.id));
        setCertifications(newCertifications);
        setTotal(newCertifications.length);
        setSelectedRowKeys([]);
        message.success(`成功删除 ${selectedRowKeys.length} 个认证`);
      },
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '有效': return 'success';
      case '即将过期': return 'warning';
      case '已过期': return 'error';
      case '审核中': return 'processing';
      default: return 'default';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'AAA级': return '#f5222d';
      case 'AA级': return '#fa8c16';
      case 'A级': return '#1890ff';
      case 'B级': return '#52c41a';
      case 'Class IIa': return '#722ed1';
      case 'Class II': return '#eb2f96';
      default: return '#8c8c8c';
    }
  };

  const columns = [
    {
      title: '认证名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <SafetyCertificateOutlined style={{ color: '#1890ff' }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '认证类型',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: '质量管理体系', value: '质量管理体系' },
        { text: '医疗器械质量管理体系', value: '医疗器械质量管理体系' },
        { text: '产品认证', value: '产品认证' },
        { text: '安全管理体系', value: '安全管理体系' },
      ],
      filteredValue: filteredInfo.type || null,
      onFilter: (value, record) => record.type.includes(value),
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '认证机构',
      dataIndex: 'issuedBy',
      key: 'issuedBy',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: '认证等级',
      dataIndex: 'level',
      key: 'level',
      render: (text) => (
        <Tag color={getLevelColor(text)} style={{ fontWeight: 'bold' }}>
          {text}
        </Tag>
      ),
    },
    {
      title: '认证分数',
      dataIndex: 'score',
      key: 'score',
      render: (score) => (
        <Space>
          <Rate disabled defaultValue={score / 20} style={{ fontSize: 14 }} />
          <Text strong>{score}分</Text>
        </Space>
      ),
      sorter: (a, b) => a.score - b.score,
      sortOrder: sortedInfo.field === 'score' ? sortedInfo.order : null,
    },
    {
      title: '证书编号',
      dataIndex: 'certificateNumber',
      key: 'certificateNumber',
      render: (text) => <Text code>{text}</Text>,
    },
    {
      title: '发证日期',
      dataIndex: 'issueDate',
      key: 'issueDate',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: '到期日期',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (text) => {
        const expiryDate = new Date(text);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        let color = 'success';
        let status = '有效';
        
        if (daysUntilExpiry < 0) {
          color = 'error';
          status = '已过期';
        } else if (daysUntilExpiry <= 90) {
          color = 'warning';
          status = '即将过期';
        }
        
        return (
          <Space>
            <Text>{text}</Text>
            <Tag color={color}>{status}</Tag>
          </Space>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '有效', value: '有效' },
        { text: '即将过期', value: '即将过期' },
        { text: '已过期', value: '已过期' },
        { text: '审核中', value: '审核中' },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Badge status={getStatusColor(status)} text={status} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm
              title="确定要删除这个认证吗？"
              onConfirm={() => handleDelete(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button 
                type="text" 
                danger
                icon={<DeleteOutlined />} 
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingCertification(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleViewDetails = (record) => {
    Modal.info({
      title: '认证详情',
      width: 800,
      content: (
        <div>
          <Descriptions column={2} bordered>
            <Descriptions.Item label="认证名称">{record.name}</Descriptions.Item>
            <Descriptions.Item label="认证类型">{record.type}</Descriptions.Item>
            <Descriptions.Item label="认证机构">{record.issuedBy}</Descriptions.Item>
            <Descriptions.Item label="认证等级">
              <Tag color={getLevelColor(record.level)}>{record.level}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="认证分数">
              <Rate disabled defaultValue={record.score / 20} style={{ fontSize: 14 }} />
              <Text strong>{record.score}分</Text>
            </Descriptions.Item>
            <Descriptions.Item label="证书编号">
              <Text code>{record.certificateNumber}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="发证日期">{record.issueDate}</Descriptions.Item>
            <Descriptions.Item label="到期日期">{record.expiryDate}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Badge status={getStatusColor(record.status)} text={record.status} />
            </Descriptions.Item>
            <Descriptions.Item label="适用范围" span={2}>
              <Text>{record.scope}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="相关文档" span={2}>
              <Space>
                {record.documents.map((doc, index) => (
                  <Tag key={index} color="blue">{doc}</Tag>
                ))}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="备注" span={2}>
              <Text>{record.remarks}</Text>
            </Descriptions.Item>
          </Descriptions>
        </div>
      ),
      okText: '关闭',
    });
  };

  const handleAdd = () => {
    setEditingCertification(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Admin',
      name: record.name,
    }),
  };

  const statistics = {
    totalCertifications: certifications.length,
    activeCertifications: certifications.filter(c => c.status === '有效').length,
    expiringSoon: certifications.filter(c => {
      const expiryDate = new Date(c.expiryDate);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry > 0 && daysUntilExpiry <= 90;
    }).length,
    expired: certifications.filter(c => c.status === '已过期').length,
    averageScore: certifications.length > 0 ? 
      Math.round(certifications.reduce((sum, c) => sum + c.score, 0) / certifications.length) : 0
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'list':
        return (
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Row gutter={16} align="middle">
                <Col flex="auto">
                  <Space>
                    <Input.Search
                      placeholder="搜索认证名称、证书编号或认证机构"
                      style={{ width: 300 }}
                      onSearch={handleSearch}
                      allowClear
                    />
                    <Button onClick={() => loadCertifications()} icon={<SearchOutlined />}>
                      搜索
                    </Button>
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                      添加认证
                    </Button>
                    {selectedRowKeys.length > 0 && (
                      <Button danger icon={<DeleteOutlined />} onClick={handleBatchDelete}>
                        批量删除 ({selectedRowKeys.length})
                      </Button>
                    )}
                  </Space>
                </Col>
              </Row>
            </div>

            <Table
              columns={columns}
              dataSource={certifications}
              rowSelection={rowSelection}
              rowKey="id"
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: total,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
              onChange={handleTableChange}
              loading={loading}
              scroll={{ x: 1500 }}
            />
          </Card>
        );
      
      case 'statistics':
        return (
          <div>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="总认证数"
                    value={statistics.totalCertifications}
                    prefix={<SafetyCertificateOutlined />}
                    suffix="个"
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="有效认证"
                    value={statistics.activeCertifications}
                    prefix={<CheckCircleOutlined />}
                    suffix="个"
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="即将过期"
                    value={statistics.expiringSoon}
                    prefix={<ClockCircleOutlined />}
                    suffix="个"
                    valueStyle={{ color: '#cf1322' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="平均分数"
                    value={statistics.averageScore}
                    prefix={<StarOutlined />}
                    suffix="分"
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
            </Row>

            <Card title="认证类型分布" style={{ marginTop: 16 }}>
              <Row gutter={[16, 16]}>
                {Object.entries(
                  certifications.reduce((acc, cert) => {
                    acc[cert.type] = (acc[cert.type] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([type, count]) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={type}>
                    <Card size="small">
                      <Statistic
                        title={type}
                        value={count}
                        suffix="个"
                        valueStyle={{ fontSize: 16 }}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="certification-management">
      <div className="certification-header">
        <Title level={3}>
          <SafetyCertificateOutlined /> 资质认证管理
        </Title>
        <Text type="secondary">
          管理医院及医疗设备相关的各种资质认证信息
        </Text>
      </div>

      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'list',
              label: (
                <span>
                  <FileTextOutlined />
                  认证列表
                </span>
              ),
              children: renderTabContent(),
            },
            {
              key: 'statistics',
              label: (
                <span>
                  <BarChartOutlined />
                  统计分析
                </span>
              ),
              children: renderTabContent(),
            },
          ]}
        />
      </Card>

      {/* 添加/编辑认证弹窗 */}
      <Modal
        title={editingCertification ? '编辑认证' : '添加认证'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        destroyOnClose
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: '有效',
            score: 80,
            documents: [],
            remarks: ''
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="认证名称"
                name="name"
                rules={[{ required: true, message: '请输入认证名称' }]}
              >
                <Input placeholder="请输入认证名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="认证类型"
                name="type"
                rules={[{ required: true, message: '请选择认证类型' }]}
              >
                <Select placeholder="请选择认证类型">
                  <Option value="质量管理体系">质量管理体系</Option>
                  <Option value="医疗器械质量管理体系">医疗器械质量管理体系</Option>
                  <Option value="产品认证">产品认证</Option>
                  <Option value="安全管理体系">安全管理体系</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="认证机构"
                name="issuedBy"
                rules={[{ required: true, message: '请输入认证机构' }]}
              >
                <Input placeholder="请输入认证机构" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="认证等级"
                name="level"
                rules={[{ required: true, message: '请输入认证等级' }]}
              >
                <Select placeholder="请选择认证等级">
                  <Option value="AAA级">AAA级</Option>
                  <Option value="AA级">AA级</Option>
                  <Option value="A级">A级</Option>
                  <Option value="B级">B级</Option>
                  <Option value="Class IIa">Class IIa</Option>
                  <Option value="Class II">Class II</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="证书编号"
                name="certificateNumber"
                rules={[{ required: true, message: '请输入证书编号' }]}
              >
                <Input placeholder="请输入证书编号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="认证分数"
                name="score"
                rules={[{ required: true, message: '请输入认证分数' }]}
              >
                <InputNumber 
                  min={0} 
                  max={100} 
                  placeholder="请输入认证分数" 
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="发证日期"
                name="issueDate"
                rules={[{ required: true, message: '请选择发证日期' }]}
              >
                <DatePicker placeholder="请选择发证日期" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="到期日期"
                name="expiryDate"
                rules={[{ required: true, message: '请选择到期日期' }]}
              >
                <DatePicker placeholder="请选择到期日期" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="适用范围"
            name="scope"
            rules={[{ required: true, message: '请输入适用范围' }]}
          >
            <TextArea placeholder="请输入适用范围" rows={3} />
          </Form.Item>

          <Form.Item
            label="相关文档"
            name="documents"
          >
            <Select
              mode="tags"
              placeholder="请输入相关文档"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="备注"
            name="remarks"
          >
            <TextArea placeholder="请输入备注信息" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CertificationManagement;