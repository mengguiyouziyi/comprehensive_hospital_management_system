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
  DatePicker,
  InputNumber,
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
  Upload,
  Progress,
  Divider,
  Alert,
  Popconfirm,
  Switch,
  Radio
} from 'antd';
import {
  DatabaseOutlined,
  MedicineBoxOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined,
  UploadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  BarChartOutlined,
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
  BellOutlined
} from '@ant-design/icons';
import './InventoryManagement.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  // 模拟数据
  useEffect(() => {
    const mockInventory = [
      {
        id: 1,
        name: '一次性注射器',
        category: '医疗器械',
        specification: '5ml',
        unit: '支',
        currentStock: 1500,
        minStock: 500,
        maxStock: 3000,
        unitPrice: 2.5,
        supplier: '医疗器械公司A',
        location: 'A区-01-货架A',
        status: '正常',
        lastUpdated: '2024-01-15',
        batchNumber: 'BT202401001',
        expiryDate: '2025-12-31',
        description: '一次性无菌注射器'
      },
      {
        id: 2,
        name: '阿莫西林胶囊',
        category: '药品',
        specification: '0.5g*24粒',
        unit: '盒',
        currentStock: 200,
        minStock: 300,
        maxStock: 1000,
        unitPrice: 18.5,
        supplier: '医药公司B',
        location: 'B区-02-货架B',
        status: '库存不足',
        lastUpdated: '2024-01-14',
        batchNumber: 'BT202401002',
        expiryDate: '2024-06-30',
        description: '抗生素类药品'
      },
      {
        id: 3,
        name: '医用口罩',
        category: '防护用品',
        specification: '医用外科',
        unit: '个',
        currentStock: 8000,
        minStock: 2000,
        maxStock: 15000,
        unitPrice: 0.8,
        supplier: '医疗用品公司C',
        location: 'C区-01-货架C',
        status: '正常',
        lastUpdated: '2024-01-13',
        batchNumber: 'BT202401003',
        expiryDate: '2024-12-31',
        description: '医用外科口罩'
      },
      {
        id: 4,
        name: '生理盐水',
        category: '药品',
        specification: '500ml',
        unit: '瓶',
        currentStock: 50,
        minStock: 200,
        maxStock: 800,
        unitPrice: 8.5,
        supplier: '医药公司B',
        location: 'B区-03-货架D',
        status: '库存不足',
        lastUpdated: '2024-01-12',
        batchNumber: 'BT202401004',
        expiryDate: '2024-03-31',
        description: '0.9%氯化钠注射液'
      },
      {
        id: 5,
        name: '医用纱布',
        category: '医疗器械',
        specification: '10cm*10cm',
        unit: '包',
        currentStock: 1200,
        minStock: 500,
        maxStock: 2500,
        unitPrice: 3.2,
        supplier: '医疗器械公司A',
        location: 'A区-02-货架E',
        status: '正常',
        lastUpdated: '2024-01-11',
        batchNumber: 'BT202401005',
        expiryDate: '2026-01-31',
        description: '无菌医用纱布'
      }
    ];

    const mockCategories = [
      { id: 1, name: '药品', itemCount: 156, totalValue: 850000 },
      { id: 2, name: '医疗器械', itemCount: 89, totalValue: 650000 },
      { id: 3, name: '防护用品', itemCount: 45, totalValue: 120000 },
      { id: 4, name: '消毒用品', itemCount: 32, totalValue: 80000 },
      { id: 5, name: '办公用品', itemCount: 78, totalValue: 45000 }
    ];

    const mockSuppliers = [
      { id: 1, name: '医疗器械公司A', contact: '张经理', phone: '13800138001', email: 'zhang@example.com', status: '正常' },
      { id: 2, name: '医药公司B', contact: '李经理', phone: '13800138002', email: 'li@example.com', status: '正常' },
      { id: 3, name: '医疗用品公司C', contact: '王经理', phone: '13800138003', email: 'wang@example.com', status: '正常' }
    ];

    const mockTransactions = [
      {
        id: 1,
        date: '2024-01-15',
        type: '入库',
        itemName: '一次性注射器',
        quantity: 500,
        unitPrice: 2.5,
        totalPrice: 1250,
        operator: '仓库管理员',
        supplier: '医疗器械公司A',
        batchNumber: 'BT202401001'
      },
      {
        id: 2,
        date: '2024-01-14',
        type: '出库',
        itemName: '阿莫西林胶囊',
        quantity: 50,
        unitPrice: 18.5,
        totalPrice: 925,
        operator: '药房管理员',
        department: '内科',
        reason: '临床使用'
      },
      {
        id: 3,
        date: '2024-01-13',
        type: '入库',
        itemName: '医用口罩',
        quantity: 2000,
        unitPrice: 0.8,
        totalPrice: 1600,
        operator: '仓库管理员',
        supplier: '医疗用品公司C',
        batchNumber: 'BT202401003'
      }
    ];

    const mockAlerts = [
      {
        id: 1,
        type: '库存不足',
        itemName: '阿莫西林胶囊',
        currentStock: 200,
        minStock: 300,
        severity: '高',
        created: '2024-01-15',
        status: '未处理'
      },
      {
        id: 2,
        type: '库存不足',
        itemName: '生理盐水',
        currentStock: 50,
        minStock: 200,
        severity: '高',
        created: '2024-01-14',
        status: '未处理'
      },
      {
        id: 3,
        type: '即将过期',
        itemName: '生理盐水',
        expiryDate: '2024-03-31',
        daysLeft: 75,
        severity: '中',
        created: '2024-01-13',
        status: '已处理'
      }
    ];

    setInventory(mockInventory);
    setCategories(mockCategories);
    setSuppliers(mockSuppliers);
    setTransactions(mockTransactions);
    setAlerts(mockAlerts);
  }, []);

  // 统计数据
  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(item => item.currentStock < item.minStock).length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0);
  const expiringItems = inventory.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const daysDiff = (expiryDate - today) / (1000 * 60 * 60 * 24);
    return daysDiff <= 90 && daysDiff > 0;
  }).length;

  const pendingAlerts = alerts.filter(alert => alert.status === '未处理').length;

  // 表格列定义
  const inventoryColumns = [
    {
      title: '物品名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.specification}
          </Text>
        </div>
      )
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      )
    },
    {
      title: '当前库存',
      dataIndex: 'currentStock',
      key: 'currentStock',
      render: (stock, record) => (
        <div>
          <Text>{stock} {record.unit}</Text>
          <br />
          <Progress 
            percent={Math.round((stock / record.maxStock) * 100)}
            size="small"
            status={stock < record.minStock ? 'exception' : 'normal'}
          />
        </div>
      )
    },
    {
      title: '库存状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === '正常' ? 'success' : 'warning'}
          text={status}
        />
      )
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price) => `¥${price.toFixed(2)}`
    },
    {
      title: '总价',
      key: 'totalValue',
      render: (_, record) => `¥${(record.currentStock * record.unitPrice).toFixed(2)}`
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier'
    },
    {
      title: '有效期',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (date) => {
        const expiryDate = new Date(date);
        const today = new Date();
        const daysDiff = (expiryDate - today) / (1000 * 60 * 60 * 24);
        
        if (daysDiff < 0) {
          return <Text type="danger">已过期</Text>;
        } else if (daysDiff <= 30) {
          return <Text type="warning">{date} ({Math.round(daysDiff)}天)</Text>;
        } else if (daysDiff <= 90) {
          return <Text type="orange">{date} ({Math.round(daysDiff)}天)</Text>;
        } else {
          return <Text>{date}</Text>;
        }
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
              onClick={() => handleViewDetail(record, 'inventory')}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record, 'inventory')}
            />
          </Tooltip>
          <Tooltip title="库存调整">
            <Button 
              type="text" 
              icon={<PlusCircleOutlined />}
              onClick={() => handleStockAdjustment(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const categoryColumns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '物品数量',
      dataIndex: 'itemCount',
      key: 'itemCount'
    },
    {
      title: '总价值',
      dataIndex: 'totalValue',
      key: 'totalValue',
      render: (value) => `¥${value.toLocaleString()}`
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
              onClick={() => handleViewDetail(record, 'category')}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record, 'category')}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const transactionColumns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === '入库' ? 'green' : 'red'}>
          {type}
        </Tag>
      )
    },
    {
      title: '物品名称',
      dataIndex: 'itemName',
      key: 'itemName'
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price) => `¥${price.toFixed(2)}`
    },
    {
      title: '总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `¥${price.toFixed(2)}`
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator'
    },
    {
      title: '备注',
      dataIndex: 'supplier',
      key: 'supplier',
      render: (supplier, record) => supplier || record.department || record.reason
    }
  ];

  const alertColumns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === '库存不足' ? 'red' : 'orange'}>
          {type}
        </Tag>
      )
    },
    {
      title: '物品名称',
      dataIndex: 'itemName',
      key: 'itemName'
    },
    {
      title: '详细信息',
      key: 'details',
      render: (_, record) => {
        if (record.type === '库存不足') {
          return (
            <div>
              <Text>当前库存: {record.currentStock}</Text>
              <br />
              <Text>最低库存: {record.minStock}</Text>
            </div>
          );
        } else if (record.type === '即将过期') {
          return (
            <div>
              <Text>有效期: {record.expiryDate}</Text>
              <br />
              <Text>剩余天数: {record.daysLeft}天</Text>
            </div>
          );
        }
        return null;
      }
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity) => (
        <Badge 
          status={severity === '高' ? 'error' : severity === '中' ? 'warning' : 'info'}
          text={severity}
        />
      )
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === '未处理' ? 'warning' : 'success'}
          text={status}
        />
      )
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.status === '未处理' && (
            <Tooltip title="处理">
              <Button 
                type="text" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleProcessAlert(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              onClick={() => handleViewDetail(record, 'alert')}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  // 处理函数
  const handleViewDetail = (record, type) => {
    setSelectedRecord({ ...record, type });
    setModalVisible(true);
    setModalType('view');
  };

  const handleEdit = (record, type) => {
    setSelectedRecord({ ...record, type });
    setModalVisible(true);
    setModalType('edit');
    form.setFieldsValue(record);
  };

  const handleAdd = (type) => {
    setSelectedRecord({ type });
    setModalVisible(true);
    setModalType('add');
    form.resetFields();
  };

  const handleStockAdjustment = (record) => {
    setSelectedRecord({ ...record, type: 'adjustment' });
    setModalVisible(true);
    setModalType('adjustment');
    form.resetFields();
    form.setFieldsValue({
      itemName: record.name,
      currentStock: record.currentStock
    });
  };

  const handleProcessAlert = (record) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === record.id ? { ...alert, status: '已处理' } : alert
    ));
    message.success('预警已处理');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('操作成功');
      setModalVisible(false);
      form.resetFields();
      
      // 这里应该重新加载数据
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  // 导出功能
  const handleExport = (type) => {
    message.info(`导出${type}功能正在开发中`);
  };

  // 渲染详情内容
  const renderDetailContent = () => {
    if (!selectedRecord) return null;

    const { type } = selectedRecord;

    switch (type) {
      case 'inventory':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="物品名称">{selectedRecord.name}</Descriptions.Item>
            <Descriptions.Item label="分类">{selectedRecord.category}</Descriptions.Item>
            <Descriptions.Item label="规格">{selectedRecord.specification}</Descriptions.Item>
            <Descriptions.Item label="单位">{selectedRecord.unit}</Descriptions.Item>
            <Descriptions.Item label="当前库存">{selectedRecord.currentStock} {selectedRecord.unit}</Descriptions.Item>
            <Descriptions.Item label="最低库存">{selectedRecord.minStock} {selectedRecord.unit}</Descriptions.Item>
            <Descriptions.Item label="最高库存">{selectedRecord.maxStock} {selectedRecord.unit}</Descriptions.Item>
            <Descriptions.Item label="单价">¥{selectedRecord.unitPrice.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="总价值">¥{(selectedRecord.currentStock * selectedRecord.unitPrice).toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="供应商">{selectedRecord.supplier}</Descriptions.Item>
            <Descriptions.Item label="存放位置">{selectedRecord.location}</Descriptions.Item>
            <Descriptions.Item label="状态">{selectedRecord.status}</Descriptions.Item>
            <Descriptions.Item label="批次号">{selectedRecord.batchNumber}</Descriptions.Item>
            <Descriptions.Item label="有效期">{selectedRecord.expiryDate}</Descriptions.Item>
            <Descriptions.Item label="最后更新">{selectedRecord.lastUpdated}</Descriptions.Item>
            <Descriptions.Item label="描述" span={2}>{selectedRecord.description}</Descriptions.Item>
          </Descriptions>
        );

      case 'category':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="分类名称">{selectedRecord.name}</Descriptions.Item>
            <Descriptions.Item label="物品数量">{selectedRecord.itemCount}</Descriptions.Item>
            <Descriptions.Item label="总价值">¥{selectedRecord.totalValue.toLocaleString()}</Descriptions.Item>
          </Descriptions>
        );

      case 'alert':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="预警类型">{selectedRecord.type}</Descriptions.Item>
            <Descriptions.Item label="物品名称">{selectedRecord.itemName}</Descriptions.Item>
            <Descriptions.Item label="严重程度">{selectedRecord.severity}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{selectedRecord.created}</Descriptions.Item>
            <Descriptions.Item label="状态">{selectedRecord.status}</Descriptions.Item>
            {selectedRecord.type === '库存不足' && (
              <>
                <Descriptions.Item label="当前库存">{selectedRecord.currentStock}</Descriptions.Item>
                <Descriptions.Item label="最低库存">{selectedRecord.minStock}</Descriptions.Item>
              </>
            )}
            {selectedRecord.type === '即将过期' && (
              <>
                <Descriptions.Item label="有效期">{selectedRecord.expiryDate}</Descriptions.Item>
                <Descriptions.Item label="剩余天数">{selectedRecord.daysLeft}天</Descriptions.Item>
              </>
            )}
          </Descriptions>
        );

      default:
        return null;
    }
  };

  return (
    <div className="inventory-management">
      {/* 页面标题 */}
      <div className="inventory-header">
        <Title level={2} className="page-title">
          <DatabaseOutlined className="page-icon" />
          库存管理
        </Title>
      </div>

      {/* 预警提示 */}
      {pendingAlerts > 0 && (
        <Alert
          message={`您有 ${pendingAlerts} 条未处理的库存预警`}
          type="warning"
          showIcon
          action={
            <Button size="small" type="link" onClick={() => message.info('正在跳转到预警页面')}>
              查看详情
            </Button>
          }
          style={{ marginBottom: 16 }}
        />
      )}

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="inventory-stats">
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="物品总数"
              value={totalItems}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="库存不足"
              value={lowStockItems}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="总价值"
              value={totalValue}
              prefix={<MedicineBoxOutlined />}
              suffix="¥"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="即将过期"
              value={expiringItems}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card className="inventory-content">
        <Tabs defaultActiveKey="inventory" className="inventory-tabs">
          <TabPane 
            tab={
              <span>
                <DatabaseOutlined />
                库存清单
              </span>
            } 
            key="inventory"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd('inventory')}
                  >
                    添加物品
                  </Button>
                  <Button 
                    icon={<UploadOutlined />}
                    onClick={() => handleExport('库存清单')}
                  >
                    导入
                  </Button>
                  <Button 
                    icon={<DownloadOutlined />}
                    onClick={() => handleExport('库存清单')}
                  >
                    导出
                  </Button>
                </Space>
                <Space>
                  <Select placeholder="选择分类" style={{ width: 120 }}>
                    <Select.Option value="all">全部分类</Select.Option>
                    <Select.Option value="药品">药品</Select.Option>
                    <Select.Option value="医疗器械">医疗器械</Select.Option>
                    <Select.Option value="防护用品">防护用品</Select.Option>
                  </Select>
                  <Select placeholder="选择状态" style={{ width: 120 }}>
                    <Select.Option value="all">全部状态</Select.Option>
                    <Select.Option value="normal">正常</Select.Option>
                    <Select.Option value="low">库存不足</Select.Option>
                    <Select.Option value="expiring">即将过期</Select.Option>
                  </Select>
                  <Input.Search
                    placeholder="搜索物品..."
                    style={{ width: 200 }}
                    prefix={<SearchOutlined />}
                  />
                </Space>
              </div>
              <Table
                columns={inventoryColumns}
                dataSource={inventory}
                rowKey="id"
                pagination={{
                  total: inventory.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                }}
              />
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <ShoppingCartOutlined />
                分类管理
              </span>
            } 
            key="category"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd('category')}
                  >
                    添加分类
                  </Button>
                  <Button 
                    icon={<DownloadOutlined />}
                    onClick={() => handleExport('分类')}
                  >
                    导出
                  </Button>
                </Space>
              </div>
              <Table
                columns={categoryColumns}
                dataSource={categories}
                rowKey="id"
                pagination={{
                  total: categories.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                }}
              />
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <FileTextOutlined />
                出入库记录
              </span>
            } 
            key="transaction"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd('transaction')}
                  >
                    添加记录
                  </Button>
                  <Button 
                    icon={<DownloadOutlined />}
                    onClick={() => handleExport('出入库记录')}
                  >
                    导出
                  </Button>
                </Space>
                <Space>
                  <Select placeholder="选择类型" style={{ width: 120 }}>
                    <Select.Option value="all">全部类型</Select.Option>
                    <Select.Option value="in">入库</Select.Option>
                    <Select.Option value="out">出库</Select.Option>
                  </Select>
                  <DatePicker placeholder="选择日期" style={{ width: 120 }} />
                </Space>
              </div>
              <Table
                columns={transactionColumns}
                dataSource={transactions}
                rowKey="id"
                pagination={{
                  total: transactions.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                }}
              />
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <BellOutlined />
                库存预警
              </span>
            } 
            key="alert"
          >
            <div className="tab-content">
              <Alert
                message={`未处理预警: ${pendingAlerts} 条`}
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />
              <div className="table-header">
                <Space>
                  <Button 
                    icon={<DownloadOutlined />}
                    onClick={() => handleExport('预警')}
                  >
                    导出
                  </Button>
                </Space>
                <Space>
                  <Select placeholder="选择类型" style={{ width: 120 }}>
                    <Select.Option value="all">全部类型</Select.Option>
                    <Select.Option value="low">库存不足</Select.Option>
                    <Select.Option value="expiring">即将过期</Select.Option>
                  </Select>
                  <Select placeholder="选择状态" style={{ width: 120 }}>
                    <Select.Option value="all">全部状态</Select.Option>
                    <Select.Option value="pending">未处理</Select.Option>
                    <Select.Option value="processed">已处理</Select.Option>
                  </Select>
                </Space>
              </div>
              <Table
                columns={alertColumns}
                dataSource={alerts}
                rowKey="id"
                pagination={{
                  total: alerts.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                }}
              />
            </div>
          </TabPane>
        </Tabs>
      </Card>

      {/* 详情/编辑模态框 */}
      <Modal
        title={modalType === 'view' ? '查看详情' : 
               modalType === 'edit' ? '编辑' : 
               modalType === 'adjustment' ? '库存调整' : '添加'}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        footer={modalType === 'view' ? [
          <Button key="close" onClick={handleModalCancel}>
            关闭
          </Button>
        ] : [
          <Button key="cancel" onClick={handleModalCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleModalOk}>
            {modalType === 'edit' ? '保存' : modalType === 'adjustment' ? '调整' : '添加'}
          </Button>
        ]}
      >
        {modalType === 'view' ? (
          <div className="record-detail">
            {renderDetailContent()}
          </div>
        ) : (
          <Form form={form} layout="vertical">
            {modalType === 'adjustment' ? (
              <>
                <Form.Item
                  name="itemName"
                  label="物品名称"
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name="currentStock"
                  label="当前库存"
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name="adjustmentType"
                  label="调整类型"
                  rules={[{ required: true, message: '请选择调整类型' }]}
                >
                  <Radio.Group>
                    <Radio value="increase">增加</Radio>
                    <Radio value="decrease">减少</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="adjustmentQuantity"
                  label="调整数量"
                  rules={[{ required: true, message: '请输入调整数量' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    placeholder="请输入调整数量"
                  />
                </Form.Item>
                <Form.Item
                  name="adjustmentReason"
                  label="调整原因"
                  rules={[{ required: true, message: '请输入调整原因' }]}
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="请输入调整原因"
                  />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  name="name"
                  label="物品名称"
                  rules={[{ required: true, message: '请输入物品名称' }]}
                >
                  <Input placeholder="请输入物品名称" />
                </Form.Item>
                <Form.Item
                  name="category"
                  label="分类"
                  rules={[{ required: true, message: '请选择分类' }]}
                >
                  <Select placeholder="请选择分类">
                    <Select.Option value="药品">药品</Select.Option>
                    <Select.Option value="医疗器械">医疗器械</Select.Option>
                    <Select.Option value="防护用品">防护用品</Select.Option>
                    <Select.Option value="消毒用品">消毒用品</Select.Option>
                    <Select.Option value="办公用品">办公用品</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="specification"
                  label="规格"
                >
                  <Input placeholder="请输入规格" />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="unit"
                      label="单位"
                      rules={[{ required: true, message: '请输入单位' }]}
                    >
                      <Input placeholder="请输入单位" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="unitPrice"
                      label="单价"
                      rules={[{ required: true, message: '请输入单价' }]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        prefix="¥"
                        placeholder="请输入单价"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      name="minStock"
                      label="最低库存"
                      rules={[{ required: true, message: '请输入最低库存' }]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="最低库存"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="maxStock"
                      label="最高库存"
                      rules={[{ required: true, message: '请输入最高库存' }]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="最高库存"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="currentStock"
                      label="当前库存"
                      rules={[{ required: true, message: '请输入当前库存' }]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="当前库存"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="supplier"
                  label="供应商"
                >
                  <Select placeholder="请选择供应商">
                    {suppliers.map(supplier => (
                      <Select.Option key={supplier.id} value={supplier.name}>
                        {supplier.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="location"
                  label="存放位置"
                >
                  <Input placeholder="请输入存放位置" />
                </Form.Item>
                <Form.Item
                  name="expiryDate"
                  label="有效期"
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="描述"
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="请输入描述"
                  />
                </Form.Item>
              </>
            )}
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default InventoryManagement;