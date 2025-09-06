import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Space,
  Select,
  DatePicker,
  Tag,
  Progress,
  List,
  Avatar,
  Typography,
  Divider,
  Tooltip,
  Badge,
  Rate,
  Tabs
} from 'antd';
import {
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  TrophyOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  StarOutlined,
  FireOutlined,
  RiseOutlined,
  FallOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const PerformanceManagement = () => {
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('month');
  const [viewMode, setViewMode] = useState('overview');
  const [performanceData, setPerformanceData] = useState({
    overview: {
      totalEmployees: 156,
      avgPerformance: 85.6,
      topPerformers: 12,
      improvementNeeded: 8
    },
    departmentStats: [
      {
        key: '1',
        department: '内科',
        employees: 45,
        avgScore: 88.5,
        completion: 92,
        trend: 'up'
      },
      {
        key: '2',
        department: '外科',
        employees: 38,
        avgScore: 86.2,
        completion: 89,
        trend: 'up'
      },
      {
        key: '3',
        department: '儿科',
        employees: 28,
        avgScore: 84.7,
        completion: 87,
        trend: 'stable'
      },
      {
        key: '4',
        department: '急诊科',
        employees: 22,
        avgScore: 82.3,
        completion: 85,
        trend: 'down'
      },
      {
        key: '5',
        department: '妇产科',
        employees: 23,
        avgScore: 87.1,
        completion: 90,
        trend: 'up'
      }
    ],
    topEmployees: [
      {
        id: 1,
        name: '张医生',
        department: '内科',
        score: 96,
        avatar: '👨‍⚕️',
        achievements: 15,
        patients: 156
      },
      {
        id: 2,
        name: '李护士',
        department: '外科',
        score: 94,
        avatar: '👩‍⚕️',
        achievements: 12,
        patients: 134
      },
      {
        id: 3,
        name: '王医生',
        department: '儿科',
        score: 93,
        avatar: '👨‍⚕️',
        achievements: 11,
        patients: 128
      },
      {
        id: 4,
        name: '陈医生',
        department: '妇产科',
        score: 92,
        avatar: '👩‍⚕️',
        achievements: 10,
        patients: 145
      },
      {
        id: 5,
        name: '刘护士',
        department: '急诊科',
        score: 91,
        avatar: '👩‍⚕️',
        achievements: 9,
        patients: 98
      }
    ],
    recentEvaluations: [
      {
        key: '1',
        employee: '张医生',
        department: '内科',
        type: '季度评估',
        score: 96,
        evaluator: '王主任',
        date: '2024-01-15',
        status: 'completed'
      },
      {
        key: '2',
        employee: '李护士',
        department: '外科',
        type: '月度评估',
        score: 94,
        evaluator: '赵护士长',
        date: '2024-01-14',
        status: 'completed'
      },
      {
        key: '3',
        employee: '王医生',
        department: '儿科',
        type: '年度评估',
        score: 93,
        evaluator: '钱主任',
        date: '2024-01-13',
        status: 'completed'
      },
      {
        key: '4',
        employee: '陈医生',
        department: '妇产科',
        type: '季度评估',
        score: 92,
        evaluator: '孙主任',
        date: '2024-01-12',
        status: 'pending'
      },
      {
        key: '5',
        employee: '刘护士',
        department: '急诊科',
        type: '月度评估',
        score: 91,
        evaluator: '周护士长',
        date: '2024-01-11',
        status: 'completed'
      }
    ]
  });

  const departmentColumns = [
    {
      title: '科室',
      dataIndex: 'department',
      key: 'department',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: '员工数',
      dataIndex: 'employees',
      key: 'employees',
      render: (text) => <Badge count={text} style={{ backgroundColor: '#1890ff' }} />
    },
    {
      title: '平均分数',
      dataIndex: 'avgScore',
      key: 'avgScore',
      render: (score) => (
        <Space>
          <Progress
            type="circle"
            percent={score}
            width={40}
            strokeColor={score >= 90 ? '#52c41a' : score >= 80 ? '#faad14' : '#ff4d4f'}
          />
          <Text>{score}分</Text>
        </Space>
      )
    },
    {
      title: '任务完成率',
      dataIndex: 'completion',
      key: 'completion',
      render: (percent) => (
        <Progress
          percent={percent}
          size="small"
          strokeColor={percent >= 90 ? '#52c41a' : percent >= 80 ? '#faad14' : '#ff4d4f'}
        />
      )
    },
    {
      title: '趋势',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend) => {
        const Icon = trend === 'up' ? RiseOutlined : trend === 'down' ? FallOutlined : FireOutlined;
        const color = trend === 'up' ? '#52c41a' : trend === 'down' ? '#ff4d4f' : '#faad14';
        return <Icon style={{ color }} />;
      }
    }
  ];

  const evaluationColumns = [
    {
      title: '员工',
      dataIndex: 'employee',
      key: 'employee',
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1890ff' }}>{text[0]}</Avatar>
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.department}</Text>
          </div>
        </Space>
      )
    },
    {
      title: '评估类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const colors = {
          '月度评估': 'blue',
          '季度评估': 'green',
          '年度评估': 'purple'
        };
        return <Tag color={colors[type] || 'default'}>{type}</Tag>;
      }
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      render: (score) => (
        <Rate
          disabled
          count={5}
          defaultValue={score / 20}
          style={{ fontSize: 14 }}
        />
      )
    },
    {
      title: '评估人',
      dataIndex: 'evaluator',
      key: 'evaluator'
    },
    {
      title: '评估日期',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('YYYY-MM-DD')
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          completed: { color: 'success', text: '已完成' },
          pending: { color: 'warning', text: '待确认' },
          inProgress: { color: 'processing', text: '进行中' }
        };
        const config = statusConfig[status] || statusConfig.completed;
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    }
  ];

  const renderOverview = () => (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="总员工数"
              value={performanceData.overview.totalEmployees}
              prefix={<TeamOutlined />}
              suffix="人"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="平均绩效"
              value={performanceData.overview.avgPerformance}
              precision={1}
              suffix="分"
              prefix={<StarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="优秀员工"
              value={performanceData.overview.topPerformers}
              prefix={<TrophyOutlined />}
              suffix="人"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="需要改进"
              value={performanceData.overview.improvementNeeded}
              prefix={<ExclamationCircleOutlined />}
              suffix="人"
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="科室绩效统计" extra={<Button type="link">查看详情</Button>}>
            <Table
              columns={departmentColumns}
              dataSource={performanceData.departmentStats}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="优秀员工排行榜" extra={<Button type="link">查看全部</Button>}>
            <List
              dataSource={performanceData.topEmployees}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: index < 3 ? '#faad14' : '#1890ff' }}>{item.avatar}</Avatar>}
                    title={
                      <Space>
                        <Text strong>{item.name}</Text>
                        {index < 3 && <TrophyOutlined style={{ color: '#faad14' }} />}
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size="small">
                        <Text type="secondary">{item.department}</Text>
                        <Progress
                          percent={item.score}
                          size="small"
                          strokeColor={item.score >= 95 ? '#52c41a' : '#faad14'}
                        />
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderEvaluations = () => (
    <Card title="评估记录" extra={
      <Space>
        <Select defaultValue="all" style={{ width: 120 }}>
          <Option value="all">全部类型</Option>
          <Option value="monthly">月度评估</Option>
          <Option value="quarterly">季度评估</Option>
          <Option value="annual">年度评估</Option>
        </Select>
        <RangePicker />
        <Button type="primary">新增评估</Button>
      </Space>
    }>
      <Table
        columns={evaluationColumns}
        dataSource={performanceData.recentEvaluations}
        pagination={{
          total: performanceData.recentEvaluations.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
        }}
      />
    </Card>
  );

  return (
    <div style={{ padding: '0 24px' }}>
      <div style={{ marginBottom: 16 }}>
        <Title level={3}>绩效管理</Title>
        <Text type="secondary">跟踪和管理员工绩效表现</Text>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Select
            value={timeRange}
            onChange={setTimeRange}
            style={{ width: '100%' }}
          >
            <Option value="week">本周</Option>
            <Option value="month">本月</Option>
            <Option value="quarter">本季度</Option>
            <Option value="year">本年度</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Select
            value={viewMode}
            onChange={setViewMode}
            style={{ width: '100%' }}
          >
            <Option value="overview">总览</Option>
            <Option value="evaluations">评估记录</Option>
            <Option value="analytics">数据分析</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Space>
            <Button icon={<LineChartOutlined />}>趋势图</Button>
            <Button icon={<BarChartOutlined />}>柱状图</Button>
            <Button icon={<PieChartOutlined />}>饼图</Button>
          </Space>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1">
        <TabPane tab="绩效概览" key="1">
          {renderOverview()}
        </TabPane>
        <TabPane tab="评估记录" key="2">
          {renderEvaluations()}
        </TabPane>
        <TabPane tab="数据分析" key="3">
          <Card>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <LineChartOutlined style={{ fontSize: 48, color: '#1890ff' }} />
              <Title level={4} style={{ marginTop: 16 }}>数据分析功能</Title>
              <Text type="secondary">绩效趋势图表和深度分析功能即将上线</Text>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PerformanceManagement;