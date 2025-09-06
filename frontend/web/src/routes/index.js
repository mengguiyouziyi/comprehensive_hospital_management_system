import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import EquipmentManagement from '../pages/EquipmentManagement';
import PatientManagement from '../pages/PatientManagement';
import DoctorManagement from '../pages/DoctorManagement';
import AppointmentsManagement from '../pages/AppointmentsManagement';
import ReportsManagement from '../pages/ReportsManagement';
import TrainingManagement from '../pages/TrainingManagement';
import AdverseEventsManagement from '../pages/AdverseEventsManagement';
import DisposalManagement from '../pages/DisposalManagement';
import MaintenanceManagement from '../pages/MaintenanceManagement';
import FinanceManagement from '../pages/FinanceManagement';
import InventoryManagement from '../pages/InventoryManagement';
import UserManagement from '../pages/UserManagement';
import RoleManagement from '../pages/RoleManagement';
import SystemSettings from '../pages/SystemSettings';
import OperationLogs from '../pages/OperationLogs';
import SafetyManagement from '../pages/SafetyManagement';
import ComplianceManagement from '../pages/ComplianceManagement';
import QualityControlManagement from '../pages/QualityControlManagement';
import InspectionManagement from '../pages/InspectionManagement';
import RepairOrderManagement from '../pages/RepairOrderManagement';
import PreventiveMaintenanceManagement from '../pages/PreventiveMaintenanceManagement';
import HospitalEquipmentInventoryManagement from '../pages/HospitalEquipmentInventoryManagement';
import MedicalEquipmentMeasurementManagement from '../pages/MedicalEquipmentMeasurementManagement';
import ProcurementManagement from '../pages/ProcurementManagement';
import SparePartsManagement from '../pages/SparePartsManagement';
import EquipmentDisinfectionManagement from '../pages/EquipmentDisinfectionManagement';
import MedicalEquipmentUsageRecordManagement from '../pages/MedicalEquipmentUsageRecordManagement';
import UserProfile from '../pages/UserProfile';
import CertificationManagement from '../pages/CertificationManagement';
import PerformanceManagement from '../pages/PerformanceManagement';
import DashboardLayout from '../components/DashboardLayout';

const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <DashboardLayout><Dashboard /></DashboardLayout>
  },
  {
    path: '/equipment',
    element: <DashboardLayout><EquipmentManagement /></DashboardLayout>
  },
  {
    path: '/patients',
    element: <DashboardLayout><PatientManagement /></DashboardLayout>
  },
  {
    path: '/doctors',
    element: <DashboardLayout><DoctorManagement /></DashboardLayout>
  },
  {
    path: '/appointments',
    element: <DashboardLayout><AppointmentsManagement /></DashboardLayout>
  },
  {
    path: '/reports',
    element: <DashboardLayout><ReportsManagement /></DashboardLayout>
  },
  {
    path: '/training',
    element: <DashboardLayout><TrainingManagement /></DashboardLayout>
  },
  {
    path: '/adverse-events',
    element: <DashboardLayout><AdverseEventsManagement /></DashboardLayout>
  },
  {
    path: '/disposal',
    element: <DashboardLayout><DisposalManagement /></DashboardLayout>
  },
  {
    path: '/maintenance',
    element: <DashboardLayout><MaintenanceManagement /></DashboardLayout>
  },
  {
    path: '/finance',
    element: <DashboardLayout><FinanceManagement /></DashboardLayout>
  },
  {
    path: '/inventory',
    element: <DashboardLayout><InventoryManagement /></DashboardLayout>
  },
  {
    path: '/users',
    element: <DashboardLayout><UserManagement /></DashboardLayout>
  },
  {
    path: '/roles',
    element: <DashboardLayout><RoleManagement /></DashboardLayout>
  },
  {
    path: '/settings',
    element: <DashboardLayout><SystemSettings /></DashboardLayout>
  },
  {
    path: '/logs',
    element: <DashboardLayout><OperationLogs /></DashboardLayout>
  },
  {
    path: '/safety',
    element: <DashboardLayout><SafetyManagement /></DashboardLayout>
  },
  {
    path: '/compliance',
    element: <DashboardLayout><ComplianceManagement /></DashboardLayout>
  },
  {
    path: '/quality-control',
    element: <DashboardLayout><QualityControlManagement /></DashboardLayout>
  },
  {
    path: '/inspection',
    element: <DashboardLayout><InspectionManagement /></DashboardLayout>
  },
  {
    path: '/repair-orders',
    element: <DashboardLayout><RepairOrderManagement /></DashboardLayout>
  },
  {
    path: '/preventive-maintenance',
    element: <DashboardLayout><PreventiveMaintenanceManagement /></DashboardLayout>
  },
  {
    path: '/inventory-management',
    element: <DashboardLayout><HospitalEquipmentInventoryManagement /></DashboardLayout>
  },
  {
    path: '/measurement',
    element: <DashboardLayout><MedicalEquipmentMeasurementManagement /></DashboardLayout>
  },
  {
    path: '/procurement',
    element: <DashboardLayout><ProcurementManagement /></DashboardLayout>
  },
  {
    path: '/spare-parts',
    element: <DashboardLayout><SparePartsManagement /></DashboardLayout>
  },
  {
    path: '/disinfection',
    element: <DashboardLayout><EquipmentDisinfectionManagement /></DashboardLayout>
  },
  {
    path: '/usage-records',
    element: <DashboardLayout><MedicalEquipmentUsageRecordManagement /></DashboardLayout>
  },
  {
    path: '/profile',
    element: <DashboardLayout><UserProfile /></DashboardLayout>
  },
  {
    path: '/certification',
    element: <DashboardLayout><CertificationManagement /></DashboardLayout>
  },
  {
    path: '/performance',
    element: <DashboardLayout><PerformanceManagement /></DashboardLayout>
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" />
  }
];

export default routes;