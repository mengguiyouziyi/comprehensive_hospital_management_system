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
  Alert
} from 'antd';
import {
  MoneyCollectOutlined,
  DollarOutlined,
  BankOutlined,
  CreditCardOutlined,
  PieChartOutlined,
  RiseOutlined,
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined,
  UploadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons';
import './FinanceManagement.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const FinanceManagement = () => {
  const [financialRecords, setFinancialRecords] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  // 模拟数据
  useEffect(() => {
    const mockFinancialRecords = [
      {
        id: 1,
        date: '2024-01-15',
        type: '收入',
        category: '医疗服务收入',
        amount: 150000,
        description: '门诊医疗服务收入',
        status: '已完成',
        paymentMethod: '银行转账',
        department: '内科',
        operator: '张三'
      },
      {
        id: 2,
        date: '2024-01-14',
        type: '支出',
        category: '药品采购',
        amount: -85000,
        description: '第一季度药品采购',
        status: '已审核',
        paymentMethod: '支票',
        department: '药剂科',
        operator: '李四'
      },
      {
        id: 3,
        date: '2024-01-13',
        type: '收入',
        category: '体检收入',
        amount: 45000,
        description: '团体体检服务',
        status: '已完成',
        paymentMethod: '现金',
        department: '体检中心',
        operator: '王五'
      }
    ];

    const mockBudgets = [
      {
        id: 1,
        year: 2024,
        quarter: 'Q1',
        department: '内科',
        totalBudget: 2000000,
        usedBudget: 1200000,
        remainingBudget: 800000,
        status: '进行中',
        approver: '财务主管',
        approvalDate: '2024-01-01'
      },
      {
        id: 2,
        year: 2024,
        quarter: 'Q1',
        department: '外科',
        totalBudget: 1800000,
        usedBudget: 900000,
        remainingBudget: 900000,
        status: '进行中',
        approver: '财务主管',
        approvalDate: '2024-01-01'
      }
    ];

    const mockInvoices = [
      {
        id: 1,
        invoiceNumber: 'INV-2024-001',
        clientName: '张三',
        clientType: '个人',
        amount: 2500,
        issueDate: '2024-01-15',
        dueDate: '2024-01-22',
        status: '已支付',
        items: ['门诊诊疗费', '药品费'],
        paymentMethod: '微信支付'
      },
      {
        id: 2,
        invoiceNumber: 'INV-2024-002',
        clientName: '某某公司',
        clientType: '企业',
        amount: 15000,
        issueDate: '2024-01-14',
        dueDate: '2024-01-21',
        status: '待支付',
        items: ['团体体检费'],
        paymentMethod: '银行转账'
      }
    ];

    const mockExpenses = [
      {
        id: 1,
        date: '2024-01-15',
        category: '办公用品',
        amount: 3500,
        description: '打印机耗材采购',
        status: '已批准',
        requester: '行政部',
        approver: '财务主管',
        paymentMethod: '现金'
      },
      {
        id: 2,
        date: '2024-01-14',
        category: '设备维护',
        amount: 12000,
        description: 'CT设备年度维护',
        status: '待审核',
        requester: '设备科',
        approver: null,
        paymentMethod: '银行转账'
      }
    ];

    setFinancialRecords(mockFinancialRecords);
    setBudgets(mockBudgets);
    setInvoices(mockInvoices);
    setExpenses(mockExpenses);
  }, []);

  // 统计数据
  const totalIncome = financialRecords
    .filter(record => record.type === '收入')
    .reduce((sum, record) => sum + record.amount, 0);

  const totalExpense = Math.abs(
    financialRecords
      .filter(record => record.type === '支出')
      .reduce((sum, record) => sum + record.amount, 0)
  );

  const netIncome = totalIncome - totalExpense;
  const budgetUtilization = budgets.length > 0 
    ? budgets.reduce((sum, budget) => sum + (budget.usedBudget / budget.totalBudget), 0) / budgets.length * 100
    : 0;

  const pendingInvoices = invoices.filter(invoice => invoice.status === '待支付').length;
  const pendingExpenses = expenses.filter(expense => expense.status === '待审核').length;

  // 表格列定义
  const financialColumns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === '收入' ? 'green' : 'red'}>
          {type}
        </Tag>
      )
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <Text style={{ 
          color: amount > 0 ? '#52c41a' : '#ff4d4f',
          fontWeight: 'bold'
        }}>
          ¥{Math.abs(amount).toLocaleString()}
        </Text>
      )
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === '已完成' ? 'success' : status === '待审核' ? 'warning' : 'processing'}
          text={status}
        />
      )
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
              onClick={() => handleViewDetail(record, 'financial')}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record, 'financial')}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const budgetColumns = [
    {
      title: '年度',
      dataIndex: 'year',
      key: 'year'
    },
    {
      title: '季度',
      dataIndex: 'quarter',
      key: 'quarter'
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: '总预算',
      dataIndex: 'totalBudget',
      key: 'totalBudget',
      render: (amount) => `¥${amount.toLocaleString()}`
    },
    {
      title: '已使用',
      dataIndex: 'usedBudget',
      key: 'usedBudget',
      render: (amount) => `¥${amount.toLocaleString()}`
    },
    {
      title: '剩余预算',
      dataIndex: 'remainingBudget',
      key: 'remainingBudget',
      render: (amount) => (
        <Text style={{ color: amount > 0 ? '#52c41a' : '#ff4d4f' }}>
          ¥{amount.toLocaleString()}
        </Text>
      )
    },
    {
      title: '使用率',
      key: 'usageRate',
      render: (_, record) => (
        <Progress 
          percent={Math.round((record.usedBudget / record.totalBudget) * 100)}
          size="small"
          status={(record.usedBudget / record.totalBudget) > 0.9 ? 'exception' : 'active'}
        />
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge status={status === '进行中' ? 'processing' : 'success'} text={status} />
      )
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
              onClick={() => handleViewDetail(record, 'budget')}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record, 'budget')}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const invoiceColumns = [
    {
      title: '发票号',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber'
    },
    {
      title: '客户名称',
      dataIndex: 'clientName',
      key: 'clientName'
    },
    {
      title: '客户类型',
      dataIndex: 'clientType',
      key: 'clientType',
      render: (type) => (
        <Tag color={type === '企业' ? 'blue' : 'green'}>
          {type}
        </Tag>
      )
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `¥${amount.toLocaleString()}`
    },
    {
      title: '开具日期',
      dataIndex: 'issueDate',
      key: 'issueDate'
    },
    {
      title: '到期日期',
      dataIndex: 'dueDate',
      key: 'dueDate'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === '已支付' ? 'success' : 'warning'}
          text={status}
        />
      )
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
              onClick={() => handleViewDetail(record, 'invoice')}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record, 'invoice')}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const expenseColumns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `¥${amount.toLocaleString()}`
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '申请人',
      dataIndex: 'requester',
      key: 'requester'
    },
    {
      title: '审批人',
      dataIndex: 'approver',
      key: 'approver',
      render: (approver) => approver || <Text type="secondary">待审批</Text>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === '已批准' ? 'success' : status === '待审核' ? 'warning' : 'error'}
          text={status}
        />
      )
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
              onClick={() => handleViewDetail(record, 'expense')}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record, 'expense')}
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
      case 'financial':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="日期">{selectedRecord.date}</Descriptions.Item>
            <Descriptions.Item label="类型">{selectedRecord.type}</Descriptions.Item>
            <Descriptions.Item label="分类">{selectedRecord.category}</Descriptions.Item>
            <Descriptions.Item label="金额">¥{Math.abs(selectedRecord.amount).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="描述">{selectedRecord.description}</Descriptions.Item>
            <Descriptions.Item label="状态">{selectedRecord.status}</Descriptions.Item>
            <Descriptions.Item label="支付方式">{selectedRecord.paymentMethod}</Descriptions.Item>
            <Descriptions.Item label="部门">{selectedRecord.department}</Descriptions.Item>
            <Descriptions.Item label="操作人">{selectedRecord.operator}</Descriptions.Item>
          </Descriptions>
        );

      case 'budget':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="年度">{selectedRecord.year}</Descriptions.Item>
            <Descriptions.Item label="季度">{selectedRecord.quarter}</Descriptions.Item>
            <Descriptions.Item label="部门">{selectedRecord.department}</Descriptions.Item>
            <Descriptions.Item label="总预算">¥{selectedRecord.totalBudget.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="已使用">¥{selectedRecord.usedBudget.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="剩余预算">¥{selectedRecord.remainingBudget.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="使用率">
              <Progress 
                percent={Math.round((selectedRecord.usedBudget / selectedRecord.totalBudget) * 100)}
                status={(selectedRecord.usedBudget / selectedRecord.totalBudget) > 0.9 ? 'exception' : 'active'}
              />
            </Descriptions.Item>
            <Descriptions.Item label="状态">{selectedRecord.status}</Descriptions.Item>
            <Descriptions.Item label="审批人">{selectedRecord.approver}</Descriptions.Item>
            <Descriptions.Item label="审批日期">{selectedRecord.approvalDate}</Descriptions.Item>
          </Descriptions>
        );

      case 'invoice':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="发票号">{selectedRecord.invoiceNumber}</Descriptions.Item>
            <Descriptions.Item label="客户名称">{selectedRecord.clientName}</Descriptions.Item>
            <Descriptions.Item label="客户类型">{selectedRecord.clientType}</Descriptions.Item>
            <Descriptions.Item label="金额">¥{selectedRecord.amount.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="开具日期">{selectedRecord.issueDate}</Descriptions.Item>
            <Descriptions.Item label="到期日期">{selectedRecord.dueDate}</Descriptions.Item>
            <Descriptions.Item label="状态">{selectedRecord.status}</Descriptions.Item>
            <Descriptions.Item label="支付方式">{selectedRecord.paymentMethod}</Descriptions.Item>
            <Descriptions.Item label="服务项目" span={2}>
              {selectedRecord.items.join(', ')}
            </Descriptions.Item>
          </Descriptions>
        );

      case 'expense':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="日期">{selectedRecord.date}</Descriptions.Item>
            <Descriptions.Item label="分类">{selectedRecord.category}</Descriptions.Item>
            <Descriptions.Item label="金额">¥{selectedRecord.amount.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="描述">{selectedRecord.description}</Descriptions.Item>
            <Descriptions.Item label="申请人">{selectedRecord.requester}</Descriptions.Item>
            <Descriptions.Item label="审批人">{selectedRecord.approver || '待审批'}</Descriptions.Item>
            <Descriptions.Item label="状态">{selectedRecord.status}</Descriptions.Item>
            <Descriptions.Item label="支付方式">{selectedRecord.paymentMethod}</Descriptions.Item>
          </Descriptions>
        );

      default:
        return null;
    }
  };

  return (
    <div className="finance-management">
      {/* 页面标题 */}
      <div className="finance-header">
        <Title level={2} className="page-title">
          <MoneyCollectOutlined className="page-icon" />
          财务管理
        </Title>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="finance-stats">
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="总收入"
              value={totalIncome}
              prefix={<DollarOutlined />}
              suffix="¥"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="总支出"
              value={totalExpense}
              prefix={<DollarOutlined />}
              suffix="¥"
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="净收入"
              value={netIncome}
              prefix={<RiseOutlined />}
              suffix="¥"
              valueStyle={{ color: netIncome > 0 ? '#52c41a' : '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="预算使用率"
              value={budgetUtilization}
              prefix={<PieChartOutlined />}
              suffix="%"
              valueStyle={{ color: budgetUtilization > 90 ? '#ff4d4f' : '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card className="finance-content">
        <Tabs defaultActiveKey="financial" className="finance-tabs">
          <TabPane 
            tab={
              <span>
                <MoneyCollectOutlined />
                财务记录
              </span>
            } 
            key="financial"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd('financial')}
                  >
                    添加记录
                  </Button>
                  <Button 
                    icon={<DownloadOutlined />}
                    onClick={() => handleExport('财务记录')}
                  >
                    导出
                  </Button>
                </Space>
                <Input.Search
                  placeholder="搜索财务记录..."
                  style={{ width: 300 }}
                  prefix={<SearchOutlined />}
                />
              </div>
              <Table
                columns={financialColumns}
                dataSource={financialRecords}
                rowKey="id"
                pagination={{
                  total: financialRecords.length,
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
                <PieChartOutlined />
                预算管理
              </span>
            } 
            key="budget"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd('budget')}
                  >
                    添加预算
                  </Button>
                  <Button 
                    icon={<DownloadOutlined />}
                    onClick={() => handleExport('预算')}
                  >
                    导出
                  </Button>
                </Space>
                <Space>
                  <Select placeholder="选择年度" style={{ width: 120 }}>
                    <Select.Option value="2024">2024</Select.Option>
                    <Select.Option value="2023">2023</Select.Option>
                  </Select>
                  <Select placeholder="选择季度" style={{ width: 120 }}>
                    <Select.Option value="Q1">Q1</Select.Option>
                    <Select.Option value="Q2">Q2</Select.Option>
                    <Select.Option value="Q3">Q3</Select.Option>
                    <Select.Option value="Q4">Q4</Select.Option>
                  </Select>
                </Space>
              </div>
              <Table
                columns={budgetColumns}
                dataSource={budgets}
                rowKey="id"
                pagination={{
                  total: budgets.length,
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
                发票管理
              </span>
            } 
            key="invoice"
          >
            <div className="tab-content">
              <Alert
                message={`待支付发票: ${pendingInvoices} 张`}
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />
              <div className="table-header">
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd('invoice')}
                  >
                    开具发票
                  </Button>
                  <Button 
                    icon={<DownloadOutlined />}
                    onClick={() => handleExport('发票')}
                  >
                    导出
                  </Button>
                </Space>
                <Input.Search
                  placeholder="搜索发票..."
                  style={{ width: 300 }}
                  prefix={<SearchOutlined />}
                />
              </div>
              <Table
                columns={invoiceColumns}
                dataSource={invoices}
                rowKey="id"
                pagination={{
                  total: invoices.length,
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
                <CreditCardOutlined />
                费用管理
              </span>
            } 
            key="expense"
          >
            <div className="tab-content">
              <Alert
                message={`待审核费用: ${pendingExpenses} 项`}
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
              <div className="table-header">
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd('expense')}
                  >
                    申请费用
                  </Button>
                  <Button 
                    icon={<DownloadOutlined />}
                    onClick={() => handleExport('费用')}
                  >
                    导出
                  </Button>
                </Space>
                <Space>
                  <Select placeholder="选择状态" style={{ width: 120 }}>
                    <Select.Option value="pending">待审核</Select.Option>
                    <Select.Option value="approved">已批准</Select.Option>
                    <Select.Option value="rejected">已拒绝</Select.Option>
                  </Select>
                  <DatePicker placeholder="选择日期" style={{ width: 120 }} />
                </Space>
              </div>
              <Table
                columns={expenseColumns}
                dataSource={expenses}
                rowKey="id"
                pagination={{
                  total: expenses.length,
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
        title={modalType === 'view' ? '查看详情' : modalType === 'edit' ? '编辑' : '添加'}
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
            {modalType === 'edit' ? '保存' : '添加'}
          </Button>
        ]}
      >
        {modalType === 'view' ? (
          <div className="record-detail">
            {renderDetailContent()}
          </div>
        ) : (
          <Form form={form} layout="vertical">
            {/* 这里根据不同的类型显示不同的表单字段 */}
            <Form.Item
              name="amount"
              label="金额"
              rules={[{ required: true, message: '请输入金额' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                prefix="¥"
                placeholder="请输入金额"
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="描述"
              rules={[{ required: true, message: '请输入描述' }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="请输入描述"
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default FinanceManagement;