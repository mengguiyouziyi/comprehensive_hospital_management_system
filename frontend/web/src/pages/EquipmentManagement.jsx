import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { useHistory } from 'react-router-dom';
import equipmentService from '../services/equipmentService';
import './EquipmentManagement.css';

const { Option } = Select;

const EquipmentManagement = () => {
  const [equipments, setEqupments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [form] = Form.useForm();
  const history = useHistory();

  // 模拟科室数据
  const departments = [
    { id: '1', name: '内科' },
    { id: '2', name: '外科' },
    { id: '3', name: '儿科' },
    { id: '4', name: '妇产科' },
    { id: '5', name: '眼科' },
    { id: '6', name: '耳鼻喉科' }
  ];

  // 模拟设备类型数据
  const equipmentTypes = [
    'X光机',
    'CT扫描仪',
    '核磁共振',
    '超声波设备',
    '心电图机',
    '血压计',
    '血糖仪',
    '呼吸机',
    '麻醉机',
    '手术台'
  ];

  // 模拟设备状态数据
  const equipmentStatus = [
    { value: 'available', label: '可用' },
    { value: 'in_repair', label: '维修中' },
    { value: 'scrapped', label: '已报废' }
  ];

  // 获取设备列表
  const fetchEquipments = async () => {
    setLoading(true);
    try {
      const response = await equipmentService.getEquipmentList();
      setEqupments(response.data);
    } catch (error) {
      message.error('获取设备列表失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  // 处理表单提交
  const handleFinish = async (values) => {
    try {
      // 处理日期格式
      const formattedValues = {
        ...values,
        purchaseDate: values.purchaseDate ? values.purchaseDate.format('YYYY-MM-DD') : null
      };
      
      if (editingEquipment) {
        // 更新设备
        await equipmentService.updateEquipment(editingEquipment.id, formattedValues);
        message.success('设备更新成功');
      } else {
        // 创建设备
        await equipmentService.createEquipment(formattedValues);
        message.success('设备创建成功');
      }
      
      setModalVisible(false);
      form.resetFields();
      setEditingEquipment(null);
      fetchEquipments();
    } catch (error) {
      message.error(editingEquipment ? '设备更新失败: ' + error.message : '设备创建失败: ' + error.message);
    }
  };

  // 处理编辑设备
  const handleEdit = (equipment) => {
    setEditingEquipment(equipment);
    form.setFieldsValue({
      ...equipment,
      purchaseDate: equipment.purchaseDate ? new Date(equipment.purchaseDate) : null
    });
    setModalVisible(true);
  };

  // 处理删除设备
  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个设备吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await equipmentService.deleteEquipment(id);
          message.success('设备删除成功');
          fetchEquipments();
        } catch (error) {
          message.error('设备删除失败: ' + error.message);
        }
      }
    });
  };

  // 处理添加新设备
  const handleAddNew = () => {
    setEditingEquipment(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 表格列定义
  const columns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '设备编号',
      dataIndex: 'equipmentId',
      key: 'equipmentId'
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '所属科室',
      dataIndex: ['department', 'name'],
      key: 'department'
    },
    {
      title: '购买日期',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      render: (date) => date ? new Date(date).toLocaleDateString('zh-CN') : ''
    },
    {
      title: '保修期(月)',
      dataIndex: 'warrantyPeriod',
      key: 'warrantyPeriod'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusObj = equipmentStatus.find(s => s.value === status);
        return statusObj ? statusObj.label : status;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
        </span>
      )
    }
  ];

  return (
    <div className="equipment-management">
      <div className="equipment-header">
        <h2>设备管理</h2>
        <Button type="primary" onClick={handleAddNew}>添加设备</Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={equipments}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10
        }}
      />
      
      <Modal
        title={editingEquipment ? "编辑设备" : "添加设备"}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingEquipment(null);
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            name="name"
            label="设备名称"
            rules={[{ required: true, message: '请输入设备名称' }]}
          >
            <Input placeholder="请输入设备名称" />
          </Form.Item>
          
          <Form.Item
            name="equipmentId"
            label="设备编号"
            rules={[{ required: true, message: '请输入设备编号' }]}
          >
            <Input placeholder="请输入设备编号" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="设备类型"
            rules={[{ required: true, message: '请选择设备类型' }]}
          >
            <Select placeholder="请选择设备类型">
              {equipmentTypes.map(type => (
                <Option key={type} value={type}>{type}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="department"
            label="所属科室"
            rules={[{ required: true, message: '请选择所属科室' }]}
          >
            <Select 
              placeholder="请选择所属科室"
              optionLabelProp="label"
            >
              {departments.map(dept => (
                <Option key={dept.id} value={dept.id} label={dept.name}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="purchaseDate"
            label="购买日期"
            rules={[{ required: true, message: '请选择购买日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="warrantyPeriod"
            label="保修期(月)"
            rules={[{ required: true, message: '请输入保修期' }]}
          >
            <Input type="number" placeholder="请输入保修期(月)" />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择设备状态' }]}
          >
            <Select placeholder="请选择设备状态">
              {equipmentStatus.map(status => (
                <Option key={status.value} value={status.value}>{status.label}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              {editingEquipment ? '更新' : '创建'}
            </Button>
            <Button onClick={() => {
              setModalVisible(false);
              form.resetFields();
              setEditingEquipment(null);
            }}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EquipmentManagement;