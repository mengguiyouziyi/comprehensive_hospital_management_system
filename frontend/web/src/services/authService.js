import api from './api';

class AuthService {
  /**
   * 用户登录
   * @param {string} username - 用户名
   * @param {string} password - 密码
   * @returns {Promise} 登录结果
   */
  async login(username, password) {
    const response = await api.post('/api/auth/login', { username, password });
    return response;
  }

  /**
   * 用户登出
   * @returns {Promise} 登出结果
   */
  async logout() {
    try {
      const response = await api.post('/api/auth/logout');
      // 清除本地token
      localStorage.removeItem('access_token');
      return response;
    } catch (error) {
      // 即使服务器登出失败，也要清除本地token
      localStorage.removeItem('access_token');
      throw error;
    }
  }

  /**
   * 刷新token
   * @param {string} refreshToken - 刷新token
   * @returns {Promise} 刷新结果
   */
  async refreshToken(refreshToken) {
    const response = await api.post('/api/auth/refresh', { refreshToken });
    return response;
  }

  /**
   * 获取当前用户信息
   * @returns {Promise} 用户信息
   */
  async getCurrentUser() {
    const response = await api.get('/api/auth/me');
    return response;
  }

  /**
   * 检查用户是否已登录
   * @returns {boolean} 是否已登录
   */
  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }
}

export default new AuthService();