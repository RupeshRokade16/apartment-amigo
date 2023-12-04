import apiCaller from '../utils/apiCaller'; // Adjust the path as needed

const AuthService = {
  login: async (credentials) => {
    try {
      const response = await apiCaller.post('/api/login', credentials);

      // Assuming the backend returns a token upon successful login
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        return { user, token };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  register: async (userData) => {
    try {
      const response = await apiCaller.post('/api/register', userData);

      // Assuming the backend returns a token upon successful registration
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        return { user, token };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  isAuthenticated: async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return false; // Token is not present
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      console.log('Token info - ', token)
      const response = await apiCaller.get('/api/validateToken', { headers });

      if (response.status === 200) {
        return true; // Token is valid
      } else {
        return false; // Token is invalid or expired
      }
    } catch (error) {
      console.error(error);
      return false; // Request failed or other errors
    }
  }
};

export default AuthService;
