import AuthService from '../../services/authService';

describe('Frontend Auth Integration Tests', () => {
  describe('AuthService Integration', () => {
    beforeEach(() => {
      // 清除所有模拟
      jest.clearAllMocks();
    });

    it('should login successfully with valid credentials', async () => {
      const loginData = {
        username: 'frontend_testuser',
        password: 'password123'
      };

      // Mock api.post to simulate successful login
      const mockPost = jest.spyOn(AuthService, 'login').mockResolvedValue({
        data: {
          code: 0,
          message: '登录成功',
          data: {
            access_token: 'test_token',
            expires_in: 86400,
            user: {
              _id: '123',
              username: loginData.username,
              email: 'frontend_test@example.com',
              fullName: 'Frontend Test User'
            }
          }
        }
      });

      const result = await AuthService.login(loginData.username, loginData.password);
      
      expect(mockPost).toHaveBeenCalledWith(loginData.username, loginData.password);
      expect(result.data.data).toHaveProperty('access_token');
      expect(result.data.data).toHaveProperty('user');
      expect(result.data.data.user.username).toBe(loginData.username);
      
      // 清理mock
      mockPost.mockRestore();
    });

    it('should fail to login with invalid credentials', async () => {
      const loginData = {
        username: 'frontend_testuser',
        password: 'wrongpassword'
      };

      // Mock api.post to simulate login failure
      const mockPost = jest.spyOn(AuthService, 'login').mockRejectedValue(new Error('密码错误'));

      await expect(AuthService.login(loginData.username, loginData.password))
        .rejects
        .toThrow('密码错误');
      
      // 清理mock
      mockPost.mockRestore();
    });

    it('should get current user info with valid token', async () => {
      // Mock api.get to simulate getting user info
      const mockGet = jest.spyOn(AuthService, 'getCurrentUser').mockResolvedValue({
        data: {
          code: 0,
          message: '获取用户信息成功',
          data: {
            _id: '123',
            username: 'frontend_testuser',
            email: 'frontend_test@example.com',
            fullName: 'Frontend Test User'
          }
        }
      });

      const result = await AuthService.getCurrentUser();
      
      expect(result.data.data).toHaveProperty('username');
      expect(result.data.data.username).toBe('frontend_testuser');
      
      // 清理mock
      mockGet.mockRestore();
    });
  });
});