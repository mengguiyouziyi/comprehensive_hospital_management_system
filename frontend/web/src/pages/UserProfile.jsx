import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Upload, 
  Avatar, 
  Row, 
  Col, 
  Divider, 
  message,
  Typography,
  Space,
  Badge,
  Descriptions,
  Tabs,
  List,
  Tag
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EditOutlined, 
  UploadOutlined,
  LockOutlined,
  SecurityScanOutlined,
  BellOutlined,
  CalendarOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import './UserProfile.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const UserProfile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    username: 'admin',
    fullName: '系统管理员',
    email: 'admin@hospital.com',
    phone: '13800138000',
    department: '信息科',
    position: '系统管理员',
    role: '管理员',
    lastLogin: '2024-01-15 10:30:00',
    createdAt: '2023-01-01 09:00:00',
    status: 'active'
  });

  const [loginHistory, setLoginHistory] = useState([
    {
      id: 1,
      time: '2024-01-15 10:30:00',
      ip: '192.168.1.100',
      location: '北京市朝阳区',
      device: 'Chrome浏览器 / Windows 10',
      status: 'success'
    },
    {
      id: 2,
      time: '2024-01-14 18:45:00',
      ip: '192.168.1.100',
      location: '北京市朝阳区',
      device: 'Chrome浏览器 / Windows 10',
      status: 'success'
    },
    {
      id: 3,
      time: '2024-01-14 09:15:00',
      ip: '192.168.1.100',
      location: '北京市朝阳区',
      device: 'Chrome浏览器 / Windows 10',
      status: 'success'
    }
  ]);

  const handleAvatarChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      setAvatar(info.file.response.url);
      message.success('头像上传成功');
    } else if (info.file.status === 'error') {
      setLoading(false);
      message.error('头像上传失败');
    }
  };

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({ ...user, ...values });
      setEditing(false);
      message.success('个人信息更新成功');
    } catch (error) {
      message.error('更新失败');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      passwordForm.resetFields();
      message.success('密码修改成功');
    } catch (error) {
      message.error('密码修改失败');
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <UploadOutlined /> : <EditOutlined />}
      <div style={{ marginTop: 8 }}>更换头像</div>
    </div>
  );

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { color: 'green', text: '在线' },
      inactive: { color: 'red', text: '离线' },
      busy: { color: 'orange', text: '忙碌' }
    };
    const config = statusMap[status] || statusMap.active;
    return <Badge color={config.color} text={config.text} />;
  };

  return (
    <div className="user-profile">
      <Card className="profile-card">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8} lg={6}>
            <Card className="avatar-card">
              <div className="avatar-section">
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  onChange={handleAvatarChange}
                >
                  {avatar ? (
                    <Avatar size={120} src={avatar} />
                  ) : (
                    <Avatar size={120} icon={<UserOutlined />} />
                  )}
                </Upload>
                <div className="user-info">
                  <Title level={4} className="user-name">{user.fullName}</Title>
                  <Text type="secondary" className="user-role">{user.role}</Text>
                  <div className="user-status">
                    {getStatusBadge(user.status)}
                  </div>
                </div>
              </div>
              
              <Divider />
              
              <Descriptions column={1} size="small" className="user-details">
                <Descriptions.Item label="用户名">{user.username}</Descriptions.Item>
                <Descriptions.Item label="部门">{user.department}</Descriptions.Item>
                <Descriptions.Item label="职位">{user.position}</Descriptions.Item>
                <Descriptions.Item label="加入时间">{user.createdAt}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          
          <Col xs={24} md={16} lg={18}>
            <Card>
              <Tabs defaultActiveKey="profile" className="profile-tabs">
                <TabPane 
                  tab={
                    <span>
                      <UserOutlined />
                      个人信息
                    </span>
                  } 
                  key="profile"
                >
                  <Form
                    form={form}
                    layout="vertical"
                    initialValues={user}
                    onFinish={handleUpdateProfile}
                  >
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label="姓名"
                          name="fullName"
                          rules={[{ required: true, message: '请输入姓名' }]}
                        >
                          <Input prefix={<UserOutlined />} disabled={!editing} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label="用户名"
                          name="username"
                          rules={[{ required: true, message: '请输入用户名' }]}
                        >
                          <Input prefix={<UserOutlined />} disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label="邮箱"
                          name="email"
                          rules={[
                            { required: true, message: '请输入邮箱' },
                            { type: 'email', message: '请输入有效的邮箱地址' }
                          ]}
                        >
                          <Input prefix={<MailOutlined />} disabled={!editing} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label="电话"
                          name="phone"
                          rules={[
                            { required: true, message: '请输入电话号码' },
                            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
                          ]}
                        >
                          <Input prefix={<PhoneOutlined />} disabled={!editing} />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label="部门"
                          name="department"
                        >
                          <Input disabled={!editing} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label="职位"
                          name="position"
                        >
                          <Input disabled={!editing} />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <div className="form-actions">
                      {!editing ? (
                        <Button 
                          type="primary" 
                          icon={<EditOutlined />}
                          onClick={() => setEditing(true)}
                        >
                          编辑资料
                        </Button>
                      ) : (
                        <Space>
                          <Button 
                            onClick={() => {
                              setEditing(false);
                              form.resetFields();
                            }}
                          >
                            取消
                          </Button>
                          <Button 
                            type="primary" 
                            htmlType="submit"
                            loading={loading}
                          >
                            保存修改
                          </Button>
                        </Space>
                      )}
                    </div>
                  </Form>
                </TabPane>
                
                <TabPane 
                  tab={
                    <span>
                      <LockOutlined />
                      修改密码
                    </span>
                  } 
                  key="password"
                >
                  <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={handleChangePassword}
                  >
                    <Form.Item
                      label="当前密码"
                      name="currentPassword"
                      rules={[{ required: true, message: '请输入当前密码' }]}
                    >
                      <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    
                    <Form.Item
                      label="新密码"
                      name="newPassword"
                      rules={[
                        { required: true, message: '请输入新密码' },
                        { min: 8, message: '密码长度至少8位' },
                        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: '密码必须包含大小写字母和数字' }
                      ]}
                    >
                      <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    
                    <Form.Item
                      label="确认新密码"
                      name="confirmPassword"
                      dependencies={['newPassword']}
                      rules={[
                        { required: true, message: '请确认新密码' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('两次输入的密码不一致'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    
                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit"
                        loading={loading}
                        icon={<SecurityScanOutlined />}
                      >
                        修改密码
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>
                
                <TabPane 
                  tab={
                    <span>
                      <ClockCircleOutlined />
                      登录记录
                    </span>
                  } 
                  key="login-history"
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={loginHistory}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar 
                              icon={<CalendarOutlined />} 
                              style={{ backgroundColor: '#1890ff' }}
                            />
                          }
                          title={
                            <Space>
                              <Text>{item.time}</Text>
                              <Tag color={item.status === 'success' ? 'green' : 'red'}>
                                {item.status === 'success' ? '成功' : '失败'}
                              </Tag>
                            </Space>
                          }
                          description={
                            <div>
                              <div>IP地址: {item.ip}</div>
                              <div>位置: {item.location}</div>
                              <div>设备: {item.device}</div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserProfile;