import axios from 'axios';
const API_URL = import.meta.env.BACKEND_URL || 'http://localhost:5000';

export const authAPI = {
  // Signup with mobile number
  signup: async (number) => {
    try {
      const response = await axios.post(`${API_URL}/api/number-signup`, 
        { number },
        { withCredentials: true }  // For cookies
      );
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error.response?.data || error.message;
    }
  },


  // Send OTP (if needed later)
  sendOTP: async (number) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/send-otp`, { number },
        { withCredentials: true }  // For cookies
      );
      return response.data;
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error.response?.data || error.message;
    }
  },

  // Verify OTP
  verifyOTP: async (number, otp) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/verify-otp`, 
        { number, otp },
        { withCredentials: true },
        {
          headers: { "Content-Type": "application/json", },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error.response?.data || error.message;
    }
  },

  // Resend OTP
  resendOTP: async (number) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/resend-otp`, 
        { number },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Resend OTP error:', error);
      throw error.response?.data || error.message;
    }
  },


  // Complete Registration (NEW)
  completeRegistration: async (registrationData) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/complete-registration`, 
        registrationData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  login: async (number, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/number-login`,
        { number, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error.response?.data || error.message;
    }     
}
};