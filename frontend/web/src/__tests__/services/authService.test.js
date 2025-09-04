import authService from '../../services/authService';
import api from '../../services/api';

// Mock the api module
jest.mock('../../services/api');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call api.post with correct parameters', async () => {
      // Mock the api response
      const mockResponse = {
        code: 0,
        message: 'success',
        data: {
          access_token: 'test-token',
          user: { id: 1, username: 'testuser' }
        }
      };
      api.post.mockResolvedValueOnce(mockResponse);

      // Call the service method
      const result = await authService.login('testuser', 'password123');

      // Assert the result
      expect(result).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/api/auth/login', {
        username: 'testuser',
        password: 'password123'
      });
    });
  });

  describe('logout', () => {
    it('should call api.post and remove token from localStorage', async () => {
      // Mock the api response
      const mockResponse = {
        code: 0,
        message: 'success',
        data: null
      };
      api.post.mockResolvedValueOnce(mockResponse);
      
      // Mock localStorage
      Storage.prototype.getItem = jest.fn(() => 'test-token');
      Storage.prototype.removeItem = jest.fn();

      // Call the service method
      const result = await authService.logout();

      // Assert the result
      expect(result).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/api/auth/logout');
      expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    });

    it('should remove token from localStorage even if api call fails', async () => {
      // Mock the api to throw an error
      api.post.mockRejectedValueOnce(new Error('Network error'));
      
      // Mock localStorage
      Storage.prototype.getItem = jest.fn(() => 'test-token');
      Storage.prototype.removeItem = jest.fn();

      // Call the service method and expect it to throw
      await expect(authService.logout()).rejects.toThrow('Network error');
      
      // Assert that localStorage.removeItem was still called
      expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    });
  });

  describe('getCurrentUser', () => {
    it('should call api.get with correct endpoint', async () => {
      // Mock the api response
      const mockResponse = {
        code: 0,
        message: 'success',
        data: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com'
        }
      };
      api.get.mockResolvedValueOnce(mockResponse);

      // Call the service method
      const result = await authService.getCurrentUser();

      // Assert the result
      expect(result).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/api/auth/me');
    });
  });

  describe('isLoggedIn', () => {
    it('should return true when token exists in localStorage', () => {
      // Mock localStorage
      Storage.prototype.getItem = jest.fn(() => 'test-token');

      // Call the service method
      const result = authService.isLoggedIn();

      // Assert the result
      expect(result).toBe(true);
      expect(localStorage.getItem).toHaveBeenCalledWith('access_token');
    });

    it('should return false when token does not exist in localStorage', () => {
      // Mock localStorage
      Storage.prototype.getItem = jest.fn(() => null);

      // Call the service method
      const result = authService.isLoggedIn();

      // Assert the result
      expect(result).toBe(false);
      expect(localStorage.getItem).toHaveBeenCalledWith('access_token');
    });
  });
});