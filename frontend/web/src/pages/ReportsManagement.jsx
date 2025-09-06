import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  DatePicker,
  Select,
  Tag,
  Progress,
  Tabs,
  List,
  Avatar,
  Space,
  Tooltip,
  message,
  Divider,
  Alert,
  Dropdown,
  Menu,
  Spin
} from 'antd';
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DownloadOutlined,
  FilterOutlined,
  ReloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  RiseOutlined,
  FallOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  DollarOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import { mockEquipment, mockPatients, mockDoctors, mockAppointments } from '../data/mockData';
import './ReportsManagement.css';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

const ReportsManagement = () => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [reportType, setReportType] = useState('equipment');
  const [exportFormat, setExportFormat] = useState('excel');
  const [timeFilter, setTimeFilter] = useState('month');

  // 生成模拟统计数据
  const generateStats = () => {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const lastYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);

    return {
      equipment: {
        total: mockEquipment.length,
        utilization: 78.5,
        maintenance: 12,
        inRepair: 3,
        totalValue: mockEquipment.reduce((sum, eq) => sum + eq.currentValue, 0),
        monthlyGrowth: 5.2
      },
      patients: {
        total: mockPatients.length,
        newThisMonth: 45,
        discharged: 32,
        emergency: 8,
        avgStay: 7.2,
        satisfaction: 92.3
      },
      doctors: {
        total: mockDoctors.length,
        active: mockDoctors.filter(d => d.status === '在职').length,
        avgExperience: 12.5,
        appointments: mockAppointments.filter(a => a.status === '已完成').length,
        revenue: mockAppointments.reduce((sum, a) => sum + (a.fee || 0), 0)
      },
      financial: {
        revenue: 1250000,
        expenses: 890000,
        profit: 360000,
        growth: 8.7,
        equipmentCost: mockEquipment.reduce((sum, eq) => sum + eq.currentValue, 0) * 0.1
      }
    };
  };

  const [stats, setStats] = useState(generateStats());

  useEffect(() => {
    loadReportData();
  }, [reportType, timeFilter]);

  const loadReportData = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      setTimeout(() => {
        setStats(generateStats());
        setLoading(false);
      }, 800);
    } catch (error) {
      message.error('加载报表数据失败');
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    message.success(`正在导出${format === 'excel' ? 'Excel' : 'PDF'}格式报表...`);
    setTimeout(() => {
      message.success('报表导出成功！');
    }, 1500);
  };

  const equipmentColumns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space>
          <MedicineBoxOutlined style={{ color: '#1890ff' }} />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: '使用率',
      key: 'utilization',
      render: () => {
        const rate = Math.random() * 100;
        return (
          <Progress 
            percent={parseFloat(rate.toFixed(1))} 
            size="small"
            status={rate > 80 ? 'exception' : rate > 60 ? 'normal' : 'success'}
          />
        );
      }
    },
    {
      title: '维护次数',
      dataIndex: 'maintenanceCount',
      key: 'maintenanceCount',
      render: () => Math.floor(Math.random() * 10)
    },
    {
      title: '故障次数',
      dataIndex: 'breakdownCount',
      key: 'breakdownCount',
      render: () => Math.floor(Math.random() * 5)
    },
    {
      title: '当前价值',
      dataIndex: 'currentValue',
      key: 'currentValue',
      render: (value) => `¥${(value / 10000).toFixed(1)}万`
    }
  ];

  const patientColumns = [
    {
      title: '患者姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: '所属科室',
      dataIndex: 'department',
      key: 'department',
      render: (dept) => <Tag color="purple">{dept}</Tag>
    },
    {
      title: '住院天数',
      key: 'stayDays',
      render: () => Math.floor(Math.random() * 30) + 1
    },
    {
      title: '治疗费用',
      key: 'cost',
      render: () => `¥${(Math.random() * 50000 + 5000).toFixed(0)}`
    },
    {
      title: '满意度',
      key: 'satisfaction',
      render: () => {
        const score = Math.floor(Math.random() * 30) + 70;
        return (
          <Progress 
            percent={score} 
            size="small"
            format={() => `${score}分`}
          />
        );
      }
    }
  ];

  const exportMenu = (
    <Menu>
      <Menu.Item key="excel" icon={<FileExcelOutlined />} onClick={() => handleExport('excel')}>
        导出为Excel
      </Menu.Item>
      <Menu.Item key="pdf" icon={<FilePdfOutlined />} onClick={() => handleExport('pdf')}>
        导出为PDF
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="reports-management">
      <div className="reports-header">
        <Title level={3}>统计报表</Title>
        <Text type="secondary">查看系统数据统计和分析报告</Text>
      </div>

      {/* 关键指标概览 */}
      <Row gutter={[16, 16]} className="stats-overview">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="设备总数"
              value={stats.equipment.total}
              prefix={<MedicineBoxOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="trend-indicator">
              <RiseOutlined style={{ color: '#52c41a' }} />
              <Text type="success" style={{ fontSize: 12 }}>
                较上月 {stats.equipment.monthlyGrowth}%
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="患者总数"
              value={stats.patients.total}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className="trend-indicator">
              <Text type="secondary" style={{ fontSize: 12 }}>
                本月新增 {stats.patients.newThisMonth} 人
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="在职医生"
              value={stats.doctors.active}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
            <div className="trend-indicator">
              <Text type="secondary" style={{ fontSize: 12 }}>
                平均从业 {stats.doctors.avgExperience} 年
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="月度收入"
              value={stats.financial.revenue}
              prefix={<DollarOutlined />}
              suffix="元"
              valueStyle={{ color: '#722ed1' }}
            />
            <div className="trend-indicator">
              <RiseOutlined style={{ color: '#52c41a' }} />
              <Text type="success" style={{ fontSize: 12 }}>
                增长 {stats.financial.growth}%
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 筛选和操作区域 */}
      <Card className="filter-section">
        <Space wrap>
          <Select
            value={timeFilter}
            onChange={setTimeFilter}
            style={{ width: 120 }}
          >
            <Option value="week">本周</Option>
            <Option value="month">本月</Option>
            <Option value="quarter">本季度</Option>
            <Option value="year">本年</Option>
          </Select>
          
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            style={{ width: 240 }}
          />
          
          <Button icon={<FilterOutlined />}>
            高级筛选
          </Button>
          
          <Button icon={<ReloadOutlined />} onClick={loadReportData}>
            刷新数据
          </Button>
          
          <Dropdown overlay={exportMenu} placement="bottomRight">
            <Button type="primary" icon={<DownloadOutlined />}>
              导出报表
            </Button>
          </Dropdown>
        </Space>
      </Card>

      {/* 详细报表 */}
      <Card className="report-content">
        <Tabs activeKey={reportType} onChange={setReportType}>
          <TabPane 
            tab={
              <span>
                <MedicineBoxOutlined />
                设备统计
              </span>
            } 
            key="equipment"
          >
            <Spin spinning={loading}>
              <Row gutter={[16, 16]} className="section-stats">
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="平均使用率"
                      value={stats.equipment.utilization}
                      suffix="%"
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="维护中设备"
                      value={stats.equipment.maintenance}
                      valueStyle={{ color: '#fa8c16' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="维修中设备"
                      value={stats.equipment.inRepair}
                      valueStyle={{ color: '#f5222d' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="设备总价值"
                      value={stats.equipment.totalValue / 10000}
                      suffix="万元"
                      valueStyle={{ color: '#722ed1' }}
                    />
                  </Card>
                </Col>
              </Row>
              
              <Table
                columns={equipmentColumns}
                dataSource={mockEquipment.slice(0, 10)}
                pagination={{ pageSize: 10 }}
                size="middle"
              />
            </Spin>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <TeamOutlined />
                患者统计
              </span>
            } 
            key="patients"
          >
            <Spin spinning={loading}>
              <Row gutter={[16, 16]} className="section-stats">
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="本月新增"
                      value={stats.patients.newThisMonth}
                      valueStyle={{ color: '#52c41a' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="出院患者"
                      value={stats.patients.discharged}
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="急诊患者"
                      value={stats.patients.emergency}
                      valueStyle={{ color: '#f5222d' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="平均住院天数"
                      value={stats.patients.avgStay}
                      suffix="天"
                      valueStyle={{ color: '#fa8c16' }}
                    />
                  </Card>
                </Col>
              </Row>
              
              <Table
                columns={patientColumns}
                dataSource={mockPatients.slice(0, 10)}
                pagination={{ pageSize: 10 }}
                size="middle"
              />
            </Spin>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <UserOutlined />
                医生统计
              </span>
            } 
            key="doctors"
          >
            <Spin spinning={loading}>
              <Row gutter={[16, 16]} className="section-stats">
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="完成预约"
                      value={stats.doctors.appointments}
                      valueStyle={{ color: '#52c41a' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="平均经验"
                      value={stats.doctors.avgExperience}
                      suffix="年"
                      valueStyle={{ color: '#fa8c16' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="医生收入"
                      value={stats.doctors.revenue}
                      suffix="元"
                      valueStyle={{ color: '#722ed1' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="患者满意度"
                      value={stats.patients.satisfaction}
                      suffix="分"
                      valueStyle={{ color: '#52c41a' }}
                    />
                  </Card>
                </Col>
              </Row>
              
              <Alert
                message="医生详细统计"
                description="医生工作量、收入统计、患者评价等详细数据正在完善中..."
                type="info"
                showIcon
              />
            </Spin>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <DollarOutlined />
                财务统计
              </span>
            } 
            key="financial"
          >
            <Spin spinning={loading}>
              <Row gutter={[16, 16]} className="section-stats">
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="总收入"
                      value={stats.financial.revenue}
                      suffix="元"
                      valueStyle={{ color: '#52c41a' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="总支出"
                      value={stats.financial.expenses}
                      suffix="元"
                      valueStyle={{ color: '#f5222d' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="净利润"
                      value={stats.financial.profit}
                      suffix="元"
                      valueStyle={{ color: '#722ed1' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card size="small">
                    <Statistic
                      title="设备成本"
                      value={stats.financial.equipmentCost}
                      suffix="元"
                      valueStyle={{ color: '#fa8c16' }}
                    />
                  </Card>
                </Col>
              </Row>
              
              <Alert
                message="财务报表"
                description="详细的收入支出分析、成本控制、利润分析等财务报表功能正在开发中..."
                type="info"
                showIcon
              />
            </Spin>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ReportsManagement;