import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  message, 
  Space, 
  Select, 
  Card, 
  Row, 
  Col, 
  Badge,
  Tag,
  Tabs,
  Progress,
  Avatar,
  List,
  Typography,
  DatePicker,
  Rate,
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  BookOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  UserOutlined,
  EyeOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BarChartOutlined,
  SearchOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;
const { Text, Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const TrainingManagement = () => {
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [examModalVisible, setExamModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingExam, setEditingExam] = useState(null);
  const [courseForm] = Form.useForm();
  const [examForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('courses');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // 模拟数据
  useEffect(() => {
    // 模拟课程数据
    const mockCourses = [
      {
        id: 1,
        title: '医疗设备操作规范培训',
        description: '针对新型医疗设备的标准化操作流程培训，确保医护人员能够安全、规范地使用各种医疗设备。',
        category: '设备操作',
        instructor: '张教授',
        duration: 120,
        difficulty: 2,
        status: 'published',
        isRequired: true,
        enrolledCount: 45,
        maxStudents: 50,
        rating: 4.8,
        createdAt: '2024-01-15',
        thumbnail: '/course1.jpg'
      },
      {
        id: 2,
        title: '医疗设备维护与保养',
        description: '深入学习医疗设备的日常维护、定期保养和故障排除技术，延长设备使用寿命。',
        category: '维护保养',
        instructor: '李工程师',
        duration: 90,
        difficulty: 2,
        status: 'published',
        isRequired: true,
        enrolledCount: 32,
        maxStudents: 40,
        rating: 4.6,
        createdAt: '2024-01-20',
        thumbnail: '/course2.jpg'
      },
      {
        id: 3,
        title: '医疗安全与不良事件报告',
        description: '学习医疗安全管理体系，掌握不良事件的识别、报告和处理流程。',
        category: '安全管理',
        instructor: '王主任',
        duration: 60,
        difficulty: 1,
        status: 'draft',
        isRequired: false,
        enrolledCount: 18,
        maxStudents: 30,
        rating: 4.5,
        createdAt: '2024-02-01',
        thumbnail: '/course3.jpg'
      }
    ];

    // 模拟考试数据
    const mockExams = [
      {
        id: 1,
        title: '医疗设备操作资格认证考试',
        description: '检验医护人员对医疗设备操作规范的掌握程度',
        courseId: 1,
        totalScore: 100,
        passScore: 80,
        duration: 90,
        questionCount: 50,
        status: 'published',
        attemptCount: 45,
        passCount: 42,
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        title: '设备维护技能测试',
        description: '评估技术人员的设备维护和故障排除能力',
        courseId: 2,
        totalScore: 100,
        passScore: 75,
        duration: 60,
        questionCount: 30,
        status: 'published',
        attemptCount: 28,
        passCount: 25,
        createdAt: '2024-01-25'
      }
    ];

    setCourses(mockCourses);
    setExams(mockExams);
    setTotal(mockCourses.length);
  }, []);

  const showModal = (course = null) => {
    setEditingCourse(course);
    setModalVisible(true);
    if (course) {
      courseForm.setFieldsValue(course);
    } else {
      courseForm.resetFields();
    }
  };

  const showExamModal = (exam = null) => {
    setEditingExam(exam);
    setExamModalVisible(true);
    if (exam) {
      examForm.setFieldsValue(exam);
    } else {
      examForm.resetFields();
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingCourse(null);
    courseForm.resetFields();
  };

  const handleExamCancel = () => {
    setExamModalVisible(false);
    setEditingExam(null);
    examForm.resetFields();
  };

  const onFinish = async (values) => {
    try {
      if (editingCourse) {
        message.success('课程更新成功');
      } else {
        message.success('课程创建成功');
      }
      handleCancel();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const onExamFinish = async (values) => {
    try {
      if (editingExam) {
        message.success('考试更新成功');
      } else {
        message.success('考试创建成功');
      }
      handleExamCancel();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const getDifficultyBadge = (level) => {
    const levels = {
      1: { color: 'green', text: '初级' },
      2: { color: 'blue', text: '中级' },
      3: { color: 'red', text: '高级' }
    };
    const config = levels[level] || levels[1];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getStatusBadge = (status) => {
    const statuses = {
      draft: { color: 'default', text: '草稿' },
      published: { color: 'success', text: '已发布' },
      archived: { color: 'warning', text: '已归档' }
    };
    const config = statuses[status] || statuses.draft;
    return <Badge status={config.color} text={config.text} />;
  };

  const courseColumns = [
    {
      title: '课程信息',
      key: 'courseInfo',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar size={48} icon={<BookOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>
              {record.title}
              {record.isRequired && <Tag color="red" size="small" style={{ marginLeft: 8 }}>必修</Tag>}
            </div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.category} · {record.instructor}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (difficulty) => getDifficultyBadge(difficulty),
      width: 80,
    },
    {
      title: '学习人数',
      key: 'enrollment',
      render: (_, record) => (
        <div>
          <Progress 
            percent={(record.enrolledCount / record.maxStudents) * 100} 
            size="small" 
            format={() => `${record.enrolledCount}/${record.maxStudents}`}
          />
        </div>
      ),
      width: 120,
    },
    {
      title: '评分',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Rate disabled defaultValue={rating} style={{ fontSize: 12 }} />
          <Text style={{ fontSize: 12 }}>{rating}</Text>
        </div>
      ),
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusBadge(status),
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            size="small"
            ghost
          >
            查看
          </Button>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
            size="small"
          >
            编辑
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            ghost
          >
            删除
          </Button>
        </Space>
      ),
      width: 180,
    },
  ];

  const examColumns = [
    {
      title: '考试信息',
      key: 'examInfo',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>
            {record.title}
          </div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.description}
          </Text>
        </div>
      ),
    },
    {
      title: '总分/及格分',
      key: 'scores',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.totalScore}分</div>
          <Text type="secondary" style={{ fontSize: 12 }}>及格: {record.passScore}分</Text>
        </div>
      ),
      width: 120,
    },
    {
      title: '考试信息',
      key: 'examDetails',
      render: (_, record) => (
        <div>
          <div style={{ marginBottom: 4 }}>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            <Text style={{ fontSize: 12 }}>{record.duration}分钟</Text>
          </div>
          <div>
            <FileTextOutlined style={{ marginRight: 4 }} />
            <Text style={{ fontSize: 12 }}>{record.questionCount}题</Text>
          </div>
        </div>
      ),
      width: 120,
    },
    {
      title: '通过率',
      key: 'passRate',
      render: (_, record) => (
        <div>
          <Progress 
            percent={record.attemptCount > 0 ? (record.passCount / record.attemptCount) * 100 : 0} 
            size="small" 
            format={() => `${record.passCount}/${record.attemptCount}`}
          />
        </div>
      ),
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusBadge(status),
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            size="small"
            ghost
          >
            查看
          </Button>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showExamModal(record)}
            size="small"
          >
            编辑
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            ghost
          >
            删除
          </Button>
        </Space>
      ),
      width: 180,
    },
  ];

  const stats = {
    totalCourses: courses.length,
    publishedCourses: courses.filter(c => c.status === 'published').length,
    totalExams: exams.length,
    totalEnrollments: courses.reduce((sum, c) => sum + c.enrolledCount, 0)
  };

  return (
    <div className="training-management">
      {/* 页面标题区域 */}
      <div className="training-header">
        <h1 className="page-title">
          <BookOutlined className="page-icon" />
          培训考试管理
        </h1>
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
            size="large"
          >
            创建课程
          </Button>
          <Button 
            icon={<PlusOutlined />} 
            onClick={() => showExamModal()}
            size="large"
          >
            创建考试
          </Button>
        </Space>
      </div>

      {/* 统计卡片区域 */}
      <Row gutter={[16, 16]} className="training-stats">
        <Col xs={24} sm={12} lg={6}>
          <Card className="training-stats-card">
            <div className="stat-icon">
              <BookOutlined />
            </div>
            <h3>课程总数</h3>
            <div className="count">{stats.totalCourses}</div>
            <div className="trend">
              <span>↑ 8%</span>
              <span>较上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="training-stats-card">
            <div className="stat-icon">
              <CheckCircleOutlined />
            </div>
            <h3>已发布课程</h3>
            <div className="count">{stats.publishedCourses}</div>
            <div className="trend up">
              <span>↑ 12%</span>
              <span>活跃课程</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="training-stats-card">
            <div className="stat-icon">
              <FileTextOutlined />
            </div>
            <h3>考试总数</h3>
            <div className="count">{stats.totalExams}</div>
            <div className="trend">
              <span>→ 0%</span>
              <span>稳定运行</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="training-stats-card">
            <div className="stat-icon">
              <UserOutlined />
            </div>
            <h3>总学习人次</h3>
            <div className="count">{stats.totalEnrollments}</div>
            <div className="trend up">
              <span>↑ 15%</span>
              <span>参与度高</span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 主要内容区域 */}
      <Card className="training-content">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane 
            tab={
              <span>
                <BookOutlined />
                课程管理
              </span>
            } 
            key="courses"
          >
            <div className="tab-content">
              <div className="table-header">
                <Search
                  placeholder="搜索课程名称或讲师"
                  allowClear
                  enterButton={<SearchOutlined />}
                  style={{ width: 300 }}
                />
                <Space>
                  <Select placeholder="课程分类" style={{ width: 120 }}>
                    <Option value="all">全部分类</Option>
                    <Option value="设备操作">设备操作</Option>
                    <Option value="维护保养">维护保养</Option>
                    <Option value="安全管理">安全管理</Option>
                  </Select>
                  <Select placeholder="难度等级" style={{ width: 120 }}>
                    <Option value="all">全部等级</Option>
                    <Option value="1">初级</Option>
                    <Option value="2">中级</Option>
                    <Option value="3">高级</Option>
                  </Select>
                </Space>
              </div>
              
              <Table
                columns={courseColumns}
                dataSource={Array.isArray(courses) ? courses : []}
                rowKey="id"
                pagination={{
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
                }}
                size="middle"
              />
            </div>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <FileTextOutlined />
                考试管理
              </span>
            } 
            key="exams"
          >
            <div className="tab-content">
              <div className="table-header">
                <Search
                  placeholder="搜索考试名称"
                  allowClear
                  enterButton={<SearchOutlined />}
                  style={{ width: 300 }}
                />
                <Select placeholder="考试状态" style={{ width: 120 }}>
                  <Option value="all">全部状态</Option>
                  <Option value="draft">草稿</Option>
                  <Option value="published">已发布</Option>
                  <Option value="archived">已归档</Option>
                </Select>
              </div>
              
              <Table
                columns={examColumns}
                dataSource={Array.isArray(exams) ? exams : []}
                rowKey="id"
                pagination={{
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
                }}
                size="middle"
              />
            </div>
          </TabPane>
        </Tabs>
      </Card>

      {/* 课程创建/编辑弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOutlined />
            {editingCourse ? "编辑课程" : "创建课程"}
          </div>
        }
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <Form
          form={courseForm}
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="课程标题"
                rules={[{ required: true, message: '请输入课程标题' }]}
              >
                <Input placeholder="请输入课程标题" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="课程分类"
                rules={[{ required: true, message: '请选择课程分类' }]}
              >
                <Select placeholder="请选择课程分类">
                  <Option value="设备操作">设备操作</Option>
                  <Option value="维护保养">维护保养</Option>
                  <Option value="安全管理">安全管理</Option>
                  <Option value="其他">其他</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="课程描述"
            rules={[{ required: true, message: '请输入课程描述' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入课程描述" />
          </Form.Item>

          <Row gutter={[16, 0]}>
            <Col span={8}>
              <Form.Item
                name="instructor"
                label="讲师"
                rules={[{ required: true, message: '请输入讲师姓名' }]}
              >
                <Input placeholder="请输入讲师姓名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="duration"
                label="课程时长(分钟)"
                rules={[{ required: true, message: '请输入课程时长' }]}
              >
                <Input type="number" placeholder="请输入课程时长" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="difficulty"
                label="难度等级"
                rules={[{ required: true, message: '请选择难度等级' }]}
              >
                <Select placeholder="请选择难度等级">
                  <Option value={1}>初级</Option>
                  <Option value={2}>中级</Option>
                  <Option value={3}>高级</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={8}>
              <Form.Item
                name="maxStudents"
                label="最大学生数"
                rules={[{ required: true, message: '请输入最大学生数' }]}
              >
                <Input type="number" placeholder="请输入最大学生数" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  <Option value="draft">草稿</Option>
                  <Option value="published">已发布</Option>
                  <Option value="archived">已归档</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="isRequired"
                label="是否必修"
                valuePropName="checked"
              >
                <Select placeholder="请选择是否必修">
                  <Option value={true}>必修</Option>
                  <Option value={false}>选修</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" htmlType="submit">
                {editingCourse ? "更新课程" : "创建课程"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 考试创建/编辑弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileTextOutlined />
            {editingExam ? "编辑考试" : "创建考试"}
          </div>
        }
        open={examModalVisible}
        onCancel={handleExamCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form
          form={examForm}
          onFinish={onExamFinish}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="考试标题"
            rules={[{ required: true, message: '请输入考试标题' }]}
          >
            <Input placeholder="请输入考试标题" />
          </Form.Item>

          <Form.Item
            name="description"
            label="考试描述"
            rules={[{ required: true, message: '请输入考试描述' }]}
          >
            <Input.TextArea rows={2} placeholder="请输入考试描述" />
          </Form.Item>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="totalScore"
                label="总分"
                rules={[{ required: true, message: '请输入总分' }]}
              >
                <Input type="number" placeholder="请输入总分" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="passScore"
                label="及格分"
                rules={[{ required: true, message: '请输入及格分' }]}
              >
                <Input type="number" placeholder="请输入及格分" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="考试时长(分钟)"
                rules={[{ required: true, message: '请输入考试时长' }]}
              >
                <Input type="number" placeholder="请输入考试时长" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="questionCount"
                label="题目数量"
                rules={[{ required: true, message: '请输入题目数量' }]}
              >
                <Input type="number" placeholder="请输入题目数量" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="draft">草稿</Option>
              <Option value="published">已发布</Option>
              <Option value="archived">已归档</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleExamCancel}>取消</Button>
              <Button type="primary" htmlType="submit">
                {editingExam ? "更新考试" : "创建考试"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TrainingManagement;