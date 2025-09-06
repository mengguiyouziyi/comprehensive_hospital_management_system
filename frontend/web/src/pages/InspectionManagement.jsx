import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  message,
  Tabs,
  Statistic,
  Row,
  Col,
  Progress,
  Badge,
  Tooltip,
  Typography,
  Divider,
  Radio,
  Checkbox,
  Upload,
  Image,
  Rate,
  Timeline,
  Descriptions,
  Popconfirm,
  Alert
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  BellOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  CameraOutlined,
  VideoCameraOutlined,
  AudioOutlined,
  QrcodeOutlined,
  MobileOutlined,
  WarningOutlined,
  SafetyOutlined,
  BarChartOutlined,
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  ReloadOutlined,
  FilterOutlined,
  ExportOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const InspectionManagement = () => {
  const [inspectionPlans, setInspectionPlans] = useState([]);
  const [inspectionExecutions, setInspectionExecutions] = useState([]);
  const [inspectionTemplates, setInspectionTemplates] = useState([]);
  const [abnormalIssues, setAbnormalIssues] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [executionModalVisible, setExecutionModalVisible] = useState(false);
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [issueModalVisible, setIssueModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [executionForm] = Form.useForm();
  const [templateForm] = Form.useForm();
  const [issueForm] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('plans');
  const [filterForm] = Form.useForm();

  // 设备类型选项
  const equipmentTypes = [
    'CT设备', 'DR设备', '超声设备', 'MRI设备', '监护仪', '麻醉机',
    '呼吸机', '心电图机', '内窥镜设备', '检验设备', '放射治疗设备', '其他'
  ];

  // 科室选项
  const departments = [
    '放射科', '检验科', '超声科', '内科', '外科', '妇产科', '儿科',
    '急诊科', 'ICU', '手术室', '眼科', '耳鼻喉科', '口腔科', '康复科'
  ];

  // 巡检频率选项
  const frequencies = [
    { value: 'daily', label: '每日' },
    { value: 'weekly', label: '每周' },
    { value: 'monthly', label: '每月' },
    { value: 'quarterly', label: '每季度' },
    { value: 'semi_annual', label: '每半年' },
    { value: 'yearly', label: '每年' }
  ];

  // 巡检状态选项
  const statuses = [
    { value: 'pending', label: '待执行', color: 'orange' },
    { value: 'in_progress', label: '执行中', color: 'blue' },
    { value: 'completed', label: '已完成', color: 'green' },
    { value: 'overdue', label: '已逾期', color: 'red' },
    { value: 'cancelled', label: '已取消', color: 'gray' }
  ];

  // 优先级选项
  const priorities = [
    { value: 'high', label: '高', color: 'red' },
    { value: 'medium', label: '中', color: 'orange' },
    { value: 'low', label: '低', color: 'green' }
  ];

  // 异常等级选项
  const severityLevels = [
    { value: 'critical', label: '严重', color: 'red' },
    { value: 'major', label: '重要', color: 'orange' },
    { value: 'minor', label: '一般', color: 'blue' },
    { value: 'info', label: '提示', color: 'green' }
  ];

  // 初始化数据
  useEffect(() => {
    fetchInspectionPlans();
    fetchInspectionExecutions();
    fetchInspectionTemplates();
    fetchAbnormalIssues();
    fetchStatistics();
  }, []);

  const fetchInspectionPlans = () => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          planName: 'CT设备日常巡检',
          equipmentType: 'CT设备',
          equipmentId: 'CT001',
          department: '放射科',
          frequency: 'daily',
          priority: 'high',
          status: 'active',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          responsiblePerson: '张三',
          description: 'CT设备的日常巡检计划，包括设备外观检查、功能测试等',
          templateId: 1,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        },
        {
          id: 2,
          planName: '超声设备周检',
          equipmentType: '超声设备',
          equipmentId: 'US001',
          department: '超声科',
          frequency: 'weekly',
          priority: 'medium',
          status: 'active',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          responsiblePerson: '李四',
          description: '超声设备的周检计划',
          templateId: 2,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        }
      ];
      setInspectionPlans(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchInspectionExecutions = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          planId: 1,
          planName: 'CT设备日常巡检',
          equipmentType: 'CT设备',
          equipmentId: 'CT001',
          department: '放射科',
          executionDate: '2024-01-15',
          executor: '张三',
          status: 'completed',
          result: 'normal',
          score: 95,
          findings: '设备运行正常，各项指标符合标准',
          issues: [],
          images: [],
          startTime: '2024-01-15 09:00',
          endTime: '2024-01-15 10:30',
          duration: 90,
          location: '放射科CT室',
          weather: '晴朗',
          temperature: 22,
          humidity: 65
        },
        {
          id: 2,
          planId: 2,
          planName: '超声设备周检',
          equipmentType: '超声设备',
          equipmentId: 'US001',
          department: '超声科',
          executionDate: '2024-01-14',
          executor: '李四',
          status: 'in_progress',
          result: 'abnormal',
          score: 75,
          findings: '发现图像质量略有下降，建议进一步检查',
          issues: [1],
          images: ['image1.jpg'],
          startTime: '2024-01-14 14:00',
          endTime: null,
          duration: 45,
          location: '超声科检查室',
          weather: '多云',
          temperature: 20,
          humidity: 70
        }
      ];
      setInspectionExecutions(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchInspectionTemplates = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          templateName: 'CT设备巡检模板',
          equipmentType: 'CT设备',
          version: '1.0',
          status: 'active',
          items: [
            { id: 1, name: '外观检查', type: 'visual', standard: '无破损、无变形', required: true },
            { id: 2, name: '电源检查', type: 'test', standard: '电压稳定', required: true },
            { id: 3, name: '功能测试', type: 'test', standard: '各项功能正常', required: true },
            { id: 4, name: '图像质量', type: 'measurement', standard: '图像清晰', required: true }
          ],
          description: 'CT设备标准巡检模板',
          createdBy: '系统管理员',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        },
        {
          id: 2,
          templateName: '超声设备巡检模板',
          equipmentType: '超声设备',
          version: '1.0',
          status: 'active',
          items: [
            { id: 1, name: '探头检查', type: 'visual', standard: '无损伤', required: true },
            { id: 2, name: '图像质量', type: 'test', standard: '图像清晰', required: true },
            { id: 3, name: '功能测试', type: 'test', standard: '各项功能正常', required: true }
          ],
          description: '超声设备标准巡检模板',
          createdBy: '系统管理员',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        }
      ];
      setInspectionTemplates(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchAbnormalIssues = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          executionId: 2,
          equipmentType: '超声设备',
          equipmentId: 'US001',
          issueType: 'image_quality',
          description: '图像质量下降，影响诊断效果',
          severity: 'major',
          status: 'pending',
          discoverer: '李四',
          discoveryDate: '2024-01-14',
          images: ['issue1.jpg'],
          videos: [],
          audioNotes: 'audio1.mp3',
          suggestedAction: '建议联系厂家进行维修',
          assignedTo: '维修部',
          estimatedRepairTime: '3天',
          actualRepairTime: null,
          repairCost: null,
          rootCause: '可能为探头老化或电路问题',
          preventiveAction: '增加检查频率，及时发现问题'
        }
      ];
      setAbnormalIssues(mockData);
      setLoading(false);
    }, 1000);
  };

  const fetchStatistics = () => {
    setTimeout(() => {
      const mockData = {
        totalPlans: 25,
        activePlans: 20,
        completedExecutions: 156,
        pendingExecutions: 12,
        abnormalIssues: 8,
        resolvedIssues: 45,
        completionRate: 92.8,
        abnormalRate: 4.2,
        averageScore: 88.5,
        totalEquipment: 120,
        inspectedEquipment: 115,
        inspectionCoverage: 95.8
      };
      setStatistics(mockData);
    }, 500);
  };

  const handleCreatePlan = () => {
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditPlan = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDeletePlan = (id) => {
    setInspectionPlans(inspectionPlans.filter(item => item.id !== id));
    message.success('删除成功');
  };

  const handleCreateExecution = () => {
    setCurrentRecord(null);
    executionForm.resetFields();
    setExecutionModalVisible(true);
  };

  const handleCreateTemplate = () => {
    setCurrentRecord(null);
    templateForm.resetFields();
    setTemplateModalVisible(true);
  };

  const handleCreateIssue = () => {
    setCurrentRecord(null);
    issueForm.resetFields();
    setIssueModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      setLoading(true);
      const newPlan = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setInspectionPlans(inspectionPlans.map(item => 
          item.id === currentRecord.id ? newPlan : item
        ));
        message.success('更新成功');
      } else {
        setInspectionPlans([...inspectionPlans, newPlan]);
        message.success('创建成功');
      }
      
      setModalVisible(false);
      setLoading(false);
    });
  };

  const handleExecutionModalOk = () => {
    executionForm.validateFields().then(values => {
      setLoading(true);
      const newExecution = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setInspectionExecutions(inspectionExecutions.map(item => 
          item.id === currentRecord.id ? newExecution : item
        ));
        message.success('更新成功');
      } else {
        setInspectionExecutions([...inspectionExecutions, newExecution]);
        message.success('创建成功');
      }
      
      setExecutionModalVisible(false);
      setLoading(false);
    });
  };

  const handleTemplateModalOk = () => {
    templateForm.validateFields().then(values => {
      setLoading(true);
      const newTemplate = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setInspectionTemplates(inspectionTemplates.map(item => 
          item.id === currentRecord.id ? newTemplate : item
        ));
        message.success('更新成功');
      } else {
        setInspectionTemplates([...inspectionTemplates, newTemplate]);
        message.success('创建成功');
      }
      
      setTemplateModalVisible(false);
      setLoading(false);
    });
  };

  const handleIssueModalOk = () => {
    issueForm.validateFields().then(values => {
      setLoading(true);
      const newIssue = {
        id: currentRecord ? currentRecord.id : Date.now(),
        ...values,
        createdAt: currentRecord ? currentRecord.createdAt : moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      };
      
      if (currentRecord) {
        setAbnormalIssues(abnormalIssues.map(item => 
          item.id === currentRecord.id ? newIssue : item
        ));
        message.success('更新成功');
      } else {
        setAbnormalIssues([...abnormalIssues, newIssue]);
        message.success('创建成功');
      }
      
      setIssueModalVisible(false);
      setLoading(false);
    });
  };

  const planColumns = [
    {
      title: '计划名称',
      dataIndex: 'planName',
      key: 'planName',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: '设备类型',
      dataIndex: 'equipmentType',
      key: 'equipmentType',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: '设备编号',
      dataIndex: 'equipmentId',
      key: 'equipmentId'
    },
    {
      title: '科室',
      dataIndex: 'department',
      key: 'department',
      render: (text) => <Tag color="green">{text}</Tag>
    },
    {
      title: '巡检频率',
      dataIndex: 'frequency',
      key: 'frequency',
      render: (text) => {
        const frequency = frequencies.find(f => f.value === text);
        return <Tag color="purple">{frequency ? frequency.label : text}</Tag>;
      }
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (text) => {
        const priority = priorities.find(p => p.value === text);
        return <Tag color={priority ? priority.color : 'default'}>{priority ? priority.label : text}</Tag>;
      }
    },
    {
      title: '负责人',
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const statusMap = {
          active: { color: 'green', text: '激活' },
          inactive: { color: 'red', text: '停用' },
          paused: { color: 'orange', text: '暂停' }
        };
        const status = statusMap[text] || { color: 'default', text: text };
        return <Tag color={status.color}>{status.text}</Tag>;
      }
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate'
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setCurrentRecord(record);
              // 显示详情
            }}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditPlan(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个巡检计划吗？"
            onConfirm={() => handleDeletePlan(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const executionColumns = [
    {
      title: '计划名称',
      dataIndex: 'planName',
      key: 'planName',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: '设备类型',
      dataIndex: 'equipmentType',
      key: 'equipmentType',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: '设备编号',
      dataIndex: 'equipmentId',
      key: 'equipmentId'
    },
    {
      title: '科室',
      dataIndex: 'department',
      key: 'department',
      render: (text) => <Tag color="green">{text}</Tag>
    },
    {
      title: '执行日期',
      dataIndex: 'executionDate',
      key: 'executionDate'
    },
    {
      title: '执行人',
      dataIndex: 'executor',
      key: 'executor'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const status = statuses.find(s => s.value === text);
        return <Tag color={status ? status.color : 'default'}>{status ? status.label : text}</Tag>;
      }
    },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      render: (text) => {
        const resultMap = {
          normal: { color: 'green', text: '正常' },
          abnormal: { color: 'red', text: '异常' },
          warning: { color: 'orange', text: '警告' }
        };
        const result = resultMap[text] || { color: 'default', text: text };
        return <Tag color={result.color}>{result.text}</Tag>;
      }
    },
    {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
      render: (score) => (
        <Rate
          disabled
          count={5}
          value={Math.floor(score / 20)}
          style={{ color: score >= 80 ? '#52c41a' : score >= 60 ? '#faad14' : '#f5222d' }}
        />
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setCurrentRecord(record);
              // 显示详情
            }}
          >
            详情
          </Button>
        </Space>
      )
    }
  ];

  const templateColumns = [
    {
      title: '模板名称',
      dataIndex: 'templateName',
      key: 'templateName',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: '设备类型',
      dataIndex: 'equipmentType',
      key: 'equipmentType',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const statusMap = {
          active: { color: 'green', text: '激活' },
          inactive: { color: 'red', text: '停用' },
          draft: { color: 'orange', text: '草稿' }
        };
        const status = statusMap[text] || { color: 'default', text: text };
        return <Tag color={status.color}>{status.text}</Tag>;
      }
    },
    {
      title: '检查项数量',
      dataIndex: 'items',
      key: 'items',
      render: (items) => <Badge count={items.length} showZero color="blue" />
    },
    {
      title: '创建者',
      dataIndex: 'createdBy',
      key: 'createdBy'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setCurrentRecord(record);
              // 显示详情
            }}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentRecord(record);
              templateForm.setFieldsValue(record);
              setTemplateModalVisible(true);
            }}
          >
            编辑
          </Button>
        </Space>
      )
    }
  ];

  const issueColumns = [
    {
      title: '设备类型',
      dataIndex: 'equipmentType',
      key: 'equipmentType',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: '设备编号',
      dataIndex: 'equipmentId',
      key: 'equipmentId'
    },
    {
      title: '问题描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      render: (text) => {
        const severity = severityLevels.find(s => s.value === text);
        return <Tag color={severity ? severity.color : 'default'}>{severity ? severity.label : text}</Tag>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const statusMap = {
          pending: { color: 'orange', text: '待处理' },
          in_progress: { color: 'blue', text: '处理中' },
          resolved: { color: 'green', text: '已解决' },
          closed: { color: 'gray', text: '已关闭' }
        };
        const status = statusMap[text] || { color: 'default', text: text };
        return <Tag color={status.color}>{status.text}</Tag>;
      }
    },
    {
      title: '发现人',
      dataIndex: 'discoverer',
      key: 'discoverer'
    },
    {
      title: '发现日期',
      dataIndex: 'discoveryDate',
      key: 'discoveryDate'
    },
    {
      title: '负责人',
      dataIndex: 'assignedTo',
      key: 'assignedTo'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setCurrentRecord(record);
              // 显示详情
            }}
          >
            详情
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>
            <SafetyOutlined /> 医疗设备巡检管理
          </Title>
          <Text type="secondary">
            管理医疗设备的巡检计划、执行记录、模板库和异常问题
          </Text>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="巡检计划总数"
                value={statistics.totalPlans || 0}
                prefix={<CalendarOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="已完成巡检"
                value={statistics.completedExecutions || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="待执行巡检"
                value={statistics.pendingExecutions || 0}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="异常问题数"
                value={statistics.abnormalIssues || 0}
                prefix={<ExclamationCircleOutlined />}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 进度统计 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={8}>
            <Card title="巡检完成率" size="small">
              <Progress
                percent={statistics.completionRate || 0}
                status="active"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="设备覆盖率" size="small">
              <Progress
                percent={statistics.inspectionCoverage || 0}
                status="active"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="平均评分" size="small">
              <Progress
                percent={statistics.averageScore || 0}
                format={(percent) => `${percent}分`}
                status="active"
                strokeColor={{
                  '0%': '#f5222d',
                  '50%': '#faad14',
                  '100%': '#52c41a',
                }}
              />
            </Card>
          </Col>
        </Row>

        {/* 筛选表单 */}
        <Card size="small" style={{ marginBottom: '24px' }}>
          <Form
            form={filterForm}
            layout="inline"
            onFinish={(values) => {
              // 处理筛选逻辑
              message.info('应用筛选条件');
            }}
          >
            <Form.Item name="keyword">
              <Input
                placeholder="搜索关键词"
                prefix={<SearchOutlined />}
                allowClear
              />
            </Form.Item>
            <Form.Item name="equipmentType">
              <Select placeholder="设备类型" allowClear style={{ width: 120 }}>
                {equipmentTypes.map(type => (
                  <Option key={type} value={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="department">
              <Select placeholder="科室" allowClear style={{ width: 120 }}>
                {departments.map(dept => (
                  <Option key={dept} value={dept}>{dept}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="dateRange">
              <RangePicker placeholder={['开始日期', '结束日期']} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<FilterOutlined />}>
                筛选
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={() => filterForm.resetFields()} icon={<ReloadOutlined />}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* 主标签页 */}
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                巡检计划
              </span>
            }
            key="plans"
          >
            <Card
              title="巡检计划管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreatePlan}
                  >
                    创建计划
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={planColumns}
                dataSource={inspectionPlans}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: inspectionPlans.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                }}
              />
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <MobileOutlined />
                巡检执行
              </span>
            }
            key="executions"
          >
            <Card
              title="巡检执行记录"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateExecution}
                  >
                    执行巡检
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={executionColumns}
                dataSource={inspectionExecutions}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: inspectionExecutions.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                }}
              />
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <FileTextOutlined />
                巡检模板
              </span>
            }
            key="templates"
          >
            <Card
              title="巡检模板管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateTemplate}
                  >
                    创建模板
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={templateColumns}
                dataSource={inspectionTemplates}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: inspectionTemplates.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                }}
              />
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <WarningOutlined />
                异常问题
              </span>
            }
            key="issues"
          >
            <Card
              title="异常问题管理"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateIssue}
                  >
                    上报问题
                  </Button>
                  <Button icon={<ExportOutlined />}>
                    导出
                  </Button>
                </Space>
              }
            >
              <Table
                columns={issueColumns}
                dataSource={abnormalIssues}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: abnormalIssues.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                }}
              />
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                统计分析
              </span>
            }
            key="statistics"
          >
            <Card title="巡检统计分析">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="巡检执行统计" size="small">
                    <Timeline>
                      <Timeline.Item color="green">
                        <Text strong>今日完成巡检</Text>
                        <br />
                        <Text type="secondary">8台设备，平均评分92分</Text>
                      </Timeline.Item>
                      <Timeline.Item color="blue">
                        <Text strong>本周完成巡检</Text>
                        <br />
                        <Text type="secondary">45台设备，完成率95%</Text>
                      </Timeline.Item>
                      <Timeline.Item color="orange">
                        <Text strong>本月完成巡检</Text>
                        <br />
                        <Text type="secondary">180台设备，异常率3.5%</Text>
                      </Timeline.Item>
                    </Timeline>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="设备巡检分布" size="small">
                    <div style={{ padding: '20px 0' }}>
                      <Alert
                        message="各科室巡检情况"
                        description="放射科：98% | 超声科：95% | 检验科：92% | 内科：88%"
                        type="info"
                        showIcon
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </Card>

      {/* 巡检计划模态框 */}
      <Modal
        title={currentRecord ? '编辑巡检计划' : '创建巡检计划'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'active',
            priority: 'medium'
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="计划名称"
                name="planName"
                rules={[{ required: true, message: '请输入计划名称' }]}
              >
                <Input placeholder="请输入计划名称" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备类型"
                name="equipmentType"
                rules={[{ required: true, message: '请选择设备类型' }]}
              >
                <Select placeholder="请选择设备类型">
                  {equipmentTypes.map(type => (
                    <Option key={type} value={type}>{type}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备编号"
                name="equipmentId"
                rules={[{ required: true, message: '请输入设备编号' }]}
              >
                <Input placeholder="请输入设备编号" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="科室"
                name="department"
                rules={[{ required: true, message: '请选择科室' }]}
              >
                <Select placeholder="请选择科室">
                  {departments.map(dept => (
                    <Option key={dept} value={dept}>{dept}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                label="巡检频率"
                name="frequency"
                rules={[{ required: true, message: '请选择巡检频率' }]}
              >
                <Select placeholder="请选择巡检频率">
                  {frequencies.map(freq => (
                    <Option key={freq.value} value={freq.value}>{freq.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="优先级"
                name="priority"
                rules={[{ required: true, message: '请选择优先级' }]}
              >
                <Select placeholder="请选择优先级">
                  {priorities.map(priority => (
                    <Option key={priority.value} value={priority.value}>{priority.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="状态"
                name="status"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  <Option value="active">激活</Option>
                  <Option value="inactive">停用</Option>
                  <Option value="paused">暂停</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="开始日期"
                name="startDate"
                rules={[{ required: true, message: '请选择开始日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="结束日期"
                name="endDate"
                rules={[{ required: true, message: '请选择结束日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="负责人"
                name="responsiblePerson"
                rules={[{ required: true, message: '请输入负责人' }]}
              >
                <Input placeholder="请输入负责人" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="巡检模板"
                name="templateId"
              >
                <Select placeholder="请选择巡检模板" allowClear>
                  {inspectionTemplates.map(template => (
                    <Option key={template.id} value={template.id}>
                      {template.templateName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="描述"
            name="description"
          >
            <TextArea
              rows={4}
              placeholder="请输入计划描述"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 巡检执行模态框 */}
      <Modal
        title="执行巡检"
        open={executionModalVisible}
        onOk={handleExecutionModalOk}
        onCancel={() => setExecutionModalVisible(false)}
        width={800}
        destroyOnClose
      >
        <Form
          form={executionForm}
          layout="vertical"
          initialValues={{
            status: 'in_progress',
            result: 'normal'
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="巡检计划"
                name="planId"
                rules={[{ required: true, message: '请选择巡检计划' }]}
              >
                <Select placeholder="请选择巡检计划">
                  {inspectionPlans.map(plan => (
                    <Option key={plan.id} value={plan.id}>
                      {plan.planName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="执行日期"
                name="executionDate"
                rules={[{ required: true, message: '请选择执行日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="执行人"
                name="executor"
                rules={[{ required: true, message: '请输入执行人' }]}
              >
                <Input placeholder="请输入执行人" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="状态"
                name="status"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  {statuses.map(status => (
                    <Option key={status.value} value={status.value}>
                      {status.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="结果"
                name="result"
                rules={[{ required: true, message: '请选择结果' }]}
              >
                <Select placeholder="请选择结果">
                  <Option value="normal">正常</Option>
                  <Option value="abnormal">异常</Option>
                  <Option value="warning">警告</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="评分"
                name="score"
                rules={[{ required: true, message: '请输入评分' }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  style={{ width: '100%' }}
                  placeholder="请输入评分(0-100)"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                label="开始时间"
                name="startTime"
              >
                <DatePicker.TimePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="结束时间"
                name="endTime"
              >
                <DatePicker.TimePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="持续时间(分钟)"
                name="duration"
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="自动计算"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                label="位置"
                name="location"
              >
                <Input placeholder="请输入位置" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="天气"
                name="weather"
              >
                <Input placeholder="请输入天气情况" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="温度(°C)"
                name="temperature"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入温度"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="检查发现"
            name="findings"
          >
            <TextArea
              rows={4}
              placeholder="请输入检查发现的问题或情况"
            />
          </Form.Item>
          <Form.Item
            label="照片记录"
            name="images"
          >
            <Upload
              listType="picture-card"
              multiple
              beforeUpload={() => false}
            >
              <div>
                <CameraOutlined />
                <div style={{ marginTop: 8 }}>上传照片</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* 巡检模板模态框 */}
      <Modal
        title={currentRecord ? '编辑巡检模板' : '创建巡检模板'}
        open={templateModalVisible}
        onOk={handleTemplateModalOk}
        onCancel={() => setTemplateModalVisible(false)}
        width={800}
        destroyOnClose
      >
        <Form
          form={templateForm}
          layout="vertical"
          initialValues={{
            status: 'active',
            version: '1.0'
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="模板名称"
                name="templateName"
                rules={[{ required: true, message: '请输入模板名称' }]}
              >
                <Input placeholder="请输入模板名称" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备类型"
                name="equipmentType"
                rules={[{ required: true, message: '请选择设备类型' }]}
              >
                <Select placeholder="请选择设备类型">
                  {equipmentTypes.map(type => (
                    <Option key={type} value={type}>{type}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="版本"
                name="version"
                rules={[{ required: true, message: '请输入版本号' }]}
              >
                <Input placeholder="请输入版本号" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="状态"
                name="status"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  <Option value="active">激活</Option>
                  <Option value="inactive">停用</Option>
                  <Option value="draft">草稿</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="描述"
            name="description"
          >
            <TextArea
              rows={3}
              placeholder="请输入模板描述"
            />
          </Form.Item>
          <Form.Item
            label="检查项"
            name="items"
          >
            <TextArea
              rows={6}
              placeholder="请输入检查项（JSON格式）"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 异常问题模态框 */}
      <Modal
        title={currentRecord ? '编辑异常问题' : '上报异常问题'}
        open={issueModalVisible}
        onOk={handleIssueModalOk}
        onCancel={() => setIssueModalVisible(false)}
        width={800}
        destroyOnClose
      >
        <Form
          form={issueForm}
          layout="vertical"
          initialValues={{
            status: 'pending',
            severity: 'minor'
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备类型"
                name="equipmentType"
                rules={[{ required: true, message: '请选择设备类型' }]}
              >
                <Select placeholder="请选择设备类型">
                  {equipmentTypes.map(type => (
                    <Option key={type} value={type}>{type}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="设备编号"
                name="equipmentId"
                rules={[{ required: true, message: '请输入设备编号' }]}
              >
                <Input placeholder="请输入设备编号" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="问题类型"
                name="issueType"
                rules={[{ required: true, message: '请选择问题类型' }]}
              >
                <Select placeholder="请选择问题类型">
                  <Option value="appearance">外观问题</Option>
                  <Option value="function">功能问题</Option>
                  <Option value="performance">性能问题</Option>
                  <Option value="safety">安全问题</Option>
                  <Option value="image_quality">图像质量</Option>
                  <Option value="other">其他</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="严重程度"
                name="severity"
                rules={[{ required: true, message: '请选择严重程度' }]}
              >
                <Select placeholder="请选择严重程度">
                  {severityLevels.map(severity => (
                    <Option key={severity.value} value={severity.value}>
                      {severity.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="发现人"
                name="discoverer"
                rules={[{ required: true, message: '请输入发现人' }]}
              >
                <Input placeholder="请输入发现人" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="发现日期"
                name="discoveryDate"
                rules={[{ required: true, message: '请选择发现日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="问题描述"
            name="description"
            rules={[{ required: true, message: '请输入问题描述' }]}
          >
            <TextArea
              rows={4}
              placeholder="请详细描述问题情况"
            />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="负责人"
                name="assignedTo"
                rules={[{ required: true, message: '请输入负责人' }]}
              >
                <Input placeholder="请输入负责人" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="预计维修时间"
                name="estimatedRepairTime"
              >
                <Input placeholder="请输入预计维修时间" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="建议处理措施"
            name="suggestedAction"
          >
            <TextArea
              rows={3}
              placeholder="请输入建议的处理措施"
            />
          </Form.Item>
          <Form.Item
            label="根本原因"
            name="rootCause"
          >
            <TextArea
              rows={3}
              placeholder="请输入问题的根本原因分析"
            />
          </Form.Item>
          <Form.Item
            label="预防措施"
            name="preventiveAction"
          >
            <TextArea
              rows={3}
              placeholder="请输入预防措施"
            />
          </Form.Item>
          <Form.Item
            label="相关照片"
            name="images"
          >
            <Upload
              listType="picture-card"
              multiple
              beforeUpload={() => false}
            >
              <div>
                <CameraOutlined />
                <div style={{ marginTop: 8 }}>上传照片</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InspectionManagement;