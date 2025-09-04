# 综合医院管理系统API接口文档

## 1. 概述

### 1.1 文档说明
本文档详细描述了综合医院管理系统的所有API接口，包括接口地址、请求方法、请求参数、响应数据格式等信息，供前端开发人员和第三方系统集成使用。

### 1.2 基础URL
```
生产环境: https://api.comprehensive-hospital-system.com
测试环境: https://test-api.comprehensive-hospital-system.com
开发环境: http://localhost:3000
```

### 1.3 通用响应格式
```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

### 1.4 通用错误码
| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 1001 | 参数错误 |
| 1002 | 认证失败 |
| 1003 | 权限不足 |
| 1004 | 数据不存在 |
| 1005 | 数据已存在 |
| 1006 | 服务器内部错误 |
| 1007 | 请求过于频繁 |

## 2. 认证授权接口

### 2.1 用户登录
#### 接口地址
```
POST /api/auth/login
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码 |

#### 请求示例
```json
{
  "username": "admin",
  "password": "123456"
}
```

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600,
    "user": {
      "id": 1,
      "username": "admin",
      "full_name": "系统管理员",
      "email": "admin@hospital.com",
      "avatar_url": "https://example.com/avatar.jpg"
    }
  }
}
```

### 2.2 用户登出
#### 接口地址
```
POST /api/auth/logout
```

#### 请求参数
无

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": null
}
```

### 2.3 刷新令牌
#### 接口地址
```
POST /api/auth/refresh
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| refresh_token | string | 是 | 刷新令牌 |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600
  }
}
```

## 3. 用户管理接口

### 3.1 获取当前用户信息
#### 接口地址
```
GET /api/users/me
```

#### 请求参数
无

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "username": "admin",
    "full_name": "系统管理员",
    "email": "admin@hospital.com",
    "phone": "13800138000",
    "avatar_url": "https://example.com/avatar.jpg",
    "department": {
      "id": 1,
      "name": "信息科"
    },
    "roles": [
      {
        "id": 1,
        "name": "系统管理员"
      }
    ],
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

### 3.2 获取用户列表
#### 接口地址
```
GET /api/users
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| per_page | integer | 否 | 每页数量，默认20 |
| keyword | string | 否 | 搜索关键词 |
| department_id | integer | 否 | 科室ID |
| role_id | integer | 否 | 角色ID |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "username": "admin",
        "full_name": "系统管理员",
        "email": "admin@hospital.com",
        "phone": "13800138000",
        "avatar_url": "https://example.com/avatar.jpg",
        "department": {
          "id": 1,
          "name": "信息科"
        },
        "roles": [
          {
            "id": 1,
            "name": "系统管理员"
          }
        ],
        "status": 1,
        "created_at": "2023-01-01T00:00:00Z"
      }
    ],
    "total": 100,
    "page": 1,
    "per_page": 20
  }
}
```

### 3.3 创建用户
#### 接口地址
```
POST /api/users
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码 |
| full_name | string | 是 | 姓名 |
| email | string | 是 | 邮箱 |
| phone | string | 否 | 手机号 |
| department_id | integer | 否 | 科室ID |
| role_ids | array | 是 | 角色ID数组 |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 101,
    "username": "newuser",
    "full_name": "新用户",
    "email": "newuser@hospital.com",
    "phone": "13800138001",
    "avatar_url": null,
    "department_id": 2,
    "role_ids": [3],
    "status": 1,
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

## 4. 科室管理接口

### 4.1 获取科室列表
#### 接口地址
```
GET /api/departments
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| per_page | integer | 否 | 每页数量，默认20 |
| keyword | string | 否 | 搜索关键词 |
| parent_id | integer | 否 | 上级科室ID |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "医院总部",
        "code": "HQ",
        "parent_id": null,
        "level": 1,
        "sort_order": 0,
        "manager": null,
        "created_at": "2023-01-01T00:00:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "per_page": 20
  }
}
```

### 4.2 创建科室
#### 接口地址
```
POST /api/departments
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 科室名称 |
| code | string | 是 | 科室编码 |
| parent_id | integer | 否 | 上级科室ID |
| sort_order | integer | 否 | 排序 |
| manager_id | integer | 否 | 科室负责人ID |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 101,
    "name": "心内科",
    "code": "CARD",
    "parent_id": 1,
    "level": 2,
    "sort_order": 1,
    "manager_id": 10,
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

## 5. 设备管理接口

### 5.1 获取设备列表
#### 接口地址
```
GET /api/devices
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| per_page | integer | 否 | 每页数量，默认20 |
| keyword | string | 否 | 搜索关键词 |
| department_id | integer | 否 | 科室ID |
| category_id | integer | 否 | 设备分类ID |
| status | integer | 否 | 状态 |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "device_number": "DEV20230001",
        "name": "心电监护仪",
        "model": "ECG-2000",
        "manufacturer": "医疗设备公司",
        "serial_number": "SN20230001",
        "category": {
          "id": 1,
          "name": "监护设备"
        },
        "purchase_date": "2022-01-01",
        "installation_date": "2022-01-05",
        "department": {
          "id": 10,
          "name": "心内科"
        },
        "original_value": 50000.00,
        "net_value": 30000.00,
        "status": 1,
        "warranty_expiry_date": "2025-01-01",
        "next_maintenance_date": "2024-01-01"
      }
    ],
    "total": 100,
    "page": 1,
    "per_page": 20
  }
}
```

### 5.2 获取设备详情
#### 接口地址
```
GET /api/devices/{id}
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | integer | 是 | 设备ID |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "device_number": "DEV20230001",
    "name": "心电监护仪",
    "model": "ECG-2000",
    "manufacturer": "医疗设备公司",
    "serial_number": "SN20230001",
    "category": {
      "id": 1,
      "name": "监护设备"
    },
    "purchase_date": "2022-01-01",
    "installation_date": "2022-01-05",
    "department": {
      "id": 10,
      "name": "心内科"
    },
    "original_value": 50000.00,
    "net_value": 30000.00,
    "status": 1,
    "warranty_expiry_date": "2025-01-01",
    "maintenance_cycle": 365,
    "last_maintenance_date": "2023-01-01",
    "next_maintenance_date": "2024-01-01",
    "location": "心内科护士站",
    "created_at": "2022-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
}
```

### 5.3 创建设备
#### 接口地址
```
POST /api/devices
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| device_number | string | 是 | 设备编号 |
| name | string | 是 | 设备名称 |
| model | string | 否 | 型号 |
| manufacturer | string | 否 | 制造商 |
| serial_number | string | 否 | 序列号 |
| category_id | integer | 是 | 设备分类ID |
| purchase_date | string | 否 | 采购日期(YYYY-MM-DD) |
| installation_date | string | 否 | 安装日期(YYYY-MM-DD) |
| department_id | integer | 是 | 所属科室ID |
| original_value | number | 否 | 原值 |
| warranty_expiry_date | string | 否 | 保修期截止日期(YYYY-MM-DD) |
| maintenance_cycle | integer | 否 | 保养周期(天) |
| location | string | 否 | 设备位置 |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 101,
    "device_number": "DEV202301010001",
    "name": "输液泵",
    "model": "IP-1000",
    "manufacturer": "医疗器械公司",
    "serial_number": "SN202301010001",
    "category_id": 2,
    "purchase_date": "2023-01-01",
    "installation_date": "2023-01-05",
    "department_id": 15,
    "original_value": 20000.00,
    "status": 1,
    "warranty_expiry_date": "2026-01-01",
    "maintenance_cycle": 180,
    "location": "外科病房",
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

## 6. 维修管理接口

### 6.1 获取维修工单列表
#### 接口地址
```
GET /api/repair-orders
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| per_page | integer | 否 | 每页数量，默认20 |
| device_id | integer | 否 | 设备ID |
| reporter_id | integer | 否 | 报修人ID |
| assignee_id | integer | 否 | 维修员ID |
| status | integer | 否 | 状态 |
| priority | integer | 否 | 优先级 |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "order_number": "RO202301010001",
        "device": {
          "id": 1,
          "device_number": "DEV20230001",
          "name": "心电监护仪"
        },
        "reporter": {
          "id": 10,
          "full_name": "张护士"
        },
        "report_time": "2023-01-01T10:00:00Z",
        "fault_description": "设备无法开机",
        "priority": 3,
        "assignee": {
          "id": 20,
          "full_name": "李工程师"
        },
        "status": 3
      }
    ],
    "total": 20,
    "page": 1,
    "per_page": 20
  }
}
```

### 6.2 创建维修工单
#### 接口地址
```
POST /api/repair-orders
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| device_id | integer | 是 | 设备ID |
| fault_description | string | 是 | 故障描述 |
| priority | integer | 否 | 优先级(1-低,2-中,3-高) |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 101,
    "order_number": "RO202301010101",
    "device_id": 2,
    "reporter_id": 1,
    "report_time": "2023-01-01T12:00:00Z",
    "fault_description": "屏幕显示异常",
    "priority": 2,
    "status": 1,
    "created_at": "2023-01-01T12:00:00Z"
  }
}
```

### 6.3 指派维修工单
#### 接口地址
```
POST /api/repair-orders/{id}/assign
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | integer | 是 | 维修工单ID |
| assignee_id | integer | 是 | 维修员ID |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 101,
    "assignee_id": 25,
    "assigned_at": "2023-01-01T12:30:00Z",
    "status": 2,
    "updated_at": "2023-01-01T12:30:00Z"
  }
}
```

## 7. 预防性维护接口

### 7.1 获取PM计划列表
#### 接口地址
```
GET /api/pm-plans
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| per_page | integer | 否 | 每页数量，默认20 |
| device_category_id | integer | 否 | 设备分类ID |
| device_id | integer | 否 | 设备ID |
| responsible_department_id | integer | 否 | 责任科室ID |
| status | integer | 否 | 状态 |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "plan_name": "心电监护仪月度保养计划",
        "device_category": {
          "id": 1,
          "name": "监护设备"
        },
        "frequency": 3,
        "frequency_value": 1,
        "start_date": "2023-01-01",
        "end_date": "2023-12-31",
        "responsible_department": {
          "id": 5,
          "name": "设备科"
        },
        "status": 1
      }
    ],
    "total": 10,
    "page": 1,
    "per_page": 20
  }
}
```

### 7.2 创建PM计划
#### 接口地址
```
POST /api/pm-plans
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| plan_name | string | 是 | 计划名称 |
| device_category_id | integer | 否 | 设备分类ID |
| device_id | integer | 否 | 设备ID |
| frequency | integer | 是 | 频率类型(1-每日,2-每周,3-每月,4-每季度,5-每年) |
| frequency_value | integer | 是 | 频率值 |
| start_date | string | 是 | 开始日期(YYYY-MM-DD) |
| end_date | string | 否 | 结束日期(YYYY-MM-DD) |
| responsible_department_id | integer | 是 | 责任科室ID |
| responsible_person_id | integer | 否 | 责任人ID |
| description | string | 否 | 描述 |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 101,
    "plan_name": "输液泵季度保养计划",
    "device_category_id": 2,
    "frequency": 4,
    "frequency_value": 1,
    "start_date": "2023-01-01",
    "end_date": "2023-12-31",
    "responsible_department_id": 5,
    "responsible_person_id": 30,
    "description": "季度保养维护",
    "status": 1,
    "created_by": 1,
    "created_at": "2023-01-01T14:00:00Z"
  }
}
```

## 8. 培训考试接口

### 8.1 获取课程列表
#### 接口地址
```
GET /api/courses
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| per_page | integer | 否 | 每页数量，默认20 |
| keyword | string | 否 | 搜索关键词 |
| category_id | integer | 否 | 分类ID |
| status | integer | 否 | 状态 |
| is_required | boolean | 否 | 是否必修 |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "title": "医疗设备操作规范",
        "description": "医疗设备操作规范培训课程",
        "cover_image_url": "https://example.com/cover.jpg",
        "category": {
          "id": 1,
          "name": "设备操作"
        },
        "instructor": {
          "id": 10,
          "full_name": "张教授"
        },
        "duration": 120,
        "difficulty_level": 2,
        "status": 2,
        "is_required": true,
        "created_at": "2023-01-01T00:00:00Z"
      }
    ],
    "total": 50,
    "page": 1,
    "per_page": 20
  }
}
```

### 8.2 获取考试列表
#### 接口地址
```
GET /api/exams
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| per_page | integer | 否 | 每页数量，默认20 |
| keyword | string | 否 | 搜索关键词 |
| course_id | integer | 否 | 关联课程ID |
| status | integer | 否 | 状态 |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "title": "设备操作规范考试",
        "description": "设备操作规范考试试卷",
        "course": {
          "id": 1,
          "title": "医疗设备操作规范"
        },
        "total_score": 100,
        "pass_score": 60,
        "duration": 60,
        "question_count": 50,
        "status": 2,
        "created_at": "2023-01-01T00:00:00Z"
      }
    ],
    "total": 20,
    "page": 1,
    "per_page": 20
  }
}
```

## 9. 不良事件接口

### 9.1 获取不良事件列表
#### 接口地址
```
GET /api/adverse-events
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| per_page | integer | 否 | 每页数量，默认20 |
| keyword | string | 否 | 搜索关键词 |
| event_type_id | integer | 否 | 事件类型ID |
| severity_level | integer | 否 | 严重程度 |
| status | integer | 否 | 状态 |
| start_date | string | 否 | 开始日期(YYYY-MM-DD) |
| end_date | string | 否 | 结束日期(YYYY-MM-DD) |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "event_number": "AE202301010001",
        "event_type": {
          "id": 1,
          "name": "电气安全事件"
        },
        "severity_level": 3,
        "discovery_date": "2023-01-01",
        "occurrence_date": "2022-12-30",
        "reporter": {
          "id": 10,
          "full_name": "张医生"
        },
        "report_date": "2023-01-01T10:00:00Z",
        "status": 2,
        "assigned_investigator": {
          "id": 20,
          "full_name": "李工程师"
        }
      }
    ],
    "total": 50,
    "page": 1,
    "per_page": 20
  }
}
```

## 10. 设备报废接口

### 10.1 获取报废申请列表
#### 接口地址
```
GET /api/disposal-applications
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| per_page | integer | 否 | 每页数量，默认20 |
| keyword | string | 否 | 搜索关键词 |
| device_id | integer | 否 | 设备ID |
| applicant_id | integer | 否 | 申请人ID(管理员使用) |
| status | integer | 否 | 状态 |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "application_number": "DA202301010001",
        "device": {
          "id": 1,
          "device_number": "DEV20230001",
          "name": "心电监护仪"
        },
        "applicant": {
          "id": 10,
          "full_name": "张医生"
        },
        "application_date": "2023-01-01T10:00:00Z",
        "reason": "设备老化，维修成本过高",
        "estimated_value": 5000.00,
        "status": 2
      }
    ],
    "total": 20,
    "page": 1,
    "per_page": 20
  }
}
```

## 11. 库存管理接口

### 11.1 获取库存列表
#### 接口地址
```
GET /api/inventories
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| per_page | integer | 否 | 每页数量，默认20 |
| keyword | string | 否 | 搜索关键词 |
| category_id | integer | 否 | 分类ID |
| status | integer | 否 | 状态 |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "item_code": "INV20230001",
        "item_name": "心电电极片",
        "item_type": 2,
        "category": {
          "id": 1,
          "name": "耗材"
        },
        "unit": "片",
        "current_quantity": 1000,
        "minimum_quantity": 200,
        "maximum_quantity": 2000,
        "location": "耗材库房A区",
        "status": 1
      }
    ],
    "total": 100,
    "page": 1,
    "per_page": 20
  }
}
```

## 12. 统计分析接口

### 12.1 获取统计报告列表
#### 接口地址
```
GET /api/statistical-reports
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| per_page | integer | 否 | 每页数量，默认20 |
| report_type | integer | 否 | 报告类型 |
| start_date | string | 否 | 开始日期(YYYY-MM-DD) |
| end_date | string | 否 | 结束日期(YYYY-MM-DD) |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "report_name": "2023年第一季度设备统计报告",
        "report_type": 1,
        "report_period": "2023-Q1",
        "generated_by": {
          "id": 1,
          "full_name": "管理员"
        },
        "generated_at": "2023-04-01T00:00:00Z",
        "created_at": "2023-04-01T00:00:00Z"
      }
    ],
    "total": 12,
    "page": 1,
    "per_page": 20
  }
}
```

### 12.2 生成统计报告
#### 接口地址
```
POST /api/statistical-reports/generate
```

#### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| report_type | integer | 是 | 报告类型(1-设备统计,2-维修统计,3-培训统计,4-不良事件统计,5-报废统计) |
| report_name | string | 是 | 报告名称 |
| start_date | string | 是 | 开始日期(YYYY-MM-DD) |
| end_date | string | 是 | 结束日期(YYYY-MM-DD) |

#### 响应示例
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 101,
    "report_name": "2023年4月设备统计报告",
    "report_type": 1,
    "report_period": "2023-04",
    "data_content": {
      "total_devices": 500,
      "by_status": {
        "正常": 450,
        "维修中": 30,
        "停用": 10,
        "待报废": 5,
        "已报废": 5
      },
      "by_department": {
        "心内科": 50,
        "呼吸科": 45,
        "外科": 60
      }
    },
    "generated_by": {
      "id": 1,
      "full_name": "管理员"
    },
    "generated_at": "2023-05-01T10:00:00Z",
    "created_at": "2023-05-01T10:00:00Z"
  }
}
```