import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Progress, 
  List, 
  Avatar, 
  Tag, 
  Timeline,
  Table,
  Button,
  Alert,
  Spin,
  Result,
  Skeleton
} from 'antd';
import { 
  UserOutlined, 
  DashboardOutlined, 
  MedicineBoxOutlined,
  FileTextOutlined,
  CalendarOutlined,
  FileDoneOutlined,
  IdcardOutlined,
  RiseOutlined,
  FallOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockApi, mockStatistics } from '../data/mockData';
import './Dashboard.css';

const { Title, Text } = Typography;
const { Meta } = Card;

const Dashboard = () => {
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState(mockStatistics);
  const [loading, setLoading] = useState(false);
  const [recentActivities, setRecentActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
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
        }, 1000);
      });
      
      setStatistics(mockStatistics);
      setRecentActivities(generateRecentActivities());
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    loadDashboardData();
  };

  const generateRecentActivities = () => [
    {
      id: 1,
      type: 'equipment',
      title: 'CT扫描仪完成定期维护',
      time: '10分钟前',
      status: 'completed',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
    },
    {
      id: 2,
      type: 'patient',
      title: '新患者张三入院',
      time: '30分钟前',
      status: 'info',
      icon: <UserOutlined style={{ color: '#1890ff' }} />
    },
    {
      id: 3,
      type: 'maintenance',
      title: '核磁共振设备需要维护',
      time: '1小时前',
      status: 'warning',
      icon: <WarningOutlined style={{ color: '#faad14' }} />
    },
    {
      id: 4,
      type: 'appointment',
      title: '李医生新增3个预约',
      time: '2小时前',
      status: 'info',
      icon: <CalendarOutlined style={{ color: '#722ed1' }} />
    }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const quickAccessItems = [
    {
      key: 'patients',
      title: '患者管理',
      description: '管理患者信息',
      icon: <UserOutlined style={{ fontSize: '32px' }} />,
      color: '#52c41a',
      count: statistics.patients.total,
      path: '/patients'
    },
    {
      key: 'equipment',
      title: '设备管理',
      description: '管理系统中的医疗设备',
      icon: <MedicineBoxOutlined style={{ fontSize: '32px' }} />,
      color: '#f5222d',
      count: statistics.equipment.total,
      path: '/equipment'
    },
    {
      key: 'appointments',
      title: '预约管理',
      description: '管理患者预约',
      icon: <CalendarOutlined style={{ fontSize: '32px' }} />,
      color: '#722ed1',
      count: statistics.appointments.total,
      path: '/appointments'
    },
    {
      key: 'maintenance',
      title: '维护管理',
      description: '设备维护记录',
      icon: <FileDoneOutlined style={{ fontSize: '32px' }} />,
      color: '#fa8c16',
      count: statistics.maintenance.total,
      path: '/maintenance'
    }
  ];

  const maintenanceTableColumns = [
    {
      title: '设备名称',
      dataIndex: 'equipmentName',
      key: 'equipmentName'
    },
    {
      title: '维护类型',
      dataIndex: 'maintenanceType',
      key: 'maintenanceType',
      render: (type) => (
        <Tag color={type === '预防性维护' ? 'green' : 'orange'}>
          {type}
        </Tag>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          '进行中': { color: 'blue', icon: <ClockCircleOutlined /> },
          '已完成': { color: 'green', icon: <CheckCircleOutlined /> },
          '待处理': { color: 'orange', icon: <WarningOutlined /> }
        };
        const config = statusConfig[status] || statusConfig['待处理'];
        return (
          <Tag color={config.color} icon={config.icon}>
            {status}
          </Tag>
        );
      }
    },
    {
      title: '负责人',
      dataIndex: 'technician',
      key: 'technician'
    },
    {
      title: '预计完成',
      dataIndex: 'expectedEndDate',
      key: 'expectedEndDate'
    }
  ];

  const recentMaintenanceData = [
    {
      key: '1',
      equipmentName: 'CT扫描仪',
      maintenanceType: '预防性维护',
      status: '进行中',
      technician: '张工程师',
      expectedEndDate: '2023-12-16'
    },
    {
      key: '2',
      equipmentName: '核磁共振设备',
      maintenanceType: '故障维修',
      status: '已完成',
      technician: '李工程师',
      expectedEndDate: '2023-11-21'
    },
    {
      key: '3',
      equipmentName: '呼吸机',
      maintenanceType: '定期检查',
      status: '待处理',
      technician: '王工程师',
      expectedEndDate: '2023-12-20'
    }
  ];

  if (loading) {
    return (
      <div className="dashboard-container">
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 20 }}>
            <Text>正在加载仪表板数据...</Text>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <Result
          status="error"
          title="加载失败"
          subTitle={error}
          extra={[
            <Button type="primary" key="retry" onClick={handleRetry}>
              重试
            </Button>,
            <Button key="home" onClick={() => navigate('/dashboard')}>
              返回首页
            </Button>
          ]}
        />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Title level={2}>医院管理系统仪表板</Title>
        <Text type="secondary">欢迎使用医院综合管理系统</Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="stats-section">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="设备总数"
              value={statistics.equipment.total}
              prefix={<MedicineBoxOutlined />}
              suffix={<Text type="success">+12%</Text>}
              valueStyle={{ color: '#3f8600' }}
            />
            <Progress 
              percent={statistics.equipment.utilizationRate} 
              size="small" 
              status="active"
              style={{ marginTop: 8 }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>设备利用率</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="患者总数"
              value={statistics.patients.total}
              prefix={<UserOutlined />}
              suffix={<Text type="success">+5%</Text>}
              valueStyle={{ color: '#1890ff' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                住院: {statistics.patients.inpatient} | 门诊: {statistics.patients.outpatient}
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="预约总数"
              value={statistics.appointments.total}
              prefix={<CalendarOutlined />}
              suffix={<Text type="warning">{statistics.appointments.pending} 待确认</Text>}
              valueStyle={{ color: '#722ed1' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                确认率: {Math.round(statistics.appointments.confirmed / statistics.appointments.total * 100)}%
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="维护记录"
              value={statistics.maintenance.total}
              prefix={<FileDoneOutlined />}
              suffix={<Text type="danger">{statistics.maintenance.overdue} 逾期</Text>}
              valueStyle={{ color: '#fa8c16' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                完成率: {Math.round(statistics.maintenance.completed / statistics.maintenance.total * 100)}%
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 快速访问 */}
      <div className="quick-access-section">
        <Title level={4}>快速访问</Title>
        <Row gutter={[16, 16]}>
          {quickAccessItems.map((item) => (
            <Col xs={24} sm={12} lg={6} key={item.key}>
              <Card
                hoverable
                className="quick-access-card"
                onClick={() => handleMenuClick(item.path)}
                style={{ borderLeft: `4px solid ${item.color}` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    background: `${item.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    {React.cloneElement(item.icon, { style: { color: item.color } })}
                  </div>
                  <div>
                    <Meta title={item.title} description={item.description} />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      共 {item.count} 项
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Row gutter={[16, 16]} className="content-section">
        {/* 最近活动 */}
        <Col xs={24} lg={8}>
          <Card title="最近活动" extra={<Button type="link">查看全部</Button>}>
            <Timeline
              items={recentActivities.map(activity => ({
                color: activity.status === 'completed' ? 'green' : 
                       activity.status === 'warning' ? 'orange' : 'blue',
                dot: activity.icon,
                children: (
                  <div>
                    <Text strong>{activity.title}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{activity.time}</Text>
                  </div>
                )
              }))}
            />
          </Card>
        </Col>

        {/* 设备状态 */}
        <Col xs={24} lg={8}>
          <Card title="设备状态" extra={<Button type="link">查看详情</Button>}>
            <List
              dataSource={[
                { name: '正常设备', count: statistics.equipment.normal, color: 'green', trend: 'up' },
                { name: '维护中', count: statistics.equipment.maintenance, color: 'orange', trend: 'down' },
                { name: '维修中', count: statistics.equipment.repair, color: 'red', trend: 'stable' },
                { name: '已报废', count: statistics.equipment.scrapped, color: 'gray', trend: 'stable' }
              ]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: item.color }} />}
                    title={item.name}
                    description={
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Text strong>{item.count} 台</Text>
                        {item.trend === 'up' && <RiseOutlined style={{ color: '#52c41a' }} />}
                        {item.trend === 'down' && <FallOutlined style={{ color: '#ff4d4f' }} />}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 最近维护 */}
        <Col xs={24} lg={8}>
          <Card title="最近维护" extra={<Button type="link">查看全部</Button>}>
            <Table
              dataSource={recentMaintenanceData}
              columns={maintenanceTableColumns}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;