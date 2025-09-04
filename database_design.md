# 综合医院管理系统数据库设计文档

## 1. 概述

### 1.1 设计目标
本数据库设计旨在为综合医院管理系统提供高效、安全、可扩展的数据存储解决方案，支持设备资产管理、培训考试、不良事件管理、设备报废管理等所有子系统的数据存储需求。

### 1.2 设计原则
1. **规范化**: 遵循数据库设计范式，减少数据冗余
2. **性能优化**: 合理设计索引，提高查询效率
3. **安全性**: 敏感数据加密存储，权限控制
4. **可扩展性**: 支持未来功能扩展
5. **一致性**: 保证数据完整性和一致性

### 1.3 技术选型
- **主数据库**: MySQL 8.0+
- **缓存数据库**: Redis 6.0+
- **文档数据库**: MongoDB 5.0+
- **字符集**: utf8mb4
- **排序规则**: utf8mb4_unicode_ci
- **存储引擎**: InnoDB

## 2. 数据库结构

### 2.1 数据库命名
```
主数据库: comprehensive_hospital_management
缓存数据库: comprehensive_hospital_management_cache
文档数据库: comprehensive_hospital_management_docs
```

### 2.2 表命名规范
- 表名使用小写字母，单词间用下划线分隔
- 表名使用复数形式
- 前缀表示模块，如: user_, device_, training_, adverse_

## 3. 核心数据表设计

### 3.1 用户认证与权限相关表

#### 3.1.1 用户表 (users)
```sql
CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` VARCHAR(50) NOT NULL COMMENT '用户名',
  `email` VARCHAR(100) NOT NULL COMMENT '邮箱',
  `password_hash` VARCHAR(255) NOT NULL COMMENT '密码哈希值',
  `full_name` VARCHAR(100) NOT NULL COMMENT '姓名',
  `phone` VARCHAR(20) DEFAULT NULL COMMENT '手机号',
  `avatar_url` VARCHAR(255) DEFAULT NULL COMMENT '头像URL',
  `department_id` INT UNSIGNED DEFAULT NULL COMMENT '科室ID',
  `role_id` INT UNSIGNED NOT NULL COMMENT '角色ID',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-正常,2-禁用)',
  `last_login_at` TIMESTAMP NULL DEFAULT NULL COMMENT '最后登录时间',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`),
  UNIQUE KEY `uk_email` (`email`),
  KEY `idx_department` (`department_id`),
  KEY `idx_role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';
```

#### 3.1.2 角色表 (roles)
```sql
CREATE TABLE `roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` VARCHAR(50) NOT NULL COMMENT '角色名称',
  `description` VARCHAR(255) DEFAULT NULL COMMENT '角色描述',
  `permissions` JSON DEFAULT NULL COMMENT '权限列表',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';
```

#### 3.1.3 科室表 (departments)
```sql
CREATE TABLE `departments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '科室ID',
  `name` VARCHAR(100) NOT NULL COMMENT '科室名称',
  `code` VARCHAR(50) NOT NULL COMMENT '科室编码',
  `parent_id` INT UNSIGNED DEFAULT NULL COMMENT '上级科室ID',
  `level` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '层级',
  `sort_order` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '排序',
  `manager_id` INT UNSIGNED DEFAULT NULL COMMENT '科室负责人ID',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_code` (`code`),
  KEY `idx_parent` (`parent_id`),
  KEY `idx_manager` (`manager_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='科室表';
```

#### 3.1.4 用户角色关联表 (user_roles)
```sql
CREATE TABLE `user_roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` INT UNSIGNED NOT NULL COMMENT '用户ID',
  `role_id` INT UNSIGNED NOT NULL COMMENT '角色ID',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_role` (`user_id`, `role_id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户角色关联表';
```

#### 3.1.5 用户部门历史表 (user_department_history)
```sql
CREATE TABLE `user_department_history` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` INT UNSIGNED NOT NULL COMMENT '用户ID',
  `department_id` INT UNSIGNED NOT NULL COMMENT '科室ID',
  `start_date` DATE NOT NULL COMMENT '开始日期',
  `end_date` DATE DEFAULT NULL COMMENT '结束日期',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户部门历史表';
```

### 3.2 系统配置相关表

#### 3.2.1 系统参数表 (system_configs)
```sql
CREATE TABLE `system_configs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '配置ID',
  `config_key` VARCHAR(100) NOT NULL COMMENT '配置键',
  `config_value` TEXT NOT NULL COMMENT '配置值',
  `config_group` VARCHAR(50) NOT NULL DEFAULT 'default' COMMENT '配置组',
  `description` VARCHAR(255) DEFAULT NULL COMMENT '配置描述',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_config_key` (`config_key`),
  KEY `idx_config_group` (`config_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统参数表';
```

#### 3.2.2 数据字典表 (data_dictionaries)
```sql
CREATE TABLE `data_dictionaries` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '字典ID',
  `dict_code` VARCHAR(50) NOT NULL COMMENT '字典编码',
  `dict_name` VARCHAR(100) NOT NULL COMMENT '字典名称',
  `dict_type` VARCHAR(50) NOT NULL COMMENT '字典类型',
  `sort_order` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '排序',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-启用,2-禁用)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_dict_code` (`dict_code`),
  KEY `idx_dict_type` (`dict_type`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据字典表';
```

#### 3.2.3 字典项表 (dictionary_items)
```sql
CREATE TABLE `dictionary_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '字典项ID',
  `dict_id` INT UNSIGNED NOT NULL COMMENT '字典ID',
  `item_code` VARCHAR(50) NOT NULL COMMENT '字典项编码',
  `item_name` VARCHAR(100) NOT NULL COMMENT '字典项名称',
  `item_value` VARCHAR(255) NOT NULL COMMENT '字典项值',
  `sort_order` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '排序',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-启用,2-禁用)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_dict_item` (`dict_id`, `item_code`),
  KEY `idx_dict` (`dict_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='字典项表';
```

### 3.3 设备资产管理相关表

#### 3.3.1 设备表 (devices)
```sql
CREATE TABLE `devices` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '设备ID',
  `device_number` VARCHAR(50) NOT NULL COMMENT '设备编号',
  `name` VARCHAR(200) NOT NULL COMMENT '设备名称',
  `model` VARCHAR(100) DEFAULT NULL COMMENT '型号',
  `manufacturer` VARCHAR(100) DEFAULT NULL COMMENT '制造商',
  `serial_number` VARCHAR(100) DEFAULT NULL COMMENT '序列号',
  `category_id` INT UNSIGNED DEFAULT NULL COMMENT '设备分类ID',
  `purchase_date` DATE DEFAULT NULL COMMENT '采购日期',
  `installation_date` DATE DEFAULT NULL COMMENT '安装日期',
  `department_id` INT UNSIGNED DEFAULT NULL COMMENT '所属科室ID',
  `original_value` DECIMAL(12,2) DEFAULT NULL COMMENT '原值',
  `net_value` DECIMAL(12,2) DEFAULT NULL COMMENT '净值',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-正常,2-维修中,3-停用,4-待报废,5-已报废)',
  `warranty_expiry_date` DATE DEFAULT NULL COMMENT '保修期截止日期',
  `maintenance_cycle` INT UNSIGNED DEFAULT NULL COMMENT '保养周期(天)',
  `last_maintenance_date` DATE DEFAULT NULL COMMENT '上次保养日期',
  `next_maintenance_date` DATE DEFAULT NULL COMMENT '下次保养日期',
  `location` VARCHAR(200) DEFAULT NULL COMMENT '设备位置',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_device_number` (`device_number`),
  KEY `idx_department` (`department_id`),
  KEY `idx_category` (`category_id`),
  KEY `idx_status` (`status`),
  KEY `idx_manufacturer` (`manufacturer`),
  KEY `idx_next_maintenance` (`next_maintenance_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='设备表';
```

#### 3.3.2 设备分类表 (device_categories)
```sql
CREATE TABLE `device_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` VARCHAR(100) NOT NULL COMMENT '分类名称',
  `code` VARCHAR(50) NOT NULL COMMENT '分类编码',
  `parent_id` INT UNSIGNED DEFAULT NULL COMMENT '上级分类ID',
  `level` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '层级',
  `sort_order` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '排序',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_code` (`code`),
  KEY `idx_parent` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='设备分类表';
```

#### 3.3.3 设备档案表 (device_archives)
```sql
CREATE TABLE `device_archives` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '档案ID',
  `device_id` INT UNSIGNED NOT NULL COMMENT '设备ID',
  `document_type` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '文档类型(1-说明书,2-合格证,3-保修卡,4-其他)',
  `document_name` VARCHAR(200) NOT NULL COMMENT '文档名称',
  `file_path` VARCHAR(500) NOT NULL COMMENT '文件路径',
  `file_size` INT UNSIGNED NOT NULL COMMENT '文件大小(字节)',
  `uploaded_by` INT UNSIGNED NOT NULL COMMENT '上传人ID',
  `uploaded_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上传时间',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_device` (`device_id`),
  KEY `idx_uploaded_by` (`uploaded_by`),
  KEY `idx_document_type` (`document_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='设备档案表';
```

### 3.4 维修管理相关表

#### 3.4.1 维修工单表 (repair_orders)
```sql
CREATE TABLE `repair_orders` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '工单ID',
  `order_number` VARCHAR(50) NOT NULL COMMENT '工单编号',
  `device_id` INT UNSIGNED NOT NULL COMMENT '设备ID',
  `reporter_id` INT UNSIGNED NOT NULL COMMENT '报修人ID',
  `report_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '报修时间',
  `fault_description` TEXT NOT NULL COMMENT '故障描述',
  `priority` TINYINT UNSIGNED NOT NULL DEFAULT '2' COMMENT '优先级(1-低,2-中,3-高)',
  `assignee_id` INT UNSIGNED DEFAULT NULL COMMENT '维修员ID',
  `assigned_at` TIMESTAMP NULL DEFAULT NULL COMMENT '指派时间',
  `start_time` TIMESTAMP NULL DEFAULT NULL COMMENT '开始维修时间',
  `end_time` TIMESTAMP NULL DEFAULT NULL COMMENT '维修完成时间',
  `repair_result` TEXT DEFAULT NULL COMMENT '维修结果',
  `repair_cost` DECIMAL(10,2) DEFAULT NULL COMMENT '维修费用',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-待处理,2-已指派,3-维修中,4-已完成,5-已关闭)',
  `satisfaction_rating` TINYINT UNSIGNED DEFAULT NULL COMMENT '满意度评分(1-5)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_order_number` (`order_number`),
  KEY `idx_device` (`device_id`),
  KEY `idx_reporter` (`reporter_id`),
  KEY `idx_assignee` (`assignee_id`),
  KEY `idx_status` (`status`),
  KEY `idx_priority` (`priority`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='维修工单表';
```

#### 3.4.2 维修工单附件表 (repair_order_attachments)
```sql
CREATE TABLE `repair_order_attachments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '附件ID',
  `repair_order_id` INT UNSIGNED NOT NULL COMMENT '维修工单ID',
  `file_name` VARCHAR(255) NOT NULL COMMENT '文件名',
  `file_path` VARCHAR(500) NOT NULL COMMENT '文件路径',
  `file_size` INT UNSIGNED NOT NULL COMMENT '文件大小(字节)',
  `file_type` VARCHAR(50) NOT NULL COMMENT '文件类型',
  `uploaded_by` INT UNSIGNED NOT NULL COMMENT '上传人ID',
  `uploaded_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上传时间',
  PRIMARY KEY (`id`),
  KEY `idx_repair_order` (`repair_order_id`),
  KEY `idx_uploaded_by` (`uploaded_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='维修工单附件表';
```

### 3.5 预防性维护相关表

#### 3.5.1 PM计划表 (pm_plans)
```sql
CREATE TABLE `pm_plans` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PM计划ID',
  `plan_name` VARCHAR(200) NOT NULL COMMENT '计划名称',
  `device_category_id` INT UNSIGNED DEFAULT NULL COMMENT '设备分类ID',
  `device_id` INT UNSIGNED DEFAULT NULL COMMENT '设备ID',
  `frequency` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '频率类型(1-每日,2-每周,3-每月,4-每季度,5-每年)',
  `frequency_value` INT UNSIGNED NOT NULL DEFAULT '1' COMMENT '频率值',
  `start_date` DATE NOT NULL COMMENT '开始日期',
  `end_date` DATE DEFAULT NULL COMMENT '结束日期',
  `responsible_department_id` INT UNSIGNED NOT NULL COMMENT '责任科室ID',
  `responsible_person_id` INT UNSIGNED DEFAULT NULL COMMENT '责任人ID',
  `description` TEXT DEFAULT NULL COMMENT '描述',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-启用,2-禁用)',
  `created_by` INT UNSIGNED NOT NULL COMMENT '创建人ID',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_device_category` (`device_category_id`),
  KEY `idx_device` (`device_id`),
  KEY `idx_responsible_department` (`responsible_department_id`),
  KEY `idx_responsible_person` (`responsible_person_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='PM计划表';
```

#### 3.5.2 PM任务表 (pm_tasks)
```sql
CREATE TABLE `pm_tasks` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PM任务ID',
  `pm_plan_id` INT UNSIGNED NOT NULL COMMENT 'PM计划ID',
  `device_id` INT UNSIGNED NOT NULL COMMENT '设备ID',
  `scheduled_date` DATE NOT NULL COMMENT '计划执行日期',
  `actual_date` DATE DEFAULT NULL COMMENT '实际执行日期',
  `executor_id` INT UNSIGNED DEFAULT NULL COMMENT '执行人ID',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-待执行,2-执行中,3-已完成,4-已取消)',
  `result` TEXT DEFAULT NULL COMMENT '执行结果',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_pm_plan` (`pm_plan_id`),
  KEY `idx_device` (`device_id`),
  KEY `idx_executor` (`executor_id`),
  KEY `idx_status` (`status`),
  KEY `idx_scheduled_date` (`scheduled_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='PM任务表';
```

### 3.6 培训考试相关表

#### 3.6.1 课程表 (courses)
```sql
CREATE TABLE `courses` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '课程ID',
  `title` VARCHAR(200) NOT NULL COMMENT '课程标题',
  `description` TEXT DEFAULT NULL COMMENT '课程描述',
  `cover_image_url` VARCHAR(255) DEFAULT NULL COMMENT '封面图片URL',
  `category_id` INT UNSIGNED NOT NULL COMMENT '课程分类ID',
  `instructor_id` INT UNSIGNED NOT NULL COMMENT '讲师ID',
  `duration` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '课程时长(分钟)',
  `difficulty_level` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '难度等级(1-初级,2-中级,3-高级)',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-草稿,2-已发布,3-已下架)',
  `is_required` TINYINT UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否必修(0-否,1-是)',
  `prerequisite_course_id` INT UNSIGNED DEFAULT NULL COMMENT '前置课程ID',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_category` (`category_id`),
  KEY `idx_instructor` (`instructor_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程表';
```

#### 3.6.2 课程分类表 (course_categories)
```sql
CREATE TABLE `course_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` VARCHAR(100) NOT NULL COMMENT '分类名称',
  `parent_id` INT UNSIGNED DEFAULT NULL COMMENT '上级分类ID',
  `level` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '层级',
  `sort_order` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '排序',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_parent` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程分类表';
```

#### 3.6.3 课程章节表 (course_sections)
```sql
CREATE TABLE `course_sections` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '章节ID',
  `course_id` INT UNSIGNED NOT NULL COMMENT '课程ID',
  `title` VARCHAR(200) NOT NULL COMMENT '章节标题',
  `description` TEXT DEFAULT NULL COMMENT '章节描述',
  `sort_order` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '排序',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程章节表';
```

#### 3.6.4 考试表 (exams)
```sql
CREATE TABLE `exams` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '考试ID',
  `title` VARCHAR(200) NOT NULL COMMENT '考试标题',
  `description` TEXT DEFAULT NULL COMMENT '考试描述',
  `course_id` INT UNSIGNED DEFAULT NULL COMMENT '关联课程ID',
  `total_score` DECIMAL(6,2) NOT NULL DEFAULT '100.00' COMMENT '总分',
  `pass_score` DECIMAL(6,2) NOT NULL DEFAULT '60.00' COMMENT '及格分',
  `duration` INT UNSIGNED NOT NULL DEFAULT '60' COMMENT '考试时长(分钟)',
  `question_count` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '题目数量',
  `allow_multiple_attempts` TINYINT UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否允许多次尝试(0-否,1-是)',
  `max_attempts` INT UNSIGNED NOT NULL DEFAULT '1' COMMENT '最大尝试次数',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-草稿,2-已发布,3-已下架)',
  `created_by` INT UNSIGNED NOT NULL COMMENT '创建人ID',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_course` (`course_id`),
  KEY `idx_created_by` (`created_by`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='考试表';
```

### 3.7 不良事件管理相关表

#### 3.7.1 不良事件表 (adverse_events)
```sql
CREATE TABLE `adverse_events` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '不良事件ID',
  `event_number` VARCHAR(50) NOT NULL COMMENT '事件编号',
  `event_type_id` INT UNSIGNED NOT NULL COMMENT '事件类型ID',
  `severity_level` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '严重程度(1-轻微,2-一般,3-严重,4-非常严重)',
  `discovery_date` DATE NOT NULL COMMENT '发现日期',
  `occurrence_date` DATE DEFAULT NULL COMMENT '发生日期',
  `reporter_id` INT UNSIGNED NOT NULL COMMENT '报告人ID',
  `report_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '报告日期',
  `patient_info` JSON DEFAULT NULL COMMENT '患者信息(JSON格式)',
  `device_info` JSON DEFAULT NULL COMMENT '设备信息(JSON格式)',
  `event_description` TEXT NOT NULL COMMENT '事件描述',
  `immediate_action` TEXT DEFAULT NULL COMMENT '立即采取的措施',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-待处理,2-调查中,3-处理中,4-已完成,5-已关闭)',
  `assigned_investigator_id` INT UNSIGNED DEFAULT NULL COMMENT '指派调查员ID',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_event_number` (`event_number`),
  KEY `idx_event_type` (`event_type_id`),
  KEY `idx_reporter` (`reporter_id`),
  KEY `idx_investigator` (`assigned_investigator_id`),
  KEY `idx_status` (`status`),
  KEY `idx_discovery_date` (`discovery_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='不良事件表';
```

#### 3.7.2 不良事件类型表 (adverse_event_types)
```sql
CREATE TABLE `adverse_event_types` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '事件类型ID',
  `name` VARCHAR(100) NOT NULL COMMENT '事件类型名称',
  `description` TEXT DEFAULT NULL COMMENT '事件类型描述',
  `parent_id` INT UNSIGNED DEFAULT NULL COMMENT '上级类型ID',
  `level` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '层级',
  `sort_order` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '排序',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_parent` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='不良事件类型表';
```

### 3.8 设备报废管理相关表

#### 3.8.1 报废申请表 (disposal_applications)
```sql
CREATE TABLE `disposal_applications` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '报废申请ID',
  `application_number` VARCHAR(50) NOT NULL COMMENT '申请编号',
  `device_id` INT UNSIGNED NOT NULL COMMENT '设备ID',
  `applicant_id` INT UNSIGNED NOT NULL COMMENT '申请人ID',
  `application_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '申请日期',
  `reason` TEXT NOT NULL COMMENT '报废原因',
  `estimated_value` DECIMAL(12,2) DEFAULT NULL COMMENT '预计价值',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-草稿,2-待审批,3-审批中,4-已批准,5-已拒绝,6-处置中,7-已完成)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_application_number` (`application_number`),
  KEY `idx_device` (`device_id`),
  KEY `idx_applicant` (`applicant_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='报废申请表';
```

#### 3.8.2 审批流程表 (approval_workflows)
```sql
CREATE TABLE `approval_workflows` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '审批流程ID',
  `disposal_application_id` INT UNSIGNED NOT NULL COMMENT '报废申请ID',
  `current_approver_id` INT UNSIGNED DEFAULT NULL COMMENT '当前审批人ID',
  `approval_level` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '当前审批级别',
  `total_levels` TINYINT UNSIGNED NOT NULL DEFAULT '3' COMMENT '总审批级别',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-待审批,2-审批中,3-已批准,4-已拒绝)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_disposal_application` (`disposal_application_id`),
  KEY `idx_current_approver` (`current_approver_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='审批流程表';
```

### 3.9 库存管理相关表

#### 3.9.1 库存表 (inventories)
```sql
CREATE TABLE `inventories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '库存ID',
  `item_code` VARCHAR(50) NOT NULL COMMENT '物品编码',
  `item_name` VARCHAR(200) NOT NULL COMMENT '物品名称',
  `item_type` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '物品类型(1-设备,2-耗材)',
  `category_id` INT UNSIGNED NOT NULL COMMENT '分类ID',
  `unit` VARCHAR(20) NOT NULL COMMENT '单位',
  `current_quantity` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '当前库存数量',
  `minimum_quantity` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '最低库存数量',
  `maximum_quantity` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '最高库存数量',
  `location` VARCHAR(200) DEFAULT NULL COMMENT '存放位置',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '状态(1-正常,2-冻结)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_item_code` (`item_code`),
  KEY `idx_category` (`category_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='库存表';
```

#### 3.9.2 入库记录表 (inventory_in_records)
```sql
CREATE TABLE `inventory_in_records` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '入库记录ID',
  `inventory_id` INT UNSIGNED NOT NULL COMMENT '库存ID',
  `in_number` VARCHAR(50) NOT NULL COMMENT '入库单号',
  `supplier_id` INT UNSIGNED DEFAULT NULL COMMENT '供应商ID',
  `quantity` INT UNSIGNED NOT NULL COMMENT '入库数量',
  `unit_price` DECIMAL(10,2) NOT NULL COMMENT '单价',
  `total_amount` DECIMAL(12,2) NOT NULL COMMENT '总金额',
  `in_date` DATE NOT NULL COMMENT '入库日期',
  `handler_id` INT UNSIGNED NOT NULL COMMENT '处理人ID',
  `remark` TEXT DEFAULT NULL COMMENT '备注',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_inventory` (`inventory_id`),
  KEY `idx_handler` (`handler_id`),
  KEY `idx_in_date` (`in_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='入库记录表';
```

### 3.10 统计分析相关表

#### 3.10.1 统计报告表 (statistical_reports)
```sql
CREATE TABLE `statistical_reports` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '统计报告ID',
  `report_name` VARCHAR(200) NOT NULL COMMENT '报告名称',
  `report_type` TINYINT UNSIGNED NOT NULL DEFAULT '1' COMMENT '报告类型(1-设备统计,2-维修统计,3-培训统计,4-不良事件统计,5-报废统计)',
  `report_period` VARCHAR(50) NOT NULL COMMENT '报告周期(如:2023-Q1,2023-01)',
  `data_content` JSON NOT NULL COMMENT '数据内容(JSON格式)',
  `generated_by` INT UNSIGNED NOT NULL COMMENT '生成人ID',
  `generated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '生成时间',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_report_type` (`report_type`),
  KEY `idx_generated_by` (`generated_by`),
  KEY `idx_generated_at` (`generated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='统计报告表';
```

#### 3.10.2 系统日志表 (system_logs)
```sql
CREATE TABLE `system_logs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '日志ID',
  `user_id` INT UNSIGNED DEFAULT NULL COMMENT '用户ID',
  `operation` VARCHAR(100) NOT NULL COMMENT '操作类型',
  `module` VARCHAR(50) NOT NULL COMMENT '模块',
  `description` TEXT DEFAULT NULL COMMENT '描述',
  `ip_address` VARCHAR(45) DEFAULT NULL COMMENT 'IP地址',
  `user_agent` TEXT DEFAULT NULL COMMENT '用户代理',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_operation` (`operation`),
  KEY `idx_module` (`module`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统日志表';
```

## 4. 索引优化建议

1. **用户相关查询**: 在用户表的用户名、邮箱、科室ID等字段上建立索引
2. **设备相关查询**: 在设备表的设备编号、所属科室、状态等字段上建立索引
3. **维修工单查询**: 在维修工单表的设备ID、报修人、状态等字段上建立索引
4. **培训考试查询**: 在课程表、考试表的相关字段上建立索引
5. **不良事件查询**: 在不良事件表的事件类型、状态、发现日期等字段上建立索引
6. **报废申请查询**: 在报废申请表的设备ID、申请人、状态等字段上建立索引
7. **库存管理查询**: 在库存表的物品编码、分类、状态等字段上建立索引
8. **统计分析查询**: 在统计报告表的报告类型、生成时间等字段上建立索引

## 5. 数据安全与备份

1. **敏感数据加密**: 用户密码等敏感信息应使用加密存储
2. **访问控制**: 通过角色和权限控制数据库访问
3. **定期备份**: 建立定期数据备份机制
4. **审计日志**: 记录重要数据操作日志