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
  Cascader,
  Tree,
  Checkbox,
  Transfer
} from 'antd';
import {
  UserSwitchOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
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
  SettingOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  UserOutlined,
  ToolOutlined,
  RiseOutlined,
  FallOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  UnlockOutlined,
  ApiOutlined,
  BranchesOutlined
} from '@ant-design/icons';
import './RoleManagement.css';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { TreeNode } = Tree;

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  // 模拟数据
  useEffect(() => {
    const mockRoles = [
      {
        id: 1,
        name: '系统管理员',
        description: '系统最高权限，拥有所有功能的访问权限',
        code: 'SYSTEM_ADMIN',
        level: 1,
        status: 'active',
        userCount: 1,
        permissionCount: 45,
        createTime: '2024-01-01 08:00',
        updateTime: '2024-01-16 09:30',
        createdBy: 'admin',
        permissions: ['all'],
        features: ['用户管理', '角色管理', '权限管理', '系统设置', '数据管理', '报表统计'],
        restrictions: []
      },
      {
        id: 2,
        name: '医生',
        description: '医疗专业人员，负责患者诊疗和医疗记录管理',
        code: 'DOCTOR',
        level: 3,
        status: 'active',
        userCount: 15,
        permissionCount: 25,
        createTime: '2024-01-02 09:00',
        updateTime: '2024-01-16 08:15',
        createdBy: 'admin',
        permissions: ['patient_view', 'patient_edit', 'appointment_view', 'appointment_edit', 'prescription_view', 'prescription_edit', 'medical_record_view', 'medical_record_edit'],
        features: ['患者管理', '预约管理', '处方管理', '病历管理'],
        restrictions: ['无权访问系统管理功能', '无权查看其他医生的患者信息']
      },
      {
        id: 3,
        name: '护士',
        description: '护理专业人员，负责患者护理和护理记录管理',
        code: 'NURSE',
        level: 4,
        status: 'active',
        userCount: 30,
        permissionCount: 20,
        createTime: '2024-01-03 10:00',
        updateTime: '2024-01-16 07:45',
        createdBy: 'admin',
        permissions: ['patient_view', 'appointment_view', 'nursing_record_view', 'nursing_record_edit', 'medication_view'],
        features: ['患者查看', '预约查看', '护理记录管理', '药品查看'],
        restrictions: ['无权编辑患者基本信息', '无权开具处方']
      },
      {
        id: 4,
        name: '药剂师',
        description: '药剂专业人员，负责药品管理和处方审核',
        code: 'PHARMACIST',
        level: 3,
        status: 'active',
        userCount: 8,
        permissionCount: 18,
        createTime: '2024-01-04 11:00',
        updateTime: '2024-01-15 16:20',
        createdBy: 'admin',
        permissions: ['prescription_view', 'prescription_audit', 'inventory_view', 'inventory_edit', 'medication_view', 'medication_edit'],
        features: ['处方管理', '药品管理', '库存管理'],
        restrictions: ['无权访问患者详细信息', '无权查看医疗记录']
      },
      {
        id: 5,
        name: '检验技师',
        description: '检验专业人员，负责医学检验和检验报告管理',
        code: 'LAB_TECHNICIAN',
        level: 4,
        status: 'active',
        userCount: 6,
        permissionCount: 15,
        createTime: '2024-01-05 12:00',
        updateTime: '2024-01-16 10:00',
        createdBy: 'admin',
        permissions: ['lab_test_view', 'lab_test_edit', 'lab_report_view', 'lab_report_edit', 'patient_view'],
        features: ['检验管理', '报告管理'],
        restrictions: ['无权访问处方信息', '无权编辑患者基本信息']
      },
      {
        id: 6,
        name: '部门管理员',
        description: '部门管理员，负责本部门的人员和业务管理',
        code: 'DEPT_ADMIN',
        level: 2,
        status: 'active',
        userCount: 5,
        permissionCount: 30,
        createTime: '2024-01-06 13:00',
        updateTime: '2024-01-16 11:00',
        createdBy: 'admin',
        permissions: ['user_view', 'user_edit', 'department_view', 'department_edit', 'report_view', 'statistics_view'],
        features: ['用户管理', '部门管理', '报表查看'],
        restrictions: ['仅能管理本部门用户', '无权访问系统设置']
      }
    ];

    const mockUsers = [
      { id: 1, name: '系统管理员', role: '系统管理员', department: '信息科', status: 'active' },
      { id: 2, name: '张医生', role: '医生', department: '内科', status: 'active' },
      { id: 3, name: '李护士', role: '护士', department: '护理部', status: 'active' },
      { id: 4, name: '王药师', role: '药剂师', department: '药剂科', status: 'inactive' },
      { id: 5, name: '赵技师', role: '检验技师', department: '检验科', status: 'active' }
    ];

    const mockPermissions = [
      {
        id: 1,
        name: '用户管理',
        code: 'USER_MANAGEMENT',
        description: '用户相关操作权限',
        type: 'module',
        children: [
          { id: 11, name: '查看用户', code: 'USER_VIEW', description: '查看用户列表和详情' },
          { id: 12, name: '新增用户', code: 'USER_ADD', description: '创建新用户' },
          { id: 13, name: '编辑用户', code: 'USER_EDIT', description: '修改用户信息' },
          { id: 14, name: '删除用户', code: 'USER_DELETE', description: '删除用户' }
        ]
      },
      {
        id: 2,
        name: '角色管理',
        code: 'ROLE_MANAGEMENT',
        description: '角色相关操作权限',
        type: 'module',
        children: [
          { id: 21, name: '查看角色', code: 'ROLE_VIEW', description: '查看角色列表和详情' },
          { id: 22, name: '新增角色', code: 'ROLE_ADD', description: '创建新角色' },
          { id: 23, name: '编辑角色', code: 'ROLE_EDIT', description: '修改角色信息' },
          { id: 24, name: '删除角色', code: 'ROLE_DELETE', description: '删除角色' },
          { id: 25, name: '权限配置', code: 'PERMISSION_CONFIG', description: '配置角色权限' }
        ]
      },
      {
        id: 3,
        name: '患者管理',
        code: 'PATIENT_MANAGEMENT',
        description: '患者相关操作权限',
        type: 'module',
        children: [
          { id: 31, name: '查看患者', code: 'PATIENT_VIEW', description: '查看患者列表和详情' },
          { id: 32, name: '新增患者', code: 'PATIENT_ADD', description: '创建新患者' },
          { id: 33, name: '编辑患者', code: 'PATIENT_EDIT', description: '修改患者信息' },
          { id: 34, name: '删除患者', code: 'PATIENT_DELETE', description: '删除患者' }
        ]
      },
      {
        id: 4,
        name: '预约管理',
        code: 'APPOINTMENT_MANAGEMENT',
        description: '预约相关操作权限',
        type: 'module',
        children: [
          { id: 41, name: '查看预约', code: 'APPOINTMENT_VIEW', description: '查看预约列表和详情' },
          { id: 42, name: '新增预约', code: 'APPOINTMENT_ADD', description: '创建新预约' },
          { id: 43, name: '编辑预约', code: 'APPOINTMENT_EDIT', description: '修改预约信息' },
          { id: 44, name: '取消预约', code: 'APPOINTMENT_CANCEL', description: '取消预约' }
        ]
      },
      {
        id: 5,
        name: '系统管理',
        code: 'SYSTEM_MANAGEMENT',
        description: '系统相关操作权限',
        type: 'module',
        children: [
          { id: 51, name: '系统设置', code: 'SYSTEM_SETTINGS', description: '修改系统设置' },
          { id: 52, name: '数据备份', code: 'DATA_BACKUP', description: '备份数据' },
          { id: 53, name: '数据恢复', code: 'DATA_RESTORE', description: '恢复数据' },
          { id: 54, name: '日志查看', code: 'LOG_VIEW', description: '查看系统日志' }
        ]
      }
    ];

    const mockRolePermissions = {
      1: ['all'],
      2: ['PATIENT_VIEW', 'PATIENT_EDIT', 'APPOINTMENT_VIEW', 'APPOINTMENT_EDIT', 'MEDICAL_RECORD_VIEW', 'MEDICAL_RECORD_EDIT'],
      3: ['PATIENT_VIEW', 'APPOINTMENT_VIEW', 'NURSING_RECORD_VIEW', 'NURSING_RECORD_EDIT', 'MEDICATION_VIEW'],
      4: ['PRESCRIPTION_VIEW', 'PRESCRIPTION_AUDIT', 'INVENTORY_VIEW', 'INVENTORY_EDIT', 'MEDICATION_VIEW', 'MEDICATION_EDIT'],
      5: ['LAB_TEST_VIEW', 'LAB_TEST_EDIT', 'LAB_REPORT_VIEW', 'LAB_REPORT_EDIT', 'PATIENT_VIEW'],
      6: ['USER_VIEW', 'USER_EDIT', 'DEPARTMENT_VIEW', 'DEPARTMENT_EDIT', 'REPORT_VIEW', 'STATISTICS_VIEW']
    };

    setRoles(mockRoles);
    setUsers(mockUsers);
    setPermissions(mockPermissions);
    setRolePermissions(mockRolePermissions);
  }, []);

  // 统计数据
  const totalRoles = roles.length;
  const activeRoles = roles.filter(r => r.status === 'active').length;
  const totalPermissions = permissions.reduce((acc, module) => acc + module.children.length, 0);
  const avgPermissionsPerRole = Math.round(roles.reduce((acc, role) => acc + role.permissionCount, 0) / roles.length);

  // 表格列定义
  const roleColumns = [
    {
      title: '角色信息',
      key: 'roleInfo',
      render: (_, record) => (
        <div>
          <Space>
            <UserSwitchOutlined style={{ color: '#1890ff' }} />
            <div>
              <Text strong>{record.name}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {record.code}
              </Text>
            </div>
          </Space>
        </div>
      )
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
      render: (level) => (
        <Tag color={level === 1 ? 'red' : level === 2 ? 'orange' : level === 3 ? 'blue' : 'green'}>
          等级{level}
        </Tag>
      )
    },
    {
      title: '用户数量',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (count) => (
        <Badge 
          count={count}
          showZero
          style={{ backgroundColor: '#52c41a' }}
        />
      )
    },
    {
      title: '权限数量',
      dataIndex: 'permissionCount',
      key: 'permissionCount',
      render: (count) => (
        <Progress 
          percent={Math.round((count / totalPermissions) * 100)}
          size="small"
          format={() => `${count}个`}
        />
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'active' ? 'success' : 'error'} 
          text={status === 'active' ? '启用' : '禁用'}
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
          {record.status === 'active' ? (
            <Tooltip title="禁用">
              <Button 
                type="text" 
                icon={<CloseCircleOutlined />}
                onClick={() => handleDeactivateRole(record)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="启用">
              <Button 
                type="text" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleActivateRole(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="删除">
            <Popconfirm
              title="确定要删除这个角色吗？"
              onConfirm={() => handleDeleteRole(record)}
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

  const permissionColumns = [
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Space>
          {record.type === 'module' ? <DatabaseOutlined /> : <ApiOutlined />}
          <Text strong={record.type === 'module'}>{name}</Text>
        </Space>
      )
    },
    {
      title: '权限代码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'module' ? 'blue' : 'green'}>
          {type === 'module' ? '模块' : '操作'}
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

  const handleConfigurePermissions = (record) => {
    setSelectedRecord({ ...record, type: 'permissions' });
    setModalVisible(true);
    setModalType('permissions');
  };

  const handleActivateRole = (record) => {
    setRoles(prev => prev.map(role => 
      role.id === record.id ? { ...role, status: 'active' } : role
    ));
    message.success('角色已启用');
  };

  const handleDeactivateRole = (record) => {
    setRoles(prev => prev.map(role => 
      role.id === record.id ? { ...role, status: 'inactive' } : role
    ));
    message.success('角色已禁用');
  };

  const handleDeleteRole = (record) => {
    setRoles(prev => prev.filter(role => role.id !== record.id));
    message.success('角色已删除');
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

  // 渲染权限树
  const renderPermissionTree = (permissions) => {
    return permissions.map(permission => (
      <TreeNode
        key={permission.id}
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>
              {permission.type === 'module' ? <DatabaseOutlined style={{ marginRight: 8 }} /> : <ApiOutlined style={{ marginRight: 8 }} />}
              {permission.name}
            </span>
            <Tag size="small" color={permission.type === 'module' ? 'blue' : 'green'}>
              {permission.type === 'module' ? '模块' : '操作'}
            </Tag>
          </div>
        }
        dataRef={permission}
      >
        {permission.children && renderPermissionTree(permission.children)}
      </TreeNode>
    ));
  };

  // 渲染详情内容
  const renderDetailContent = () => {
    if (!selectedRecord) return null;

    const { type } = selectedRecord;

    switch (type) {
      case 'role':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="角色名称">{selectedRecord.name}</Descriptions.Item>
            <Descriptions.Item label="角色代码">{selectedRecord.code}</Descriptions.Item>
            <Descriptions.Item label="描述">{selectedRecord.description}</Descriptions.Item>
            <Descriptions.Item label="等级">
              <Tag color={selectedRecord.level === 1 ? 'red' : selectedRecord.level === 2 ? 'orange' : selectedRecord.level === 3 ? 'blue' : 'green'}>
                等级{selectedRecord.level}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="用户数量">{selectedRecord.userCount}</Descriptions.Item>
            <Descriptions.Item label="权限数量">{selectedRecord.permissionCount}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Badge 
                status={selectedRecord.status === 'active' ? 'success' : 'error'} 
                text={selectedRecord.status === 'active' ? '启用' : '禁用'}
              />
            </Descriptions.Item>
            <Descriptions.Item label="创建者">{selectedRecord.createdBy}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{selectedRecord.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{selectedRecord.updateTime}</Descriptions.Item>
            <Descriptions.Item label="功能权限" span={2}>
              <Space>
                {selectedRecord.features.map((feature, index) => (
                  <Tag key={index} color="blue">{feature}</Tag>
                ))}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="权限限制" span={2}>
              <Space>
                {selectedRecord.restrictions.map((restriction, index) => (
                  <Tag key={index} color="orange">{restriction}</Tag>
                ))}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        );

      case 'permissions':
        return (
          <div>
            <Alert
              message="权限配置"
              description="选择该角色拥有的权限。勾选父节点将自动选择所有子节点权限。"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Tree
              checkable
              defaultExpandAll
              height={400}
              treeData={permissions.map(permission => ({
                title: (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>
                      {permission.type === 'module' ? <DatabaseOutlined style={{ marginRight: 8 }} /> : <ApiOutlined style={{ marginRight: 8 }} />}
                      {permission.name}
                    </span>
                    <Tag size="small" color={permission.type === 'module' ? 'blue' : 'green'}>
                      {permission.type === 'module' ? '模块' : '操作'}
                    </Tag>
                  </div>
                ),
                key: permission.id,
                children: permission.children?.map(child => ({
                  title: (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>
                        <ApiOutlined style={{ marginRight: 8 }} />
                        {child.name}
                      </span>
                      <Tag size="small" color="green">操作</Tag>
                    </div>
                  ),
                  key: child.id
                }))
              }))}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="role-management">
      {/* 页面标题 */}
      <div className="role-header">
        <Title level={2} className="page-title">
          <SafetyCertificateOutlined className="page-icon" />
          权限管理
        </Title>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="role-stats">
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="总角色数"
              value={totalRoles}
              prefix={<UserSwitchOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="启用角色"
              value={activeRoles}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="总权限数"
              value={totalPermissions}
              prefix={<SafetyCertificateOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card">
            <Statistic
              title="平均权限数"
              value={avgPermissionsPerRole}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card className="role-content">
        <Tabs defaultActiveKey="roles" className="role-tabs">
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
                  <Select placeholder="选择状态" style={{ width: 120 }}>
                    <Select.Option value="all">全部状态</Select.Option>
                    <Select.Option value="active">启用</Select.Option>
                    <Select.Option value="inactive">禁用</Select.Option>
                  </Select>
                  <Select placeholder="选择等级" style={{ width: 120 }}>
                    <Select.Option value="all">全部等级</Select.Option>
                    <Select.Option value="1">等级1</Select.Option>
                    <Select.Option value="2">等级2</Select.Option>
                    <Select.Option value="3">等级3</Select.Option>
                    <Select.Option value="4">等级4</Select.Option>
                  </Select>
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
                <SafetyCertificateOutlined />
                权限管理
              </span>
            } 
            key="permissions"
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
                  <Select placeholder="选择类型" style={{ width: 120 }}>
                    <Select.Option value="all">全部类型</Select.Option>
                    <Select.Option value="module">模块</Select.Option>
                    <Select.Option value="operation">操作</Select.Option>
                  </Select>
                  <Input.Search
                    placeholder="搜索权限..."
                    style={{ width: 200 }}
                    prefix={<SearchOutlined />}
                  />
                </Space>
              </div>
              <Table
                columns={permissionColumns}
                dataSource={permissions.flatMap(module => [
                  module,
                  ...module.children.map(child => ({ ...child, parentName: module.name }))
                ])}
                rowKey="id"
                pagination={{
                  total: permissions.length,
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
               modalType === 'edit' ? '编辑角色' : 
               modalType === 'permissions' ? '权限配置' : '新增角色'}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={modalType === 'permissions' ? 800 : 1000}
        footer={modalType === 'view' || modalType === 'permissions' ? [
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
        {modalType === 'view' || modalType === 'permissions' ? (
          <div className="record-detail">
            {renderDetailContent()}
          </div>
        ) : (
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="角色名称"
                  rules={[{ required: true, message: '请输入角色名称' }]}
                >
                  <Input placeholder="请输入角色名称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="code"
                  label="角色代码"
                  rules={[
                    { required: true, message: '请输入角色代码' },
                    { pattern: /^[A-Z_]+$/, message: '角色代码只能包含大写字母和下划线' }
                  ]}
                >
                  <Input placeholder="请输入角色代码" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="level"
                  label="角色等级"
                  rules={[{ required: true, message: '请选择角色等级' }]}
                >
                  <Select placeholder="请选择角色等级">
                    <Select.Option value="1">等级1（最高）</Select.Option>
                    <Select.Option value="2">等级2（高）</Select.Option>
                    <Select.Option value="3">等级3（中）</Select.Option>
                    <Select.Option value="4">等级4（低）</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label="状态"
                  rules={[{ required: true, message: '请选择状态' }]}
                >
                  <Select placeholder="请选择状态">
                    <Select.Option value="active">启用</Select.Option>
                    <Select.Option value="inactive">禁用</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="角色描述"
              rules={[{ required: true, message: '请输入角色描述' }]}
            >
              <TextArea
                rows={3}
                placeholder="请输入角色描述"
              />
            </Form.Item>

            <Form.Item
              name="features"
              label="功能权限"
            >
              <Select
                mode="tags"
                placeholder="请输入功能权限"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="restrictions"
              label="权限限制"
            >
              <Select
                mode="tags"
                placeholder="请输入权限限制"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default RoleManagement;