import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EquipmentManagement from '../../pages/EquipmentManagement';

// Simplified test for EquipmentManagement component
describe('EquipmentManagement Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render equipment management page with title', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <EquipmentManagement />
        </BrowserRouter>
      );
    });

    // Check if main title is rendered
    expect(screen.getByText('设备台账管理')).toBeInTheDocument();
    expect(screen.getByText('管理系统中的所有医疗设备信息')).toBeInTheDocument();
  });

  it('should render add equipment button', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <EquipmentManagement />
        </BrowserRouter>
      );
    });

    // Wait for data to load and button to appear
    await waitFor(() => {
      const addButton = screen.getByText('添加设备');
      expect(addButton).toBeInTheDocument();
    });
  });

  it('should have search input', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <EquipmentManagement />
        </BrowserRouter>
      );
    });

    // Wait for search input to appear
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('搜索设备名称、型号或编号');
      expect(searchInput).toBeInTheDocument();
    });
  });

  it('should render statistics cards', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <EquipmentManagement />
        </BrowserRouter>
      );
    });

    // Wait for statistics to load
    await waitFor(() => {
      expect(screen.getByText('设备总数')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('should open add equipment modal when button is clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <EquipmentManagement />
        </BrowserRouter>
      );
    });

    // Wait for add button and click it (use role to distinguish between button and modal title)
    await waitFor(() => {
      const addButton = screen.getByRole('button', { name: /添加设备/ });
      fireEvent.click(addButton);
    });

    // Check if modal appears (look for modal title specifically)
    await waitFor(() => {
      const modalTitle = document.querySelector('.ant-modal-title');
      expect(modalTitle).toBeInTheDocument();
      expect(modalTitle.textContent).toBe('添加设备');
    });
  });

  it('should display equipment data in table', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <EquipmentManagement />
        </BrowserRouter>
      );
    });

    // Wait for table data to load
    await waitFor(() => {
      expect(screen.getByText('CT扫描仪')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('should handle search functionality', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <EquipmentManagement />
        </BrowserRouter>
      );
    });

    // Wait for search input
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('搜索设备名称、型号或编号');
      fireEvent.change(searchInput, { target: { value: 'CT' } });
    });

    // Verify search input value changed
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('搜索设备名称、型号或编号');
      expect(searchInput.value).toBe('CT');
    });
  });
});