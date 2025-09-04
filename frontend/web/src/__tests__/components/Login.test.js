import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/Login';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock react-router-dom useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock fetch
global.fetch = jest.fn();

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText('医院管理系统登录')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('用户名/邮箱')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('密码')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '登录' })).toBeInTheDocument();
  });

  it('should show error message with invalid input', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('button', { name: '登录' });
    fireEvent.click(loginButton);

    expect(await screen.findByText('请输入用户名/邮箱!')).toBeInTheDocument();
    expect(await screen.findByText('请输入密码!')).toBeInTheDocument();
  });

  it('should login successfully with valid credentials', async () => {
    // Mock successful login response
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        code: 0,
        message: 'success',
        data: {
          access_token: 'test-token',
          user: { id: 1, username: 'testuser' }
        }
      })
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('用户名/邮箱'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('密码'), {
      target: { value: 'password123' }
    });

    // Submit the form
    const loginButton = screen.getByRole('button', { name: '登录' });
    fireEvent.click(loginButton);

    // Wait for async operations
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/login', expect.any(Object));
      expect(localStorage.setItem).toHaveBeenCalledWith('access_token', 'test-token');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should show error message on login failure', async () => {
    // Mock failed login response
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        code: 1002,
        message: '用户名或密码错误',
        data: null
      })
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('用户名/邮箱'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('密码'), {
      target: { value: 'wrongpassword' }
    });

    // Submit the form
    const loginButton = screen.getByRole('button', { name: '登录' });
    fireEvent.click(loginButton);

    // Wait for error message
    expect(await screen.findByText('用户名或密码错误')).toBeInTheDocument();
  });
});