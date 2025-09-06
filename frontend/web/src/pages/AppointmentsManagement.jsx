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
  DatePicker,
  TimePicker,
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
  Cascader
} from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  UserOutlined,
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
  PhoneOutlined
} from '@ant-design/icons';
import './AppointmentsManagement.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const AppointmentsManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();

  // 模拟数据
  useEffect(() => {
    const mockAppointments = [
      {
        id: 1,
        patientName: '张三',
        patientId: 'P001',
        doctorName: '李医生',
        doctorId: 'D001',
        department: '内科',
        appointmentDate: '2024-01-16',
        appointmentTime: '09:00',
        appointmentType: '门诊',
        status: '已确认',
        contactPhone: '13800138001',
        symptoms: '咳嗽，发热',
        priority: '普通',
        notes: '患者有高血压病史',
        createTime: '2024-01-15 14:30',
        updateTime: '2024-01-15 15:00'
      },
      {
        id: 2,
        patientName: '李四',
        patientId: 'P002',
        doctorName: '王医生',
        doctorId: 'D002',
        department: '外科',
        appointmentDate: '2024-01-16',
        appointmentTime: '10:30',
        appointmentType: '复查',
        status: '待确认',
        contactPhone: '13800138002',
        symptoms: '术后复查',
        priority: '普通',
        notes: '两周前做过手术',
        createTime: '2024-01-14 16:20',
        updateTime: '2024-01-14 16:20'
      },
      {
        id: 3,
        patientName: '王五',
        patientId: 'P003',
        doctorName: '赵医生',
        doctorId: 'D003',
        department: '儿科',
        appointmentDate: '2024-01-16',
        appointmentTime: '14:00',
        appointmentType: '急诊',
        status: '已完成',
        contactPhone: '13800138003',
        symptoms: '高烧不退',
        priority: '紧急',
        notes: '儿童，需要优先安排',
        createTime: '2024-01-16 08:15',
        updateTime: '2024-01-16 14:30'
      },
      {
        id: 4,
        patientName: '赵六',
        patientId: 'P004',
        doctorName: '刘医生',
        doctorId: 'D004',
        department: '妇科',
        appointmentDate: '2024-01-17',
        appointmentTime: '09:30',
        appointmentType: '初诊',
        status: '已取消',
        contactPhone: '13800138004',
        symptoms: '常规检查',
        priority: '普通',
        notes: '患者临时有事取消',
        createTime: '2024-01-15 10:00',
        updateTime: '2024-01-16 09:00'
      }
    ];

    const mockDoctors = [
      { id: 'D001', name: '李医生', department: '内科', title: '主任医师', avatar: '', specialty: '心血管疾病', schedule: '周一至周五' },
      { id: 'D002', name: '王医生', department: '外科', title: '副主任医师', avatar: '', specialty: '普外科手术', schedule: '周一至周六' },
      { id: 'D003', name: '赵医生', department: '儿科', title: '主治医师', avatar: '', specialty: '儿童常见病', schedule: '周一至周日' },
      { id: 'D004', name: '刘医生', department: '妇科', title: '主治医师', avatar: '', specialty: '妇科疾病', schedule: '周二至周日' }
    ];

    const mockPatients = [
      { id: 'P001', name: '张三', gender: '男', age: 45, phone: '13800138001', idCard: '110101198001011234', address: '北京市朝阳区' },
      { id: 'P002', name: '李四', gender: '女', age: 32, phone: '13800138002', idCard: '110101199201012345', address: '北京市海淀区' },
      { id: 'P003', name: '王五', gender: '男', age: 8, phone: '13800138003', idCard: '110101201601013456', address: '北京市西城区' },
      { id: 'P004', name: '赵六', gender: '女', age: 28, phone: '13800138004', idCard: '110101199601014567', address: '北京市东城区' }
    ];

    const mockDepartments = [
      { id: 1, name: '内科', doctors: 12, appointmentsToday: 45 },
      { id: 2, name: '外科', doctors: 8, appointmentsToday: 32 },
      { id: 3, name: '儿科', doctors: 6, appointmentsToday: 28 },
      { id: 4, name: '妇科', doctors: 5, appointmentsToday: 20 },
      { id: 5, name: '急诊科', doctors: 4, appointmentsToday: 15 }
    ];

    const mockSchedule = [
      {
        id: 1,
        doctorName: '李医生',
        department: '内科',
        date: '2024-01-16',
        timeSlot: '09:00-12:00',
        totalSlots: 20,
        bookedSlots: 15,
        availableSlots: 5,
        status: '可预约'
      },
      {
        id: 2,
        doctorName: '王医生',
        department: '外科',
        date: '2024-01-16',
        timeSlot: '14:00-17:00',
        totalSlots: 15,
        bookedSlots: 12,
        availableSlots: 3,
        status: '可预约'
      },
      {
        id: 3,
        doctorName: '赵医生',
        department: '儿科',
        date: '2024-01-16',
        timeSlot: '09:00-12:00',
        totalSlots: 25,
        bookedSlots: 25,
        availableSlots: 0,
        status: '已满'
      }
    ];

    setAppointments(mockAppointments);
    setDoctors(mockDoctors);
    setPatients(mockPatients);
    setDepartments(mockDepartments);
    setSchedule(mockSchedule);
  }, []);

  // 统计数据
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.status === '已确认').length;
  const pendingAppointments = appointments.filter(a => a.status === '待确认').length;
  const completedAppointments = appointments.filter(a => a.status === '已完成').length;
  const cancelledAppointments = appointments.filter(a => a.status === '已取消').length;

  const todayAppointments = appointments.filter(a => a.appointmentDate === '2024-01-16').length;
  const emergencyAppointments = appointments.filter(a => a.priority === '紧急').length;

  // 表格列定义
  const appointmentColumns = [
    {
      title: '预约时间',
      key: 'appointmentTime',
      render: (_, record) => (
        <div>
          <Text strong>{record.appointmentDate}</Text>
          <br />
          <Text type="secondary">{record.appointmentTime}</Text>
        </div>
      )
    },
    {
      title: '患者信息',
      key: 'patientInfo',
      render: (_, record) => (
        <div>
          <Text strong>{record.patientName}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.patientId} | {record.contactPhone}
          </Text>
        </div>
      )
    },
    {
      title: '医生信息',
      key: 'doctorInfo',
      render: (_, record) => (
        <div>
          <Text strong>{record.doctorName}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.department}
          </Text>
        </div>
      )
    },
    {
      title: '预约类型',
      dataIndex: 'appointmentType',
      key: 'appointmentType',
      render: (type) => {
        const colors = {
          '门诊': 'blue',
          '复查': 'green',
          '急诊': 'red',
          '初诊': 'orange'
        };
        return <Tag color={colors[type] || 'default'}>{type}</Tag>;
      }
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        const colors = {
          '紧急': 'red',
          '重要': 'orange',
          '普通': 'green'
        };
        return <Tag color={colors[priority] || 'default'}>{priority}</Tag>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          '已确认': { status: 'success', color: 'green' },
          '待确认': { status: 'warning', color: 'orange' },
          '已完成': { status: 'processing', color: 'blue' },
          '已取消': { status: 'error', color: 'red' }
        };
        const config = statusConfig[status] || { status: 'default', color: 'default' };
        return <Badge status={config.status} text={status} />;
      }
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
              onClick={() => handleViewDetail(record, 'appointment')}
            />
          </Tooltip>
          {record.status === '待确认' && (
            <Tooltip title="确认预约">
              <Button 
                type="text" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleConfirmAppointment(record)}
              />
            </Tooltip>
          )}
          {record.status !== '已完成' && record.status !== '已取消' && (
            <Tooltip title="取消预约">
              <Button 
                type="text" 
                icon={<CloseCircleOutlined />}
                onClick={() => handleCancelAppointment(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record, 'appointment')}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const doctorColumns = [
    {
      title: '医生信息',
      key: 'doctorInfo',
      render: (_, record) => (
        <div>
          <Text strong>{record.name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.title} | {record.department}
          </Text>
        </div>
      )
    },
    {
      title: '专长',
      dataIndex: 'specialty',
      key: 'specialty'
    },
    {
      title: '排班时间',
      dataIndex: 'schedule',
      key: 'schedule'
    },
    {
      title: '今日预约',
      key: 'todayAppointments',
      render: (_, record) => {
        const todayCount = appointments.filter(a => 
          a.doctorId === record.id && a.appointmentDate === '2024-01-16'
        ).length;
        return todayCount;
      }
    },
    {
      title: '状态',
      key: 'status',
      render: (_, record) => {
        const todayCount = appointments.filter(a => 
          a.doctorId === record.id && a.appointmentDate === '2024-01-16'
        ).length;
        const maxAppointments = 20; // 假设每天最多20个预约
        const status = todayCount >= maxAppointments ? 'error' : 
                      todayCount >= maxAppointments * 0.8 ? 'warning' : 'success';
        const statusText = todayCount >= maxAppointments ? '已满' : 
                         todayCount >= maxAppointments * 0.8 ? '即将满员' : '可预约';
        return <Badge status={status} text={statusText} />;
      }
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
              onClick={() => handleViewDetail(record, 'doctor')}
            />
          </Tooltip>
          <Tooltip title="预约">
            <Button 
              type="primary" 
              size="small"
              onClick={() => handleBookAppointment(record)}
            >
              预约
            </Button>
          </Tooltip>
        </Space>
      )
    }
  ];

  const scheduleColumns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: '时间段',
      dataIndex: 'timeSlot',
      key: 'timeSlot'
    },
    {
      title: '医生',
      dataIndex: 'doctorName',
      key: 'doctorName'
    },
    {
      title: '科室',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: '预约情况',
      key: 'bookingStatus',
      render: (_, record) => (
        <div>
          <Progress 
            percent={Math.round((record.bookedSlots / record.totalSlots) * 100)}
            size="small"
            status={record.availableSlots === 0 ? 'exception' : 'normal'}
          />
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.bookedSlots}/{record.totalSlots}
          </div>
        </div>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === '可预约' ? 'success' : status === '已满' ? 'error' : 'warning'}
          text={status}
        />
      )
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.status === '可预约' && (
            <Tooltip title="预约">
              <Button 
                type="primary" 
                size="small"
                onClick={() => handleBookAppointment(record)}
              >
                预约
              </Button>
            </Tooltip>
          )}
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              onClick={() => handleViewDetail(record, 'schedule')}
            />
          </Tooltip>
        </Space>
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

  const handleBookAppointment = (record) => {
    setSelectedRecord({ ...record, type: 'book' });
    setModalVisible(true);
    setModalType('book');
    form.resetFields();
    if (record.id) {
      form.setFieldsValue({
        doctorId: record.id,
        doctorName: record.name,
        department: record.department
      });
    }
  };

  const handleConfirmAppointment = (record) => {
    setAppointments(prev => prev.map(appointment => 
      appointment.id === record.id ? { ...appointment, status: '已确认' } : appointment
    ));
    message.success('预约已确认');
  };

  const handleCancelAppointment = (record) => {
    setAppointments(prev => prev.map(appointment => 
      appointment.id === record.id ? { ...appointment, status: '已取消' } : appointment
    ));
    message.success('预约已取消');
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
      case 'appointment':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="预约时间">
              {selectedRecord.appointmentDate} {selectedRecord.appointmentTime}
            </Descriptions.Item>
            <Descriptions.Item label="预约类型">{selectedRecord.appointmentType}</Descriptions.Item>
            <Descriptions.Item label="患者姓名">{selectedRecord.patientName}</Descriptions.Item>
            <Descriptions.Item label="患者ID">{selectedRecord.patientId}</Descriptions.Item>
            <Descriptions.Item label="医生姓名">{selectedRecord.doctorName}</Descriptions.Item>
            <Descriptions.Item label="科室">{selectedRecord.department}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{selectedRecord.contactPhone}</Descriptions.Item>
            <Descriptions.Item label="优先级">{selectedRecord.priority}</Descriptions.Item>
            <Descriptions.Item label="症状">{selectedRecord.symptoms}</Descriptions.Item>
            <Descriptions.Item label="状态">{selectedRecord.status}</Descriptions.Item>
            <Descriptions.Item label="备注" span={2}>{selectedRecord.notes}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{selectedRecord.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{selectedRecord.updateTime}</Descriptions.Item>
          </Descriptions>
        );

      case 'doctor':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="医生姓名">{selectedRecord.name}</Descriptions.Item>
            <Descriptions.Item label="职称">{selectedRecord.title}</Descriptions.Item>
            <Descriptions.Item label="科室">{selectedRecord.department}</Descriptions.Item>
            <Descriptions.Item label="专长">{selectedRecord.specialty}</Descriptions.Item>
            <Descriptions.Item label="排班时间">{selectedRecord.schedule}</Descriptions.Item>
            <Descriptions.Item label="今日预约">
              {appointments.filter(a => a.doctorId === selectedRecord.id && a.appointmentDate === '2024-01-16').length}
            </Descriptions.Item>
          </Descriptions>
        );

      case 'schedule':
        return (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="日期">{selectedRecord.date}</Descriptions.Item>
            <Descriptions.Item label="时间段">{selectedRecord.timeSlot}</Descriptions.Item>
            <Descriptions.Item label="医生">{selectedRecord.doctorName}</Descriptions.Item>
            <Descriptions.Item label="科室">{selectedRecord.department}</Descriptions.Item>
            <Descriptions.Item label="总号源">{selectedRecord.totalSlots}</Descriptions.Item>
            <Descriptions.Item label="已预约">{selectedRecord.bookedSlots}</Descriptions.Item>
            <Descriptions.Item label="剩余号源">{selectedRecord.availableSlots}</Descriptions.Item>
            <Descriptions.Item label="状态">{selectedRecord.status}</Descriptions.Item>
          </Descriptions>
        );

      default:
        return null;
    }
  };

  return (
    <div className="appointments-management">
      {/* 页面标题 */}
      <div className="appointments-header">
        <Title level={2} className="page-title">
          <CalendarOutlined className="page-icon" />
          预约管理
        </Title>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="appointments-stats">
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="总预约数"
              value={totalAppointments}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="已确认"
              value={confirmedAppointments}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="待确认"
              value={pendingAppointments}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="已完成"
              value={completedAppointments}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="已取消"
              value={cancelledAppointments}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="stats-card">
            <Statistic
              title="今日预约"
              value={todayAppointments}
              prefix={<BellOutlined />}
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card className="appointments-content">
        <Tabs defaultActiveKey="appointments" className="appointments-tabs">
          <TabPane 
            tab={
              <span>
                <CalendarOutlined />
                预约列表
              </span>
            } 
            key="appointments"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd('appointment')}
                  >
                    新增预约
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
                    <Select.Option value="confirmed">已确认</Select.Option>
                    <Select.Option value="pending">待确认</Select.Option>
                    <Select.Option value="completed">已完成</Select.Option>
                    <Select.Option value="cancelled">已取消</Select.Option>
                  </Select>
                  <DatePicker placeholder="选择日期" style={{ width: 120 }} />
                  <Input.Search
                    placeholder="搜索预约..."
                    style={{ width: 200 }}
                    prefix={<SearchOutlined />}
                  />
                </Space>
              </div>
              <Table
                columns={appointmentColumns}
                dataSource={appointments}
                rowKey="id"
                pagination={{
                  total: appointments.length,
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
                <UserOutlined />
                医生排班
              </span>
            } 
            key="doctors"
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
                  <Select placeholder="选择科室" style={{ width: 120 }}>
                    <Select.Option value="all">全部科室</Select.Option>
                    {departments.map(dept => (
                      <Select.Option key={dept.id} value={dept.name}>
                        {dept.name}
                      </Select.Option>
                    ))}
                  </Select>
                  <Input.Search
                    placeholder="搜索医生..."
                    style={{ width: 200 }}
                    prefix={<SearchOutlined />}
                  />
                </Space>
              </div>
              <Table
                columns={doctorColumns}
                dataSource={doctors}
                rowKey="id"
                pagination={{
                  total: doctors.length,
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
                <ClockCircleOutlined />
                排班管理
              </span>
            } 
            key="schedule"
          >
            <div className="tab-content">
              <div className="table-header">
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd('schedule')}
                  >
                    添加排班
                  </Button>
                  <Button 
                    icon={<FileTextOutlined />}
                    onClick={() => message.info('导出功能正在开发中')}
                  >
                    导出
                  </Button>
                </Space>
                <Space>
                  <DatePicker placeholder="选择日期" style={{ width: 120 }} />
                  <Select placeholder="选择科室" style={{ width: 120 }}>
                    <Select.Option value="all">全部科室</Select.Option>
                    {departments.map(dept => (
                      <Select.Option key={dept.id} value={dept.name}>
                        {dept.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Space>
              </div>
              <Table
                columns={scheduleColumns}
                dataSource={schedule}
                rowKey="id"
                pagination={{
                  total: schedule.length,
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
               modalType === 'edit' ? '编辑预约' : 
               modalType === 'book' ? '预约挂号' : '新增预约'}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        footer={modalType === 'view' ? [
          <Button key="close" onClick={handleModalCancel}>
            关闭
          </Button>
        ] : [
          <Button key="cancel" onClick={handleModalCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleModalOk}>
            {modalType === 'edit' ? '保存' : modalType === 'book' ? '确认预约' : '添加'}
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
                  name="patientName"
                  label="患者姓名"
                  rules={[{ required: true, message: '请输入患者姓名' }]}
                >
                  <Input placeholder="请输入患者姓名" />
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
                  name="department"
                  label="科室"
                  rules={[{ required: true, message: '请选择科室' }]}
                >
                  <Select placeholder="请选择科室">
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
                  name="doctorId"
                  label="医生"
                  rules={[{ required: true, message: '请选择医生' }]}
                >
                  <Select placeholder="请选择医生">
                    {doctors.map(doctor => (
                      <Select.Option key={doctor.id} value={doctor.id}>
                        {doctor.name} ({doctor.department})
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="appointmentDate"
                  label="预约日期"
                  rules={[{ required: true, message: '请选择预约日期' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="appointmentTime"
                  label="预约时间"
                  rules={[{ required: true, message: '请选择预约时间' }]}
                >
                  <TimePicker style={{ width: '100%' }} format="HH:mm" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="appointmentType"
                  label="预约类型"
                  rules={[{ required: true, message: '请选择预约类型' }]}
                >
                  <Select placeholder="请选择预约类型">
                    <Select.Option value="门诊">门诊</Select.Option>
                    <Select.Option value="复查">复查</Select.Option>
                    <Select.Option value="急诊">急诊</Select.Option>
                    <Select.Option value="初诊">初诊</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="priority"
                  label="优先级"
                  rules={[{ required: true, message: '请选择优先级' }]}
                >
                  <Select placeholder="请选择优先级">
                    <Select.Option value="紧急">紧急</Select.Option>
                    <Select.Option value="重要">重要</Select.Option>
                    <Select.Option value="普通">普通</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="symptoms"
              label="症状描述"
              rules={[{ required: true, message: '请输入症状描述' }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="请输入症状描述"
              />
            </Form.Item>

            <Form.Item
              name="notes"
              label="备注"
            >
              <Input.TextArea
                rows={2}
                placeholder="请输入备注信息"
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default AppointmentsManagement;