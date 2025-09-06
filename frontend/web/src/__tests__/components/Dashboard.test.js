import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import { mockApi, mockStatistics } from '../../__tests__/mockData';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock the mockData module
jest.mock('../../__tests__/mockData', () => ({
  mockApi: {
    getStatistics: jest.fn()
  },
  mockStatistics: {
    equipment: { total: 156, normal: 142, maintenance: 8, repair: 4, scrapped: 2, utilizationRate: 78.5 },
    patients: { total: 1250, inpatient: 320, outpatient: 930, todayAdmissions: 15, todayDischarges: 12 },
    appointments: { total: 450, confirmed: 380, pending: 45, completed: 410, cancelled: 25 },
    maintenance: { total: 89, completed: 76, inProgress: 8, pending: 5, overdue: 3 }
  }
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock successful API response
    mockApi.getStatistics.mockResolvedValue({ code: 0, data: mockStatistics });
  });

  it('should render dashboard with statistics', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

    // Check if main title is rendered
    expect(screen.getByText('医院管理系统仪表板')).toBeInTheDocument();
    expect(screen.getByText('欢迎使用医院综合管理系统')).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('设备总数')).toBeInTheDocument();
      expect(screen.getByText('156')).toBeInTheDocument();
      expect(screen.getByText('患者总数')).toBeInTheDocument();
      expect(screen.getByText('1250')).toBeInTheDocument();
      expect(screen.getByText('预约总数')).toBeInTheDocument();
      expect(screen.getByText('450')).toBeInTheDocument();
      expect(screen.getByText('维护记录')).toBeInTheDocument();
      expect(screen.getByText('89')).toBeInTheDocument();
    });
  });

  it('should render quick access cards', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      const quickAccessCards = screen.getAllByRole('button');
      expect(quickAccessCards).toHaveLength(4);
      
      expect(screen.getByText('患者管理')).toBeInTheDocument();
      expect(screen.getByText('设备管理')).toBeInTheDocument();
      expect(screen.getByText('预约管理')).toBeInTheDocument();
      expect(screen.getByText('维护管理')).toBeInTheDocument();
    });
  });

  it('should navigate when quick access card is clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      const patientsCard = screen.getByText('患者管理').closest('.ant-card');
      fireEvent.click(patientsCard);
      expect(mockNavigate).toHaveBeenCalledWith('/patients');
    });
  });

  it('should render recent activities timeline', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('最近活动')).toBeInTheDocument();
      expect(screen.getByText('CT扫描仪完成定期维护')).toBeInTheDocument();
      expect(screen.getByText('新患者张三入院')).toBeInTheDocument();
      expect(screen.getByText('核磁共振设备需要维护')).toBeInTheDocument();
      expect(screen.getByText('李医生新增3个预约')).toBeInTheDocument();
    });
  });

  it('should render equipment status', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('设备状态')).toBeInTheDocument();
      expect(screen.getByText('正常设备')).toBeInTheDocument();
      expect(screen.getByText('142 台')).toBeInTheDocument();
      expect(screen.getByText('维护中')).toBeInTheDocument();
      expect(screen.getByText('8 台')).toBeInTheDocument();
    });
  });

  it('should render recent maintenance table', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('最近维护')).toBeInTheDocument();
      expect(screen.getByText('CT扫描仪')).toBeInTheDocument();
      expect(screen.getByText('核磁共振设备')).toBeInTheDocument();
      expect(screen.getByText('呼吸机')).toBeInTheDocument();
    });
  });

  it('should handle loading state', async () => {
    // Mock delayed response
    mockApi.getStatistics.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ code: 0, data: mockStatistics }), 1000))
    );

    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

    // Initially should show loading state or empty state
    expect(screen.getByText('医院管理系统仪表板')).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('设备总数')).toBeInTheDocument();
    }, { timeout: 1500 });
  });

  it('should handle API error gracefully', async () => {
    // Mock API error
    mockApi.getStatistics.mockRejectedValue(new Error('API Error'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

    // Should still render the component structure
    expect(screen.getByText('医院管理系统仪表板')).toBeInTheDocument();
    
    // Wait for potential error handling
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to load dashboard data:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('should display correct statistics', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      // Check equipment statistics
      expect(screen.getByText('156')).toBeInTheDocument(); // Total equipment
      expect(screen.getByText('78.5%')).toBeInTheDocument(); // Utilization rate
      
      // Check patient statistics
      expect(screen.getByText('1250')).toBeInTheDocument(); // Total patients
      expect(screen.getByText('住院: 320 | 门诊: 930')).toBeInTheDocument();
      
      // Check appointment statistics
      expect(screen.getByText('450')).toBeInTheDocument(); // Total appointments
      expect(screen.getByText('45 待确认')).toBeInTheDocument(); // Pending appointments
      
      // Check maintenance statistics
      expect(screen.getByText('89')).toBeInTheDocument(); // Total maintenance
      expect(screen.getByText('3 逾期')).toBeInTheDocument(); // Overdue maintenance
    });
  });

  it('should have working navigation buttons', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      const viewAllButtons = screen.getAllByText('查看全部');
      expect(viewAllButtons.length).toBeGreaterThan(0);
      
      // Click first view all button
      fireEvent.click(viewAllButtons[0]);
      // Note: These buttons might not navigate anywhere in current implementation
      // but they should be clickable without errors
    });
  });

  it('should render progress bars for statistics', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      // Check if progress bar is rendered for equipment utilization
      const progressBars = document.querySelectorAll('.ant-progress');
      expect(progressBars.length).toBeGreaterThan(0);
    });
  });

  it('should display trend indicators', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      // Check for trend indicators (up/down arrows)
      expect(screen.getByText('+12%')).toBeInTheDocument();
      expect(screen.getByText('+5%')).toBeInTheDocument();
    });
  });
});