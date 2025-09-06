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
  Cascader
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  BellOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  MailOutlined,
  MobileOutlined,
  IdcardOutlined,
  BankOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
  RiseOutlined,
  FallOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import './UserManagement.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  // 模拟数据
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        username: 'admin',
        realName: '系统管理员',
        email: 'admin@hospital.com',
        phone: '13800138000',
        department: '信息科',
        role: '系统管理员',
        status: 'active',
        lastLogin: '2024-01-16 09:30',
        createTime: '2024-01-01 08:00',
        updateTime: '2024-01-16 09:30',
        avatar: '',
        gender: '男',
        age: 35,
        idCard: '110101198001011234',
        address: '北京市朝阳区',
        education: '本科',
        title: '高级工程师',
        experience: '10年',
        skills: ['系统管理', '网络配置', '数据库管理'],
        description: '负责医院信息系统的整体管理和维护'
      },
      {
        id: 2,
        username: 'doctor01',
        realName: '张医生',
        email: 'zhang@hospital.com',
        phone: '13800138001',
        department: '内科',
        role: '医生',
        status: 'active',
        lastLogin: '2024-01-16 08:15',
        createTime: '2024-01-02 09:00',
        updateTime: '2024-01-16 08:15',
        avatar: '',
        gender: '男',
        age: 45,
        idCard: '110101197901012345',
        address: '北京市海淀区',
        education: '硕士',
        title: '主任医师',
        experience: '15年',
        skills: ['心血管疾病', '内科诊断', '临床治疗'],
        description: '心血管疾病专家，主任医师'
      },
      {
        id: 3,
        username: 'nurse01',
        realName: '李护士',
        email: 'li@hospital.com',
        phone: '13800138002',
        department: '护理部',
        role: '护士',
        status: 'active',
        lastLogin: '2024-01-16 07:45',
        createTime: '2024-01-03 10:00',
        updateTime: '2024-01-16 07:45',
        avatar: '',
        gender: '女',
        age: 28,
        idCard: '110101199601014567',
        address: '北京市西城区',
        education: '本科',
        title: '护师',
        experience: '5年',
        skills: ['临床护理', '急救护理', '病房管理'],
        description: '负责内科病房的护理工作'
      },
      {
        id: 4,
        username: 'pharmacy01',
        realName: '王药师',
        email: 'wang@hospital.com',
        phone: '13800138003',
        department: '药剂科',
        role: '药剂师',
        status: 'inactive',
        lastLogin: '2024-01-15 16:20',
        createTime: '2024-01-04 11:00',
        updateTime: '2024-01-15 16:20',
        avatar: '',
        gender: '女',
        age: 32,
        idCard: '110101199201018901',
        address: '北京市东城区',
        education: '本科',
        title: '主管药师',
        experience: '8年',
        skills: ['药品管理', '处方审核', '药物咨询'],
        description: '负责药品管理和处方审核工作'
      },
      {
        id: 5,
        username: 'lab01',
        realName: '赵技师',
        email: 'zhao@hospital.com',
        phone: '13800138004',
        department: '检验科',
        role: '检验技师',
        status: 'active',
        lastLogin: '2024-01-16 10:00',
        createTime: '2024-01-05 12:00',
        updateTime: '2024-01-16 10:00',
        avatar: '',
        gender: '男',
        age: 30,
        idCard: '110101199401019234',
        address: '北京市丰台区',
        education: '本科',
        title: '技师',
        experience: '6年',
        skills: ['临床检验', '生化检验', '血液检验'],
        description: '负责临床检验工作'
      }
    ];

    const mockRoles = [
      { id: 1, name: '系统管理员', description: '系统最高权限', users: 1, permissions: 45 },
      { id: 2, name: '医生', description: '医疗专业人员', users: 15, permissions: 25 },
      { id: 3, name: '护士', description: '护理专业人员', users: 30, permissions: 20 },
      { id: 4, name: '药剂师', description: '药剂专业人员', users: 8, permissions: 18 },
      { id: 5, name: '检验技师', description: '检验专业人员', users: 6, permissions: 15 },
      { id: 6, name: '管理员', description: '部门管理员', users: 5, permissions: 30 }
    ];

    const mockDepartments = [
      { id: 1, name: '内科', users: 20, description: '内科部门' },
      { id: 2, name: '外科', users: 15, description: '外科部门' },
      { id: 3, name: '儿科', users: 12, description: '儿科部门' },
      { id: 4, name: '妇科', users: 10, description: '妇科部门' },
      { id: 5, name: '急诊科', users: 8, description: '急诊部门' },
      { id: 6, name: '护理部', users: 35, description: '护理部门' },
      { id: 7, name: '药剂科', users: 10, description: '药剂部门' },
      { id: 8, name: '检验科', users: 8, description: '检验部门' },
      { id: 9, name: '信息科', users: 5, description: '信息部门' }
    ];

    const mockActivities = [
      {
        id: 1,
        username: 'admin',
        action: '登录系统',
        ip: '192.168.1.100',
        location: '北京市朝阳区',
        time: '2024-01-16 09:30:15',
        result: '成功'
      },
      {
        id: 2,
        username: 'doctor01',
        action: '查看患者信息',
        ip: '192.168.1.101',
        location: '北京市海淀区',
        time: '2024-01-16 09:15:22',
        result: '成功'
      },
      {
        id: 3,
        username: 'nurse01',
        action: '更新护理记录',
        ip: '192.168.1.102',
        location: '北京市西城区',
        time: '2024-01-16 08:45:33',
        result: '成功'
      },
      {
        id: 4,
        username: 'pharmacy01',
        action: '登录失败',
        ip: '192.168.1.103',
        location: '北京市东城区',
        time: '2024-01-16 08:20:44',
        result: '失败'
      },
      {
        id: 5,
        username: 'lab01',
        action: '上传检验报告',
        ip: '192.168.1.104',
        location: '北京市丰台区',
        time: '2024-01-16 10:05:55',
        result: '成功'
      }
    ];

    setUsers(mockUsers);
    setRoles(mockRoles);
    setDepartments(mockDepartments);
    setActivities(mockActivities);
  }, []);

  // 统计数据
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const inactiveUsers = users.filter(u => u.status === 'inactive').length;
  const todayLogins = users.filter(u => u.lastLogin && u.lastLogin.startsWith('2024-01-16')).length;

  // 表格列定义
  const userColumns = [
    {
      title: '用户信息',
      key: 'userInfo',
      render: (_, record) => (
        <div>
          <Space>
            <Avatar size="small" icon={<UserOutlined />} />
            <div>
              <Text strong>{record.realName}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {record.username}
              </Text>
            </div>
          </Space>
        </div>
      )
    },
    {
      title: '联系方式',
      key: 'contact',
      render: (_, record) => (
        <div>
          <div style={{ fontSize: '12px' }}>
            <MailOutlined style={{ marginRight: 4 }} />
            {record.email}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <MobileOutlined style={{ marginRight: 4 }} />
            {record.phone}
          </div>
        </div>
      )
    },
    {
      title: '部门角色',
      key: 'departmentRole',
      render: (_, record) => (
        <div>
          <Text strong>{record.department}</Text>
          <br />
          <Tag color="blue">{record.role}</Tag>
        </div>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'active' ? 'success' : 'error'} 
          text={status === 'active' ? '在线' : '离线'}
        />
      )
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (time) => (
        <div>
          <Text>{time}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {time && time.includes('16') ? '今天' : '更早'}
          </Text>
        </div>
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
              onClick={() => handleViewDetail(record, 'user')}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record, 'user')}
            />
          </Tooltip>
          {record.status === 'active' ? (
            <Tooltip title="禁用">
              <Button 
                type="text" 
                icon={<CloseCircleOutlined />}
                onClick={() => handleDeactivateUser(record)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="启用">
              <Button 
                type="text" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleActivateUser(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="删除">
            <Popconfirm
              title="确定要删除这个用户吗？"
              onConfirm={() => handleDeleteUser(record)}
              okText="确定"
              cancelText="取消"
            >
              <Button 
                type="text" 
                icon={<DeleteOutlined />}
                danger
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  const roleColumns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <Space>
          <UserSwitchOutlined />
          <Text strong>{name}</Text>
        </Space>
      )
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '用户数量',
      dataIndex: 'users',
      key: 'users',
      render: (users) => (
        <Badge 
          count={users}
          showZero
          style={{ backgroundColor: '#52c41a' }}
        />
      )
    },
    {
      title: '权限数量',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions) => (
        <Progress 
          percent={Math.round((permissions / 50) * 100)}
          size="small"
          format={() => `${permissions}个`}
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
              onClick={() => handleViewDetail(record, 'role')}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record, 'role')}
            />
          </Tooltip>
          <Tooltip title="权限配置">
            <Button 
              type="text" 
              icon={<SafetyCertificateOutlined />}
              onClick={() => handleConfigurePermissions(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const activityColumns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 180
    },
    {
      title: '用户',
      dataIndex: 'username',
      key: 'username',
      render: (username) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text>{username}</Text>
        </Space>
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action'
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip'
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      render: (result) => (
        <Tag color={result === '成功' ? 'green' : 'red'}>
          {result}
        </Tag>
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

  const handleActivateUser = (record) => {
    setUsers(prev => prev.map(user => 
      user.id === record.id ? { ...user, status: 'active' } : user
    ));
    message.success('用户已启用');
  };

  const handleDeactivateUser = (record) => {
    setUsers(prev => prev.map(user => 
      user.id === record.id ? { ...user, status: 'inactive' } : user
    ));
    message.success('用户已禁用');
  };

  const handleDeleteUser = (record) => {
    setUsers(prev => prev.filter(user => user.id !== record.id));
    message.success('用户已删除');
  };

  const handleConfigurePermissions = (record) => {
    message.info('权限配置功能正在开发中');
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

  // 渲染详情内容
  const renderDetailContent = () => {
    if (!selectedRecord) return null;

    const { type } = selectedRecord;

    switch (type) {
      case 'user':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="用户名">{selectedRecord.username}</Descriptions.Item>
            <Descriptions.Item label="真实姓名">{selectedRecord.realName}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{selectedRecord.email}</Descriptions.Item>
            <Descriptions.Item label="电话">{selectedRecord.phone}</Descriptions.Item>
            <Descriptions.Item label="部门">{selectedRecord.department}</Descriptions.Item>
            <Descriptions.Item label="角色">{selectedRecord.role}</Descriptions.Item>
            <Descriptions.Item label="性别">{selectedRecord.gender}</Descriptions.Item>
            <Descriptions.Item label="年龄">{selectedRecord.age}</Descriptions.Item>
            <Descriptions.Item label="身份证">{selectedRecord.idCard}</Descriptions.Item>
            <Descriptions.Item label="地址">{selectedRecord.address}</Descriptions.Item>
            <Descriptions.Item label="学历">{selectedRecord.education}</Descriptions.Item>
            <Descriptions.Item label="职称">{selectedRecord.title}</Descriptions.Item>
            <Descriptions.Item label="工作经验">{selectedRecord.experience}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Badge 
                status={selectedRecord.status === 'active' ? 'success' : 'error'} 
                text={selectedRecord.status === 'active' ? '在线' : '离线'}
              />
            </Descriptions.Item>
            <Descriptions.Item label="最后登录">{selectedRecord.lastLogin}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{selectedRecord.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{selectedRecord.updateTime}</Descriptions.Item>
            <Descriptions.Item label="技能标签" span={2}>
              <Space>
                {selectedRecord.skills.map((skill, index) => (
                  <Tag key={index} color="blue">{skill}</Tag>
                ))}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="个人描述" span={2}>
              {selectedRecord.description}
            </Descriptions.Item>
          </Descriptions>
        );

      case 'role':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="角色名称">{selectedRecord.name}</Descriptions.Item>
            <Descriptions.Item label="描述">{selectedRecord.description}</Descriptions.Item>
            <Descriptions.Item label="用户数量">{selectedRecord.users}</Descriptions.Item>
            <Descriptions.Item label="权限数量">{selectedRecord.permissions}</Descriptions.Item>
          </Descriptions>
        );

      default:
        return null;
    }
  };

  return (
    <div className="user-management">
      {/* 页面标题 */}
      <div className="user-header">
        <Title level={2} className="page-title">
          <UserOutlined className="page-icon" />
          用户管理
        </Title>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="user-stats">
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="总用户数"
              value={totalUsers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="在线用户"
              value={activeUsers}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="离线用户"
              value={inactiveUsers}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="今日登录"
              value={todayLogins}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card className="user-content">
        <Tabs defaultActiveKey="users" className="user-tabs">
          <TabPane 
            tab={
              <span>
                <UserOutlined />
                用户列表
              </span>
            } 
            key="users"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd('user')}
                  >
                    新增用户
                  </Button>
                  <Button 
                    icon={<FileTextOutlined />}
                    onClick={() => message.info('导出功能正在开发中')}
                  >
                    导出
                  </Button>
                </Space>
                <Space>
                  <Select placeholder="选择状态" style={{ width: 120 }}>
                    <Select.Option value="all">全部状态</Select.Option>
                    <Select.Option value="active">在线</Select.Option>
                    <Select.Option value="inactive">离线</Select.Option>
                  </Select>
                  <Select placeholder="选择部门" style={{ width: 120 }}>
                    <Select.Option value="all">全部部门</Select.Option>
                    {departments.map(dept => (
                      <Select.Option key={dept.id} value={dept.name}>
                        {dept.name}
                      </Select.Option>
                    ))}
                  </Select>
                  <Input.Search
                    placeholder="搜索用户..."
                    style={{ width: 200 }}
                    prefix={<SearchOutlined />}
                  />
                </Space>
              </div>
              <Table
                columns={userColumns}
                dataSource={users}
                rowKey="id"
                pagination={{
                  total: users.length,
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
                <UserSwitchOutlined />
                角色管理
              </span>
            } 
            key="roles"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd('role')}
                  >
                    新增角色
                  </Button>
                  <Button 
                    icon={<FileTextOutlined />}
                    onClick={() => message.info('导出功能正在开发中')}
                  >
                    导出
                  </Button>
                </Space>
                <Space>
                  <Input.Search
                    placeholder="搜索角色..."
                    style={{ width: 200 }}
                    prefix={<SearchOutlined />}
                  />
                </Space>
              </div>
              <Table
                columns={roleColumns}
                dataSource={roles}
                rowKey="id"
                pagination={{
                  total: roles.length,
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
                活动日志
              </span>
            } 
            key="activities"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Button 
                    icon={<FileTextOutlined />}
                    onClick={() => message.info('导出功能正在开发中')}
                  >
                    导出
                  </Button>
                </Space>
                <Space>
                  <DatePicker placeholder="选择日期" style={{ width: 120 }} />
                  <Select placeholder="选择结果" style={{ width: 120 }}>
                    <Select.Option value="all">全部结果</Select.Option>
                    <Select.Option value="success">成功</Select.Option>
                    <Select.Option value="failed">失败</Select.Option>
                  </Select>
                  <Input.Search
                    placeholder="搜索活动..."
                    style={{ width: 200 }}
                    prefix={<SearchOutlined />}
                  />
                </Space>
              </div>
              <Table
                columns={activityColumns}
                dataSource={activities}
                rowKey="id"
                pagination={{
                  total: activities.length,
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
               modalType === 'edit' ? '编辑用户' : '新增用户'}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={1000}
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
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="username"
                  label="用户名"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input placeholder="请输入用户名" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="realName"
                  label="真实姓名"
                  rules={[{ required: true, message: '请输入真实姓名' }]}
                >
                  <Input placeholder="请输入真实姓名" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="邮箱"
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' }
                  ]}
                >
                  <Input placeholder="请输入邮箱" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="电话"
                  rules={[
                    { required: true, message: '请输入电话' },
                    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
                  ]}
                >
                  <Input placeholder="请输入电话" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="department"
                  label="部门"
                  rules={[{ required: true, message: '请选择部门' }]}
                >
                  <Select placeholder="请选择部门">
                    {departments.map(dept => (
                      <Select.Option key={dept.id} value={dept.name}>
                        {dept.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="角色"
                  rules={[{ required: true, message: '请选择角色' }]}
                >
                  <Select placeholder="请选择角色">
                    {roles.map(role => (
                      <Select.Option key={role.id} value={role.name}>
                        {role.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="gender"
                  label="性别"
                  rules={[{ required: true, message: '请选择性别' }]}
                >
                  <Select placeholder="请选择性别">
                    <Select.Option value="男">男</Select.Option>
                    <Select.Option value="女">女</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="age"
                  label="年龄"
                  rules={[{ required: true, message: '请输入年龄' }]}
                >
                  <InputNumber 
                    placeholder="请输入年龄"
                    min={18}
                    max={100}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="education"
                  label="学历"
                  rules={[{ required: true, message: '请选择学历' }]}
                >
                  <Select placeholder="请选择学历">
                    <Select.Option value="大专">大专</Select.Option>
                    <Select.Option value="本科">本科</Select.Option>
                    <Select.Option value="硕士">硕士</Select.Option>
                    <Select.Option value="博士">博士</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="职称"
                  rules={[{ required: true, message: '请输入职称' }]}
                >
                  <Input placeholder="请输入职称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="experience"
                  label="工作经验"
                  rules={[{ required: true, message: '请输入工作经验' }]}
                >
                  <Input placeholder="请输入工作经验" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="idCard"
                  label="身份证号"
                  rules={[
                    { required: true, message: '请输入身份证号' },
                    { pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入有效的身份证号' }
                  ]}
                >
                  <Input placeholder="请输入身份证号" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label="状态"
                  rules={[{ required: true, message: '请选择状态' }]}
                >
                  <Select placeholder="请选择状态">
                    <Select.Option value="active">在线</Select.Option>
                    <Select.Option value="inactive">离线</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label="地址"
              rules={[{ required: true, message: '请输入地址' }]}
            >
              <Input placeholder="请输入地址" />
            </Form.Item>

            <Form.Item
              name="skills"
              label="技能标签"
            >
              <Select
                mode="tags"
                placeholder="请输入技能标签"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="个人描述"
            >
              <TextArea
                rows={3}
                placeholder="请输入个人描述"
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;