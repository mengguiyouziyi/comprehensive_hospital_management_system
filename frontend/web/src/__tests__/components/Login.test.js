import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/Login';

// Mock the api service instead of authService
jest.mock('../../services/api', () => ({
  post: jest.fn()
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Login Component', () => {
  const mockApi = require('../../services/api');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('用户名')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('密码')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '登 录' })).toBeInTheDocument(); // 注意这里的空格
  });

  it('should show error message with invalid input', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: '登 录' }));

    await waitFor(() => {
      expect(screen.getByText('请输入用户名!')).toBeInTheDocument();
      expect(screen.getByText('请输入密码!')).toBeInTheDocument();
    });
  });

  it('should login successfully with valid credentials', async () => {
    // Mock the API response to simulate successful login
    mockApi.post.mockResolvedValue({ 
      data: { 
        code: 0, 
        data: { access_token: 'test-token' } 
      }
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('用户名'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('密码'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: '登 录' }));

    // 等待异步操作完成
    await waitFor(() => {
      expect(mockApi.post).toHaveBeenCalled();
    });
    
    // 检查调用参数
    expect(mockApi.post).toHaveBeenCalledWith('/auth/login', {
      username: 'testuser',
      password: 'password123',
      remember: true
    });
    
    // 检查导航是否发生
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should show error message on login failure', async () => {
    mockApi.post.mockResolvedValue({
      data: {
        code: 1,
        message: '登录失败'
      }
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('用户名'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('密码'), {
      target: { value: 'wrongpassword' }
    });
    fireEvent.click(screen.getByRole('button', { name: '登 录' }));

    // 等待错误消息出现，根据实际实现可能需要调整文本
    await waitFor(() => {
      expect(screen.getByText(/登录失败/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});