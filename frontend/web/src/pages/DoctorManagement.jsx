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
  Statistic,
  Tooltip,
  Typography,
  Divider,
  Descriptions,
  DatePicker,
  InputNumber,
  Switch,
  Avatar,
  Progress,
  Alert,
  Spin,
  Result,
  Skeleton,
  Dropdown,
  Menu,
  Rate,
  Radio,
  Checkbox,
  Popconfirm,
  notification,
  Upload,
  Pagination
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
  PhoneOutlined,
  MailOutlined,
  IdcardOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  TrophyOutlined,
  StarOutlined,
  HeartOutlined,
  ExportOutlined,
  ImportOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  MoreOutlined,
  GlobalOutlined,
  TeamOutlined,
  BarChartOutlined,
  PrinterOutlined,
  ReloadOutlined,
  ScheduleOutlined,
  CertificateOutlined,
  BankOutlined,
  DollarOutlined,
  LikeOutlined,
  DislikeOutlined
} from '@ant-design/icons';
import { mockDoctors, mockApi } from '../data/mockData';
import './DoctorManagement.css';

const { Option } = Select;
const { confirm } = Modal;
const { Search } = Input;
const { Text, Title } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [batchActionLoading, setBatchActionLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // table or card
  const [importLoading, setImportLoading] = useState(false);
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [statistics, setStatistics] = useState({
    total: 0,
    active: 0,
    onLeave: 0,
    resigned: 0,
    avgExperience: 0,
    chiefDoctors: 0,
    avgConsultationFee: 0,
    departmentDistribution: {}
  });

  useEffect(() => {
    loadDoctors();
    loadStatistics();
  }, []);

  const loadDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      // 模拟API调用，添加10%的错误率用于测试
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.1) {
            reject(new Error('网络连接失败，请检查网络设置'));
          } else {
            resolve();
          }
        }, 800);
      });
      
      let filteredData = [...mockDoctors];
      
      // 应用搜索过滤
      if (searchText) {
        filteredData = filteredData.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.licenseNumber.toLowerCase().includes(searchText.toLowerCase()) ||
          item.phone.toLowerCase().includes(searchText.toLowerCase()) ||
          item.email.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      
      // 应用状态过滤
      if (statusFilter) {
        filteredData = filteredData.filter(item => item.status === statusFilter);
      }
      
      // 应用科室过滤
      if (departmentFilter) {
        filteredData = filteredData.filter(item => item.department === departmentFilter);
      }
      
      // 应用职称过滤
      if (titleFilter) {
        filteredData = filteredData.filter(item => item.title === titleFilter);
      }
      
      setDoctors(filteredData);
      setTotal(filteredData.length);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load doctors:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    setStatisticsLoading(true);
    try {
      // 模拟统计API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const stats = {
        total: mockDoctors.length,
        active: mockDoctors.filter(d => d.status === '在职').length,
        onLeave: mockDoctors.filter(d => d.status === '休假').length,
        resigned: mockDoctors.filter(d => d.status === '离职').length,
        avgExperience: mockDoctors.length > 0 
          ? Math.round(mockDoctors.reduce((sum, d) => sum + d.experience, 0) / mockDoctors.length)
          : 0,
        chiefDoctors: mockDoctors.filter(d => d.title === '主任医师').length,
        avgConsultationFee: mockDoctors.length > 0
          ? Math.round(mockDoctors.reduce((sum, d) => sum + d.consultationFee, 0) / mockDoctors.length)
          : 0
      };
      
      // 计算科室分布
      const departmentDist = {};
      mockDoctors.forEach(doctor => {
        departmentDist[doctor.department] = (departmentDist[doctor.department] || 0) + 1;
      });
      stats.departmentDistribution = departmentDist;
      
      setStatistics(stats);
      setStatisticsLoading(false);
    } catch (error) {
      console.error('Failed to load statistics:', error);
      setStatisticsLoading(false);
    }
  };

  const handleRetry = () => {
    loadDoctors();
    loadStatistics();
  };

  const handleAdd = () => {
    setEditingDoctor(null);
    setModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingDoctor(record);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (record) => {
    confirm({
      title: '确认删除',
      content: `确定要删除医生 "${record.name}" 吗？此操作不可恢复。`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk() {
        const newDoctors = doctors.filter(item => item.id !== record.id);
        setDoctors(newDoctors);
        setTotal(newDoctors.length);
        loadStatistics();
        message.success('删除成功');
      },
    });
  };

  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的医生');
      return;
    }
    
    confirm({
      title: '批量删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 名医生吗？此操作不可恢复。`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk() {
        const newDoctors = doctors.filter(item => !selectedRowKeys.includes(item.id));
        setDoctors(newDoctors);
        setTotal(newDoctors.length);
        setSelectedRowKeys([]);
        loadStatistics();
        message.success(`成功删除 ${selectedRowKeys.length} 名医生`);
      },
    });
  };

  const handleBatchStatusUpdate = (status) => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要更新状态的医生');
      return;
    }
    
    setBatchActionLoading(true);
    setTimeout(() => {
      const updatedDoctors = doctors.map(item => 
        selectedRowKeys.includes(item.id) ? { ...item, status } : item
      );
      setDoctors(updatedDoctors);
      setSelectedRowKeys([]);
      setBatchActionLoading(false);
      loadStatistics();
      message.success(`成功更新 ${selectedRowKeys.length} 名医生状态`);
    }, 1000);
  };

  const handleExport = async (format = 'csv') => {
    setExportLoading(true);
    try {
      // 模拟导出API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const headers = ['医生编号', '姓名', '性别', '年龄', '科室', '职称', '执业证号', '状态', '从业年限', '联系电话', '专业领域', '挂号费'];
      const data = doctors.map(doctor => [
        doctor.id,
        doctor.name,
        doctor.gender,
        doctor.age,
        doctor.department,
        doctor.title,
        doctor.licenseNumber,
        doctor.status,
        doctor.experience,
        doctor.phone,
        doctor.specialty,
        doctor.consultationFee
      ]);
      
      if (format === 'csv') {
        const csvContent = [headers, ...data].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `医生数据_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
      } else {
        // Excel export simulation
        const excelData = {
          sheetName: '医生数据',
          headers,
          data
        };
        console.log('导出Excel数据:', excelData);
      }
      
      message.success(`成功导出 ${doctors.length} 条医生数据`);
    } catch (error) {
      console.error('Export failed:', error);
      message.error('导出失败，请重试');
    } finally {
      setExportLoading(false);
    }
  };

  const handleImport = (file) => {
    setImportLoading(true);
    // 模拟文件上传和处理
    setTimeout(() => {
      setImportLoading(false);
      message.success('文件上传成功，正在处理...');
      // 这里应该调用实际的导入API
    }, 2000);
    return false; // 阻止默认上传行为
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record) => ({
      disabled: record.status === '离职',
      name: record.name,
    }),
  };

  const handleBatchAction = (key) => {
    switch (key) {
      case 'delete':
        handleBatchDelete();
        break;
      case 'active':
        handleBatchStatusUpdate('在职');
        break;
      case 'onLeave':
        handleBatchStatusUpdate('休假');
        break;
      case 'resigned':
        handleBatchStatusUpdate('离职');
        break;
      default:
        break;
    }
  };

  const batchMenu = (
    <Menu onClick={({ key }) => handleBatchAction(key)}>
      <Menu.Item key="active" icon={<CheckCircleOutlined />}>
        批量设为在职
      </Menu.Item>
      <Menu.Item key="onLeave" icon={<ClockCircleOutlined />}>
        批量设为休假
      </Menu.Item>
      <Menu.Item key="resigned" icon={<ExclamationCircleOutlined />}>
        批量设为离职
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
        批量删除
      </Menu.Item>
    </Menu>
  );

  const handleView = (record) => {
    setSelectedDoctor(record);
    setDetailVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingDoctor) {
        // 编辑现有医生
        const updatedDoctors = doctors.map(item =>
          item.id === editingDoctor.id ? { ...item, ...values } : item
        );
        setDoctors(updatedDoctors);
        message.success('更新成功');
      } else {
        // 添加新医生
        const newDoctor = {
          id: `D${String(mockDoctors.length + 1).padStart(3, '0')}`,
          licenseNumber: `DOC${String(mockDoctors.length + 1).padStart(8, '0')}`,
          ...values
        };
        const newDoctors = [...doctors, newDoctor];
        setDoctors(newDoctors);
        setTotal(newDoctors.length);
        message.success('添加成功');
      }
      
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      '在职': { color: 'success', icon: <CheckCircleOutlined /> },
      '休假': { color: 'warning', icon: <ClockCircleOutlined /> },
      '离职': { color: 'error', icon: <ExclamationCircleOutlined /> }
    };
    
    const config = statusConfig[status] || statusConfig['在职'];
    return (
      <Tag color={config.color} icon={config.icon}>
        {status}
      </Tag>
    );
  };

  const getTitleBadge = (title) => {
    const titleConfig = {
      '主任医师': { color: 'gold', icon: <TrophyOutlined /> },
      '副主任医师': { color: 'purple', icon: <StarOutlined /> },
      '主治医师': { color: 'blue', icon: <MedicineBoxOutlined /> },
      '住院医师': { color: 'green', icon: <UserOutlined /> }
    };
    
    const config = titleConfig[title] || titleConfig['住院医师'];
    return (
      <Tag color={config.color} icon={config.icon}>
        {title}
      </Tag>
    );
  };

  const getExperienceLevel = (experience) => {
    if (experience >= 20) return { level: '专家', color: '#f5222d', percent: 100 };
    if (experience >= 10) return { level: '资深', color: '#fa8c16', percent: 80 };
    if (experience >= 5) return { level: '中级', color: '#1890ff', percent: 60 };
    return { level: '初级', color: '#52c41a', percent: 40 };
  };

  const getDoctorCard = (doctor) => {
    const experienceLevel = getExperienceLevel(doctor.experience);
    const availabilityRate = Math.round(Math.random() * 30 + 70); // 模拟可用率
    
    return (
      <Card 
        key={doctor.id}
        className="doctor-card"
        actions={[
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => handleView(doctor)}
            size="small"
          >
            查看
          </Button>,
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(doctor)}
            size="small"
          >
            编辑
          </Button>,
          <Popconfirm
            title="确认删除"
            description={`确定要删除医生 "${doctor.name}" 吗？`}
            onConfirm={() => handleDelete(doctor)}
            okText="确定"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              size="small"
              danger
            >
              删除
            </Button>
          </Popconfirm>
        ]}
      >
        <div className="doctor-card-header">
          <Avatar 
            size={64} 
            icon={<UserOutlined />} 
            style={{ 
              backgroundColor: doctor.gender === '男' ? '#1890ff' : '#eb2f96',
              fontSize: '24px'
            }}
          />
          <div className="doctor-card-info">
            <div className="doctor-card-name">
              <Text strong>{doctor.name}</Text>
              <Tag color={doctor.gender === '男' ? 'blue' : 'pink'}>
                {doctor.gender}
              </Tag>
              {getStatusTag(doctor.status)}
            </div>
            <div className="doctor-card-meta">
              <Text type="secondary">{doctor.age}岁 | {doctor.id}</Text>
            </div>
          </div>
        </div>
        
        <div className="doctor-card-content">
          <div className="doctor-card-row">
            <span className="label">科室:</span>
            <Tag color="purple">{doctor.department}</Tag>
          </div>
          <div className="doctor-card-row">
            <span className="label">职称:</span>
            {getTitleBadge(doctor.title)}
          </div>
          <div className="doctor-card-row">
            <span className="label">从业年限:</span>
            <div style={{ flex: 1 }}>
              <Progress 
                percent={experienceLevel.percent} 
                size="small" 
                strokeColor={experienceLevel.color}
                format={() => `${doctor.experience}年`}
              />
              <Text type="secondary" style={{ fontSize: 10 }}>{experienceLevel.level}</Text>
            </div>
          </div>
          <div className="doctor-card-row">
            <span className="label">挂号费:</span>
            <Text strong style={{ color: '#1890ff' }}>¥{doctor.consultationFee}</Text>
          </div>
          <div className="doctor-card-row">
            <span className="label">专业领域:</span>
            <Text ellipsis>{doctor.specialty}</Text>
          </div>
          <div className="doctor-card-row">
            <span className="label">可用率:</span>
            <div style={{ flex: 1 }}>
              <Progress 
                percent={availabilityRate} 
                size="small" 
                strokeColor={availabilityRate > 80 ? '#52c41a' : availabilityRate > 60 ? '#fa8c16' : '#f5222d'}
                format={() => `${availabilityRate}%`}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const stats = {
    total: doctors.length,
    active: doctors.filter(d => d.status === '在职').length,
    onLeave: doctors.filter(d => d.status === '休假').length,
    resigned: doctors.filter(d => d.status === '离职').length,
    avgExperience: doctors.length > 0 
      ? Math.round(doctors.reduce((sum, d) => sum + d.experience, 0) / doctors.length)
      : 0,
    chiefDoctors: doctors.filter(d => d.title === '主任医师').length
  };

  const columns = [
    {
      title: '医生编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text) => (
        <Text code style={{ fontSize: 12 }}>
          {text}
        </Text>
      )
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      render: (text, record) => (
        <Space>
          <Avatar 
            size="small" 
            icon={<UserOutlined />} 
            style={{ background: record.gender === '男' ? '#1890ff' : '#eb2f96' }}
          />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      render: (gender) => (
        <Tag color={gender === '男' ? 'blue' : 'pink'}>
          {gender}
        </Tag>
      )
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80
    },
    {
      title: '所属科室',
      dataIndex: 'department',
      key: 'department',
      width: 120,
      render: (department) => (
        <Tag color="purple">{department}</Tag>
      )
    },
    {
      title: '职称',
      dataIndex: 'title',
      key: 'title',
      width: 120,
      render: (title) => getTitleBadge(title)
    },
    {
      title: '执业证号',
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
      width: 160,
      render: (text) => (
        <Text code style={{ fontSize: 12 }}>
          {text}
        </Text>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => getStatusTag(status)
    },
    {
      title: '从业年限',
      dataIndex: 'experience',
      key: 'experience',
      width: 100,
      render: (experience) => {
        const level = getExperienceLevel(experience);
        return (
          <div>
            <Progress 
              percent={level.percent} 
              size="small" 
              strokeColor={level.color}
              format={() => `${experience}年`}
            />
            <Text type="secondary" style={{ fontSize: 10 }}>{level.level}</Text>
          </div>
        );
      }
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 140,
      render: (phone) => (
        <Space>
          <PhoneOutlined style={{ color: '#1890ff' }} />
          <Text>{phone}</Text>
        </Space>
      )
    },
    {
      title: '专业领域',
      dataIndex: 'specialty',
      key: 'specialty',
      width: 150,
      ellipsis: true
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => handleView(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record)}
              size="small"
              danger
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const departments = [...new Set(mockDoctors.map(d => d.department))];
  const statuses = [...new Set(mockDoctors.map(d => d.status))];
  const titles = [...new Set(mockDoctors.map(d => d.title))];

  if (loading && doctors.length === 0) {
    return (
      <div className="doctor-management">
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 20 }}>
            <Text>正在加载医生数据...</Text>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doctor-management">
        <Result
          status="error"
          title="加载失败"
          subTitle={error}
          extra={[
            <Button type="primary" key="retry" onClick={handleRetry}>
              重试
            </Button>,
            <Button key="home" onClick={() => window.location.reload()}>
              刷新页面
            </Button>
          ]}
        />
      </div>
    );
  }

  return (
    <div className="doctor-management">
      <div className="doctor-header">
        <Title level={3}>医生信息管理</Title>
        <Text type="secondary">管理系统中的所有医生信息</Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="stats-section">
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="医生总数"
              value={statistics.total}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="在职医生"
              value={statistics.active}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="休假医生"
              value={statistics.onLeave}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="离职医生"
              value={statistics.resigned}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="主任医师"
              value={statistics.chiefDoctors}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="平均从业年限"
              value={statistics.avgExperience}
              suffix="年"
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="平均挂号费"
              value={statistics.avgConsultationFee}
              suffix="元"
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#13c2c2' }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>平均收费标准</Text>
          </Card>
        </Col>
      </Row>

      {/* 搜索和操作区域 */}
      <Card className="table-section">
        <div className="table-header">
          <Space wrap>
            <Search
              placeholder="搜索医生姓名、证号或电话"
              style={{ width: 300 }}
              onSearch={setSearchText}
              allowClear
              enterButton={<SearchOutlined />}
            />
            <Select
              placeholder="状态筛选"
              style={{ width: 120 }}
              allowClear
              onChange={setStatusFilter}
            >
              {statuses.map(status => (
                <Option key={status} value={status}>{status}</Option>
              ))}
            </Select>
            <Select
              placeholder="科室筛选"
              style={{ width: 150 }}
              allowClear
              onChange={setDepartmentFilter}
            >
              {departments.map(department => (
                <Option key={department} value={department}>{department}</Option>
              ))}
            </Select>
            <Select
              placeholder="职称筛选"
              style={{ width: 150 }}
              allowClear
              onChange={setTitleFilter}
            >
              {titles.map(title => (
                <Option key={title} value={title}>{title}</Option>
              ))}
            </Select>
            <Button icon={<FilterOutlined />} onClick={loadDoctors}>
              筛选
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleRetry}>
              刷新
            </Button>
          </Space>
          
          <Space wrap>
            <Radio.Group 
              value={viewMode} 
              onChange={(e) => setViewMode(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="table">
                <UnorderedListOutlined /> 表格
              </Radio.Button>
              <Radio.Button value="card">
                <AppstoreOutlined /> 卡片
              </Radio.Button>
            </Radio.Group>
            
            {selectedRowKeys.length > 0 && (
              <Dropdown overlay={batchMenu} placement="bottomRight">
                <Button>
                  <MoreOutlined />
                  批量操作 ({selectedRowKeys.length})
                </Button>
              </Dropdown>
            )}
            
            <Dropdown 
              overlay={(
                <Menu onClick={({ key }) => handleExport(key)}>
                  <Menu.Item key="csv" icon={<ExportOutlined />}>
                    导出 CSV
                  </Menu.Item>
                  <Menu.Item key="excel" icon={<ExportOutlined />}>
                    导出 Excel
                  </Menu.Item>
                </Menu>
              )}
            >
              <Button loading={exportLoading}>
                <ExportOutlined /> 导出
              </Button>
            </Dropdown>
            
            <Upload 
              accept=".csv,.xlsx,.xls"
              showUploadList={false}
              beforeUpload={handleImport}
            >
              <Button loading={importLoading}>
                <ImportOutlined /> 导入
              </Button>
            </Upload>
            
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAdd}
            >
              添加医生
            </Button>
          </Space>
        </div>

        {viewMode === 'table' ? (
          <Table
            columns={columns}
            dataSource={doctors.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            loading={loading}
            rowKey="id"
            rowSelection={rowSelection}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }
            }}
            scroll={{ x: 1400 }}
            size="middle"
          />
        ) : (
          <div className="doctor-card-container">
            <Row gutter={[16, 16]}>
              {doctors.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(doctor => (
                <Col xs={24} sm={12} lg={8} xl={6} key={doctor.id}>
                  {getDoctorCard(doctor)}
                </Col>
              ))}
            </Row>
            
            {total > pageSize && (
              <div className="card-pagination">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={total}
                  showSizeChanger
                  showQuickJumper
                  showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`}
                  onChange={(page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </Card>

      {/* 添加/编辑医生弹窗 */}
      <Modal
        title={editingDoctor ? '编辑医生' : '添加医生'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: '在职',
            experience: 0,
            consultationFee: 50
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="医生姓名"
                name="name"
                rules={[{ required: true, message: '请输入医生姓名' }]}
              >
                <Input placeholder="请输入医生姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="性别"
                name="gender"
                rules={[{ required: true, message: '请选择性别' }]}
              >
                <Select placeholder="请选择性别">
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="年龄"
                name="age"
                rules={[{ required: true, message: '请输入年龄' }]}
              >
                <InputNumber placeholder="请输入年龄" style={{ width: '100%' }} min={22} max={80} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="执业证号"
                name="licenseNumber"
                rules={[{ required: true, message: '请输入执业证号' }]}
              >
                <Input placeholder="请输入执业证号" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="所属科室"
                name="department"
                rules={[{ required: true, message: '请选择所属科室' }]}
              >
                <Select placeholder="请选择所属科室">
                  <Option value="内科">内科</Option>
                  <Option value="外科">外科</Option>
                  <Option value="妇产科">妇产科</Option>
                  <Option value="儿科">儿科</Option>
                  <Option value="心内科">心内科</Option>
                  <Option value="放射科">放射科</Option>
                  <Option value="检验科">检验科</Option>
                  <Option value="急诊科">急诊科</Option>
                  <Option value="眼科">眼科</Option>
                  <Option value="耳鼻喉科">耳鼻喉科</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="职称"
                name="title"
                rules={[{ required: true, message: '请选择职称' }]}
              >
                <Select placeholder="请选择职称">
                  <Option value="住院医师">住院医师</Option>
                  <Option value="主治医师">主治医师</Option>
                  <Option value="副主任医师">副主任医师</Option>
                  <Option value="主任医师">主任医师</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="联系电话"
                name="phone"
                rules={[{ required: true, message: '请输入联系电话' }]}
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="电子邮箱"
                name="email"
                rules={[
                  { required: true, message: '请输入电子邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input placeholder="请输入电子邮箱" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="从业年限"
                name="experience"
                rules={[{ required: true, message: '请输入从业年限' }]}
              >
                <InputNumber placeholder="请输入从业年限" style={{ width: '100%' }} min={0} max={60} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="挂号费"
                name="consultationFee"
                rules={[{ required: true, message: '请输入挂号费' }]}
              >
                <InputNumber 
                  placeholder="请输入挂号费" 
                  style={{ width: '100%' }}
                  formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/¥\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="学历"
                name="education"
                rules={[{ required: true, message: '请选择学历' }]}
              >
                <Select placeholder="请选择学历">
                  <Option value="专科">专科</Option>
                  <Option value="本科">本科</Option>
                  <Option value="硕士">硕士</Option>
                  <Option value="博士">博士</Option>
                  <Option value="博士后">博士后</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="状态"
                name="status"
              >
                <Select>
                  <Option value="在职">在职</Option>
                  <Option value="休假">休假</Option>
                  <Option value="离职">离职</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="专业领域"
            name="specialty"
            rules={[{ required: true, message: '请输入专业领域' }]}
          >
            <Input placeholder="请输入专业领域" />
          </Form.Item>

          <Form.Item
            label="坐诊时间"
            name="consultationHours"
            rules={[{ required: true, message: '请输入坐诊时间' }]}
          >
            <TextArea rows={2} placeholder="请输入坐诊时间，如：周一至周五 9:00-17:00" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 医生详情弹窗 */}
      <Modal
        title="医生详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={900}
      >
        {selectedDoctor && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="医生编号">{selectedDoctor.id}</Descriptions.Item>
              <Descriptions.Item label="医生姓名">{selectedDoctor.name}</Descriptions.Item>
              <Descriptions.Item label="性别">
                <Tag color={selectedDoctor.gender === '男' ? 'blue' : 'pink'}>
                  {selectedDoctor.gender}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="年龄">{selectedDoctor.age}岁</Descriptions.Item>
              <Descriptions.Item label="执业证号">
                <Text code>{selectedDoctor.licenseNumber}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="所属科室">
                <Tag color="purple">{selectedDoctor.department}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="职称">
                {getTitleBadge(selectedDoctor.title)}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusTag(selectedDoctor.status)}
              </Descriptions.Item>
              <Descriptions.Item label="联系电话">{selectedDoctor.phone}</Descriptions.Item>
              <Descriptions.Item label="电子邮箱">{selectedDoctor.email}</Descriptions.Item>
              <Descriptions.Item label="从业年限">{selectedDoctor.experience}年</Descriptions.Item>
              <Descriptions.Item label="学历">{selectedDoctor.education}</Descriptions.Item>
              <Descriptions.Item label="专业领域">{selectedDoctor.specialty}</Descriptions.Item>
              <Descriptions.Item label="挂号费">¥{selectedDoctor.consultationFee}</Descriptions.Item>
              <Descriptions.Item label="坐诊时间">{selectedDoctor.consultationHours}</Descriptions.Item>
            </Descriptions>
            
            <Divider />
            
            <Title level={5}>经验等级</Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Progress 
                percent={getExperienceLevel(selectedDoctor.experience).percent} 
                strokeColor={getExperienceLevel(selectedDoctor.experience).color}
                style={{ flex: 1 }}
              />
              <Tag color={getExperienceLevel(selectedDoctor.experience).color}>
                {getExperienceLevel(selectedDoctor.experience).level}
              </Tag>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorManagement;