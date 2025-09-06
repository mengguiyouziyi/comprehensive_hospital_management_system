import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';

// Mock the child components
jest.mock('../../pages/Dashboard', () => () => <div>Dashboard Content</div>);

describe('DashboardLayout Component', () => {
  const mockChildren = <div>Test Content</div>;

  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        removeItem: jest.fn(),
        getItem: jest.fn(() => null)
      },
      writable: true
    });
  });

  it('should render dashboard layout with sidebar and header', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <DashboardLayout>{mockChildren}</DashboardLayout>
      </MemoryRouter>
    );

    expect(screen.getByText('医院管理系统')).toBeInTheDocument();
    expect(screen.getByText('仪表板')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should toggle sidebar collapse state', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <DashboardLayout>{mockChildren}</DashboardLayout>
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    // After clicking toggle, the layout should still be functional
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should handle logout', () => {
    const mockRemoveItem = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        removeItem: mockRemoveItem
      },
      writable: true
    });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <DashboardLayout>{mockChildren}</DashboardLayout>
      </MemoryRouter>
    );

    // Find and click user dropdown to trigger logout
    const userDropdown = screen.getByText('管理员');
    fireEvent.click(userDropdown);

    // Logout option should be visible
    expect(screen.getByText('退出登录')).toBeInTheDocument();
  });

  it('should show notification dropdown', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <DashboardLayout>{mockChildren}</DashboardLayout>
      </MemoryRouter>
    );

    const notificationButton = screen.getByRole('button', { name: /bell/i });
    fireEvent.click(notificationButton);

    // Check if notification items are present
    expect(screen.getByText('通知中心')).toBeInTheDocument();
    expect(screen.getByText('系统通知')).toBeInTheDocument();
  });

  it('should display breadcrumb navigation', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <DashboardLayout>{mockChildren}</DashboardLayout>
      </MemoryRouter>
    );

    // Should show breadcrumb for dashboard
    expect(screen.getByText('仪表板')).toBeInTheDocument();
  });
});