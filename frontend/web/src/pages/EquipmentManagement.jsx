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
  Progress,
  Tooltip,
  Typography,
  Divider,
  Pagination,
  Descriptions,
  Image,
  Upload,
  DatePicker,
  InputNumber,
  Switch,
  Alert,
  Spin,
  Result,
  Skeleton,
  Popconfirm,
  Radio,
  Checkbox,
  Rate
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  MedicineBoxOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  QrcodeOutlined,
  ExclamationCircleOutlined,
  RiseOutlined,
  FallOutlined,
  ReloadOutlined,
  DownloadOutlined,
  UploadOutlined,
  SettingOutlined,
  BarChartOutlined,
  AlertOutlined,
  ToolOutlined,
  CalendarOutlined,
  DollarOutlined,
  PercentageOutlined
} from '@ant-design/icons';
import { mockEquipment, mockApi } from '../data/mockData';
import './EquipmentManagement.css';

const { Option } = Select;
const { confirm } = Modal;
const { Search } = Input;
const { Text, Title } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const EquipmentManagement = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [error, setError] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);
  const [batchActionLoading, setBatchActionLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // table or card
  const [advancedFilters, setAdvancedFilters] = useState(false);

  useEffect(() => {
    loadEquipments();
  }, []);

  const loadEquipments = async () => {
    setLoading(true);
    setError(null);
    try {
      // 模拟API调用
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 模拟10%的错误率
          if (Math.random() < 0.1) {
            reject(new Error('网络连接失败，请检查网络设置'));
          } else {
            resolve();
          }
        }, 800);
      });
      
      let filteredData = [...mockEquipment];
      
      // 应用搜索过滤
      if (searchText) {
        filteredData = filteredData.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.model.toLowerCase().includes(searchText.toLowerCase()) ||
          item.serialNumber.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      
      // 应用状态过滤
      if (statusFilter) {
        filteredData = filteredData.filter(item => item.status === statusFilter);
      }
      
      // 应用分类过滤
      if (categoryFilter) {
        filteredData = filteredData.filter(item => item.category === categoryFilter);
      }
      
      setEquipments(filteredData);
      setTotal(filteredData.length);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load equipment data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleRetry = () => {
    loadEquipments();
  };

  const handleAdd = () => {
    setEditingEquipment(null);
    setModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingEquipment(record);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (record) => {
    confirm({
      title: '确认删除',
      content: `确定要删除设备 "${record.name}" 吗？此操作不可恢复。`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              const newEquipments = equipments.filter(item => item.id !== record.id);
              setEquipments(newEquipments);
              setTotal(newEquipments.length);
              message.success('删除成功');
              resolve();
            } catch (error) {
              message.error('删除失败');
              reject();
            }
          }, 500);
        });
      },
    });
  };

  const handleView = (record) => {
    setSelectedEquipment(record);
    setDetailVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      // 模拟API调用
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.1) {
            reject(new Error('保存失败，请重试'));
          } else {
            resolve();
          }
        }, 800);
      });
      
      if (editingEquipment) {
        // 编辑现有设备
        const updatedEquipments = equipments.map(item =>
          item.id === editingEquipment.id ? { ...item, ...values, updatedAt: new Date().toISOString() } : item
        );
        setEquipments(updatedEquipments);
        message.success('更新成功');
      } else {
        // 添加新设备
        const newEquipment = {
          id: `EQ${String(mockEquipment.length + 1).padStart(3, '0')}`,
          ...values,
          qrCode: `EQ${String(mockEquipment.length + 1).padStart(3, '0')}-QR`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const newEquipments = [...equipments, newEquipment];
        setEquipments(newEquipments);
        setTotal(newEquipments.length);
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

  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的设备');
      return;
    }
    
    confirm({
      title: '批量删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 台设备吗？此操作不可恢复。`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk() {
        setBatchActionLoading(true);
        setTimeout(() => {
          const newEquipments = equipments.filter(item => !selectedRowKeys.includes(item.id));
          setEquipments(newEquipments);
          setTotal(newEquipments.length);
          setSelectedRowKeys([]);
          setBatchActionLoading(false);
          message.success(`成功删除 ${selectedRowKeys.length} 台设备`);
        }, 800);
      },
    });
  };

  const handleExport = async () => {
    setExportLoading(true);
    try {
      // 模拟导出过程
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 创建CSV内容
      const headers = ['设备编号', '设备名称', '型号', '分类', '所属科室', '状态', '购置日期', '使用时长', '当前价值'];
      const csvContent = [
        headers.join(','),
        ...equipments.map(eq => [
          eq.id,
          eq.name,
          eq.model,
          eq.category,
          eq.department,
          eq.status,
          eq.purchaseDate,
          eq.usageHours,
          eq.currentValue
        ].join(','))
      ].join('\n');
      
      // 创建下载链接
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `设备台账_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      message.success('导出成功');
    } catch (error) {
      message.error('导出失败');
    } finally {
      setExportLoading(false);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record) => ({
      disabled: record.status === '维修中', // 维修中的设备不能选择
    }),
  };

  const handleBatchStatusChange = (newStatus) => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要更新状态的设备');
      return;
    }
    
    setBatchActionLoading(true);
    setTimeout(() => {
      const updatedEquipments = equipments.map(item =>
        selectedRowKeys.includes(item.id) ? { ...item, status: newStatus } : item
      );
      setEquipments(updatedEquipments);
      setSelectedRowKeys([]);
      setBatchActionLoading(false);
      message.success(`成功更新 ${selectedRowKeys.length} 台设备状态`);
    }, 800);
  };

  const getMaintenanceStatus = (equipment) => {
    if (!equipment.nextMaintenanceDate) return { status: 'unknown', text: '未设置', color: 'default' };
    
    const today = new Date();
    const nextMaintenance = new Date(equipment.nextMaintenanceDate);
    const daysDiff = Math.ceil((nextMaintenance - today) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) {
      return { status: 'overdue', text: '已逾期', color: 'error' };
    } else if (daysDiff <= 7) {
      return { status: 'urgent', text: `${daysDiff}天后到期`, color: 'warning' };
    } else if (daysDiff <= 30) {
      return { status: 'approaching', text: `${daysDiff}天后到期`, color: 'processing' };
    } else {
      return { status: 'normal', text: '正常', color: 'success' };
    }
  };

  const getWarrantyStatus = (equipment) => {
    if (!equipment.warrantyExpiry) return { status: 'unknown', text: '未设置', color: 'default' };
    
    const today = new Date();
    const warrantyExpiry = new Date(equipment.warrantyExpiry);
    const daysDiff = Math.ceil((warrantyExpiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) {
      return { status: 'expired', text: '已过期', color: 'error' };
    } else if (daysDiff <= 30) {
      return { status: 'expiring', text: `${daysDiff}天后过期`, color: 'warning' };
    } else {
      return { status: 'valid', text: '有效', color: 'success' };
    }
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      '正常': { color: 'success', icon: <CheckCircleOutlined /> },
      '维修中': { color: 'warning', icon: <ClockCircleOutlined /> },
      '维护中': { color: 'processing', icon: <WarningOutlined /> },
      '停用': { color: 'error', icon: <ExclamationCircleOutlined /> }
    };
    
    const config = statusConfig[status] || statusConfig['正常'];
    return (
      <Tag color={config.color} icon={config.icon}>
        {status}
      </Tag>
    );
  };

  const getUtilizationRate = (usageHours, purchaseDate) => {
    const daysSincePurchase = Math.ceil((new Date() - new Date(purchaseDate)) / (1000 * 60 * 60 * 24));
    const dailyUsage = usageHours / daysSincePurchase;
    const utilizationRate = Math.min((dailyUsage / 24) * 100, 100);
    return utilizationRate.toFixed(1);
  };

  const stats = {
    total: equipments.length,
    normal: equipments.filter(eq => eq.status === '正常').length,
    maintenance: equipments.filter(eq => eq.status === '维修中' || eq.status === '维护中').length,
    totalValue: equipments.reduce((sum, eq) => sum + eq.currentValue, 0),
    avgUtilization: equipments.length > 0 
      ? equipments.reduce((sum, eq) => sum + parseFloat(getUtilizationRate(eq.usageHours, eq.purchaseDate)), 0) / equipments.length
      : 0,
    overdueMaintenance: equipments.filter(eq => {
      const status = getMaintenanceStatus(eq);
      return status.status === 'overdue';
    }).length,
    expiringWarranty: equipments.filter(eq => {
      const status = getWarrantyStatus(eq);
      return status.status === 'expiring' || status.status === 'expired';
    }).length
  };

  const columns = [
    {
      title: '设备编号',
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
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text, record) => (
        <Space>
          <MedicineBoxOutlined style={{ color: '#1890ff' }} />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      width: 120
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      )
    },
    {
      title: '所属科室',
      dataIndex: 'department',
      key: 'department',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => getStatusTag(status)
    },
    {
      title: '维护状态',
      key: 'maintenanceStatus',
      width: 100,
      render: (_, record) => {
        const status = getMaintenanceStatus(record);
        return (
          <Tooltip title={status.text}>
            <Badge 
              status={status.color} 
              text={status.text}
            />
          </Tooltip>
        );
      }
    },
    {
      title: '保修状态',
      key: 'warrantyStatus',
      width: 100,
      render: (_, record) => {
        const status = getWarrantyStatus(record);
        return (
          <Tooltip title={status.text}>
            <Badge 
              status={status.color} 
              text={status.text}
            />
          </Tooltip>
        );
      }
    },
    {
      title: '购置日期',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      width: 120
    },
    {
      title: '使用时长',
      dataIndex: 'usageHours',
      key: 'usageHours',
      width: 100,
      render: (hours) => `${hours}h`
    },
    {
      title: '当前价值',
      dataIndex: 'currentValue',
      key: 'currentValue',
      width: 120,
      render: (value) => (
        <Text type="success" strong>
          ¥{(value / 10000).toFixed(1)}万
        </Text>
      )
    },
    {
      title: '利用率',
      key: 'utilization',
      width: 100,
      render: (_, record) => {
        const rate = getUtilizationRate(record.usageHours, record.purchaseDate);
        return (
          <Progress 
            percent={parseFloat(rate)} 
            size="small" 
            status={rate > 80 ? 'exception' : rate > 60 ? 'normal' : 'success'}
          />
        );
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 220,
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
          <Tooltip title="维护记录">
            <Button 
              type="text" 
              icon={<ToolOutlined />} 
              onClick={() => {
                // 这里可以跳转到维护记录页面
                message.info('维护记录功能开发中');
              }}
              size="small"
            />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm
              title="确定要删除这台设备吗？"
              onConfirm={() => handleDelete(record)}
              okText="确定"
              cancelText="取消"
              okButtonProps={{ danger: true }}
            >
              <Button 
                type="text" 
                icon={<DeleteOutlined />} 
                size="small"
                danger
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  const categories = [...new Set(mockEquipment.map(eq => eq.category))];
  const statuses = [...new Set(mockEquipment.map(eq => eq.status))];

  if (loading) {
    return (
      <div className="equipment-management">
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 20 }}>
            <Text>正在加载设备数据...</Text>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="equipment-management">
        <Result
          status="error"
          title="加载失败"
          subTitle={error}
          extra={[
            <Button type="primary" key="retry" onClick={handleRetry}>
              重试
            </Button>,
            <Button key="home" onClick={() => window.location.href = '/dashboard'}>
              返回首页
            </Button>
          ]}
        />
      </div>
    );
  }

  const renderCardView = () => (
    <Row gutter={[16, 16]}>
      {equipments.map((equipment) => {
        const maintenanceStatus = getMaintenanceStatus(equipment);
        const warrantyStatus = getWarrantyStatus(equipment);
        const utilizationRate = getUtilizationRate(equipment.usageHours, equipment.purchaseDate);
        
        return (
          <Col xs={24} sm={12} lg={8} xl={6} key={equipment.id}>
            <Card
              hoverable
              className="equipment-card"
              actions={[
                <Tooltip title="查看详情">
                  <Button 
                    type="text" 
                    icon={<EyeOutlined />} 
                    onClick={() => handleView(equipment)}
                    size="small"
                  />
                </Tooltip>,
                <Tooltip title="编辑">
                  <Button 
                    type="text" 
                    icon={<EditOutlined />} 
                    onClick={() => handleEdit(equipment)}
                    size="small"
                  />
                </Tooltip>,
                <Popconfirm
                  title="确定要删除这台设备吗？"
                  onConfirm={() => handleDelete(equipment)}
                  okText="确定"
                  cancelText="取消"
                  okButtonProps={{ danger: true }}
                >
                  <Button 
                    type="text" 
                    icon={<DeleteOutlined />} 
                    size="small"
                    danger
                  />
                </Popconfirm>
              ]}
            >
              <div className="equipment-card-header">
                <MedicineBoxOutlined style={{ color: '#1890ff', fontSize: 24 }} />
                <div>
                  <Text strong>{equipment.name}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>{equipment.model}</Text>
                </div>
              </div>
              
              <div className="equipment-card-content">
                <div className="equipment-card-row">
                  <Text type="secondary">编号:</Text>
                  <Text code>{equipment.id}</Text>
                </div>
                <div className="equipment-card-row">
                  <Text type="secondary">科室:</Text>
                  <Text>{equipment.department}</Text>
                </div>
                <div className="equipment-card-row">
                  <Text type="secondary">状态:</Text>
                  {getStatusTag(equipment.status)}
                </div>
                <div className="equipment-card-row">
                  <Text type="secondary">维护:</Text>
                  <Badge status={maintenanceStatus.color} text={maintenanceStatus.text} />
                </div>
                <div className="equipment-card-row">
                  <Text type="secondary">保修:</Text>
                  <Badge status={warrantyStatus.color} text={warrantyStatus.text} />
                </div>
                <div className="equipment-card-row">
                  <Text type="secondary">利用率:</Text>
                  <Progress 
                    percent={parseFloat(utilizationRate)} 
                    size="small" 
                    style={{ width: 60 }}
                  />
                </div>
                <div className="equipment-card-row">
                  <Text type="secondary">价值:</Text>
                  <Text type="success" strong>
                    ¥{(equipment.currentValue / 10000).toFixed(1)}万
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );

  return (
    <div className="equipment-management">
      <div className="equipment-header">
        <Title level={3}>设备台账管理</Title>
        <Text type="secondary">管理系统中的所有医疗设备信息</Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="stats-section">
        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="设备总数"
              value={stats.total}
              prefix={<MedicineBoxOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="正常设备"
              value={stats.normal}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="维护/维修"
              value={stats.maintenance}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="逾期维护"
              value={stats.overdueMaintenance}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="保修过期"
              value={stats.expiringWarranty}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="平均利用率"
              value={stats.avgUtilization}
              suffix="%"
              prefix={<PercentageOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 搜索和操作区域 */}
      <Card className="table-section">
        <div className="table-header">
          <div className="table-header-left">
            <Space wrap>
              <Search
                placeholder="搜索设备名称、型号或编号"
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
                placeholder="分类筛选"
                style={{ width: 150 }}
                allowClear
                onChange={setCategoryFilter}
              >
                {categories.map(category => (
                  <Option key={category} value={category}>{category}</Option>
                ))}
              </Select>
              <Button icon={<FilterOutlined />} onClick={loadEquipments}>
                筛选
              </Button>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={loadEquipments}
                loading={loading}
              >
                刷新
              </Button>
            </Space>
          </div>
          
          <div className="table-header-right">
            <Space>
              <Radio.Group 
                value={viewMode} 
                onChange={(e) => setViewMode(e.target.value)}
                size="small"
              >
                <Radio.Button value="table">表格</Radio.Button>
                <Radio.Button value="card">卡片</Radio.Button>
              </Radio.Group>
              
              {selectedRowKeys.length > 0 && (
                <Space>
                  <Popconfirm
                    title={`确定要删除选中的 ${selectedRowKeys.length} 台设备吗？`}
                    onConfirm={handleBatchDelete}
                    okText="确定"
                    cancelText="取消"
                    okButtonProps={{ danger: true }}
                  >
                    <Button 
                      danger 
                      icon={<DeleteOutlined />}
                      loading={batchActionLoading}
                    >
                      批量删除
                    </Button>
                  </Popconfirm>
                  <Select
                    placeholder="批量设置状态"
                    style={{ width: 120 }}
                    onChange={handleBatchStatusChange}
                    size="small"
                  >
                    <Option value="正常">正常</Option>
                    <Option value="维修中">维修中</Option>
                    <Option value="维护中">维护中</Option>
                    <Option value="停用">停用</Option>
                  </Select>
                </Space>
              )}
              
              <Button 
                icon={<DownloadOutlined />} 
                onClick={handleExport}
                loading={exportLoading}
              >
                导出
              </Button>
              
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAdd}
              >
                添加设备
              </Button>
            </Space>
          </div>
        </div>

        {viewMode === 'table' ? (
          <Table
            columns={columns}
            dataSource={equipments.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
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
          <div className="card-view-container">
            {renderCardView()}
            {equipments.length > pageSize && (
              <div className="card-view-pagination">
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

      {/* 添加/编辑设备弹窗 */}
      <Modal
        title={editingEquipment ? '编辑设备' : '添加设备'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={900}
        destroyOnClose
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: '正常',
            warrantyExpiry: null,
            lastMaintenanceDate: null,
            nextMaintenanceDate: null
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="设备名称"
                name="name"
                rules={[{ required: true, message: '请输入设备名称' }]}
              >
                <Input placeholder="请输入设备名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="设备型号"
                name="model"
                rules={[{ required: true, message: '请输入设备型号' }]}
              >
                <Input placeholder="请输入设备型号" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="序列号"
                name="serialNumber"
                rules={[{ required: true, message: '请输入序列号' }]}
              >
                <Input placeholder="请输入序列号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="设备分类"
                name="category"
                rules={[{ required: true, message: '请选择设备分类' }]}
              >
                <Select placeholder="请选择设备分类">
                  <Option value="大型医疗设备">大型医疗设备</Option>
                  <Option value="超声设备">超声设备</Option>
                  <Option value="检验设备">检验设备</Option>
                  <Option value="急救设备">急救设备</Option>
                  <Option value="其他">其他</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="所属科室"
                name="department"
                rules={[{ required: true, message: '请输入所属科室' }]}
              >
                <Input placeholder="请输入所属科室" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="设备位置"
                name="location"
                rules={[{ required: true, message: '请输入设备位置' }]}
              >
                <Input placeholder="请输入设备位置" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="生产厂家"
                name="manufacturer"
                rules={[{ required: true, message: '请输入生产厂家' }]}
              >
                <Input placeholder="请输入生产厂家" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="供应商"
                name="supplier"
                rules={[{ required: true, message: '请输入供应商' }]}
              >
                <Input placeholder="请输入供应商" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="购置日期"
                name="purchaseDate"
                rules={[{ required: true, message: '请选择购置日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="原值"
                name="originalValue"
                rules={[{ required: true, message: '请输入原值' }]}
              >
                <InputNumber 
                  placeholder="请输入原值" 
                  style={{ width: '100%' }}
                  formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/¥\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="当前价值"
                name="currentValue"
                rules={[{ required: true, message: '请输入当前价值' }]}
              >
                <InputNumber 
                  placeholder="请输入当前价值" 
                  style={{ width: '100%' }}
                  formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/¥\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="保修到期"
                name="warrantyExpiry"
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="维护周期(天)"
                name="maintenanceCycle"
              >
                <InputNumber placeholder="维护周期" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="使用时长"
                name="usageHours"
              >
                <InputNumber placeholder="使用时长" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="设备状态"
            name="status"
          >
            <Select>
              <Option value="正常">正常</Option>
              <Option value="维修中">维修中</Option>
              <Option value="维护中">维护中</Option>
              <Option value="停用">停用</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="设备描述"
            name="description"
          >
            <TextArea rows={3} placeholder="请输入设备描述" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 设备详情弹窗 */}
      <Modal
        title="设备详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailVisible(false)}>
            关闭
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            onClick={() => {
              setDetailVisible(false);
              handleEdit(selectedEquipment);
            }}
          >
            编辑
          </Button>
        ]}
        width={1000}
      >
        {selectedEquipment && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="设备编号">{selectedEquipment.id}</Descriptions.Item>
              <Descriptions.Item label="设备名称">{selectedEquipment.name}</Descriptions.Item>
              <Descriptions.Item label="设备型号">{selectedEquipment.model}</Descriptions.Item>
              <Descriptions.Item label="序列号">{selectedEquipment.serialNumber}</Descriptions.Item>
              <Descriptions.Item label="设备分类">
                <Tag color="blue">{selectedEquipment.category}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="所属科室">{selectedEquipment.department}</Descriptions.Item>
              <Descriptions.Item label="设备位置">{selectedEquipment.location}</Descriptions.Item>
              <Descriptions.Item label="设备状态">
                {getStatusTag(selectedEquipment.status)}
              </Descriptions.Item>
              <Descriptions.Item label="生产厂家">{selectedEquipment.manufacturer}</Descriptions.Item>
              <Descriptions.Item label="供应商">{selectedEquipment.supplier}</Descriptions.Item>
              <Descriptions.Item label="购置日期">{selectedEquipment.purchaseDate}</Descriptions.Item>
              <Descriptions.Item label="保修到期">{selectedEquipment.warrantyExpiry || '-'}</Descriptions.Item>
              <Descriptions.Item label="原值">
                <Text type="success">¥{selectedEquipment.originalValue.toLocaleString()}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="当前价值">
                <Text type="success">¥{selectedEquipment.currentValue.toLocaleString()}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="使用时长">{selectedEquipment.usageHours}小时</Descriptions.Item>
              <Descriptions.Item label="维护周期">{selectedEquipment.maintenanceCycle}天</Descriptions.Item>
              <Descriptions.Item label="上次维护">{selectedEquipment.lastMaintenanceDate || '-'}</Descriptions.Item>
              <Descriptions.Item label="下次维护">{selectedEquipment.nextMaintenanceDate || '-'}</Descriptions.Item>
              <Descriptions.Item label="QR码">{selectedEquipment.qrCode}</Descriptions.Item>
            </Descriptions>
            
            <Divider />
            
            <Title level={5}>设备描述</Title>
            <Text>{selectedEquipment.description || '暂无描述'}</Text>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EquipmentManagement;