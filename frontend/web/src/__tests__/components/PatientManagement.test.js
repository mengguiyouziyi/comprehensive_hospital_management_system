import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientManagement from '../../pages/PatientManagement';

// Mock the api service
jest.mock('../../services/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

const mockPatients = [
  {
    id: 'P001',
    name: '张三',
    gender: '男',
    age: 45,
    idCard: '320123198001010011',
    phone: '13800138001',
    address: '北京市朝阳区建国路88号',
    medicalRecordNumber: 'MR20230001',
    department: '内科',
    doctor: '李医生',
    admissionDate: '2023-12-01',
    dischargeDate: null,
    status: '住院',
    diagnosis: '高血压',
    allergies: '青霉素',
    bloodType: 'A+',
    emergencyContact: '王女士',
    emergencyPhone: '13900139001'
  }
];

describe('PatientManagement Component', () => {
  const mockApi = require('../../services/api');

  beforeEach(() => {
    jest.clearAllMocks();
    mockApi.get.mockResolvedValue({ data: { code: 0, data: mockPatients } });
  });

  it('should render patient management page', () => {
    render(
      <MemoryRouter>
        <PatientManagement />
      </MemoryRouter>
    );

    expect(screen.getByText('患者管理')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('搜索患者姓名/病历号')).toBeInTheDocument();
  });

  it('should display patient list', async () => {
    render(
      <MemoryRouter>
        <PatientManagement />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('张三')).toBeInTheDocument();
      expect(screen.getByText('男')).toBeInTheDocument();
      expect(screen.getByText('45')).toBeInTheDocument();
    });
  });

  it('should handle search functionality', async () => {
    render(
      <MemoryRouter>
        <PatientManagement />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('搜索患者姓名/病历号');
    fireEvent.change(searchInput, { target: { value: '张三' } });

    // Wait for search to execute
    await waitFor(() => {
      expect(mockApi.get).toHaveBeenCalledWith('/patients', expect.objectContaining({
        params: expect.objectContaining({
          search: '张三'
        })
      }));
    });
  });

  it('should open add patient modal', () => {
    render(
      <MemoryRouter>
        <PatientManagement />
      </MemoryRouter>
    );

    const addButton = screen.getByRole('button', { name: /新增患者/i });
    fireEvent.click(addButton);

    expect(screen.getByText('新增患者')).toBeInTheDocument();
  });

  it('should handle idCard safely when age calculation fails', async () => {
    const patientWithInvalidId = { ...mockPatients[0], idCard: null };
    mockApi.get.mockResolvedValue({ data: { code: 0, data: [patientWithInvalidId] } });

    render(
      <MemoryRouter>
        <PatientManagement />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('张三')).toBeInTheDocument();
      // Should not crash when idCard is null
    });
  });

  it('should calculate age correctly from idCard', async () => {
    render(
      <MemoryRouter>
        <PatientManagement />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Patient with valid idCard should show calculated age
      expect(screen.getByText('45')).toBeInTheDocument();
    });
  });
});