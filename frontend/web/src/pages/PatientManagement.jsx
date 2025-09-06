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
  Alert,
  Spin,
  Result,
  Skeleton,
  Dropdown,
  Menu,
  Progress,
  Rate,
  Radio,
  Checkbox,
  Popconfirm,
  notification
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
  HomeOutlined,
  IdcardOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  ExportOutlined,
  ImportOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  MoreOutlined,
  MailOutlined,
  GlobalOutlined,
  HeartOutlined,
  AlertOutlined,
  FileTextOutlined,
  PictureOutlined,
  TeamOutlined,
  BarChartOutlined,
  PrinterOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { mockPatients, mockApi } from '../data/mockData';
import { Upload, Pagination } from 'antd';
import './PatientManagement.css';

const { Option } = Select;
const { confirm } = Modal;
const { Search } = Input;
const { Text, Title } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [batchActionLoading, setBatchActionLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // table or card
  const [importLoading, setImportLoading] = useState(false);
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [statistics, setStatistics] = useState({
    total: 0,
    inpatient: 0,
    outpatient: 0,
    discharged: 0,
    emergency: 0,
    male: 0,
    female: 0,
    avgAge: 0,
    admissionRate: 0
  });

  useEffect(() => {
    loadPatients();
    loadStatistics();
  }, []);

  const loadPatients = async () => {
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
      
      let filteredData = [...mockPatients];
      
      // 应用搜索过滤
      if (searchText) {
        filteredData = filteredData.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.idCard.toLowerCase().includes(searchText.toLowerCase()) ||
          item.phone.toLowerCase().includes(searchText.toLowerCase()) ||
          item.medicalRecordNumber.toLowerCase().includes(searchText.toLowerCase())
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
      
      // 应用性别过滤
      if (genderFilter) {
        filteredData = filteredData.filter(item => item.gender === genderFilter);
      }
      
      setPatients(filteredData);
      setTotal(filteredData.length);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load patients:', error);
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
        total: mockPatients.length,
        inpatient: mockPatients.filter(p => p.status === '住院').length,
        outpatient: mockPatients.filter(p => p.status === '门诊').length,
        discharged: mockPatients.filter(p => p.status === '出院').length,
        emergency: mockPatients.filter(p => p.status === '急诊').length,
        male: mockPatients.filter(p => p.gender === '男').length,
        female: mockPatients.filter(p => p.gender === '女').length,
        avgAge: Math.round(mockPatients.reduce((sum, p) => sum + (p.age || 0), 0) / mockPatients.length),
        admissionRate: Math.round((mockPatients.filter(p => p.status === '住院').length / mockPatients.length) * 100)
      };
      
      setStatistics(stats);
      setStatisticsLoading(false);
    } catch (error) {
      console.error('Failed to load statistics:', error);
      setStatisticsLoading(false);
    }
  };

  const handleRetry = () => {
    loadPatients();
    loadStatistics();
  };

  const handleAdd = () => {
    setEditingPatient(null);
    setModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingPatient(record);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (record) => {
    confirm({
      title: '确认删除',
      content: `确定要删除患者 "${record.name}" 吗？此操作不可恢复。`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk() {
        const newPatients = patients.filter(item => item.id !== record.id);
        setPatients(newPatients);
        setTotal(newPatients.length);
        loadStatistics();
        message.success('删除成功');
      },
    });
  };

  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的患者');
      return;
    }
    
    confirm({
      title: '批量删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 名患者吗？此操作不可恢复。`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk() {
        const newPatients = patients.filter(item => !selectedRowKeys.includes(item.id));
        setPatients(newPatients);
        setTotal(newPatients.length);
        setSelectedRowKeys([]);
        loadStatistics();
        message.success(`成功删除 ${selectedRowKeys.length} 名患者`);
      },
    });
  };

  const handleBatchStatusUpdate = (status) => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要更新状态的患者');
      return;
    }
    
    setBatchActionLoading(true);
    setTimeout(() => {
      const updatedPatients = patients.map(item => 
        selectedRowKeys.includes(item.id) ? { ...item, status } : item
      );
      setPatients(updatedPatients);
      setSelectedRowKeys([]);
      setBatchActionLoading(false);
      loadStatistics();
      message.success(`成功更新 ${selectedRowKeys.length} 名患者状态`);
    }, 1000);
  };

  const handleExport = async (format = 'csv') => {
    setExportLoading(true);
    try {
      // 模拟导出API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const headers = ['患者编号', '姓名', '性别', '年龄', '病历号', '科室', '医生', '状态', '入院日期', '联系电话', '诊断'];
      const data = patients.map(patient => [
        patient.id,
        patient.name,
        patient.gender,
        patient.age,
        patient.medicalRecordNumber,
        patient.department,
        patient.doctor,
        patient.status,
        patient.admissionDate || '-',
        patient.phone,
        patient.diagnosis
      ]);
      
      if (format === 'csv') {
        const csvContent = [headers, ...data].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `患者数据_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
      } else {
        // Excel export simulation
        const excelData = {
          sheetName: '患者数据',
          headers,
          data
        };
        console.log('导出Excel数据:', excelData);
      }
      
      message.success(`成功导出 ${patients.length} 条患者数据`);
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
      disabled: record.status === '出院',
      name: record.name,
    }),
  };

  const handleBatchAction = (key) => {
    switch (key) {
      case 'delete':
        handleBatchDelete();
        break;
      case 'inpatient':
        handleBatchStatusUpdate('住院');
        break;
      case 'outpatient':
        handleBatchStatusUpdate('门诊');
        break;
      case 'discharged':
        handleBatchStatusUpdate('出院');
        break;
      default:
        break;
    }
  };

  const batchMenu = (
    <Menu onClick={({ key }) => handleBatchAction(key)}>
      <Menu.Item key="inpatient" icon={<ClockCircleOutlined />}>
        批量设为住院
      </Menu.Item>
      <Menu.Item key="outpatient" icon={<CheckCircleOutlined />}>
        批量设为门诊
      </Menu.Item>
      <Menu.Item key="discharged" icon={<UserOutlined />}>
        批量设为出院
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
        批量删除
      </Menu.Item>
    </Menu>
  );

  const handleView = (record) => {
    setSelectedPatient(record);
    setDetailVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingPatient) {
        // 编辑现有患者
        const updatedPatients = patients.map(item =>
          item.id === editingPatient.id ? { ...item, ...values } : item
        );
        setPatients(updatedPatients);
        message.success('更新成功');
      } else {
        // 添加新患者
        const newPatient = {
          id: `P${String(mockPatients.length + 1).padStart(3, '0')}`,
          medicalRecordNumber: `MR${String(mockPatients.length + 1).padStart(8, '0')}`,
          ...values
        };
        const newPatients = [...patients, newPatient];
        setPatients(newPatients);
        setTotal(newPatients.length);
        message.success('添加成功');
      }
      
      setModalVisible(false);
      form.resetFields();
      loadStatistics();
    } catch (error) {
      console.error('Validation failed:', error);
      message.error('表单验证失败，请检查输入');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      '住院': { color: 'processing', icon: <ClockCircleOutlined /> },
      '门诊': { color: 'success', icon: <CheckCircleOutlined /> },
      '出院': { color: 'default', icon: <UserOutlined /> },
      '急诊': { color: 'error', icon: <WarningOutlined /> }
    };
    
    const config = statusConfig[status] || statusConfig['门诊'];
    return (
      <Tag color={config.color} icon={config.icon}>
        {status}
      </Tag>
    );
  };

  const getAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const getPatientRiskLevel = (patient) => {
    // 简单的风险评估逻辑
    const age = patient.age || 0;
    const status = patient.status;
    
    if (age > 65 || status === '急诊') {
      return { level: 'high', color: 'red', text: '高风险' };
    } else if (age > 45 || status === '住院') {
      return { level: 'medium', color: 'orange', text: '中风险' };
    } else {
      return { level: 'low', color: 'green', text: '低风险' };
    }
  };

  const getPatientCard = (patient) => {
    const riskLevel = getPatientRiskLevel(patient);
    
    return (
      <Card 
        key={patient.id}
        className="patient-card"
        actions={[
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => handleView(patient)}
            size="small"
          >
            查看
          </Button>,
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(patient)}
            size="small"
          >
            编辑
          </Button>,
          <Popconfirm
            title="确认删除"
            description={`确定要删除患者 "${patient.name}" 吗？`}
            onConfirm={() => handleDelete(patient)}
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
        <div className="patient-card-header">
          <Avatar 
            size={64} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: patient.gender === '男' ? '#1890ff' : '#eb2f96' }}
          />
          <div className="patient-card-info">
            <div className="patient-card-name">
              <Text strong>{patient.name}</Text>
              <Tag color={patient.gender === '男' ? 'blue' : 'pink'}>
                {patient.gender}
              </Tag>
              <Tag color={riskLevel.color}>
                {riskLevel.text}
              </Tag>
            </div>
            <div className="patient-card-meta">
              <Text type="secondary">{patient.age}岁 | {patient.id}</Text>
            </div>
          </div>
        </div>
        
        <div className="patient-card-content">
          <div className="patient-card-row">
            <span className="label">病历号:</span>
            <Text code>{patient.medicalRecordNumber}</Text>
          </div>
          <div className="patient-card-row">
            <span className="label">科室:</span>
            <Tag color="purple">{patient.department}</Tag>
          </div>
          <div className="patient-card-row">
            <span className="label">医生:</span>
            <Text>{patient.doctor}</Text>
          </div>
          <div className="patient-card-row">
            <span className="label">状态:</span>
            {getStatusTag(patient.status)}
          </div>
          <div className="patient-card-row">
            <span className="label">诊断:</span>
            <Text ellipsis>{patient.diagnosis}</Text>
          </div>
        </div>
      </Card>
    );
  };

  const stats = {
    total: patients.length,
    inpatient: patients.filter(p => p.status === '住院').length,
    outpatient: patients.filter(p => p.status === '门诊').length,
    discharged: patients.filter(p => p.status === '出院').length,
    emergency: patients.filter(p => p.status === '急诊').length,
    male: patients.filter(p => p.gender === '男').length,
    female: patients.filter(p => p.gender === '女').length
  };

  const columns = [
    {
      title: '患者编号',
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
          <Avatar size="small" icon={<UserOutlined />} />
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
      key: 'age',
      width: 80,
      render: (_, record) => {
        const age = record.idCard && record.idCard.length >= 10 ? getAge(new Date(record.idCard.substring(6, 10))) : '--';
        return <Text>{age}岁</Text>;
      }
    },
    {
      title: '病历号',
      dataIndex: 'medicalRecordNumber',
      key: 'medicalRecordNumber',
      width: 140,
      render: (text) => (
        <Text code style={{ fontSize: 12 }}>
          {text}
        </Text>
      )
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
      title: '负责医生',
      dataIndex: 'doctor',
      key: 'doctor',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => getStatusTag(status)
    },
    {
      title: '入院日期',
      dataIndex: 'admissionDate',
      key: 'admissionDate',
      width: 120
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
      title: '诊断',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
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

  const departments = [...new Set(mockPatients.map(p => p.department))];
  const statuses = [...new Set(mockPatients.map(p => p.status))];
  const genders = [...new Set(mockPatients.map(p => p.gender))];

  if (loading && patients.length === 0) {
    return (
      <div className="patient-management">
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 20 }}>
            <Text>正在加载患者数据...</Text>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-management">
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
    <div className="patient-management">
      <div className="patient-header">
        <Title level={3}>患者信息管理</Title>
        <Text type="secondary">管理系统中的所有患者信息</Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="stats-section">
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="患者总数"
              value={statistics.total}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="住院患者"
              value={statistics.inpatient}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="门诊患者"
              value={statistics.outpatient}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="出院患者"
              value={statistics.discharged}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#8c8c8c' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="急诊患者"
              value={statistics.emergency}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="平均年龄"
              value={statistics.avgAge}
              suffix="岁"
              prefix={<UserOutlined />}
              valueStyle={{ color: '#13c2c2' }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>患者平均年龄</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Card loading={statisticsLoading}>
            <Statistic
              title="住院率"
              value={statistics.admissionRate}
              suffix="%"
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>当前住院率</Text>
          </Card>
        </Col>
      </Row>

      {/* 搜索和操作区域 */}
      <Card className="table-section">
        <div className="table-header">
          <Space wrap>
            <Search
              placeholder="搜索患者姓名、身份证号或电话"
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
              placeholder="性别筛选"
              style={{ width: 120 }}
              allowClear
              onChange={setGenderFilter}
            >
              {genders.map(gender => (
                <Option key={gender} value={gender}>{gender}</Option>
              ))}
            </Select>
            <Button icon={<FilterOutlined />} onClick={loadPatients}>
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
              添加患者
            </Button>
          </Space>
        </div>

        {viewMode === 'table' ? (
          <Table
            columns={columns}
            dataSource={patients.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
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
          <div className="patient-card-container">
            <Row gutter={[16, 16]}>
              {patients.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(patient => (
                <Col xs={24} sm={12} lg={8} xl={6} key={patient.id}>
                  {getPatientCard(patient)}
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

      {/* 添加/编辑患者弹窗 */}
      <Modal
        title={editingPatient ? '编辑患者' : '添加患者'}
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
            status: '门诊',
            admissionDate: null,
            dischargeDate: null
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="患者姓名"
                name="name"
                rules={[{ required: true, message: '请输入患者姓名' }]}
              >
                <Input placeholder="请输入患者姓名" />
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
                <InputNumber placeholder="请输入年龄" style={{ width: '100%' }} min={0} max={150} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="身份证号"
                name="idCard"
                rules={[{ required: true, message: '请输入身份证号' }]}
              >
                <Input placeholder="请输入身份证号" />
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
                label="血型"
                name="bloodType"
                rules={[{ required: true, message: '请选择血型' }]}
              >
                <Select placeholder="请选择血型">
                  <Option value="A+">A+</Option>
                  <Option value="A-">A-</Option>
                  <Option value="B+">B+</Option>
                  <Option value="B-">B-</Option>
                  <Option value="AB+">AB+</Option>
                  <Option value="AB-">AB-</Option>
                  <Option value="O+">O+</Option>
                  <Option value="O-">O-</Option>
                </Select>
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
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="负责医生"
                name="doctor"
                rules={[{ required: true, message: '请输入负责医生' }]}
              >
                <Input placeholder="请输入负责医生" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="患者状态"
                name="status"
              >
                <Select>
                  <Option value="门诊">门诊</Option>
                  <Option value="住院">住院</Option>
                  <Option value="出院">出院</Option>
                  <Option value="急诊">急诊</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="入院日期"
                name="admissionDate"
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="地址"
            name="address"
            rules={[{ required: true, message: '请输入地址' }]}
          >
            <Input placeholder="请输入地址" />
          </Form.Item>

          <Form.Item
            label="诊断"
            name="diagnosis"
            rules={[{ required: true, message: '请输入诊断' }]}
          >
            <TextArea rows={2} placeholder="请输入诊断" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="过敏史"
                name="allergies"
              >
                <Input placeholder="过敏史" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="紧急联系人"
                name="emergencyContact"
              >
                <Input placeholder="紧急联系人" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="紧急联系电话"
                name="emergencyPhone"
              >
                <Input placeholder="紧急联系电话" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* 患者详情弹窗 */}
      <Modal
        title="患者详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={900}
      >
        {selectedPatient && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="患者编号">{selectedPatient.id}</Descriptions.Item>
              <Descriptions.Item label="患者姓名">{selectedPatient.name}</Descriptions.Item>
              <Descriptions.Item label="性别">
                <Tag color={selectedPatient.gender === '男' ? 'blue' : 'pink'}>
                  {selectedPatient.gender}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="年龄">{selectedPatient.age}岁</Descriptions.Item>
              <Descriptions.Item label="身份证号">{selectedPatient.idCard}</Descriptions.Item>
              <Descriptions.Item label="病历号">
                <Text code>{selectedPatient.medicalRecordNumber}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="所属科室">
                <Tag color="purple">{selectedPatient.department}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="负责医生">{selectedPatient.doctor}</Descriptions.Item>
              <Descriptions.Item label="患者状态">
                {getStatusTag(selectedPatient.status)}
              </Descriptions.Item>
              <Descriptions.Item label="入院日期">{selectedPatient.admissionDate || '-'}</Descriptions.Item>
              <Descriptions.Item label="出院日期">{selectedPatient.dischargeDate || '-'}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{selectedPatient.phone}</Descriptions.Item>
              <Descriptions.Item label="血型">{selectedPatient.bloodType}</Descriptions.Item>
              <Descriptions.Item label="地址">{selectedPatient.address}</Descriptions.Item>
              <Descriptions.Item label="诊断">{selectedPatient.diagnosis}</Descriptions.Item>
              <Descriptions.Item label="过敏史">{selectedPatient.allergies || '无'}</Descriptions.Item>
              <Descriptions.Item label="紧急联系人">{selectedPatient.emergencyContact || '-'}</Descriptions.Item>
              <Descriptions.Item label="紧急联系电话">{selectedPatient.emergencyPhone || '-'}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientManagement;