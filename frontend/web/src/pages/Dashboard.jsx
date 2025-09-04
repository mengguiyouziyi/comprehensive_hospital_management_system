import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Card, Row, Col } from 'antd';
import { 
  UserOutlined, 
  DashboardOutlined, 
  MedicineBoxOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  BarChartOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './Dashboard.css';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    // 获取当前用户信息
    fetchCurrentUser();
  }, []);


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表板',
      onClick: () => history.push('/dashboard')
    },
    {
      key: 'equipment',
      icon: <MedicineBoxOutlined />,
      label: '设备管理',
      onClick: () => history.push('/equipment')
    },
    {
      key: 'patients',
      icon: <TeamOutlined />,
      label: '患者管理'
    },
    {
      key: 'staff',
      icon: <UserOutlined />,
      label: '员工管理'
    },
    {
      key: 'reports',
      icon: <FileTextOutlined />,
      label: '报告管理'
    },
    {
      key: 'statistics',
      icon: <BarChartOutlined />,
      label: '统计分析'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置'
    }
  ];

  return (
    <Layout className="dashboard">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="dashboard-sider"
      >
        <div className="logo">
          <DatabaseOutlined className="logo-icon" />
          <span>医院管理系统</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
        />
      </Sider>
      
      <Layout>
        <Header className="dashboard-header">
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            医院管理系统
          </Title>
        </Header>
        
        <Content className="dashboard-content">
          <div className="dashboard-welcome">
            <Title level={2}>欢迎使用医院管理系统</Title>
            <p>请选择左侧菜单进行操作</p>
          </div>
          
          <Row gutter={16} className="dashboard-stats">
            <Col span={6}>
              <Card title="设备总数" bordered={false}>
                <Title level={3}>128</Title>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="可用设备" bordered={false}>
                <Title level={3} style={{ color: '#52c41a' }}>102</Title>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="维修中设备" bordered={false}>
                <Title level={3} style={{ color: '#faad14' }}>15</Title>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="报废设备" bordered={false}>
                <Title level={3} style={{ color: '#ff4d4f' }}>11</Title>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;