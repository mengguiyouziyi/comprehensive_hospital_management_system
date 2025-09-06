import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Dropdown, Avatar, Badge, Space, Breadcrumb, Typography, message } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  CaretDownOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BarChartOutlined,
  BookOutlined,
  WarningOutlined,
  DeleteOutlined,
  UserSwitchOutlined,
  FileProtectOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
  MoneyCollectOutlined,
  DatabaseOutlined,
  ScheduleOutlined,
  AccountBookOutlined,
  MedicineBoxOutlined as HospitalOutlined,
  BorderOutlined as RulerOutlined,
  ShoppingOutlined,
  InboxOutlined
} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './DashboardLayout.css';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // 通知菜单
  const notificationMenu = (
    <Menu className="notification-menu">
      <Menu.Item key="notifications-header" disabled>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
          <Text strong>通知中心</Text>
        </div>
      </Menu.Item>
      <Menu.Item key="notification1">
        <div style={{ padding: '12px' }}>
          <Text strong style={{ fontSize: '12px' }}>系统通知</Text>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            设备管理系统已更新至最新版本
          </div>
          <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
            5分钟前
          </div>
        </div>
      </Menu.Item>
      <Menu.Item key="notification2">
        <div style={{ padding: '12px' }}>
          <Text strong style={{ fontSize: '12px' }}>维护提醒</Text>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            有3台设备需要定期维护检查
          </div>
          <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
            1小时前
          </div>
        </div>
      </Menu.Item>
      <Menu.Item key="notification3">
        <div style={{ padding: '12px' }}>
          <Text strong style={{ fontSize: '12px' }}>数据统计</Text>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            本月设备使用率报告已生成
          </div>
          <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
            2小时前
          </div>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="view-all" onClick={() => {
        message.info('通知中心功能正在开发中');
      }}>
        <div style={{ textAlign: 'center', padding: '8px' }}>
          <Text type="primary" style={{ fontSize: '12px' }}>查看全部通知</Text>
        </div>
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">个人信息</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">系统设置</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  const getBreadcrumbItems = () => {
    const pathMap = {
      '/dashboard': { title: '仪表板', icon: <DashboardOutlined /> },
      '/equipment': { title: '设备管理', icon: <MedicineBoxOutlined /> },
      '/patients': { title: '患者管理', icon: <TeamOutlined /> },
      '/doctors': { title: '医生管理', icon: <UserOutlined /> },
      '/appointments': { title: '预约管理', icon: <CalendarOutlined /> },
      '/reports': { title: '统计报表', icon: <BarChartOutlined /> },
      '/training': { title: '培训考试', icon: <BookOutlined /> },
      '/adverse-events': { title: '不良事件', icon: <WarningOutlined /> },
      '/disposal': { title: '设备报废', icon: <DeleteOutlined /> },
      '/maintenance': { title: '维护保养', icon: <SafetyCertificateOutlined /> },
      '/finance': { title: '财务管理', icon: <MoneyCollectOutlined /> },
      '/inventory': { title: '库存管理', icon: <DatabaseOutlined /> },
      '/inspection': { title: '设备巡检', icon: <SafetyCertificateOutlined /> },
      '/quality-control': { title: '质控检测', icon: <FileProtectOutlined /> },
      '/repair-orders': { title: '维修工单', icon: <ToolOutlined /> },
      '/preventive-maintenance': { title: '预防性维护', icon: <ScheduleOutlined /> },
      '/usage-records': { title: '使用记录', icon: <FileTextOutlined /> },
      '/profile': { title: '个人信息', icon: <UserOutlined /> },
      '/settings': { title: '系统设置', icon: <SettingOutlined /> },
    };
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    return pathSegments.map((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      const item = pathMap[path] || { title: segment };
      return {
        title: item.title,
        icon: item.icon
      };
    });
  };

  return (
    <div className="dashboard-layout">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="dashboard-sider"
        width={240}
        collapsedWidth={80}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          }
        }}
      >
        <div className="logo">
          <MedicineBoxOutlined className="logo-icon" />
          {!collapsed && <span className="logo-text">医院管理系统</span>}
        </div>
        <Menu 
          theme="dark" 
          mode="inline" 
          selectedKeys={[location.pathname]}
          defaultOpenKeys={['clinical', 'equipment-mgmt', 'quality', 'training', 'operations', 'system']}
        >
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
            <Link to="/dashboard">仪表板</Link>
          </Menu.Item>
          
          {/* 临床管理 */}
          <Menu.SubMenu key="clinical" icon={<HospitalOutlined />} title="临床管理">
            <Menu.Item key="/patients" icon={<TeamOutlined />}>
              <Link to="/patients">患者管理</Link>
            </Menu.Item>
            <Menu.Item key="/doctors" icon={<UserSwitchOutlined />}>
              <Link to="/doctors">医生管理</Link>
            </Menu.Item>
            <Menu.Item key="/appointments" icon={<CalendarOutlined />}>
              <Link to="/appointments">预约管理</Link>
            </Menu.Item>
          </Menu.SubMenu>
          
          {/* 设备管理 */}
          <Menu.SubMenu key="equipment-mgmt" icon={<MedicineBoxOutlined />} title="设备管理">
            <Menu.Item key="/equipment" icon={<ToolOutlined />}>
              <Link to="/equipment">设备台账</Link>
            </Menu.Item>
            <Menu.Item key="/inspection" icon={<SafetyCertificateOutlined />}>
              <Link to="/inspection">设备巡检</Link>
            </Menu.Item>
            <Menu.Item key="/quality-control" icon={<FileProtectOutlined />}>
              <Link to="/quality-control">质控检测</Link>
            </Menu.Item>
            <Menu.Item key="/repair-orders" icon={<ToolOutlined />}>
              <Link to="/repair-orders">维修工单</Link>
            </Menu.Item>
            <Menu.Item key="/preventive-maintenance" icon={<ScheduleOutlined />}>
              <Link to="/preventive-maintenance">预防性维护</Link>
            </Menu.Item>
            <Menu.Item key="/inventory-management" icon={<AccountBookOutlined />}>
              <Link to="/inventory-management">设备盘点</Link>
            </Menu.Item>
            <Menu.Item key="/measurement" icon={<RulerOutlined />}>
              <Link to="/measurement">计量管理</Link>
            </Menu.Item>
            <Menu.Item key="/maintenance" icon={<SafetyCertificateOutlined />}>
              <Link to="/maintenance">维护保养</Link>
            </Menu.Item>
            <Menu.Item key="/disinfection" icon={<SafetyCertificateOutlined />}>
              <Link to="/disinfection">消毒管理</Link>
            </Menu.Item>
            <Menu.Item key="/disposal" icon={<DeleteOutlined />}>
              <Link to="/disposal">设备报废</Link>
            </Menu.Item>
            <Menu.Item key="/usage-records" icon={<FileTextOutlined />}>
              <Link to="/usage-records">使用记录</Link>
            </Menu.Item>
          </Menu.SubMenu>
          
          {/* 质量管理 */}
          <Menu.SubMenu key="quality" icon={<FileProtectOutlined />} title="质量管理">
            <Menu.Item key="/adverse-events" icon={<WarningOutlined />}>
              <Link to="/adverse-events">不良事件</Link>
            </Menu.Item>
            <Menu.Item key="/safety" icon={<SafetyCertificateOutlined />}>
              <Link to="/safety">安全管理</Link>
            </Menu.Item>
            <Menu.Item key="/compliance" icon={<FileProtectOutlined />}>
              <Link to="/compliance">合规检查</Link>
            </Menu.Item>
          </Menu.SubMenu>
          
          {/* 培训管理 */}
          <Menu.SubMenu key="training" icon={<BookOutlined />} title="培训管理">
            <Menu.Item key="/training-exams" icon={<BookOutlined />}>
              <Link to="/training">培训考试</Link>
            </Menu.Item>
            <Menu.Item key="/certification" icon={<FileProtectOutlined />}>
              <Link to="/certification">资质认证</Link>
            </Menu.Item>
            <Menu.Item key="/performance" icon={<BarChartOutlined />}>
              <Link to="/performance">绩效评估</Link>
            </Menu.Item>
          </Menu.SubMenu>
          
          {/* 运营管理 */}
          <Menu.SubMenu key="operations" icon={<DatabaseOutlined />} title="运营管理">
            <Menu.Item key="/reports" icon={<BarChartOutlined />}>
              <Link to="/reports">统计报表</Link>
            </Menu.Item>
            <Menu.Item key="/finance" icon={<MoneyCollectOutlined />}>
              <Link to="/finance">财务管理</Link>
            </Menu.Item>
            <Menu.Item key="/inventory" icon={<DatabaseOutlined />}>
              <Link to="/inventory">库存管理</Link>
            </Menu.Item>
            <Menu.Item key="/procurement" icon={<ShoppingOutlined />}>
              <Link to="/procurement">采购管理</Link>
            </Menu.Item>
            <Menu.Item key="/spare-parts" icon={<InboxOutlined />}>
              <Link to="/spare-parts">备件管理</Link>
            </Menu.Item>
          </Menu.SubMenu>
          
          {/* 系统管理 */}
          <Menu.SubMenu key="system" icon={<SettingOutlined />} title="系统管理">
            <Menu.Item key="/users" icon={<UserOutlined />}>
              <Link to="/users">用户管理</Link>
            </Menu.Item>
            <Menu.Item key="/roles" icon={<UserSwitchOutlined />}>
              <Link to="/roles">权限管理</Link>
            </Menu.Item>
            <Menu.Item key="/settings" icon={<SettingOutlined />}>
              <Link to="/settings">系统设置</Link>
            </Menu.Item>
            <Menu.Item key="/logs" icon={<FileTextOutlined />}>
              <Link to="/logs">操作日志</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      
      <div className="main-layout">
        <Header className="dashboard-header">
          <div className="header-left">
            <Button
              type="text"
              icon={React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
              onClick={toggleCollapse}
              className="trigger-btn"
            />
            <Breadcrumb 
              items={getBreadcrumbItems()}
              className="breadcrumb"
            />
          </div>
          
          <Space className="header-right">
            <Dropdown overlay={notificationMenu} placement="bottomRight" trigger={['click']}>
              <Badge count={3} size="small" className="notification-badge">
                <Button 
                  type="text" 
                  icon={<BellOutlined />}
                  className="notification-btn"
                />
              </Badge>
            </Dropdown>
            
            <Dropdown overlay={userMenu} placement="bottomRight">
              <div className="user-dropdown">
                <Avatar size="small" icon={<UserOutlined />} />
                <span className="username">管理员</span>
                <CaretDownOutlined className="dropdown-arrow" />
              </div>
            </Dropdown>
          </Space>
        </Header>
        
        <Content className="dashboard-content">
          <div className="content-wrapper">
            {children}
          </div>
        </Content>
      </div>
    </div>
  );
};

export default DashboardLayout;