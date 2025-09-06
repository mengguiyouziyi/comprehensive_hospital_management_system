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
  Transfer,
  Slider,
  Rate,
  TimePicker,
  Upload,
  notification
} from 'antd';
import {
  SettingOutlined,
  DatabaseOutlined,
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
  UserOutlined,
  ToolOutlined,
  RiseOutlined,
  FallOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  UnlockOutlined,
  ApiOutlined,
  BranchesOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  ReloadOutlined,
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
  SecurityScanOutlined,
  MonitorOutlined,
  GlobalOutlined,
  MailOutlined,
  MessageOutlined,
  WechatOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined
} from '@ant-design/icons';
import './SystemSettings.css';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { TreeNode } = Tree;

const SystemSettings = () => {
  const [settings, setSettings] = useState({});
  const [users, setUsers] = useState([]);
  const [systemInfo, setSystemInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  // 模拟数据
  useEffect(() => {
    const mockSettings = {
      basic: {
        systemName: '医院管理系统',
        systemVersion: 'v2.0.0',
        companyName: '某某医院',
        contactPhone: '010-12345678',
        contactEmail: 'admin@hospital.com',
        systemAddress: '北京市朝阳区某某街道123号',
        systemLogo: '',
        copyright: '© 2024 某某医院 版权所有'
      },
      security: {
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
          expireDays: 90,
          maxLoginAttempts: 5,
          lockoutDuration: 30
        },
        sessionSettings: {
          timeout: 30,
          concurrentSessions: 3,
          rememberMeDuration: 7
        },
        twoFactorAuth: {
          enabled: false,
          requiredForAdmin: true,
          requiredForDoctor: false,
          methods: ['sms', 'email', 'app']
        }
      },
      database: {
        host: 'localhost',
        port: 3306,
        database: 'hospital_system',
        username: 'root',
        password: '********',
        charset: 'utf8mb4',
        maxConnections: 100,
        timeout: 30,
        backupEnabled: true,
        backupSchedule: '0 2 * * *',
        backupRetention: 30
      },
      notification: {
        email: {
          enabled: true,
          smtpServer: 'smtp.hospital.com',
          smtpPort: 587,
          username: 'noreply@hospital.com',
          password: '********',
          useSSL: true,
          fromName: '医院管理系统'
        },
        sms: {
          enabled: true,
          provider: 'aliyun',
          accessKey: '********',
          secretKey: '********',
          signature: '【某某医院】',
          templateCode: 'SMS_123456789'
        },
        wechat: {
          enabled: false,
          appId: '********',
          appSecret: '********',
          templateId: '123456'
        }
      },
      interface: {
        theme: 'light',
        language: 'zh-CN',
        timezone: 'Asia/Shanghai',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm:ss',
        pageSize: 20,
        enableAnimation: true,
        compactMode: false
      },
      integration: {
        hisSystem: {
          enabled: true,
          apiUrl: 'http://his.hospital.com/api',
          apiKey: '********',
          timeout: 30
        },
        lisSystem: {
          enabled: true,
          apiUrl: 'http://lis.hospital.com/api',
          apiKey: '********',
          timeout: 30
        },
        pacsSystem: {
          enabled: false,
          apiUrl: 'http://pacs.hospital.com/api',
          apiKey: '********',
          timeout: 30
        }
      }
    };

    const mockSystemInfo = {
      version: 'v2.0.0',
      buildDate: '2024-01-15',
      databaseVersion: 'MySQL 8.0.28',
      serverEnvironment: 'Production',
      lastUpdate: '2024-01-16 10:30:00',
      uptime: '15天 8小时 30分钟',
      memoryUsage: '2.1GB / 8GB',
      diskUsage: '45GB / 500GB',
      cpuUsage: '25%',
      activeUsers: 156,
      totalRequests: 456789,
      responseTime: '125ms'
    };

    setSettings(mockSettings);
    setSystemInfo(mockSystemInfo);
  }, []);

  // 统计数据
  const totalSettings = Object.keys(settings).length;
  const enabledFeatures = Object.values(settings).filter(category => 
    Object.values(category).some(setting => 
      typeof setting === 'object' && setting.enabled !== undefined ? setting.enabled : true
    )
  ).length;

  // 表格列定义
  const logColumns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 180
    },
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
      render: (user) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text>{user}</Text>
        </Space>
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action'
    },
    {
      title: '设置类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color="blue">{type}</Tag>
      )
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip'
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
  const handleEdit = (type) => {
    setModalType(type);
    setModalVisible(true);
    form.setFieldsValue(settings[type] || {});
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSettings(prev => ({
        ...prev,
        [modalType]: values
      }));
      
      message.success('设置保存成功');
      setModalVisible(false);
      form.resetFields();
      
      // 显示成功通知
      notification.success({
        message: '设置已更新',
        description: `${getSettingTypeName(modalType)}设置已成功保存`,
        placement: 'topRight'
      });
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleReset = (type) => {
    Modal.confirm({
      title: '确认重置',
      content: `确定要重置${getSettingTypeName(type)}设置吗？此操作不可撤销。`,
      onOk: () => {
        message.success('设置已重置');
        // 这里应该重新加载默认设置
      }
    });
  };

  const handleBackup = async () => {
    setLoading(true);
    try {
      // 模拟备份过程
      await new Promise(resolve => setTimeout(resolve, 3000));
      message.success('数据备份成功');
      notification.success({
        message: '备份完成',
        description: '系统数据已成功备份到云端',
        placement: 'topRight'
      });
    } catch (error) {
      message.error('备份失败');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    Modal.confirm({
      title: '确认恢复',
      content: '确定要恢复系统数据吗？此操作将覆盖当前所有数据。',
      onOk: async () => {
        setLoading(true);
        try {
          // 模拟恢复过程
          await new Promise(resolve => setTimeout(resolve, 3000));
          message.success('数据恢复成功');
          notification.success({
            message: '恢复完成',
            description: '系统数据已成功恢复',
            placement: 'topRight'
          });
        } catch (error) {
          message.error('恢复失败');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleRestart = () => {
    Modal.confirm({
      title: '确认重启',
      content: '确定要重启系统吗？所有用户将被强制下线。',
      onOk: () => {
        message.success('系统重启中...');
        // 这里应该执行重启操作
      }
    });
  };

  const getSettingTypeName = (type) => {
    const typeNames = {
      basic: '基本设置',
      security: '安全设置',
      database: '数据库设置',
      notification: '通知设置',
      interface: '界面设置',
      integration: '集成设置'
    };
    return typeNames[type] || type;
  };

  // 渲染设置表单
  const renderSettingsForm = () => {
    switch (modalType) {
      case 'basic':
        return (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="systemName"
                  label="系统名称"
                  rules={[{ required: true, message: '请输入系统名称' }]}
                >
                  <Input placeholder="请输入系统名称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="systemVersion"
                  label="系统版本"
                  rules={[{ required: true, message: '请输入系统版本' }]}
                >
                  <Input placeholder="请输入系统版本" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="companyName"
                  label="公司名称"
                  rules={[{ required: true, message: '请输入公司名称' }]}
                >
                  <Input placeholder="请输入公司名称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="contactPhone"
                  label="联系电话"
                  rules={[{ required: true, message: '请输入联系电话' }]}
                >
                  <Input placeholder="请输入联系电话" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="contactEmail"
                  label="联系邮箱"
                  rules={[
                    { required: true, message: '请输入联系邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' }
                  ]}
                >
                  <Input placeholder="请输入联系邮箱" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="systemAddress"
                  label="系统地址"
                >
                  <Input placeholder="请输入系统地址" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="copyright"
              label="版权信息"
            >
              <TextArea rows={2} placeholder="请输入版权信息" />
            </Form.Item>
          </>
        );

      case 'security':
        return (
          <>
            <Alert
              message="安全设置"
              description="配置系统的安全策略，包括密码策略、会话设置和双因素认证。"
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name={['passwordPolicy', 'minLength']}
                  label="最小密码长度"
                  rules={[{ required: true, message: '请输入最小密码长度' }]}
                >
                  <InputNumber min={6} max={32} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['passwordPolicy', 'expireDays']}
                  label="密码过期天数"
                  rules={[{ required: true, message: '请输入密码过期天数' }]}
                >
                  <InputNumber min={0} max={365} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['passwordPolicy', 'maxLoginAttempts']}
                  label="最大登录尝试次数"
                  rules={[{ required: true, message: '请输入最大登录尝试次数' }]}
                >
                  <InputNumber min={1} max={10} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name={['sessionSettings', 'timeout']}
                  label="会话超时时间（分钟）"
                  rules={[{ required: true, message: '请输入会话超时时间' }]}
                >
                  <InputNumber min={5} max={240} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['sessionSettings', 'concurrentSessions']}
                  label="最大并发会话数"
                  rules={[{ required: true, message: '请输入最大并发会话数' }]}
                >
                  <InputNumber min={1} max={10} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['sessionSettings', 'rememberMeDuration']}
                  label="记住我持续时间（天）"
                  rules={[{ required: true, message: '请输入记住我持续时间' }]}
                >
                  <InputNumber min={1} max={30} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['twoFactorAuth', 'enabled']}
                  label="启用双因素认证"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['twoFactorAuth', 'requiredForAdmin']}
                  label="管理员强制双因素认证"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          </>
        );

      case 'database':
        return (
          <>
            <Alert
              message="数据库设置"
              description="配置数据库连接参数，修改后需要重启系统才能生效。"
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="host"
                  label="数据库主机"
                  rules={[{ required: true, message: '请输入数据库主机' }]}
                >
                  <Input placeholder="请输入数据库主机" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="port"
                  label="数据库端口"
                  rules={[{ required: true, message: '请输入数据库端口' }]}
                >
                  <InputNumber min={1} max={65535} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="database"
                  label="数据库名称"
                  rules={[{ required: true, message: '请输入数据库名称' }]}
                >
                  <Input placeholder="请输入数据库名称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="username"
                  label="数据库用户名"
                  rules={[{ required: true, message: '请输入数据库用户名' }]}
                >
                  <Input placeholder="请输入数据库用户名" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="数据库密码"
                  rules={[{ required: true, message: '请输入数据库密码' }]}
                >
                  <Input.Password placeholder="请输入数据库密码" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="charset"
                  label="字符集"
                  rules={[{ required: true, message: '请选择字符集' }]}
                >
                  <Select placeholder="请选择字符集">
                    <Option value="utf8mb4">utf8mb4</Option>
                    <Option value="utf8">utf8</Option>
                    <Option value="gbk">gbk</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="maxConnections"
                  label="最大连接数"
                  rules={[{ required: true, message: '请输入最大连接数' }]}
                >
                  <InputNumber min={1} max={1000} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="timeout"
                  label="连接超时时间（秒）"
                  rules={[{ required: true, message: '请输入连接超时时间' }]}
                >
                  <InputNumber min={1} max={300} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="backupRetention"
                  label="备份保留天数"
                  rules={[{ required: true, message: '请输入备份保留天数' }]}
                >
                  <InputNumber min={1} max={365} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </>
        );

      case 'notification':
        return (
          <>
            <Alert
              message="通知设置"
              description="配置系统通知方式，包括邮件、短信和微信通知。"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['email', 'enabled']}
                  label="启用邮件通知"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['sms', 'enabled']}
                  label="启用短信通知"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['wechat', 'enabled']}
                  label="启用微信通知"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['email', 'smtpServer']}
                  label="SMTP服务器"
                >
                  <Input placeholder="请输入SMTP服务器" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['email', 'smtpPort']}
                  label="SMTP端口"
                >
                  <InputNumber min={1} max={65535} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </>
        );

      case 'interface':
        return (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="theme"
                  label="主题"
                  rules={[{ required: true, message: '请选择主题' }]}
                >
                  <Select placeholder="请选择主题">
                    <Option value="light">浅色主题</Option>
                    <Option value="dark">深色主题</Option>
                    <Option value="auto">自动主题</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="language"
                  label="语言"
                  rules={[{ required: true, message: '请选择语言' }]}
                >
                  <Select placeholder="请选择语言">
                    <Option value="zh-CN">简体中文</Option>
                    <Option value="zh-TW">繁体中文</Option>
                    <Option value="en-US">English</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="timezone"
                  label="时区"
                  rules={[{ required: true, message: '请选择时区' }]}
                >
                  <Select placeholder="请选择时区">
                    <Option value="Asia/Shanghai">北京时间</Option>
                    <Option value="UTC">UTC时间</Option>
                    <Option value="America/New_York">纽约时间</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="pageSize"
                  label="每页显示条数"
                  rules={[{ required: true, message: '请输入每页显示条数' }]}
                >
                  <InputNumber min={10} max={100} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="dateFormat"
                  label="日期格式"
                  rules={[{ required: true, message: '请选择日期格式' }]}
                >
                  <Select placeholder="请选择日期格式">
                    <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                    <Option value="YYYY/MM/DD">YYYY/MM/DD</Option>
                    <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="timeFormat"
                  label="时间格式"
                  rules={[{ required: true, message: '请选择时间格式' }]}
                >
                  <Select placeholder="请选择时间格式">
                    <Option value="HH:mm:ss">HH:mm:ss</Option>
                    <Option value="HH:mm">HH:mm</Option>
                    <Option value="hh:mm:ss A">hh:mm:ss A</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="enableAnimation"
                  label="启用动画效果"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="compactMode"
                  label="紧凑模式"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          </>
        );

      case 'integration':
        return (
          <>
            <Alert
              message="集成设置"
              description="配置第三方系统集成参数，包括HIS、LIS、PACS等系统。"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['hisSystem', 'enabled']}
                  label="启用HIS系统集成"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['lisSystem', 'enabled']}
                  label="启用LIS系统集成"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['pacsSystem', 'enabled']}
                  label="启用PACS系统集成"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="system-settings">
      {/* 页面标题 */}
      <div className="settings-header">
        <Title level={2} className="page-title">
          <SettingOutlined className="page-icon" />
          系统设置
        </Title>
        <Space>
          <Button 
            icon={<CloudUploadOutlined />}
            onClick={handleBackup}
            loading={loading}
          >
            数据备份
          </Button>
          <Button 
            icon={<CloudDownloadOutlined />}
            onClick={handleRestore}
            loading={loading}
          >
            数据恢复
          </Button>
          <Button 
            icon={<ReloadOutlined />}
            onClick={handleRestart}
            danger
          >
            重启系统
          </Button>
        </Space>
      </div>

      {/* 系统信息卡片 */}
      <Row gutter={[16, 16]} className="system-info">
        <Col xs={24} sm={12} md={8}>
          <Card className="info-card">
            <Statistic
              title="系统版本"
              value={systemInfo.version}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="info-card">
            <Statistic
              title="运行时间"
              value={systemInfo.uptime?.split(' ')[0] || 0}
              suffix="天"
              prefix={<MonitorOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="info-card">
            <Statistic
              title="在线用户"
              value={systemInfo.activeUsers || 0}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card className="settings-content">
        <Tabs defaultActiveKey="basic" className="settings-tabs">
          <TabPane 
            tab={
              <span>
                <InfoCircleOutlined />
                基本设置
              </span>
            } 
            key="basic"
          >
            <div className="setting-section">
              <div className="setting-header">
                <div>
                  <Title level={4}>基本设置</Title>
                  <Text type="secondary">配置系统的基本信息，包括系统名称、版本、联系方式等</Text>
                </div>
                <Space>
                  <Button 
                    icon={<EditOutlined />}
                    onClick={() => handleEdit('basic')}
                  >
                    编辑设置
                  </Button>
                  <Button 
                    icon={<UndoOutlined />}
                    onClick={() => handleReset('basic')}
                  >
                    重置
                  </Button>
                </Space>
              </div>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="系统名称">{settings.basic?.systemName}</Descriptions.Item>
                <Descriptions.Item label="系统版本">{settings.basic?.systemVersion}</Descriptions.Item>
                <Descriptions.Item label="公司名称">{settings.basic?.companyName}</Descriptions.Item>
                <Descriptions.Item label="联系电话">{settings.basic?.contactPhone}</Descriptions.Item>
                <Descriptions.Item label="联系邮箱">{settings.basic?.contactEmail}</Descriptions.Item>
                <Descriptions.Item label="系统地址">{settings.basic?.systemAddress}</Descriptions.Item>
                <Descriptions.Item label="版权信息" span={2}>{settings.basic?.copyright}</Descriptions.Item>
              </Descriptions>
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <SafetyCertificateOutlined />
                安全设置
              </span>
            } 
            key="security"
          >
            <div className="setting-section">
              <div className="setting-header">
                <div>
                  <Title level={4}>安全设置</Title>
                  <Text type="secondary">配置系统的安全策略，包括密码策略、会话设置和双因素认证</Text>
                </div>
                <Space>
                  <Button 
                    icon={<EditOutlined />}
                    onClick={() => handleEdit('security')}
                  >
                    编辑设置
                  </Button>
                  <Button 
                    icon={<UndoOutlined />}
                    onClick={() => handleReset('security')}
                  >
                    重置
                  </Button>
                </Space>
              </div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="密码策略" size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>最小密码长度：</Text>
                        <Text>{settings.security?.passwordPolicy?.minLength} 位</Text>
                      </div>
                      <div>
                        <Text strong>密码过期天数：</Text>
                        <Text>{settings.security?.passwordPolicy?.expireDays} 天</Text>
                      </div>
                      <div>
                        <Text strong>最大登录尝试次数：</Text>
                        <Text>{settings.security?.passwordPolicy?.maxLoginAttempts} 次</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="会话设置" size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>会话超时时间：</Text>
                        <Text>{settings.security?.sessionSettings?.timeout} 分钟</Text>
                      </div>
                      <div>
                        <Text strong>最大并发会话数：</Text>
                        <Text>{settings.security?.sessionSettings?.concurrentSessions} 个</Text>
                      </div>
                      <div>
                        <Text strong>记住我持续时间：</Text>
                        <Text>{settings.security?.sessionSettings?.rememberMeDuration} 天</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <DatabaseOutlined />
                数据库设置
              </span>
            } 
            key="database"
          >
            <div className="setting-section">
              <div className="setting-header">
                <div>
                  <Title level={4}>数据库设置</Title>
                  <Text type="secondary">配置数据库连接参数和备份策略</Text>
                </div>
                <Space>
                  <Button 
                    icon={<EditOutlined />}
                    onClick={() => handleEdit('database')}
                  >
                    编辑设置
                  </Button>
                  <Button 
                    icon={<UndoOutlined />}
                    onClick={() => handleReset('database')}
                  >
                    重置
                  </Button>
                </Space>
              </div>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="数据库主机">{settings.database?.host}</Descriptions.Item>
                <Descriptions.Item label="数据库端口">{settings.database?.port}</Descriptions.Item>
                <Descriptions.Item label="数据库名称">{settings.database?.database}</Descriptions.Item>
                <Descriptions.Item label="数据库用户名">{settings.database?.username}</Descriptions.Item>
                <Descriptions.Item label="字符集">{settings.database?.charset}</Descriptions.Item>
                <Descriptions.Item label="最大连接数">{settings.database?.maxConnections}</Descriptions.Item>
                <Descriptions.Item label="连接超时时间">{settings.database?.timeout} 秒</Descriptions.Item>
                <Descriptions.Item label="备份保留天数">{settings.database?.backupRetention} 天</Descriptions.Item>
              </Descriptions>
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <BellOutlined />
                通知设置
              </span>
            } 
            key="notification"
          >
            <div className="setting-section">
              <div className="setting-header">
                <div>
                  <Title level={4}>通知设置</Title>
                  <Text type="secondary">配置系统通知方式，包括邮件、短信和微信通知</Text>
                </div>
                <Space>
                  <Button 
                    icon={<EditOutlined />}
                    onClick={() => handleEdit('notification')}
                  >
                    编辑设置
                  </Button>
                  <Button 
                    icon={<UndoOutlined />}
                    onClick={() => handleReset('notification')}
                  >
                    重置
                  </Button>
                </Space>
              </div>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Card title="邮件通知" size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>状态：</Text>
                        <Badge 
                          status={settings.notification?.email?.enabled ? 'success' : 'error'} 
                          text={settings.notification?.email?.enabled ? '启用' : '禁用'}
                        />
                      </div>
                      <div>
                        <Text strong>SMTP服务器：</Text>
                        <Text>{settings.notification?.email?.smtpServer}</Text>
                      </div>
                      <div>
                        <Text strong>SMTP端口：</Text>
                        <Text>{settings.notification?.email?.smtpPort}</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="短信通知" size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>状态：</Text>
                        <Badge 
                          status={settings.notification?.sms?.enabled ? 'success' : 'error'} 
                          text={settings.notification?.sms?.enabled ? '启用' : '禁用'}
                        />
                      </div>
                      <div>
                        <Text strong>服务商：</Text>
                        <Text>{settings.notification?.sms?.provider}</Text>
                      </div>
                      <div>
                        <Text strong>签名：</Text>
                        <Text>{settings.notification?.sms?.signature}</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="微信通知" size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>状态：</Text>
                        <Badge 
                          status={settings.notification?.wechat?.enabled ? 'success' : 'error'} 
                          text={settings.notification?.wechat?.enabled ? '启用' : '禁用'}
                        />
                      </div>
                      <div>
                        <Text strong>AppID：</Text>
                        <Text>{settings.notification?.wechat?.appId?.substring(0, 8)}...</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <GlobalOutlined />
                界面设置
              </span>
            } 
            key="interface"
          >
            <div className="setting-section">
              <div className="setting-header">
                <div>
                  <Title level={4}>界面设置</Title>
                  <Text type="secondary">配置系统界面显示选项</Text>
                </div>
                <Space>
                  <Button 
                    icon={<EditOutlined />}
                    onClick={() => handleEdit('interface')}
                  >
                    编辑设置
                  </Button>
                  <Button 
                    icon={<UndoOutlined />}
                    onClick={() => handleReset('interface')}
                  >
                    重置
                  </Button>
                </Space>
              </div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="显示设置" size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>主题：</Text>
                        <Tag color="blue">{settings.interface?.theme}</Tag>
                      </div>
                      <div>
                        <Text strong>语言：</Text>
                        <Tag color="green">{settings.interface?.language}</Tag>
                      </div>
                      <div>
                        <Text strong>时区：</Text>
                        <Tag color="orange">{settings.interface?.timezone}</Tag>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="格式设置" size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>日期格式：</Text>
                        <Text>{settings.interface?.dateFormat}</Text>
                      </div>
                      <div>
                        <Text strong>时间格式：</Text>
                        <Text>{settings.interface?.timeFormat}</Text>
                      </div>
                      <div>
                        <Text strong>每页显示条数：</Text>
                        <Text>{settings.interface?.pageSize}</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <ApiOutlined />
                集成设置
              </span>
            } 
            key="integration"
          >
            <div className="setting-section">
              <div className="setting-header">
                <div>
                  <Title level={4}>集成设置</Title>
                  <Text type="secondary">配置第三方系统集成参数</Text>
                </div>
                <Space>
                  <Button 
                    icon={<EditOutlined />}
                    onClick={() => handleEdit('integration')}
                  >
                    编辑设置
                  </Button>
                  <Button 
                    icon={<UndoOutlined />}
                    onClick={() => handleReset('integration')}
                  >
                    重置
                  </Button>
                </Space>
              </div>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Card title="HIS系统" size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>状态：</Text>
                        <Badge 
                          status={settings.integration?.hisSystem?.enabled ? 'success' : 'error'} 
                          text={settings.integration?.hisSystem?.enabled ? '启用' : '禁用'}
                        />
                      </div>
                      <div>
                        <Text strong>API地址：</Text>
                        <Text style={{ fontSize: '12px' }}>{settings.integration?.hisSystem?.apiUrl}</Text>
                      </div>
                      <div>
                        <Text strong>超时时间：</Text>
                        <Text>{settings.integration?.hisSystem?.timeout} 秒</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="LIS系统" size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>状态：</Text>
                        <Badge 
                          status={settings.integration?.lisSystem?.enabled ? 'success' : 'error'} 
                          text={settings.integration?.lisSystem?.enabled ? '启用' : '禁用'}
                        />
                      </div>
                      <div>
                        <Text strong>API地址：</Text>
                        <Text style={{ fontSize: '12px' }}>{settings.integration?.lisSystem?.apiUrl}</Text>
                      </div>
                      <div>
                        <Text strong>超时时间：</Text>
                        <Text>{settings.integration?.lisSystem?.timeout} 秒</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="PACS系统" size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>状态：</Text>
                        <Badge 
                          status={settings.integration?.pacsSystem?.enabled ? 'success' : 'error'} 
                          text={settings.integration?.pacsSystem?.enabled ? '启用' : '禁用'}
                        />
                      </div>
                      <div>
                        <Text strong>API地址：</Text>
                        <Text style={{ fontSize: '12px' }}>{settings.integration?.pacsSystem?.apiUrl}</Text>
                      </div>
                      <div>
                        <Text strong>超时时间：</Text>
                        <Text>{settings.integration?.pacsSystem?.timeout} 秒</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
      </Card>

      {/* 设置编辑模态框 */}
      <Modal
        title={`编辑${getSettingTypeName(modalType)}`}
        visible={modalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        width={800}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          {renderSettingsForm()}
        </Form>
      </Modal>
    </div>
  );
};

export default SystemSettings;