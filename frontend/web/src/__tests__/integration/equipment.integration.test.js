import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { message } from 'antd';
import EquipmentManagement from '../../pages/EquipmentManagement';
import * as equipmentService from '../../services/equipmentService';
import { BrowserRouter } from 'react-router-dom';

// Mock the equipment service
jest.mock('../../services/equipmentService', () => ({
  getAllEquipment: jest.fn(),
  addEquipment: jest.fn(),
  deleteEquipment: jest.fn(),
  updateEquipment: jest.fn(),
}));

// Mock antd message
jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  return {
    ...antd,
    message: {
      success: jest.fn(),
      error: jest.fn(),
    },
  };
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Create a wrapper component with router
const WithRouter = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('Equipment Management Integration Tests', () => {

  test('should fetch and display equipment list from API', async () => {
    const mockEquipment = [
      { id: 1, name: 'X光机', model: 'Model-X1', serialNumber: 'SN001', status: 'available', purchaseDate: '2023-01-01' },
      { id: 2, name: '超声波仪', model: 'Model-U2', serialNumber: 'SN002', status: 'in_use', purchaseDate: '2023-01-02' }
    ];

    equipmentService.getAllEquipment.mockResolvedValue({ 
      data: mockEquipment,
      total: 2
    });

    render(
      <WithRouter>
        <EquipmentManagement />
      </WithRouter>
    );
    
    // Wait for data to load and display
    await waitFor(() => {
      expect(screen.getByText('X光机')).toBeInTheDocument();
      expect(screen.getByText('超声波仪')).toBeInTheDocument();
    });
    
    expect(equipmentService.getAllEquipment).toHaveBeenCalledWith(1, 10);
  });

  test('should add new equipment through API', async () => {
    const mockEquipment = [
      { id: 1, name: 'X光机', model: 'Model-X1', serialNumber: 'SN001', status: 'available', purchaseDate: '2023-01-01' }
    ];

    equipmentService.getAllEquipment
      .mockResolvedValueOnce({ data: [], total: 0 }) // Initial load
      .mockResolvedValueOnce({ data: mockEquipment, total: 1 }); // After add

    equipmentService.addEquipment.mockResolvedValue({ success: true });

    render(
      <WithRouter>
        <EquipmentManagement />
      </WithRouter>
    );
    
    // Click add button
    fireEvent.click(screen.getByText('添加设备'));
    
    // Fill form
    fireEvent.change(screen.getByLabelText('设备名称'), { target: { value: 'X光机' } });
    fireEvent.change(screen.getByLabelText('型号'), { target: { value: 'Model-X1' } });
    fireEvent.change(screen.getByLabelText('序列号'), { target: { value: 'SN001' } });
    fireEvent.change(screen.getByLabelText('状态'), { target: { value: 'available' } });
    fireEvent.change(screen.getByLabelText('购买日期'), { target: { value: '2023-01-01' } });
    
    // Submit form
    fireEvent.click(screen.getByText('添加'));
    
    await waitFor(() => {
      expect(equipmentService.addEquipment).toHaveBeenCalled();
      expect(equipmentService.getAllEquipment).toHaveBeenCalledTimes(2);
    });
  });

  test('should delete equipment through API', async () => {
    const mockEquipment = [
      { id: 1, name: 'X光机', model: 'Model-X1', serialNumber: 'SN001', status: 'available', purchaseDate: '2023-01-01' }
    ];

    equipmentService.getAllEquipment
      .mockResolvedValueOnce({ data: mockEquipment, total: 1 }) // Initial load
      .mockResolvedValueOnce({ data: [], total: 0 }); // After delete

    equipmentService.deleteEquipment.mockResolvedValue({ success: true });

    render(
      <WithRouter>
        <EquipmentManagement />
      </WithRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('X光机')).toBeInTheDocument();
    });

    // Click delete button
    fireEvent.click(screen.getByText('删除'));
    
    await waitFor(() => {
      expect(equipmentService.deleteEquipment).toHaveBeenCalledWith(1);
      expect(equipmentService.getAllEquipment).toHaveBeenCalledTimes(2);
    });
  });

  test('should handle API errors gracefully', async () => {
    equipmentService.getAllEquipment.mockRejectedValue(new Error('网络错误'));

    render(
      <WithRouter>
        <EquipmentManagement />
      </WithRouter>
    );
    
    // Wait for error message
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('获取设备列表失败');
    });
  });
});